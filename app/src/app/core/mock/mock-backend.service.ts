import { Injectable, signal } from '@angular/core';
import {
  MockAccessLog,
  MockCertificate,
  MockContract,
  MockOtp,
  MockState,
  MockSubscription,
  clearState,
  loadState,
  now,
  saveState,
  uuid,
} from './mock-state';
import { Plan } from '../../shared/models/plan.model';
import { Profile, UserRole } from '../../shared/models/profile.model';
import {
  computeSubscriptionPeriod,
  type PlanForBilling,
} from './logic/subscription-logic';
import { evaluateOtpAttempt, generateOtpCode, hashOtpCode, type OtpRecord } from './logic/otp-logic';
import { buildAccessTokenPayload, isSubscriptionEligibleForAccess } from './logic/access-token-logic';
import { evaluateCheckin, isCertificateValidForCheckin } from './logic/checkin-logic';

export interface MockSessionUser {
  id: string;
  email: string;
}

// Il token QR della modalità demo ha la stessa forma a 3 segmenti di un JWT
// reale (header.payload.firma) così, per debug, si può incollare su
// jwt.io e leggerne header/payload — la "firma" non è verificabile perché
// non è un vero HMAC, ma qui non serve: la verifica reale avviene solo
// lato server nell'ambiente non-demo.
function base64url(input: string): string {
  return btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlDecode(input: string): string {
  const padLength = (4 - (input.length % 4)) % 4;
  const padded = input.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(padLength);
  return atob(padded);
}

function encodeMockJwt(payload: unknown): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const headerPart = base64url(JSON.stringify(header));
  const payloadPart = base64url(JSON.stringify(payload));
  const signaturePart = base64url('demo-mode-not-a-real-signature');
  return `${headerPart}.${payloadPart}.${signaturePart}`;
}

function decodeMockJwtPayload(token: string): unknown {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('invalid token shape');
  }
  return JSON.parse(base64urlDecode(parts[1]));
}

interface AuthResult {
  error: { message: string } | null;
  session: boolean;
}

// Backend finto per la modalità demo (environment.mock = true): riproduce,
// in memoria + localStorage, lo stesso comportamento delle Edge Function e
// delle tabelle reali, così l'intero giro (iscrizione, pagamento, tessera,
// check-in, admin) si può mostrare a un cliente senza Supabase/Stripe reali.
@Injectable({ providedIn: 'root' })
export class MockBackendService {
  private state: MockState = loadState();

  readonly sessionUser = signal<MockSessionUser | null>(this.computeSessionUser());

  private persist(): void {
    saveState(this.state);
  }

  private computeSessionUser(): MockSessionUser | null {
    const user = this.state.authUsers.find((u) => u.id === this.state.currentUserId);
    return user ? { id: user.id, email: user.email } : null;
  }

  resetDemo(): void {
    clearState();
    this.state = loadState();
    this.sessionUser.set(this.computeSessionUser());
  }

  // ===== Auth =====

  async signUp(email: string, password: string, firstName: string, lastName: string): Promise<AuthResult> {
    if (this.state.authUsers.some((u) => u.email === email)) {
      return { error: { message: 'Email già registrata' }, session: false };
    }

    const id = uuid();
    this.state.authUsers.push({ id, email, password, disabled: false });
    this.state.profiles.push({
      id,
      role: 'member',
      first_name: firstName,
      last_name: lastName,
      fiscal_code: null,
      birth_date: null,
      phone: null,
      address: null,
      photo_path: null,
      created_at: now(),
    });
    this.state.currentUserId = id;
    this.persist();
    this.sessionUser.set(this.computeSessionUser());
    return { error: null, session: true };
  }

  async signInWithPassword(email: string, password: string): Promise<AuthResult> {
    const user = this.state.authUsers.find((u) => u.email === email && u.password === password);
    if (!user || user.disabled) {
      return { error: { message: 'Credenziali non valide' }, session: false };
    }
    this.state.currentUserId = user.id;
    this.persist();
    this.sessionUser.set(this.computeSessionUser());
    return { error: null, session: true };
  }

  async signOut(): Promise<void> {
    this.state.currentUserId = null;
    this.persist();
    this.sessionUser.set(null);
  }

