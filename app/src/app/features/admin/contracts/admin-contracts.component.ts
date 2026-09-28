import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../../core/services/supabase.service';
import { it } from '../../../core/i18n/it';

interface ContractRow {
  id: string;
  created_at: string;
  pdf_path: string;
  pdf_sha256: string;
  profiles: { first_name: string | null; last_name: string | null } | null;
}

// Vista amministrativa minimale per verificare la capacità tecnica
// richiesta dalla Fase 3 (PDF scaricabile dall'admin). Il pannello admin
// completo, con dashboard e tutte le sezioni, arriva in Fase 6.
@Component({
  selector: 'app-admin-contracts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-contracts.component.html',
  styleUrl: './admin-contracts.component.scss',
})
export class AdminContractsComponent implements OnInit {
  readonly t = it.admin.contracts;
  readonly contracts = signal<ContractRow[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  constructor(private readonly supabase: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    const { data } = await this.supabase.client
      .from('contracts')
      .select('id, created_at, pdf_path, pdf_sha256, profiles ( first_name, last_name )')
      .order('created_at', { ascending: false })
      .limit(50);

    this.contracts.set((data as unknown as ContractRow[]) ?? []);
    this.loading.set(false);
  }

  memberName(contract: ContractRow): string {
    const profile = contract.profiles;
    return profile ? `${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim() : '—';
  }

  async download(contract: ContractRow): Promise<void> {
    this.errorMessage.set(null);
    const { data, error } = await this.supabase.client.storage
      .from('contracts')
      .createSignedUrl(contract.pdf_path, 60);

    if (error || !data?.signedUrl) {
      this.errorMessage.set(this.t.errorGeneric);
      return;
    }

    window.open(data.signedUrl, '_blank');
  }
}
