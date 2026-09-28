import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../../core/services/supabase.service';
import { it } from '../../../core/i18n/it';

const CERTIFICATE_EXPIRY_WINDOW_DAYS = 30;

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  readonly t = it.admin.dashboard;
  readonly loading = signal(true);

  readonly todayAccessCount = signal(0);
  readonly activeClientsCount = signal(0);
  readonly expiringSoonCount = signal(0);
  readonly certificatesExpiringCount = signal(0);
  readonly certificatesPendingCount = signal(0);

  constructor(private readonly supabase: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const in7Days = new Date();
    in7Days.setDate(in7Days.getDate() + 7);
    const in7DaysLabel = in7Days.toISOString().slice(0, 10);

    const inCertWindow = new Date();
    inCertWindow.setDate(inCertWindow.getDate() + CERTIFICATE_EXPIRY_WINDOW_DAYS);
    const inCertWindowLabel = inCertWindow.toISOString().slice(0, 10);

    const todayLabel = todayStart.toISOString().slice(0, 10);

    const [todayAccess, activeSubs, expiringSoon, certsExpiring, certsPending] = await Promise.all([
      this.supabase.client
        .from('access_logs')
        .select('id', { count: 'exact', head: true })
        .eq('result', 'granted')
        .gte('scanned_at', todayStart.toISOString()),
      this.supabase.client.from('subscriptions').select('member_id').eq('status', 'active'),
      this.supabase.client
        .from('subscriptions')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active')
        .gte('end_date', todayLabel)
        .lte('end_date', in7DaysLabel),
      this.supabase.client
        .from('medical_certificates')
        .select('id', { count: 'exact', head: true })
        .gte('expiry_date', todayLabel)
        .lte('expiry_date', inCertWindowLabel),
      this.supabase.client
        .from('medical_certificates')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'pending'),
    ]);

    this.todayAccessCount.set(todayAccess.count ?? 0);
    this.activeClientsCount.set(new Set((activeSubs.data ?? []).map((s) => s.member_id)).size);
    this.expiringSoonCount.set(expiringSoon.count ?? 0);
    this.certificatesExpiringCount.set(certsExpiring.count ?? 0);
    this.certificatesPendingCount.set(certsPending.count ?? 0);

    this.loading.set(false);
  }
}