  getProfile(userId: string): Profile | null {
    return (this.state.profiles.find((p) => p.id === userId) as Profile) ?? null;
  }

  // ===== Storage (foto, certificati, "PDF" contratto) =====

  private readonly blobs = new Map<string, File>();

  async uploadFile(path: string, file: File): Promise<void> {
    this.blobs.set(path, file);
  }

  async getSignedUrl(path: string): Promise<string | null> {
    const file = this.blobs.get(path);
    return file ? URL.createObjectURL(file) : null;
  }

  // ===== Profili =====

  async updateProfile(userId: string, partial: Partial<Profile>): Promise<void> {
    const profile = this.state.profiles.find((p) => p.id === userId);
    if (profile) {
      Object.assign(profile, partial);
      this.persist();
    }
  }

  // L'admin può rimuovere una foto caricata per errore: il member la vedrà
  // sparire e potrà ricaricarla da /iscriviti/profilo.
  deletePhoto(memberId: string): void {
    const profile = this.state.profiles.find((p) => p.id === memberId);
    if (profile) {
      profile.photo_path = null;
      this.persist();
    }
  }

  searchMembers(query: string): Profile[] {
    const q = query.trim().toLowerCase();
    return this.state.profiles.filter(
      (p) =>
        p.role === 'member' &&
        (q.length < 2 ||
          (p.first_name ?? '').toLowerCase().includes(q) ||
          (p.last_name ?? '').toLowerCase().includes(q)),
    ) as Profile[];
  }

  // ===== Piani =====

  listActivePlans(): Plan[] {
    return this.state.plans.filter((p) => p.active).sort((a, b) => a.sort_order - b.sort_order);
  }

  listAllPlans(): Plan[] {
    return [...this.state.plans].sort((a, b) => a.sort_order - b.sort_order);
  }

  savePlan(id: string | null, payload: Omit<Plan, 'id' | 'sort_order'>): void {
    if (id) {
      const plan = this.state.plans.find((p) => p.id === id);
      if (plan) {
        Object.assign(plan, payload);
      }
    } else {
      this.state.plans.push({ ...payload, id: uuid(), sort_order: this.state.plans.length + 1 });
    }
    this.persist();
  }

  togglePlanActive(id: string): void {
    const plan = this.state.plans.find((p) => p.id === id);
    if (plan) {
      plan.active = !plan.active;
      this.persist();
    }
  }

  // ===== Certificato medico =====

  async submitCertificate(memberId: string, file: File, expiryDate: string): Promise<void> {
    const path = `${memberId}/certificato-${Date.now()}.${file.name.split('.').pop() ?? 'pdf'}`;
    await this.uploadFile(path, file);
    this.state.certificates.push({
      id: uuid(),
      member_id: memberId,
      file_path: path,
      expiry_date: expiryDate,
      status: 'pending',
      reviewed_by: null,
      reviewed_at: null,
      notes: null,
      created_at: now(),
    });
    this.persist();
  }

  getLatestCertificate(memberId: string): MockCertificate | null {
    return (
      this.state.certificates
        .filter((c) => c.member_id === memberId)
        .sort((a, b) => b.created_at.localeCompare(a.created_at))[0] ?? null
    );
  }

  listPendingCertificates(): MockCertificate[] {
    return this.state.certificates.filter((c) => c.status === 'pending');
  }

  decideCertificate(certId: string, status: 'approved' | 'rejected', note: string | null, reviewerId: string): void {
    const cert = this.state.certificates.find((c) => c.id === certId);
    if (cert) {
      cert.status = status;
      cert.notes = note;
      cert.reviewed_by = reviewerId;
      cert.reviewed_at = now();
      this.persist();
    }
  }

  // ===== Contratto + OTP =====

  async requestOtp(memberId: string): Promise<{ plainCode: string }> {
    const code = generateOtpCode();
    const codeHash = await hashOtpCode(code, memberId);
    this.state.otps = this.state.otps.filter((o) => o.member_id !== memberId || o.used_at !== null);
    this.state.otps.push({
      member_id: memberId,
      code_hash: codeHash,
      plainCodeForDemo: code,
      expires_at: new Date(Date.now() + 10 * 60_000).toISOString(),
      attempts: 0,
      used_at: null,
    });
    this.persist();
    return { plainCode: code };
  }

