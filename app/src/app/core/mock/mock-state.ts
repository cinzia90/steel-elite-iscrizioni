import { UserRole } from '../../shared/models/profile.model';
import { Plan, PlanCategory } from '../../shared/models/plan.model';

export interface MockAuthUser {
  id: string;
  email: string;
  password: string;
  disabled: boolean;
}

export interface MockProfile {
  id: string;
  role: UserRole;
  first_name: string | null;
  last_name: string | null;
  fiscal_code: string | null;
  birth_date: string | null;
  phone: string | null;
  address: string | null;
  photo_path: string | null;
  created_at: string;
}

export interface MockSubscription {
  id: string;
  member_id: string;
  plan_id: string;
  status: 'pending' | 'active' | 'expired' | 'cancelled';
  start_date: string | null;
  end_date: string | null;
  sessions_remaining: number | null;
  stripe_checkout_session_id: string | null;
  created_at: string;
}

export interface MockCertificate {
  id: string;
  member_id: string;
  file_path: string;
  expiry_date: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_by: string | null;
  reviewed_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface MockContract {
  id: string;
  member_id: string;
  subscription_id: string | null;
  pdf_path: string;
  pdf_sha256: string;
  created_at: string;
}

export interface MockOtp {
  member_id: string;
  code_hash: string;
  plainCodeForDemo: string;
  expires_at: string;
  attempts: number;
  used_at: string | null;
}

export interface MockAccessLog {
  id: string;
  member_id: string | null;
  staff_id: string;
  scanned_at: string;
  result: 'granted' | 'denied';
  reason: string | null;
  token_jti: string | null;
}

export interface MockSettings {
  gym_name: string;
  anti_passback_minutes: number;
  require_approved_certificate: boolean;
  registration_fee_cents: number;
  whatsapp_support: string | null;
}

export interface MockState {
  authUsers: MockAuthUser[];
  profiles: MockProfile[];
  plans: Plan[];
  subscriptions: MockSubscription[];
  certificates: MockCertificate[];
  contracts: MockContract[];
  otps: MockOtp[];
  accessLogs: MockAccessLog[];
  settings: MockSettings;
  currentUserId: string | null;
}

const STORAGE_KEY = 'se-mock-state-v1';

function uuid(): string {
  return crypto.randomUUID();
}

const now = () => new Date().toISOString();

function seedPlans(): Plan[] {
  const category = (c: PlanCategory) => c;
  return [
    {
      id: uuid(),
      name: 'Palestra Open — Mensile',
      description: 'Allenamento libero in sala pesi negli orari di apertura',
      category: category('open'),
      price_cents: 7000,
      duration_days: 30,
      session_count: null,
      is_recurring: true,
      active: true,
      sort_order: 1,
    },
    {
      id: uuid(),
      name: 'Palestra Open — Trimestrale',
      description: 'Risparmio € 20 rispetto a 3 mensilità',
      category: category('open'),
      price_cents: 19000,
      duration_days: 90,
      session_count: null,
      is_recurring: true,
      active: true,
      sort_order: 2,
    },
    {
      id: uuid(),
      name: 'Palestra Open — Semestrale',
      description: 'Risparmio € 70 rispetto a 6 mensilità',
      category: category('open'),
      price_cents: 35000,
      duration_days: 180,
      session_count: null,
      is_recurring: true,
      active: true,
      sort_order: 3,
    },
    {
      id: uuid(),
      name: 'Personal Training Privato — Lezione singola',
      description: '1 Trainer · 1 Cliente · 1 ora',
      category: category('pt_privato'),
      price_cents: 3000,
      duration_days: 1,
      session_count: 1,
      is_recurring: false,
      active: true,
      sort_order: 4,
    },
    {
      id: uuid(),
      name: 'Personal Training Privato — Pacchetto 10 lezioni',
      description: '€ 25 per allenamento, risparmio € 50',
      category: category('pt_privato'),
      price_cents: 25000,
      duration_days: null,
      session_count: 10,
      is_recurring: false,
      active: true,
      sort_order: 5,
    },
    {
      id: uuid(),
      name: 'Personal Training Small Group — Mensile',
      description: 'Da 3 a 5 persone, orari prestabiliti',
      category: category('pt_small_group'),
      price_cents: 17000,
      duration_days: 30,
      session_count: null,
      is_recurring: true,
      active: true,
      sort_order: 6,
    },
  ];
}

function seedAdminAndStaff(): { authUsers: MockAuthUser[]; profiles: MockProfile[] } {
  const adminId = uuid();
  const staffId = uuid();
  return {
    authUsers: [
      { id: adminId, email: 'admin@demo.steelelite.it', password: 'demo1234', disabled: false },
      { id: staffId, email: 'staff@demo.steelelite.it', password: 'demo1234', disabled: false },
    ],
    profiles: [
      {
        id: adminId,
        role: 'admin',
        first_name: 'Admin',
        last_name: 'Demo',
        fiscal_code: null,
        birth_date: null,
        phone: null,
        address: null,
        photo_path: null,
        created_at: now(),
      },
      {
        id: staffId,
        role: 'staff',
        first_name: 'Staff',
        last_name: 'Demo',
        fiscal_code: null,
        birth_date: null,
        phone: null,
        address: null,
        photo_path: null,
        created_at: now(),
      },
    ],
  };
}

export function seedState(): MockState {
  const { authUsers, profiles } = seedAdminAndStaff();
  return {
    authUsers,
    profiles,
    plans: seedPlans(),
    subscriptions: [],
    certificates: [],
    contracts: [],
    otps: [],
    accessLogs: [],
    settings: {
      gym_name: 'Steel Elite',
      anti_passback_minutes: 120,
      require_approved_certificate: true,
      registration_fee_cents: 3000,
      whatsapp_support: null,
    },
    currentUserId: null,
  };
}

export function loadState(): MockState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return seedState();
    }
    const parsed = JSON.parse(raw) as MockState;
    if (!parsed.plans?.length) {
      return seedState();
    }
    return parsed;
  } catch {
    return seedState();
  }
}

export function saveState(state: MockState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage piena o non disponibile: la demo continua solo in memoria.
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignorabile in demo.
  }
}

export { uuid, now };
