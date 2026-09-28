import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { it } from '../../i18n/it';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly t = it;

  email = '';
  password = '';
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  async submit(): Promise<void> {
    this.errorMessage.set(null);
    this.loading.set(true);
    const { error } = await this.auth.signInWithPassword(this.email, this.password);
    this.loading.set(false);

    if (error) {
      this.errorMessage.set(this.t.login.error);
      return;
    }

    this.router.navigateByUrl('/');
  }
}
