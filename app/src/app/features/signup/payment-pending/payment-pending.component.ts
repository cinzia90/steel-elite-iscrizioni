import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../../../core/services/supabase.service';
import { SignupStateService } from '../signup-state.service';
import { it } from '../../../core/i18n/it';

type PaymentPendingStatus = 'cancelled' | 'pending' | 'active';

const POLL_INTERVAL_MS = 2000;
const POLL_TIMEOUT_MS = 60000;

@Component({
  selector: 'app-signup-payment-pending',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-pending.component.html',
  styleUrl: './payment-pending.component.scss',
})
export class PaymentPendingComponent implements OnInit, OnDestroy {
  readonly t = it.signup.paymentPending;
  readonly status = signal<PaymentPendingStatus>('pending');

  private pollHandle: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly supabase: SupabaseService,
    private readonly signupState: SignupStateService,
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;

    if (params.get('cancelled')) {
      this.status.set('cancelled');
      return;
    }

    const sessionId = params.get('session_id');
    if (!sessionId) {
      this.router.navigateByUrl('/iscriviti');
      return;
    }

    this.pollSubscriptionStatus(sessionId);
  }

  ngOnDestroy(): void {
    if (this.pollHandle) {
      clearInterval(this.pollHandle);
    }
  }

  retry(): void {
    this.router.navigateByUrl('/iscriviti/pagamento');
  }

  private pollSubscriptionStatus(sessionId: string): void {
    const deadline = Date.now() + POLL_TIMEOUT_MS;

    const check = async () => {
      const { data } = await this.supabase.client
        .from('subscriptions')
        .select('status')
        .eq('stripe_checkout_session_id', sessionId)
        .single();

      if (data?.status === 'active') {
        this.status.set('active');
        this.signupState.clear();
        if (this.pollHandle) {
          clearInterval(this.pollHandle);
        }
        setTimeout(() => this.router.navigateByUrl('/tessera'), 1500);
        return;
      }

      if (Date.now() > deadline && this.pollHandle) {
        clearInterval(this.pollHandle);
      }
    };

    check();
    this.pollHandle = setInterval(check, POLL_INTERVAL_MS);
  }
}
