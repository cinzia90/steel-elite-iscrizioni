import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../core/services/supabase.service';
import { it } from '../../../core/i18n/it';
import { Plan, PlanCategory } from '../../../shared/models/plan.model';

interface PlanFormValue {
  id: string | null;
  name: string;
  description: string;
  category: PlanCategory;
  priceEuro: number;
  durationDays: number | null;
  sessionCount: number | null;
  isRecurring: boolean;
  stripePriceId: string;
  active: boolean;
}

function emptyForm(): PlanFormValue {
  return {
    id: null,
    name: '',
    description: '',
    category: 'open',
    priceEuro: 0,
    durationDays: null,
    sessionCount: null,
    isRecurring: false,
    stripePriceId: '',
    active: true,
  };
}

@Component({
  selector: 'app-admin-plans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-plans.component.html',
  styleUrl: './admin-plans.component.scss',
})
export class AdminPlansComponent implements OnInit {
  readonly t = it.admin.plans;
  readonly plans = signal<Plan[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly editing = signal(false);
  form: PlanFormValue = emptyForm();

  constructor(private readonly supabase: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    await this.load();
  }

  private async load(): Promise<void> {
    this.loading.set(true);
    const { data } = await this.supabase.client.from('plans').select('*').order('sort_order', { ascending: true });
    this.plans.set((data as Plan[]) ?? []);
    this.loading.set(false);
  }

  startNew(): void {
    this.form = emptyForm();
    this.editing.set(true);
  }

  startEdit(plan: Plan): void {
    this.form = {
      id: plan.id,
      name: plan.name,
      description: plan.description ?? '',
      category: plan.category,
      priceEuro: plan.price_cents / 100,
      durationDays: plan.duration_days,
      sessionCount: plan.session_count,
      isRecurring: plan.is_recurring,
      stripePriceId: '',
      active: plan.active,
    };
    this.editing.set(true);
  }

  cancel(): void {
    this.editing.set(false);
  }

  async save(): Promise<void> {
    this.errorMessage.set(null);

    const payload = {
      name: this.form.name,
      description: this.form.description || null,
      category: this.form.category,
      price_cents: Math.round(this.form.priceEuro * 100),
      duration_days: this.form.durationDays,
      session_count: this.form.sessionCount,
      is_recurring: this.form.isRecurring,
      stripe_price_id: this.form.stripePriceId || null,
      active: this.form.active,
    };

    const { error } = this.form.id
      ? await this.supabase.client.from('plans').update(payload).eq('id', this.form.id)
      : await this.supabase.client.from('plans').insert(payload);

    if (error) {
      this.errorMessage.set(this.t.errorGeneric);
      return;
    }

    this.editing.set(false);
    await this.load();
  }

  async toggleActive(plan: Plan): Promise<void> {
    const { error } = await this.supabase.client.from('plans').update({ active: !plan.active }).eq('id', plan.id);
    if (error) {
      this.errorMessage.set(this.t.errorGeneric);
      return;
    }
    await this.load();
  }
}
