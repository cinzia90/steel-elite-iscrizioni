import { Injectable, computed, signal } from '@angular/core';
import type { Session, User } from '@supabase/supabase-js';
import { SupabaseService } from '../services/supabase.service';
import { Profile } from '../../shared/models/profile.model';
import { MockBackendService } from '../mock/mock-backend.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sessionSignal = signal<Session | null>(null);
  private readonly profileSignal = signal<Profile | null>(null);
  private readonly readySignal = signal(false);

  readonly session = this.sessionSignal.asReadonly();
  readonly ready = this.readySignal.asReadonly();

  readonly user = computed<User | null>(() => {
    if (environment.mock) {
      const mockUser = this.mock.sessionUser();
      return mockUser ? ({ id: mockUser.id, email: mockUser.email } as User) : null;
    }
    return this.sessionSignal()?.user ?? null;
  });

  readonly profile = computed<Profile | null>(() => {
    if (environment.mock) {
      const mockUser = this.mock.sessionUser();
      return mockUser ? this.mock.getProfile(mockUser.id) : null;
    }
    return this.profileSignal();
  });

  readonly role = computed(() => this.profile()?.role ?? null);
  readonly isAuthenticated = computed(() => this.user() !== null);

  constructor(private readonly supabase: SupabaseService, private readonly mock: MockBackendService) {
    if (environment.mock) {
      this.readySignal.set(true);
      return;
    }

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
    if (environment.mock) {
      return this.mock.signInWithPassword(email, password);
    }
    return this.supabase.client.auth.signInWithPassword({ email, password });
  }

  async signUp(email: string, password: string, firstName: string, lastName: string) {
    if (environment.mock) {
      const result = await this.mock.signUp(email, password, firstName, lastName);
      return { data: { session: result.session, user: null }, error: result.error };
    }
    return this.supabase.client.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName } },
    });
  }

  async signOut() {
    if (environment.mock) {
      return this.mock.signOut();
    }
    return this.supabase.client.auth.signOut();
  }
}
