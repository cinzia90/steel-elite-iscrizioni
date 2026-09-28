import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../core/services/supabase.service';
import { it } from '../../../core/i18n/it';

interface AccessLogRow {
  id: string;
  scanned_at: string;
  result: string;
  reason: string | null;
  profiles: { first_name: string | null; last_name: string | null } | null;
}

@Component({
  selector: 'app-admin-access-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-access-logs.component.html',
  styleUrl: './admin-access-logs.component.scss',
})
export class AdminAccessLogsComponent implements OnInit {
  readonly t = it.admin.accessLogs;
  readonly logs = signal<AccessLogRow[]>([]);
  readonly loading = signal(true);

  dateFrom = '';
  dateTo = '';
  result: '' | 'granted' | 'denied' = '';

  constructor(private readonly supabase: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    await this.search();
  }

  async search(): Promise<void> {
    this.loading.set(true);

    let request = this.supabase.client
      .from('access_logs')
      .select('id, scanned_at, result, reason, profiles ( first_name, last_name )')
      .order('scanned_at', { ascending: false })
      .limit(200);

    if (this.dateFrom) {
      request = request.gte('scanned_at', `${this.dateFrom}T00:00:00`);
    }
    if (this.dateTo) {
      request = request.lte('scanned_at', `${this.dateTo}T23:59:59`);
    }
    if (this.result) {
      request = request.eq('result', this.result);
    }

    const { data } = await request;
    this.logs.set((data as unknown as AccessLogRow[]) ?? []);
    this.loading.set(false);
  }

  memberName(log: AccessLogRow): string {
    const profile = log.profiles;
    return profile ? `${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim() : '—';
  }

  exportCsv(): void {
    const header = 'Data,Cliente,Esito,Motivo\n';
    const rows = this.logs()
      .map((log) => [log.scanned_at, this.memberName(log), log.result, log.reason ?? ''].map(csvEscape).join(','))
      .join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ingressi-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
}

function csvEscape(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}
