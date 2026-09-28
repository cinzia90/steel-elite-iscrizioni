import { assertStringIncludes } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { buildContractLines } from './contract-text.ts';

Deno.test('buildContractLines includes the member, plan and OTP verification mention', () => {
  const lines = buildContractLines(
    { firstName: 'Mario', lastName: 'Rossi', fiscalCode: 'RSSMRA80A01H501U' },
    { name: 'Palestra Open — Mensile', priceLabel: '€ 70,00' },
    '01/01/2026 12:00',
  ).join('\n');

  assertStringIncludes(lines, 'Mario Rossi');
  assertStringIncludes(lines, 'RSSMRA80A01H501U');
  assertStringIncludes(lines, 'Palestra Open — Mensile');
  assertStringIncludes(lines, '€ 70,00');
  assertStringIncludes(lines, 'OTP');
});
