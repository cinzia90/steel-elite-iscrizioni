export type UserRole = 'member' | 'staff' | 'admin';

export interface Profile {
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
