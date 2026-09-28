import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as QRCode from 'qrcode';
import { AuthService } from '../../core/auth/auth.service';
import { SupabaseService } from '../../core/services/supabase.service';
import { it } from '../../core/i18n/it';

type StatusReason =
  | 'active'
  | 'no_subscription'
  | 'pending_payment'
  | 'expired'
  | 'certificate_missing'
  | 'certificate_pending';

const REFRESH_INTERVAL_SECONDS = 30;

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit, OnDestroy {
  readonly t = it.card;

  readonly loading = signal(true);
  readonly offline = signal(!navigator.onLine);
  readonly statusReason = signal<StatusReason>('no_subscription');
  readonly planName = signal<string | null>(null);
  readonly endDateLabel = signal<string | null>(null);
  readonly photoUrl = signal<string | null>(null);
  readonly qrDataUrl = signal<string | null>(null);
  readonly secondsRemaining = signal(REFRESH_INTERVAL_SECONDS);

  private refreshHandle: ReturnType<typeof setInterval> | null = null;
  private tickHandle: ReturnType<typeof setInterval> | null = null;

  private readonly onlineListener = () => {
    this.offline.set(false);
    if (this.statusReason() === 'active') {
      this.startQrCycle();
    }
  };
  private readonly offlineListener = () => {
    this.offline.set(true);
    this.stopQrCycle();
    this.qrDataUrl.set(null);
  };

  constructor(private readonly auth: AuthService, private readonly supabase: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    window.addEventListener('online', this.onlineListener);
    window.addEventListener('offline', this.offlineListener);

    await this.loadStatus();
    this.loading.set(false);

    if (this.statusReason() === 'active' && !this.offline()) {
      this.startQrCycle();
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('online', this.onlineListener);
    window.removeEventListener('offline', this.offlineListener);
    this.stopQrCycle();
  }

  private async loadStatus(): Promise<void> {
    const userId = this.auth.user()?.id;
    if (!userId) {
      return;
    }

    const profile = this.auth.profile();
    if (profile?.photo_path) {
      const { data } = await this.supabase.client.storage
        .from('photos')
        .createSignedUrl(profile.photo_path, 300);
      this.photoUrl.set(data?.signedUrl ?? null);
    }

    const { data: subscription } = await this.supabase.client
      .from('subscriptions')
      .select('status, end_date, sessions_remaining, plans ( name )')
      .eq('member_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!subscription) {
      this.statusReason.set('no_subscription');
      return;
    }

    const plan = subscription.plans as unknown as { name: string } | null;
    this.planName.set(plan?.name ?? null);
    this.endDateLabel.set(subscription.end_date);

    const isDateExpired = subscription.end_date
      ? new Date(`${subscription.end_date}T23:59:59Z`) < new Date()
      : false;
    const isSessionsDepleted = subscription.sessions_remaining !== null && subscription.sessions_remaining <= 0;

    if (subscription.status === 'pending') {
      this.statusReason.set('pending_payment');
      return;
    }
    if (subscription.status !== 'active' || isDateExpired || isSessionsDepleted) {
      this.statusReason.set('expired');
      return;
    }

    const { data: settings } = await this.supabase.client
      .from('settings')
      .select('require_approved_certificate')
      .single();

    const { data: certificate } = await this.supabase.client
      .from('medical_certificates')
      .select('status')
      .eq('member_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!certificate) {
      this.statusReason.set('certificate_missing');
      return;
    }
    if (settings?.require_approved_certificate && certificate.status !== 'approved') {
      this.statusReason.set('certificate_pending');
      return;
    }

    this.statusReason.set('active');
  }

  private startQrCycle(): void {
    this.stopQrCycle();
    this.refreshToken();

    this.secondsRemaining.set(REFRESH_INTERVAL_SECONDS);
    this.tickHandle = setInterval(() => {
      this.secondsRemaining.update((s) => Math.max(s - 1, 0));
    }, 1000);

    this.refreshHandle = setInterval(() => {
      this.secondsRemaining.set(REFRESH_INTERVAL_SECONDS);
      this.refreshToken();
    }, REFRESH_INTERVAL_SECONDS * 1000);
  }

  private stopQrCycle(): void {
    if (this.refreshHandle) {
      clearInterval(this.refreshHandle);
      this.refreshHandle = null;
    }
    if (this.tickHandle) {
      clearInterval(this.tickHandle);
      this.tickHandle = null;
    }
  }

  private async refreshToken(): Promise<void> {
    const { data, error } = await this.supabase.client.functions.invoke<{ token: string }>(
      'issue-access-token',
      { body: {} },
    );

    if (error || !data?.token) {
      this.qrDataUrl.set(null);
      return;
    }

    this.qrDataUrl.set(await QRCode.toDataURL(data.token, { margin: 1, width: 280 }));
  }

  get progressPercent(): number {
    return (this.secondsRemaining() / REFRESH_INTERVAL_SECONDS) * 100;
  }
}
