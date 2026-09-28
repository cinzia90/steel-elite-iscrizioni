// Testo placeholder del contratto — da sostituire con il testo definitivo
// forniro dal proprietario e revisionato da un consulente (vedi CLAUDE.md).
// Tenuto come funzione pura, priva di dipendenze da pdf-lib, per poter
// verificare con un test che i dati del cliente finiscano nel documento.

export interface ContractMember {
  firstName: string;
  lastName: string;
  fiscalCode: string;
}

export interface ContractPlanInfo {
  name: string;
  priceLabel: string;
}

export function buildContractLines(
  member: ContractMember,
  plan: ContractPlanInfo,
  acceptedAtLabel: string,
): string[] {
  return [
    'CONTRATTO DI ISCRIZIONE — STEEL ELITE',
    '(testo placeholder, da sostituire con il testo definitivo fornito dal proprietario)',
    '',
    `Cliente: ${member.firstName} ${member.lastName}`,
    `Codice fiscale: ${member.fiscalCode}`,
    `Abbonamento: ${plan.name}`,
    `Importo: ${plan.priceLabel}`,
    `Data di accettazione: ${acceptedAtLabel}`,
    '',
    'Il cliente dichiara di aver letto e accettato il regolamento della',
    "palestra e l'informativa sul trattamento dei dati personali ai sensi",
    "del Regolamento (UE) 2016/679 (GDPR), inclusi i dati relativi allo",
    "stato di salute trattati per le finalita' di cui all'art. 9 GDPR.",
    '',
    "Il presente documento e' generato elettronicamente e la sua identita'",
    "e' verificata tramite codice OTP inviato all'indirizzo email del cliente.",
  ];
}
