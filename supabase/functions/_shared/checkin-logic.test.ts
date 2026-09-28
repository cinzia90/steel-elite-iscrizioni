import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { evaluateCheckin, isCertificateValidForCheckin, type CheckinInput } from './checkin-logic.ts';

const now = new Date('2026-06-15T18:00:00Z');

function baseInput(overrides: Partial<CheckinInput> = {}): CheckinInput {
  return {
    tokenValid: true,
    jtiAlreadyUsed: false,
    subscriptionActive: true,
    certificateOk: true,
    lastGrantedAt: null,
    antiPassbackMinutes: 120,
    now,
    ...overrides,
  };
}

Deno.test('evaluateCheckin grants access when every check passes', () => {
  assertEquals(evaluateCheckin(baseInput()), { result: 'granted' });
});

Deno.test('evaluateCheckin denies an expired or forged token (old QR screenshot)', () => {
  assertEquals(evaluateCheckin(baseInput({ tokenValid: false })), {
    result: 'denied',
    reason: 'invalid_token',
  });
});

Deno.test('evaluateCheckin denies the same QR scanned twice', () => {
  assertEquals(evaluateCheckin(baseInput({ jtiAlreadyUsed: true })), {
    result: 'denied',
    reason: 'token_reused',
  });
});

Deno.test('evaluateCheckin denies an expired subscription with a specific reason', () => {
  assertEquals(evaluateCheckin(baseInput({ subscriptionActive: false })), {
    result: 'denied',
    reason: 'subscription_inactive',
  });
});

Deno.test('evaluateCheckin denies a missing/unapproved certificate', () => {
  assertEquals(evaluateCheckin(baseInput({ certificateOk: false })), {
    result: 'denied',
    reason: 'certificate_invalid',
  });
});

Deno.test('evaluateCheckin denies re-entry within the anti-passback window', () => {
  const input = baseInput({ lastGrantedAt: '2026-06-15T17:30:00Z', antiPassbackMinutes: 120 });
  assertEquals(evaluateCheckin(input), { result: 'denied', reason: 'anti_passback' });
});

Deno.test('evaluateCheckin grants re-entry once the anti-passback window has elapsed', () => {
  const input = baseInput({ lastGrantedAt: '2026-06-15T15:00:00Z', antiPassbackMinutes: 120 });
  assertEquals(evaluateCheckin(input), { result: 'granted' });
});

Deno.test('evaluateCheckin checks token validity before anything else', () => {
  const input = baseInput({ tokenValid: false, jtiAlreadyUsed: true, subscriptionActive: false });
  assertEquals(evaluateCheckin(input), { result: 'denied', reason: 'invalid_token' });
});

Deno.test('isCertificateValidForCheckin accepts a missing certificate within the grace period', () => {
  const registeredAt = new Date('2026-06-10T09:00:00Z'); // 5 giorni prima di "now"
  assertEquals(isCertificateValidForCheckin(null, true, now, registeredAt, 10), true);
});

Deno.test('isCertificateValidForCheckin rejects a missing certificate once the grace period has elapsed', () => {
  const registeredAt = new Date('2026-06-01T09:00:00Z'); // 14 giorni prima di "now"
  assertEquals(isCertificateValidForCheckin(null, true, now, registeredAt, 10), false);
});

Deno.test('isCertificateValidForCheckin rejects a missing certificate exactly at the grace deadline', () => {
  const registeredAt = new Date('2026-06-05T18:00:00Z'); // esattamente 10 giorni prima di "now"
  assertEquals(isCertificateValidForCheckin(null, true, now, registeredAt, 10), false);
});

Deno.test('isCertificateValidForCheckin rejects a pending certificate when approval is required', () => {
  assertEquals(
    isCertificateValidForCheckin({ status: 'pending', expiry_date: '2026-12-31' }, true, now, now, 10),
    false,
  );
});

Deno.test('isCertificateValidForCheckin accepts a pending certificate when approval is not required', () => {
  assertEquals(
    isCertificateValidForCheckin({ status: 'pending', expiry_date: '2026-12-31' }, false, now, now, 10),
    true,
  );
});

Deno.test('isCertificateValidForCheckin rejects an expired certificate even if approved', () => {
  assertEquals(
    isCertificateValidForCheckin({ status: 'approved', expiry_date: '2026-06-14' }, true, now, now, 10),
    false,
  );
});

Deno.test('isCertificateValidForCheckin accepts an approved, unexpired certificate', () => {
  assertEquals(
    isCertificateValidForCheckin({ status: 'approved', expiry_date: '2026-06-15' }, true, now, now, 10),
    true,
  );
});