  async verifyOtp(
    memberId: string,
    code: string,
  ): Promise<{ verified: boolean; attemptsRemaining?: number; expired?: boolean; blocked?: boolean }> {
    const record = [...this.state.otps]
      .reverse()
      .find((o) => o.member_id === memberId) as (MockOtp & OtpRecord) | undefined;

    if (!record) {
      return { verified: false };
    }

    const providedHash = await hashOtpCode(code, memberId);
    const result = evaluateOtpAttempt(record, providedHash, new Date());

    if (result.outcome === 'valid') {
      record.used_at = now();
      this.persist();
      return { verified: true };
    }
    if (result.outcome === 'invalid') {
      record.attempts += 1;
      this.persist();
      return { verified: false, attemptsRemaining: result.attemptsRemaining };
    }
    if (result.outcome === 'blocked') {
      record.attempts = Math.max(record.attempts + 1, 5);
      this.persist();
      return { verified: false, blocked: true };
    }
    if (result.outcome === 'expired') {
      return { verified: false, expired: true };
    }
    return { verified: false };
  }

  async generateContract(memberId: string): Promise<{ contractId: string; pdfSha256: string }> {
    const text = `Contratto di iscrizione Steel Elite (demo) — cliente ${memberId} — ${now()}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const digest = await crypto.subtle.digest('SHA-256', await blob.arrayBuffer());
    const pdfSha256 = Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    const path = `${memberId}/contratto-${Date.now()}.txt`;
    await this.uploadFile(path, new File([blob], 'contratto.txt'));

    const contract: MockContract = {
      id: uuid(),
      member_id: memberId,
      subscription_id: null,
      pdf_path: path,
      pdf_sha256: pdfSha256,
      created_at: now(),
    };
    this.state.contracts.push(contract);
    this.persist();
    return { contractId: contract.id, pdfSha256 };
  }

  listContracts(): MockContract[] {
    return [...this.state.contracts].sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  listContractsForMember(memberId: string): MockContract[] {
    return this.state.contracts.filter((c) => c.member_id === memberId);
  }

  // ===== Pagamento (Stripe simulato: successo immediato) =====

  async startCheckout(memberId: string, planId: string): Promise<{ sessionId: string }> {
    const plan = this.state.plans.find((p) => p.id === planId);
    if (!plan) {
      throw new Error('plan_not_found');
    }

    const sessionId = `mock_session_${uuid()}`;
    const planForBilling: PlanForBilling = {
      id: plan.id,
      name: plan.name,
      price_cents: plan.price_cents,
      duration_days: plan.duration_days,
      session_count: plan.session_count,
      is_recurring: plan.is_recurring,
    };
    const period = computeSubscriptionPeriod(planForBilling, new Date());

    const subscription: MockSubscription = {
      id: uuid(),
      member_id: memberId,
      plan_id: planId,
      status: 'active',
      start_date: period.start_date,
      end_date: period.end_date,
      sessions_remaining: period.sessions_remaining,
      stripe_checkout_session_id: sessionId,
      created_at: now(),
    };
    this.state.subscriptions.push(subscription);

    const pendingContract = [...this.state.contracts]
      .reverse()
      .find((c) => c.member_id === memberId && c.subscription_id === null);
    if (pendingContract) {
      pendingContract.subscription_id = subscription.id;
    }

    this.persist();
    return { sessionId };
  }

  getSubscriptionStatusBySessionId(sessionId: string): MockSubscription | null {
    return this.state.subscriptions.find((s) => s.stripe_checkout_session_id === sessionId) ?? null;
  }

  getLatestSubscription(memberId: string): MockSubscription | null {
    return (
      this.state.subscriptions
        .filter((s) => s.member_id === memberId)
        .sort((a, b) => b.created_at.localeCompare(a.created_at))[0] ?? null
    );
  }

  listSubscriptionsForMember(memberId: string): (MockSubscription & { planName: string })[] {
    return this.state.subscriptions
      .filter((s) => s.member_id === memberId)
      .map((s) => ({ ...s, planName: this.state.plans.find((p) => p.id === s.plan_id)?.name ?? '—' }))
      .sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  // ===== Tessera QR =====

  issueAccessToken(memberId: string): string | null {
    const subscription = this.getLatestSubscription(memberId);
    if (
      !isSubscriptionEligibleForAccess(
        subscription
          ? {
              status: subscription.status,
              end_date: subscription.end_date,
              sessions_remaining: subscription.sessions_remaining,
            }
          : null,
        new Date(),
      )
    ) {
      return null;
    }

    const payload = buildAccessTokenPayload(memberId, uuid(), new Date());
    return encodeMockJwt(payload);
  }

  // ===== Check-in staff =====

  private buildMemberSnapshot(memberId: string) {
    const profile = this.state.profiles.find((p) => p.id === memberId);
    const subscription = this.getLatestSubscription(memberId);
    const plan = subscription ? this.state.plans.find((p) => p.id === subscription.plan_id) : null;
    const certificate = this.getLatestCertificate(memberId);

    return {
      memberName: profile ? `${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim() : '—',
      photoUrl: null as string | null,
      planName: plan?.name ?? null,
      endDate: subscription?.end_date ?? null,
      certificateStatus: certificate?.status ?? 'missing',
      memberCreatedAt: profile ? new Date(profile.created_at) : new Date(0),
      subscription,
      certificate,
    };
  }

