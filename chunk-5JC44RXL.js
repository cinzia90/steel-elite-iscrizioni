import {
  MockBackendService,
  SupabaseService,
  environment
} from "./chunk-NZILXJS5.js";
import {
  Injectable,
  __async,
  computed,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-QKULHZCD.js";

// src/app/core/auth/auth.service.ts
var AuthService = class _AuthService {
  supabase;
  mock;
  sessionSignal = signal(null);
  profileSignal = signal(null);
  readySignal = signal(false);
  session = this.sessionSignal.asReadonly();
  ready = this.readySignal.asReadonly();
  user = computed(() => {
    if (environment.mock) {
      const mockUser = this.mock.sessionUser();
      return mockUser ? { id: mockUser.id, email: mockUser.email } : null;
    }
    return this.sessionSignal()?.user ?? null;
  });
  profile = computed(() => {
    if (environment.mock) {
      const mockUser = this.mock.sessionUser();
      return mockUser ? this.mock.getProfile(mockUser.id) : null;
    }
    return this.profileSignal();
  });
  role = computed(() => this.profile()?.role ?? null);
  isAuthenticated = computed(() => this.user() !== null);
  constructor(supabase, mock) {
    this.supabase = supabase;
    this.mock = mock;
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
  loadProfile(userId) {
    return __async(this, null, function* () {
      if (!userId) {
        this.profileSignal.set(null);
        return;
      }
      const { data, error } = yield this.supabase.client.from("profiles").select("*").eq("id", userId).single();
      this.profileSignal.set(error ? null : data);
    });
  }
  signInWithPassword(email, password) {
    return __async(this, null, function* () {
      if (environment.mock) {
        return this.mock.signInWithPassword(email, password);
      }
      return this.supabase.client.auth.signInWithPassword({ email, password });
    });
  }
  signUp(email, password, firstName, lastName) {
    return __async(this, null, function* () {
      if (environment.mock) {
        const result = yield this.mock.signUp(email, password, firstName, lastName);
        return { data: { session: result.session, user: null }, error: result.error };
      }
      return this.supabase.client.auth.signUp({
        email,
        password,
        options: { data: { first_name: firstName, last_name: lastName } }
      });
    });
  }
  signOut() {
    return __async(this, null, function* () {
      if (environment.mock) {
        return this.mock.signOut();
      }
      return this.supabase.client.auth.signOut();
    });
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(SupabaseService), \u0275\u0275inject(MockBackendService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: SupabaseService }, { type: MockBackendService }], null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-5JC44RXL.js.map
