export type PlanCategory = 'open' | 'pt_privato' | 'pt_small_group';

export interface Plan {
  id: string;
  name: string;
  description: string | null;
  category: PlanCategory;
  price_cents: number;
  duration_days: number | null;
  session_count: number | null;
  is_recurring: boolean;
  active: boolean;
  sort_order: number;
}
