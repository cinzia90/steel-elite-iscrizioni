import { assertEquals, assertMatch } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { evaluateOtpAttempt, generateOtpCode, hashOtpCode, type OtpRecord } from './otp-logic.ts';

const now = new Date('2026-01-01T12:00:00Z');

function freshRecord(overrides: Partial<OtpRecord> = {}): OtpRecord {
  return {
    code_hash: 'correct-hash',
    expires_at: '2026-01-01T12:10:00Z',
    attempts: 0,
    used_at: null,
    ...overrides,
  };
}

Deno.test('evaluateOtpAttempt accepts a correct, unused, unexpired code', () => {
  const result = evaluateOtpAttempt(freshRecord(), 'correct-hash', now);
  assertEquals(result, { outcome: 'valid' });
});

Deno.test('evaluateOtpAttempt rejects a wrong code and reports attempts remaining', () => {
  const result = evaluateOtpAttempt(freshRecord({ attempts: 1 }), 'wrong-hash', now);
  assertEquals(result, { outcome: 'invalid', attemptsRemaining: 3 });
});

Deno.test('evaluateOtpAttempt blocks on the 5th wrong attempt', () => {
  const result = evaluateOtpAttempt(freshRecord({ attempts: 4 }), 'wrong-hash', now);
  assertEquals(result, { outcome: 'blocked' });
});

Deno.test('evaluateOtpAttempt blocks immediately if already at the attempt limit', () => {
  const result = evaluateOtpAttempt(freshRecord({ attempts: 5 }), 'correct-hash', now);
  assertEquals(result, { outcome: 'blocked' });
});

Deno.test('evaluateOtpAttempt rejects an expired code even if correct', () => {
  const result = evaluateOtpAttempt(freshRecord({ expires_at: '2026-01-01T11:00:00Z' }), 'correct-hash', now);
  assertEquals(result, { outcome: 'expired' });
});

Deno.test('evaluateOtpAttempt rejects a code already used', () => {
  const result = evaluateOtpAttempt(freshRecord({ used_at: '2026-01-01T11:55:00Z' }), 'correct-hash', now);
  assertEquals(result, { outcome: 'already_used' });
});

Deno.test('generateOtpCode produces a 6-digit numeric string', () => {
  for (let i = 0; i < 20; i++) {
    assertMatch(generateOtpCode(), /^\d{6}$/);
  }
});

Deno.test('hashOtpCode is deterministic for the same code and salt', async () => {
  const a = await hashOtpCode('123456', 'member-1');
  const b = await hashOtpCode('123456', 'member-1');
  assertEquals(a, b);
});

Deno.test('hashOtpCode differs across salts for the same code', async () => {
  const a = await hashOtpCode('123456', 'member-1');
  const b = await hashOtpCode('123456', 'member-2');
  assertEquals(a === b, false);
});
