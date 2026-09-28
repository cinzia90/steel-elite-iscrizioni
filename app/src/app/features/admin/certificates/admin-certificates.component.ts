import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { SupabaseService } from '../../../core/services/supabase.service';
import { MockBackendService } from '../../../core/mock/mock-backend.service';
import { environment } from '../../../../environments/environment';
import { it } from '../../../core/i18n/it';

interface PendingCertificate {
  id: string;
  file_path: string;
  expiry_date: string;
  profiles: { first_name: string | null; last_name: string | null } | null;
}

@Component({
  selector: 'app-admin-certificates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.scss',
})
export class AdminCertificatesComponent implements OnInit {
  readonly t = it.admin.certificates;
  readonly certificates = signal<PendingCertificate[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly notes = new Map<string, string>();

  constructor(
    private readonly supabase: SupabaseService,
    private readonly auth: AuthService,
    private readonly mock: MockBackendService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.load();
  }

  private async load(): Promise<void> {
    this.loading.set(true);

    if (environment.mock) {
      const pending = this.mock.listPendingCertificates();
      this.certificates.set(
        pending.map((c) => ({
          id: c.id,
          file_path: c.file_path,
          expiry_date: c.expiry_date,
          profiles: this.mock.getProfile(c.member_id),
        })) as unknown as PendingCertificate[],
      );
      this.loading.set(false);
      return;
    }

    const { data } = await this.supabase.client
      .from('medical_certificates')
      .select('id, file_path, expiry_date, profiles ( first_name, last_name )')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });

    this.certificates.set((data as unknown as PendingCertificate[]) ?? []);
    this.loading.set(false);
  }

  getNote(certId: string): string {
    return this.notes.get(certId) ?? '';
  }

  setNote(certId: string, value: string): void {
    this.notes.set(certId, value);
  }

  memberName(cert: PendingCertificate): string {
    const profile = cert.profiles;
    return profile ? `${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim() : '—';
  }

  async view(cert: PendingCertificate): Promise<void> {
    const url = environment.mock
      ? await this.mock.getSignedUrl(cert.file_path)
      : (await this.supabase.client.storage.from('certificates').createSignedUrl(cert.file_path, 60)).data
          ?.signedUrl;
    if (url) {
      window.open(url, '_blank');
    }
  }

  async decide(cert: PendingCertificate, status: 'approved' | 'rejected'): Promise<void> {
    this.errorMessage.set(null);
    const userId = this.auth.user()?.id;

    if (environment.mock) {
      this.mock.decideCertificate(cert.id, status, this.notes.get(cert.id) ?? null, userId ?? '');
      await this.load();
      return;
    }

    const { error } = await this.supabase.client
      .from('medical_certificates')
      .update({
        status,
        reviewed_by: userId,
        reviewed_at: new Date().toISOString(),
        notes: this.notes.get(cert.id) ?? null,
      })
      .eq('id', cert.id);

    if (error) {
      this.errorMessage.set(this.t.errorGeneric);
      return;
    }

    await this.load();
  }
}