  async verifyCheckinQr(staffId: string, token: string) {
    let payload: { sub: string; jti: string; exp: number } | null = null;
    try {
      payload = decodeMockJwtPayload(token) as { sub: string; jti: string; exp: number };
    } catch {
      payload = null;
    }

    if (!payload?.sub || !payload.jti) {
      this.logAccess(null, staffId, 'denied', 'invalid_token', null);
      return {
        result: 'denied' as const,
        reason: 'invalid_token',
        memberName: '',
        photoUrl: null,
        planName: null,
        endDate: null,
        certificateStatus: 'missing',
      };
    }

    const notExpired = Math.floor(Date.now() / 1000) < payload.exp;
    const jtiAlreadyUsed = this.state.accessLogs.some((l) => l.token_jti === payload!.jti);
    const snapshot = this.buildMemberSnapshot(payload.sub);

    const subscriptionActive = isSubscriptionEligibleForAccess(
      snapshot.subscription
        ? {
            status: snapshot.subscription.status,
            end_date: snapshot.subscription.end_date,
            sessions_remaining: snapshot.subscription.sessions_remaining,
          }
        : null,
      new Date(),
    );
    const certificateOk = isCertificateValidForCheckin(
      snapshot.certificate
        ? { status: snapshot.certificate.status, expiry_date: snapshot.certificate.expiry_date }
        : null,
      this.state.settings.require_approved_certificate,
      new Date(),
      snapshot.memberCreatedAt,
      this.state.settings.certificate_grace_days,
    );

    const lastGranted = [...this.state.accessLogs]
      .reverse()
      .find((l) => l.member_id === payload!.sub && l.result === 'granted');

    const decision = evaluateCheckin({
      tokenValid: notExpired,
      jtiAlreadyUsed,
      subscriptionActive,
      certificateOk,
      lastGrantedAt: lastGranted?.scanned_at ?? null,
      antiPassbackMinutes: this.state.settings.anti_passback_minutes,
      now: new Date(),
    });

    const reason = decision.result === 'denied' ? decision.reason : null;
    this.logAccess(payload.sub, staffId, decision.result, reason, jtiAlreadyUsed ? null : payload.jti);

    return {
      result: decision.result,
      reason: reason ?? undefined,
      memberName: snapshot.memberName,
      photoUrl: snapshot.photoUrl,
      planName: snapshot.planName,
      endDate: snapshot.endDate,
      certificateStatus: snapshot.certificateStatus,
    };
  }

  async verifyCheckinManual(staffId: string, memberId: string) {
    const snapshot = this.buildMemberSnapshot(memberId);
    this.logAccess(memberId, staffId, 'granted', 'manual', null);
    return {
      result: 'granted' as const,
      memberName: snapshot.memberName,
      photoUrl: snapshot.photoUrl,
      planName: snapshot.planName,
      endDate: snapshot.endDate,
      certificateStatus: snapshot.certificateStatus,
    };
  }

