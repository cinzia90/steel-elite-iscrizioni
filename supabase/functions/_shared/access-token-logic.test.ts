import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import {
  ACCESS_TOKEN_TTL_SECONDS,
  buildAccessTokenPayload,
  isSubscriptionEligibleForAccess,
  type SubscriptionForAccess,
} from './access-token-logic.ts';

const now = new Date('2026-06-15T10:00:00Z');

Deno.test('buildAccessTokenPayload sets exp exactly 45 seconds after iat', () => {
  const payload = buildAccessTokenPayload('member-1', 'jti-1', now);
  assertEquals(payload.sub, 'member-1');
  assertEquals(payload.jti, 'jti-1');
  assertEquals(payload.exp - payload.iat, ACCESS_TOKEN_TTL_SECONDS);
});

Deno.test('isSubscriptionEligibleForAccess is false when there is no subscription', () => {
  assertEquals(isSubscriptionEligibleForAccess(null, now), false);
});

Deno.test('isSubscriptionEligibleForAccess is false when status is not active', () => {
  const sub: SubscriptionForAccess = { status: 'pending', end_date: '2026-12-31', sessions_remaining: null };
  assertEquals(isSubscriptionEligibleForAccess(sub, now), false);
});

Deno.test('isSubscriptionEligibleForAccess is false when end_date is in the past', () => {
  const sub: SubscriptionForAccess = { status: 'active', end_date: '2026-06-14', sessions_remaining: null };
  assertEquals(isSubscriptionEligibleForAccess(sub, now), false);
});

Deno.test('isSubscriptionEligibleForAccess is true for an active time-based subscription still valid', () => {
  const sub: SubscriptionForAccess = { status: 'active', end_date: '2026-06-15', sessions_remaining: null };
  assertEquals(isSubscriptionEligibleForAccess(sub, now), true);
});

Deno.test('isSubscriptionEligibleForAccess is false for a consumption plan with no sessions left', () => {
  const sub: SubscriptionForAccess = { status: 'active', end_date: null, sessions_remaining: 0 };
  assertEquals(isSubscriptionEligibleForAccess(sub, now), false);
});

Deno.test('isSubscriptionEligibleForAccess is true for a consumption plan with sessions left', () => {
  const sub: SubscriptionForAccess = { status: 'active', end_date: null, sessions_remaining: 3 };
  assertEquals(isSubscriptionEligibleForAccess(sub, now), true);
});
