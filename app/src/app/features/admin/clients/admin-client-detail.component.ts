import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupabaseService } from '../../../core/services/supabase.service';
import { MockBackendService } from '../../../core/mock/mock-backend.service';
import { environment } from '../../../../environments/environment';
import { it } from '../../../core/i18n/it';
import { Profile } from '../../../shared/models/profile.model';

interface SubscriptionRow {
  id: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  sessions_remaining: number | null;
  plans: { name: string } | null;
}

interface ContractRow {
  id: string;
  created_at: string;
  pdf_path: string;
  pdf_sha256: string;
}

interface CertificateRow {
  id: string;
  status: string;
  expiry_date: string;
  file_path: string;
}

interface AccessLogRow {
  id: string;
  scanned_at: string;
  result: string;
  reason: string | null;
}

@Component({
  selector: 'app-admin-client-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-client-detail.component.html',
  styleUrl: './admin-client-detail.component.scss',
})
export class AdminClientDetailComponent implements OnInit {
  readonly t = it.admin.clients;
  readonly loading = signal(true);
  readonly profile = signal<Profile | null>(null);
  readonly photoUrl = signal<string | null>(null);
  readonly subscriptions = signal<SubscriptionRow[]>([]);
  readonly contracts = signal<ContractRow[]>([]);
  readonly certificate = signal<CertificateRow | null>(null);
  readonly accessLogs = signal<AccessLogRow[]>([]);

  private memberId = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly supabase: SupabaseService,
    private readonly mock: MockBackendService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.memberId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.memberId) {
      return;
    }

    if (environment.mock) {
      const detail = this.mock.getClientDetail(this.memberId);
      this.profile.set(detail.profile);
      if (detail.profile?.photo_path) {
        this.photoUrl.set(await this.mock.getSignedUrl(detail.profile.photo_path));
      }
      this.subscriptions.set(
        detail.subscriptions.map((s) => ({
          id: s.id,
          status: s.status,
          start_date: s.start_date,
          end_date: s.end_date,
          sessions_remaining: s.sessions_remaining,
          plans: { name: s.planName },
        })),
      );
      this.contracts.set(detail.contracts as unknown as ContractRow[]);
      this.certificate.set(detail.certificate as unknown as CertificateRow | null);
      this.accessLogs.set(detail.accessLogs as unknown as AccessLogRow[]);
      this.loading.set(false);
      return;
    }

    const [profileRes, subsRes, contractsRes, certRes, logsRes] = await Promise.all([
      this.supabase.client.from('profiles').select('*').eq('id', this.memberId).single(),
      this.supabase.client
        .from('subscriptions')
        .select('id, status, start_date, end_date, sessions_remaining, plans ( name )')
        .eq('member_id', this.memberId)
        .order('created_at', { ascending: false }),
      this.supabase.client
        .from('contracts')
        .select('id, created_at, pdf_path, pdf_sha256')
        .eq('member_id', this.memberId)
        .order('created_at', { ascending: false }),
      this.supabase.client
        .from('medical_certificates')
        .select('id, status, expiry_date, file_path')
        .eq('member_id', this.memberId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      this.supabase.client
        .from('access_logs')
        .select('id, scanned_at, result, reason')
        .eq('member_id', this.memberId)
        .order('scanned_at', { ascending: false })
        .limit(20),
    ]);

    const profile = profileRes.data as Profile | null;
    this.profile.set(profile);
    if (profile?.photo_path) {
      const { data } = await this.supabase.client.storage.from('photos').createSignedUrl(profile.photo_path, 300);
      this.photoUrl.set(data?.signedUrl ?? null);
    }

    this.subscriptions.set((subsRes.data as unknown as SubscriptionRow[]) ?? []);
    this.contracts.set((contractsRes.data as ContractRow[]) ?? []);
    this.certificate.set((certRes.data as CertificateRow | null) ?? null);
    this.accessLogs.set((logsRes.data as AccessLogRow[]) ?? []);

    this.loading.set(false);
  }

  async downloadContract(contract: ContractRow): Promise<void> {
    const url = environment.mock
      ? await this.mock.getSignedUrl(contract.pdf_path)
      : (await this.supabase.client.storage.from('contracts').createSignedUrl(contract.pdf_path, 60)).data
          ?.signedUrl;
    if (url) {
      window.open(url, '_blank');
    }
  }

  async viewCertificate(): Promise<void> {
    const cert = this.certificate();
    if (!cert) {
      return;
    }
    const url = environment.mock
      ? await this.mock.getSignedUrl(cert.file_path)
      : (await this.supabase.client.storage.from('certificates').createSignedUrl(cert.file_path, 60)).data
          ?.signedUrl;
    if (url) {
      window.open(url, '_blank');
    }
  }

  planName(sub: SubscriptionRow): string {
    return sub.plans?.name ?? '—';
  }
}
