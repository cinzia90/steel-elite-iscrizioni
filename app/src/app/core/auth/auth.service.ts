import { Injectable, computed, signal } from '@angular/core';
import type { Session, User } from '@supabase/supabase-js';
import { SupabaseService } from '../services/supabase.service';
import { Profile } from '../../shared/models/profile.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sessionSignal = signal<Session | null>(null);
  private readonly profileSignal = signal<Profile | null>(null);
  private readonly readySignal = signal(false);

  readonly session = this.sessionSignal.asReadonly();
  readonly profile = this.profileSignal.asReadonly();
  readonly ready = this.readySignal.asReadonly();
  readonly user = computed<User | null>(() => this.sessionSignal()?.user ?? null);
  readonly role = computed(() => this.profileSignal()?.role ?? null);
  readonly isAuthenticated = computed(() => this.sessionSignal() !== null);

  constructor(private readonly supabase: SupabaseService) {
    this.supabase.client.auth.getSession().then(({ data }) => {
      this.sessionSignal.set(data.session);
      this.loadProfile(data.session?.user.id ?? null).finally(() => this.readySignal.set(true));
    });

    this.supabase.client.auth.onAuthStateChange((_event, session) => {
      this.sessionSignal.set(session);
      this.loadProfile(session?.user.id ?? null);
    });
  }

  private async loadProfile(userId: string | null): Promise<void> {
    if (!userId) {
      this.profileSignal.set(null);
      return;
    }
    const { data, error } = await this.supabase.client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    this.profileSignal.set(error ? null : (data as Profile));
  }

  async signInWithPassword(email: string, password: string) {
    return this.supabase.client.auth.signInWithPassword({ email, password });
  }

  async signUp(email: string, password: string, firstName: string, lastName: string) {
    return this.supabase.client.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName } },
    });
  }

  async signOut() {
    return this.supabase.client.auth.signOut();
  }
}
