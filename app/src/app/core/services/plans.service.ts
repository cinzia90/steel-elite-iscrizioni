import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Plan } from '../../shared/models/plan.model';
import { MockBackendService } from '../mock/mock-backend.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PlansService {
  constructor(private readonly supabase: SupabaseService, private readonly mock: MockBackendService) {}

  async listActivePlans(): Promise<Plan[]> {
    if (environment.mock) {
      return this.mock.listActivePlans();
    }

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
