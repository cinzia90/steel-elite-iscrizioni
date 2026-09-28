import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../core/services/supabase.service';
import { SignupStateService } from '../signup-state.service';
import { AuthService } from '../../../core/auth/auth.service';
import { MockBackendService } from '../../../core/mock/mock-backend.service';
import { environment } from '../../../../environments/environment';
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
  readonly isMock = environment.mock;

  acceptedTerms = false;
  acceptedRules = false;
  acceptedPrivacy = false;
  otpCode = '';

  readonly otpSent = signal(false);
  readonly sendingOtp = signal(false);
  readonly verifyingOtp = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly demoCode = signal<string | null>(null);

  constructor(
    private readonly supabase: SupabaseService,
    private readonly signupState: SignupStateService,
    private readonly auth: AuthService,
    private readonly mock: MockBackendService,
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

    if (environment.mock) {
      const userId = this.auth.user()?.id;
      if (userId) {
        const { plainCode } = await this.mock.requestOtp(userId);
        this.demoCode.set(plainCode);
      }
      this.sendingOtp.set(false);
      this.otpSent.set(true);
      return;
    }

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

    const userId = this.auth.user()?.id;

    const data: OtpVerifyResponse | null = environment.mock
      ? userId
        ? await this.mock.verifyOtp(userId, this.otpCode)
        : null
      : (
          await this.supabase.client.functions.invoke<OtpVerifyResponse>('contract-otp', {
            body: { action: 'verify', code: this.otpCode },
          })
        ).data;

    if (!data) {
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

    if (environment.mock) {
      if (userId) {
        await this.mock.generateContract(userId);
      }
    } else {
      const planId = this.signupState.selectedPlanId();
      const { error: contractError } = await this.supabase.client.functions.invoke('generate-contract', {
        body: {
          planId,
          acceptedTerms: this.acceptedTerms,
          acceptedRules: this.acceptedRules,
          acceptedPrivacy: this.acceptedPrivacy,
        },
      });

      if (contractError) {
        this.verifyingOtp.set(false);
        this.errorMessage.set(this.t.errorGeneric);
        return;
      }
    }

    this.verifyingOtp.set(false);
    this.router.navigateByUrl('/iscriviti/pagamento');
  }
}
