import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { it } from '../../../core/i18n/it';

@Component({
  selector: 'app-signup-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  readonly t = it.signup.account;

  email = '';
  password = '';
  firstName = '';
  lastName = '';

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly awaitingConfirmation = signal(false);

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  async submit(): Promise<void> {
    this.errorMessage.set(null);
    this.loading.set(true);

    const { data, error } = await this.auth.signUp(this.email, this.password, this.firstName, this.lastName);
    this.loading.set(false);

    if (error) {
      this.errorMessage.set(this.t.errorGeneric);
      return;
    }

    if (data.session) {
      this.router.navigateByUrl('/iscriviti/profilo');
      return;
    }

    this.awaitingConfirmation.set(true);
  }
}
