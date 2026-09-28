import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { SupabaseService } from '../../../core/services/supabase.service';
import { MockBackendService } from '../../../core/mock/mock-backend.service';
import { environment } from '../../../../environments/environment';
import { it } from '../../../core/i18n/it';

@Component({
  selector: 'app-signup-certificate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.scss',
})
export class CertificateComponent implements OnInit {
  readonly t = it.signup.certificate;

  expiryDate = '';
  certificateFile: File | null = null;

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  // true se il member ha già un abbonamento (sta caricando il certificato in
  // un secondo momento, non durante l'iscrizione): niente pulsante "salta",
  // e dopo il salvataggio si torna alla tessera invece che al contratto.
  readonly alreadySubscribed = signal(false);

  constructor(
    private readonly auth: AuthService,
    private readonly supabase: SupabaseService,
    private readonly mock: MockBackendService,
    private readonly router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    const userId = this.auth.user()?.id;
    if (!userId) {
      return;
    }

    if (environment.mock) {
      this.alreadySubscribed.set(!!this.mock.getLatestSubscription(userId));
      return;
    }

    const { data } = await this.supabase.client
      .from('subscriptions')
      .select('id')
      .eq('member_id', userId)
      .limit(1)
      .maybeSingle();
    this.alreadySubscribed.set(!!data);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.certificateFile = input.files?.[0] ?? null;
  }

  skip(): void {
    this.router.navigateByUrl('/iscriviti/contratto');
  }

  private nextRoute(): string {
    return this.alreadySubscribed() ? '/tessera' : '/iscriviti/contratto';
  }

  async submit(): Promise<void> {
    this.errorMessage.set(null);

    if (!this.certificateFile) {
      this.errorMessage.set(this.t.fileRequired);
      return;
    }

    const userId = this.auth.user()?.id;
    if (!userId) {
      return;
    }

    this.loading.set(true);

    try {
      if (environment.mock) {
        await this.mock.submitCertificate(userId, this.certificateFile, this.expiryDate);
      } else {
        const extension = this.certificateFile.name.split('.').pop() ?? 'pdf';
        const filePath = `${userId}/certificato-${Date.now()}.${extension}`;

        const { error: uploadError } = await this.supabase.client.storage
          .from('certificates')
          .upload(filePath, this.certificateFile, { upsert: false });

        if (uploadError) {
          throw uploadError;
        }

        const { error: insertError } = await this.supabase.client.from('medical_certificates').insert({
          member_id: userId,
          file_path: filePath,
          expiry_date: this.expiryDate,
        });

        if (insertError) {
          throw insertError;
        }
      }

      this.router.navigateByUrl(this.nextRoute());
    } catch {
      this.errorMessage.set(this.t.errorGeneric);
    } finally {
      this.loading.set(false);
    }
  }
}
