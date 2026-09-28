import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../core/services/supabase.service';
import { SignupStateService } from '../signup-state.service';
import { it } from '../../../core/i18n/it';

interface OtpVerifyResponse {
  verified: boolean;
  attemptsRemaining?: number;
  expired?: boolean;
  blocked?: boolean;
  alreadyUsed?: boolean;
}

@Component({
  selector: 'app-signup-contract',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.scss',
})
export class ContractComponent {
  readonly t = it.signup.contract;

  acceptedTerms = false;
  acceptedRules = false;
  acceptedPrivacy = false;
  otpCode = '';

  readonly otpSent = signal(false);
  readonly sendingOtp = signal(false);
  readonly verifyingOtp = signal(false);
  readonly errorMessage = signal<string | null>(null);

  constructor(
    private readonly supabase: SupabaseService,
    private readonly signupState: SignupStateService,
    private readonly router: Router,
  ) {}

  get canSendOtp(): boolean {
    return this.acceptedTerms && this.acceptedRules && this.acceptedPrivacy;
  }

  async sendOtp(): Promise<void> {
    if (!this.canSendOtp) {
      this.errorMessage.set(this.t.acceptanceRequired);
      return;
    }

    this.errorMessage.set(null);
    this.sendingOtp.set(true);

    const { error } = await this.supabase.client.functions.invoke('contract-otp', {
      body: { action: 'request' },
    });

    this.sendingOtp.set(false);

    if (error) {
      this.errorMessage.set(this.t.errorGeneric);
      return;
    }

    this.otpSent.set(true);
  }

  async verifyOtp(): Promise<void> {
    this.errorMessage.set(null);
    this.verifyingOtp.set(true);

    const { data, error } = await this.supabase.client.functions.invoke<OtpVerifyResponse>('contract-otp', {
      body: { action: 'verify', code: this.otpCode },
    });

    if (error || !data) {
      this.verifyingOtp.set(false);
      this.errorMessage.set(this.t.errorGeneric);
      return;
    }

    if (!data.verified) {
      this.verifyingOtp.set(false);
      if (data.blocked) {
        this.errorMessage.set(this.t.otpBlocked);
      } else if (data.expired) {
        this.errorMessage.set(this.t.otpExpired);
      } else if (typeof data.attemptsRemaining === 'number') {
        this.errorMessage.set(this.t.otpInvalidWithAttempts.replace('{n}', String(data.attemptsRemaining)));
      } else {
        this.errorMessage.set(this.t.otpInvalid);
      }
      return;
    }

    const planId = this.signupState.selectedPlanId();
    const { error: contractError } = await this.supabase.client.functions.invoke('generate-contract', {
      body: {
        planId,
        acceptedTerms: this.acceptedTerms,
        acceptedRules: this.acceptedRules,
        acceptedPrivacy: this.acceptedPrivacy,
      },
    });

    this.verifyingOtp.set(false);

    if (contractError) {
      this.errorMessage.set(this.t.errorGeneric);
      return;
    }

    this.router.navigateByUrl('/iscriviti/pagamento');
  }
}
