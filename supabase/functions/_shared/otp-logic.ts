// Pure OTP verification rules, kept free of Supabase/crypto runtime specifics
// so the attempt/expiry state machine can be unit-tested in isolation.

export const MAX_OTP_ATTEMPTS = 5;
export const OTP_TTL_MINUTES = 10;

export interface OtpRecord {
  code_hash: string;
  expires_at: string; // ISO timestamp
  attempts: number;
  used_at: string | null;
}

export type OtpCheckResult =
  | { outcome: 'valid' }
  | { outcome: 'invalid'; attemptsRemaining: number }
  | { outcome: 'blocked' }
  | { outcome: 'expired' }
  | { outcome: 'already_used' };

export function evaluateOtpAttempt(record: OtpRecord, providedHash: string, now: Date): OtpCheckResult {
  if (record.used_at) {
    return { outcome: 'already_used' };
  }
  if (record.attempts >= MAX_OTP_ATTEMPTS) {
    return { outcome: 'blocked' };
  }
  if (new Date(record.expires_at).getTime() < now.getTime()) {
    return { outcome: 'expired' };
  }
  if (record.code_hash !== providedHash) {
    const attemptsAfter = record.attempts + 1;
    if (attemptsAfter >= MAX_OTP_ATTEMPTS) {
      return { outcome: 'blocked' };
    }
    return { outcome: 'invalid', attemptsRemaining: MAX_OTP_ATTEMPTS - attemptsAfter };
  }
  return { outcome: 'valid' };
}

export function generateOtpCode(): string {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return (bytes[0] % 1_000_000).toString().padStart(6, '0');
}

// Il salt (es. il member_id) evita che due utenti con lo stesso codice a 6
// cifre producano lo stesso hash in tabella.
export async function hashOtpCode(code: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${code}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
