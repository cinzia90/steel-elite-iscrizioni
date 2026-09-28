import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { it } from '../../../core/i18n/it';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="padding: 24px;">
      <h1>Steel Elite</h1>
      <p>{{ t.home.greeting }} {{ auth.profile()?.first_name || auth.user()?.email }} ({{ auth.role() }})</p>
      @if (auth.role() === 'member') {
        <p><a routerLink="/tessera">Tessera</a></p>
      }
      @if (auth.role() === 'staff' || auth.role() === 'admin') {
        <p><a routerLink="/staff/check-in">Check-in</a></p>
      }
      @if (auth.role() === 'admin') {
        <p><a routerLink="/admin/contratti">Contratti</a></p>
      }
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
