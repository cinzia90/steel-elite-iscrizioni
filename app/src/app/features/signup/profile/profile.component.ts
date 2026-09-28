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
  selector: 'app-signup-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  readonly t = it.signup.profile;

  firstName = '';
  lastName = '';
  fiscalCode = '';
  birthDate = '';
  phone = '';
  address = '';

  photoFile: File | null = null;
  readonly photoPreviewUrl = signal<string | null>(null);
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  // true se il member ha già un abbonamento: sta ricaricando la foto (o
  // aggiornando i dati) dopo l'iscrizione, non durante il flusso iniziale —
  // dopo il salvataggio si torna alla tessera invece che al certificato.
  readonly alreadySubscribed = signal(false);

  constructor(
    private readonly auth: AuthService,
    private readonly supabase: SupabaseService,
    private readonly mock: MockBackendService,
    private readonly router: Router,
  ) {
    const profile = this.auth.profile();
    if (profile) {
      this.firstName = profile.first_name ?? '';
      this.lastName = profile.last_name ?? '';
      this.fiscalCode = profile.fiscal_code ?? '';
      this.birthDate = profile.birth_date ?? '';
      this.phone = profile.phone ?? '';
      this.address = profile.address ?? '';
      if (profile.photo_path) {
        this.photoPreviewUrl.set(null);
      }
    }
  }

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

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.photoFile = file;
    this.photoPreviewUrl.set(file ? URL.createObjectURL(file) : null);
  }

  private nextRoute(): string {
    return this.alreadySubscribed() ? '/tessera' : '/iscriviti/certificato';
  }

  async submit(): Promise<void> {
    this.errorMessage.set(null);

    if (!this.photoFile) {
      this.errorMessage.set(this.t.photoRequired);
      return;
    }

    const userId = this.auth.user()?.id;
    if (!userId) {
      return;
    }

    this.loading.set(true);

    try {
      const extension = this.photoFile.name.split('.').pop() ?? 'jpg';
      const photoPath = `${userId}/photo.${extension}`;
      const profileUpdate = {
        first_name: this.firstName,
        last_name: this.lastName,
        fiscal_code: this.fiscalCode,
        birth_date: this.birthDate,
        phone: this.phone,
        address: this.address,
        photo_path: photoPath,
      };

      if (environment.mock) {
        await this.mock.uploadFile(photoPath, this.photoFile);
        await this.mock.updateProfile(userId, profileUpdate);
      } else {
        const { error: uploadError } = await this.supabase.client.storage
          .from('photos')
          .upload(photoPath, this.photoFile, { upsert: true });

        if (uploadError) {
          throw uploadError;
        }

        const { error: updateError } = await this.supabase.client
          .from('profiles')
          .update(profileUpdate)
          .eq('id', userId);

        if (updateError) {
          throw updateError;
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
