import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../core/services/supabase.service';
import { SignupStateService } from '../signup-state.service';
import { it } from '../../../core/i18n/it';

@Component({
  selector: 'app-signup-payment',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="payment-page">
      <p>{{ errorMessage() ?? t.redirecting }}</p>
    </div>
  `,
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  readonly t = it.signup.payment;
  readonly errorMessage = signal<string | null>(null);

  constructor(
    private readonly supabase: SupabaseService,
    private readonly signupState: SignupStateService,
    private readonly router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    const planId = this.signupState.selectedPlanId();
    if (!planId) {
      this.router.navigateByUrl('/iscriviti');
      return;
    }

    const { data, error } = await this.supabase.client.functions.invoke<{ url: string }>(
      'create-checkout-session',
      { body: { planId } },
    );

    if (error || !data?.url) {
      this.errorMessage.set(this.t.errorGeneric);
      return;
    }

    window.location.href = data.url;
  }
}
