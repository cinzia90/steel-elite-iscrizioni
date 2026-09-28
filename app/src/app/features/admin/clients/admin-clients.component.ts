import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../../core/services/supabase.service';
import { it } from '../../../core/i18n/it';

interface ClientRow {
  id: string;
  first_name: string | null;
  last_name: string | null;
}

@Component({
  selector: 'app-admin-clients',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-clients.component.html',
  styleUrl: './admin-clients.component.scss',
})
export class AdminClientsComponent implements OnInit {
  readonly t = it.admin.clients;
  readonly clients = signal<ClientRow[]>([]);
  readonly loading = signal(true);
  query = '';

  constructor(private readonly supabase: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    await this.search();
  }

  async search(): Promise<void> {
    this.loading.set(true);

    let request = this.supabase.client.from('profiles').select('id, first_name, last_name').eq('role', 'member');

    if (this.query.trim().length >= 2) {
      request = request.or(`first_name.ilike.%${this.query}%,last_name.ilike.%${this.query}%`);
    }

    const { data } = await request.order('created_at', { ascending: false }).limit(100);
    this.clients.set((data as ClientRow[]) ?? []);
    this.loading.set(false);
  }
}