  private logAccess(
    memberId: string | null,
    staffId: string,
    result: 'granted' | 'denied',
    reason: string | null,
    tokenJti: string | null,
  ): void {
    const log: MockAccessLog = {
      id: uuid(),
      member_id: memberId,
      staff_id: staffId,
      scanned_at: now(),
      result,
      reason,
      token_jti: tokenJti,
    };
    this.state.accessLogs.push(log);
    this.persist();
  }

  // ===== Admin =====

  dashboardStats() {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const in7 = new Date();
    in7.setDate(in7.getDate() + 7);
    const inCertWindow = new Date();
    inCertWindow.setDate(inCertWindow.getDate() + 30);

    return {
      todayAccessCount: this.state.accessLogs.filter(
        (l) => l.result === 'granted' && new Date(l.scanned_at) >= todayStart,
      ).length,
      activeClientsCount: new Set(
        this.state.subscriptions.filter((s) => s.status === 'active').map((s) => s.member_id),
      ).size,
      expiringSoonCount: this.state.subscriptions.filter(
        (s) =>
          s.status === 'active' &&
          s.end_date &&
          new Date(s.end_date) >= todayStart &&
          new Date(s.end_date) <= in7,
      ).length,
      certificatesExpiringCount: this.state.certificates.filter(
        (c) => new Date(c.expiry_date) >= todayStart && new Date(c.expiry_date) <= inCertWindow,
      ).length,
      certificatesPendingCount: this.state.certificates.filter((c) => c.status === 'pending').length,
    };
  }

  listClients(query: string): Profile[] {
    return this.searchMembers(query);
  }

  getClientDetail(memberId: string) {
    return {
      profile: this.getProfile(memberId),
      subscriptions: this.listSubscriptionsForMember(memberId),
      contracts: this.listContractsForMember(memberId),
      certificate: this.getLatestCertificate(memberId),
      accessLogs: this.state.accessLogs
        .filter((l) => l.member_id === memberId)
        .sort((a, b) => b.scanned_at.localeCompare(a.scanned_at))
        .slice(0, 20),
    };
  }

  listAccessLogs(filters: { dateFrom?: string; dateTo?: string; result?: string }) {
    return this.state.accessLogs
      .filter((l) => (!filters.dateFrom ? true : l.scanned_at >= filters.dateFrom))
      .filter((l) => (!filters.dateTo ? true : l.scanned_at <= `${filters.dateTo}T23:59:59`))
      .filter((l) => (!filters.result ? true : l.result === filters.result))
      .sort((a, b) => b.scanned_at.localeCompare(a.scanned_at))
      .map((l) => ({
        ...l,
        memberName: (() => {
          const p = this.state.profiles.find((pr) => pr.id === l.member_id);
          return p ? `${p.first_name ?? ''} ${p.last_name ?? ''}`.trim() : '—';
        })(),
      }));
  }

  listStaff() {
    return this.state.profiles
      .filter((p) => p.role === 'staff')
      .map((p) => {
        const auth = this.state.authUsers.find((u) => u.id === p.id);
        return {
          id: p.id,
          firstName: p.first_name,
          lastName: p.last_name,
          email: auth?.email ?? '',
          disabled: auth?.disabled ?? false,
        };
      });
  }

  inviteStaff(email: string, firstName: string, lastName: string): void {
    const id = uuid();
    this.state.authUsers.push({ id, email, password: 'demo1234', disabled: false });
    this.state.profiles.push({
      id,
      role: 'staff' as UserRole,
      first_name: firstName,
      last_name: lastName,
      fiscal_code: null,
      birth_date: null,
      phone: null,
      address: null,
      photo_path: null,
      created_at: now(),
    });
    this.persist();
  }

  toggleStaffDisabled(userId: string): void {
    const user = this.state.authUsers.find((u) => u.id === userId);
    if (user) {
      user.disabled = !user.disabled;
      this.persist();
    }
  }

  getSettings() {
    return { ...this.state.settings };
  }

  saveSettings(partial: Partial<MockState['settings']>): void {
    Object.assign(this.state.settings, partial);
    this.persist();
  }
}
