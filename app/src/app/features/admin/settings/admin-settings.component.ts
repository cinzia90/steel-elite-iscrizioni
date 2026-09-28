import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../core/services/supabase.service';
import { it } from '../../../core/i18n/it';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.scss',
})
export class AdminSettingsComponent implements OnInit {
  readonly t = it.admin.settings;
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly infoMessage = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  gymName = '';
  antiPassbackMinutes = 120;
  requireApprovedCertificate = true;
  registrationFeeEuro = 30;
  whatsappSupport = '';

  constructor(private readonly supabase: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    const { data } = await this.supabase.client.from('settings').select('*').single();
    if (data) {
      this.gymName = data.gym_name;
      this.antiPassbackMinutes = data.anti_passback_minutes;
      this.requireApprovedCertificate = data.require_approved_certificate;
      this.registrationFeeEuro = data.registration_fee_cents / 100;
      this.whatsappSupport = data.whatsapp_support ?? '';
    }
    this.loading.set(false);
  }

  async save(): Promise<void> {
    this.errorMessage.set(null);
    this.infoMessage.set(null);
    this.saving.set(true);

    const { error } = await this.supabase.client
      .from('settings')
      .update({
        gym_name: this.gymName,
        anti_passback_minutes: this.antiPassbackMinutes,
        require_approved_certificate: this.requireApprovedCertificate,
        registration_fee_cents: Math.round(this.registrationFeeEuro * 100),
        whatsapp_support: this.whatsappSupport || null,
      })
      .eq('id', true);

    this.saving.set(false);

    if (error) {
      this.errorMessage.set(this.t.errorGeneric);
      return;
    }

    this.infoMessage.set(this.t.saved);
  }
}
