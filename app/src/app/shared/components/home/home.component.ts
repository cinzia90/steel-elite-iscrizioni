import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { it } from '../../../core/i18n/it';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div style="padding: 24px;">
      <h1>Steel Elite</h1>
      <p>{{ t.home.greeting }} {{ auth.profile()?.first_name || auth.user()?.email }} ({{ auth.role() }})</p>
      <button (click)="logout()">{{ t.home.logout }}</button>
    </div>
  `,
})
export class HomeComponent {
  readonly t = it;

  constructor(readonly auth: AuthService, private readonly router: Router) {}

  async logout(): Promise<void> {
    await this.auth.signOut();
    this.router.navigateByUrl('/login');
  }
}
