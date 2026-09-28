// Copia per la modalità demo (browser) di supabase/functions/_shared/checkin-logic.ts.
// Stesso codice, tenerla allineata manualmente all'originale.
//
// Pure check-in decision rules. verify-checkin resolves each input flag
// (token signature/expiry, jti reuse, subscription, certificate, last
// granted access) against the DB/JWT, then hands them to this function so
// the ordered decision itself is unit-testable without mocking Supabase.

export interface CertificateForCheckin {
  status: string;
  expiry_date: string; // ISO date
}

export function isCertificateValidForCheckin(
  certificate: CertificateForCheckin | null,
  requireApproved: boolean,
  now: Date,
): boolean {
  if (!certificate) {
    return false;
  }
  if (requireApproved && certificate.status !== 'approved') {
    return false;
  }
  if (new Date(`${certificate.expiry_date}T23:59:59Z`).getTime() < now.getTime()) {
    return false;
  }
  return true;
}

export interface CheckinInput {
  tokenValid: boolean;
  jtiAlreadyUsed: boolean;
  subscriptionActive: boolean;
  certificateOk: boolean;
  lastGrantedAt: string | null;
  antiPassbackMinutes: number;
  now: Date;
}

export type CheckinDenyReason =
  | 'invalid_token'
  | 'token_reused'
  | 'subscription_inactive'
  | 'certificate_invalid'
  | 'anti_passback';

export type CheckinResult = { result: 'granted' } | { result: 'denied'; reason: CheckinDenyReason };

// Ordine dei controlli fisso, come da CLAUDE.md: firma/scadenza, jti mai
// usato, abbonamento attivo, certificato valido, anti-passback.
export function evaluateCheckin(input: CheckinInput): CheckinResult {
  if (!input.tokenValid) {
    return { result: 'denied', reason: 'invalid_token' };
  }
  if (input.jtiAlreadyUsed) {
    return { result: 'denied', reason: 'token_reused' };
  }
  if (!input.subscriptionActive) {
    return { result: 'denied', reason: 'subscription_inactive' };
  }
  if (!input.certificateOk) {
    return { result: 'denied', reason: 'certificate_invalid' };
  }
  if (input.lastGrantedAt) {
    const minutesSinceLastGrant = (input.now.getTime() - new Date(input.lastGrantedAt).getTime()) / 60_000;
    if (minutesSinceLastGrant < input.antiPassbackMinutes) {
      return { result: 'denied', reason: 'anti_passback' };
    }
  }
  return { result: 'granted' };
}
