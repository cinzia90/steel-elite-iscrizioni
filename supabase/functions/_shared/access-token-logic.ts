// Pure eligibility/payload rules for the dynamic access-token QR, kept free
// of JWT-signing and Supabase specifics so they can be unit-tested alone.

export const ACCESS_TOKEN_TTL_SECONDS = 45;

export interface AccessTokenPayload {
  sub: string;
  jti: string;
  iat: number;
  exp: number;
}

export function buildAccessTokenPayload(memberId: string, jti: string, now: Date): AccessTokenPayload {
  const iat = Math.floor(now.getTime() / 1000);
  return { sub: memberId, jti, iat, exp: iat + ACCESS_TOKEN_TTL_SECONDS };
}

export interface SubscriptionForAccess {
  status: string;
  end_date: string | null;
  sessions_remaining: number | null;
}

// Un token viene emesso solo se esiste un abbonamento attivo, non scaduto
// per data e, se a consumo, con sessioni residue.
export function isSubscriptionEligibleForAccess(
  subscription: SubscriptionForAccess | null,
  now: Date,
): boolean {
  if (!subscription) {
    return false;
  }
  if (subscription.status !== 'active') {
    return false;
  }
  if (subscription.end_date && new Date(`${subscription.end_date}T23:59:59Z`).getTime() < now.getTime()) {
    return false;
  }
  if (subscription.sessions_remaining !== null && subscription.sessions_remaining <= 0) {
    return false;
  }
  return true;
}
