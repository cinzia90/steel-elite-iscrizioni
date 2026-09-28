import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../core/services/supabase.service';
import { MockBackendService } from '../../../core/mock/mock-backend.service';
import { environment } from '../../../../environments/environment';
import { it } from '../../../core/i18n/it';

interface StaffRow {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  disabled: boolean;
}

@Component({
  selector: 'app-admin-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-staff.component.html',
  styleUrl: './admin-staff.component.scss',
})
export class AdminStaffComponent implements OnInit {
  readonly t = it.admin.staff;
  readonly staff = signal<StaffRow[]>([]);
  readonly loading = signal(true);
  readonly inviting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly infoMessage = signal<string | null>(null);

  email = '';
  firstName = '';
  lastName = '';

  constructor(private readonly supabase: SupabaseService, private readonly mock: MockBackendService) {}

  async ngOnInit(): Promise<void> {
    await this.load();
  }

  private async load(): Promise<void> {
    this.loading.set(true);

    if (environment.mock) {
      this.staff.set(this.mock.listStaff());
      this.loading.set(false);
      return;
    }

    const { data } = await this.supabase.client.functions.invoke<{ staff: StaffRow[] }>('admin-staff', {
      body: { action: 'list' },
    });
    this.staff.set(data?.staff ?? []);
    this.loading.set(false);
  }

  async invite(): Promise<void> {
    this.errorMessage.set(null);
    this.infoMessage.set(null);
    this.inviting.set(true);

    if (environment.mock) {
      this.mock.inviteStaff(this.email, this.firstName, this.lastName);
      this.inviting.set(false);
      this.infoMessage.set(this.t.inviteSent);
      this.email = '';
      this.firstName = '';
      this.lastName = '';
      await this.load();
      return;
    }

    const { error } = await this.supabase.client.functions.invoke('admin-staff', {
      body: { action: 'invite', email: this.email, firstName: this.firstName, lastName: this.lastName },
    });

    this.inviting.set(false);

    if (error) {
      this.errorMessage.set(this.t.errorGeneric);
      return;
    }

    this.infoMessage.set(this.t.inviteSent);
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    await this.load();
  }

  async toggle(member: StaffRow): Promise<void> {
    this.errorMessage.set(null);

    if (environment.mock) {
      this.mock.toggleStaffDisabled(member.id);
      await this.load();
      return;
    }

    const { error } = await this.supabase.client.functions.invoke('admin-staff', {
      body: { action: member.disabled ? 'enable' : 'disable', userId: member.id },
    });

    if (error) {
      this.errorMessage.set(this.t.errorGeneric);
      return;
    }

    await this.load();
  }
}
