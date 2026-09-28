import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Plan } from '../../shared/models/plan.model';

@Injectable({ providedIn: 'root' })
export class PlansService {
  constructor(private readonly supabase: SupabaseService) {}

  async listActivePlans(): Promise<Plan[]> {
    const { data, error } = await this.supabase.client
      .from('plans')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      throw error;
    }

    return data as Plan[];
  }
}
