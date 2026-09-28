import {
  require_browser
} from "./chunk-IZLSK5IJ.js";
import {
  it
} from "./chunk-2QEQLM23.js";
import {
  RouterLink
} from "./chunk-NKGUCW2I.js";
import {
  AuthService
} from "./chunk-5JC44RXL.js";
import {
  MockBackendService,
  SupabaseService,
  environment
} from "./chunk-NZILXJS5.js";
import {
  CommonModule,
  Component,
  __async,
  __toESM,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
} from "./chunk-QKULHZCD.js";

// src/app/features/card/card.component.ts
var QRCode = __toESM(require_browser());
function CardComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t.loading);
  }
}
function CardComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t.offline);
  }
}
function CardComponent_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 5);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r0.photoUrl(), \u0275\u0275sanitizeUrl);
  }
}
function CardComponent_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t.photoMissing);
  }
}
function CardComponent_Conditional_6_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Scadenza: ", ctx_r0.endDateLabel(), "");
  }
}
function CardComponent_Conditional_6_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", ctx_r0.t.certificateReminder, " ", ctx_r0.certificateReminderDate(), ". ", ctx_r0.t.uploadCertificate, " ");
  }
}
function CardComponent_Conditional_6_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 13);
    \u0275\u0275elementStart(1, "div", 14);
    \u0275\u0275element(2, "div", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r0.qrDataUrl(), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r0.progressPercent, "%");
  }
}
function CardComponent_Conditional_6_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "p", 16);
    \u0275\u0275text(2, "Token JWT (solo demo) \u2014 incollalo su jwt.io per vedere i dati:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "textarea", 17);
    \u0275\u0275listener("click", function CardComponent_Conditional_6_Conditional_10_Template_textarea_click_3_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.target.select());
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 18);
    \u0275\u0275listener("click", function CardComponent_Conditional_6_Conditional_10_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.copyToken());
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.rawToken());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.tokenCopied() ? "Copiato!" : "Copia token");
  }
}
function CardComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CardComponent_Conditional_6_Conditional_0_Template, 1, 1, "img", 5)(1, CardComponent_Conditional_6_Conditional_1_Template, 2, 1, "a", 6);
    \u0275\u0275elementStart(2, "div", 7)(3, "span", 8);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, CardComponent_Conditional_6_Conditional_5_Template, 2, 1, "span", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, CardComponent_Conditional_6_Conditional_6_Template, 2, 3, "a", 10)(7, CardComponent_Conditional_6_Conditional_7_Template, 3, 3);
    \u0275\u0275elementStart(8, "p", 11);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, CardComponent_Conditional_6_Conditional_10_Template, 7, 2, "div", 12);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.photoUrl() ? 0 : 1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.planName());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.endDateLabel() ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.certificateReminderDate() ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.qrDataUrl() ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t.brightnessHint);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isMock && ctx_r0.rawToken() ? 10 : -1);
  }
}
function CardComponent_Conditional_7_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t.noSubscription);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t.renew);
  }
}
function CardComponent_Conditional_7_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t.pendingPayment);
  }
}
function CardComponent_Conditional_7_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t.expired);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t.renew);
  }
}
function CardComponent_Conditional_7_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 20);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t.certificateMissing);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t.uploadCertificate);
  }
}
function CardComponent_Conditional_7_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t.certificatePending);
  }
}
function CardComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275template(1, CardComponent_Conditional_7_Case_1_Template, 4, 2)(2, CardComponent_Conditional_7_Case_2_Template, 2, 1, "p", 2)(3, CardComponent_Conditional_7_Case_3_Template, 4, 2)(4, CardComponent_Conditional_7_Case_4_Template, 4, 2)(5, CardComponent_Conditional_7_Case_5_Template, 2, 1, "p", 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_1_0 = ctx_r0.statusReason()) === "no_subscription" ? 1 : tmp_1_0 === "pending_payment" ? 2 : tmp_1_0 === "expired" ? 3 : tmp_1_0 === "certificate_missing" ? 4 : tmp_1_0 === "certificate_pending" ? 5 : -1);
  }
}
var REFRESH_INTERVAL_SECONDS = 30;
function certificateGraceDeadline(memberCreatedAt, graceDays) {
  const deadline = new Date(memberCreatedAt);
  deadline.setDate(deadline.getDate() + graceDays);
  return deadline;
}
var CardComponent = class _CardComponent {
  auth;
  supabase;
  mock;
  t = it.card;
  loading = signal(true);
  offline = signal(!navigator.onLine);
  statusReason = signal("no_subscription");
  planName = signal(null);
  endDateLabel = signal(null);
  photoUrl = signal(null);
  qrDataUrl = signal(null);
  secondsRemaining = signal(REFRESH_INTERVAL_SECONDS);
  // Mostrato solo in modalità demo per poter incollare il token su jwt.io e
  // controllare i dati inseriti: mai esposto fuori da environment.mock.
  rawToken = signal(null);
  isMock = environment.mock;
  tokenCopied = signal(false);
  // Valorizzato solo durante la finestra di tolleranza per il certificato
  // medico mancante: mostra un promemoria non bloccante sopra il QR.
  certificateReminderDate = signal(null);
  refreshHandle = null;
  tickHandle = null;
  onlineListener = () => {
    this.offline.set(false);
    if (this.statusReason() === "active") {
      this.startQrCycle();
    }
  };
  offlineListener = () => {
    this.offline.set(true);
    this.stopQrCycle();
    this.qrDataUrl.set(null);
  };
  constructor(auth, supabase, mock) {
    this.auth = auth;
    this.supabase = supabase;
    this.mock = mock;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      window.addEventListener("online", this.onlineListener);
      window.addEventListener("offline", this.offlineListener);
      yield this.loadStatus();
      this.loading.set(false);
      if (this.statusReason() === "active" && !this.offline()) {
        this.startQrCycle();
      }
    });
  }
  ngOnDestroy() {
    window.removeEventListener("online", this.onlineListener);
    window.removeEventListener("offline", this.offlineListener);
    this.stopQrCycle();
  }
  loadStatus() {
    return __async(this, null, function* () {
      const userId = this.auth.user()?.id;
      if (!userId) {
        return;
      }
      const profile = this.auth.profile();
      if (environment.mock) {
        if (profile?.photo_path) {
          this.photoUrl.set(yield this.mock.getSignedUrl(profile.photo_path));
        }
        const subscription2 = this.mock.getLatestSubscription(userId);
        if (!subscription2) {
          this.statusReason.set("no_subscription");
          return;
        }
        const plan2 = this.mock.listAllPlans().find((p) => p.id === subscription2.plan_id);
        this.planName.set(plan2?.name ?? null);
        this.endDateLabel.set(subscription2.end_date);
        const isDateExpired2 = subscription2.end_date ? /* @__PURE__ */ new Date(`${subscription2.end_date}T23:59:59Z`) < /* @__PURE__ */ new Date() : false;
        const isSessionsDepleted2 = subscription2.sessions_remaining !== null && subscription2.sessions_remaining <= 0;
        if (subscription2.status === "pending") {
          this.statusReason.set("pending_payment");
          return;
        }
        if (subscription2.status !== "active" || isDateExpired2 || isSessionsDepleted2) {
          this.statusReason.set("expired");
          return;
        }
        const settings2 = this.mock.getSettings();
        const certificate2 = this.mock.getLatestCertificate(userId);
        this.applyCertificateStatus(certificate2?.status ?? null, settings2.require_approved_certificate, settings2.certificate_grace_days, profile?.created_at ?? null);
        return;
      }
      if (profile?.photo_path) {
        const { data } = yield this.supabase.client.storage.from("photos").createSignedUrl(profile.photo_path, 300);
        this.photoUrl.set(data?.signedUrl ?? null);
      }
      const { data: subscription } = yield this.supabase.client.from("subscriptions").select("status, end_date, sessions_remaining, plans ( name )").eq("member_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle();
      if (!subscription) {
        this.statusReason.set("no_subscription");
        return;
      }
      const plan = subscription.plans;
      this.planName.set(plan?.name ?? null);
      this.endDateLabel.set(subscription.end_date);
      const isDateExpired = subscription.end_date ? /* @__PURE__ */ new Date(`${subscription.end_date}T23:59:59Z`) < /* @__PURE__ */ new Date() : false;
      const isSessionsDepleted = subscription.sessions_remaining !== null && subscription.sessions_remaining <= 0;
      if (subscription.status === "pending") {
        this.statusReason.set("pending_payment");
        return;
      }
      if (subscription.status !== "active" || isDateExpired || isSessionsDepleted) {
        this.statusReason.set("expired");
        return;
      }
      const { data: settings } = yield this.supabase.client.from("settings").select("require_approved_certificate, certificate_grace_days").single();
      const { data: certificate } = yield this.supabase.client.from("medical_certificates").select("status").eq("member_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle();
      this.applyCertificateStatus(certificate?.status ?? null, settings?.require_approved_certificate ?? true, settings?.certificate_grace_days ?? 10, profile?.created_at ?? null);
    });
  }
  applyCertificateStatus(certificateStatus, requireApproved, graceDays, memberCreatedAt) {
    if (!certificateStatus) {
      const deadline = memberCreatedAt ? certificateGraceDeadline(memberCreatedAt, graceDays) : /* @__PURE__ */ new Date(0);
      if (/* @__PURE__ */ new Date() < deadline) {
        this.certificateReminderDate.set(deadline.toLocaleDateString("it-IT"));
        this.statusReason.set("active");
        return;
      }
      this.statusReason.set("certificate_missing");
      return;
    }
    if (requireApproved && certificateStatus !== "approved") {
      this.statusReason.set("certificate_pending");
      return;
    }
    this.statusReason.set("active");
  }
  startQrCycle() {
    this.stopQrCycle();
    this.refreshToken();
    this.secondsRemaining.set(REFRESH_INTERVAL_SECONDS);
    this.tickHandle = setInterval(() => {
      this.secondsRemaining.update((s) => Math.max(s - 1, 0));
    }, 1e3);
    this.refreshHandle = setInterval(() => {
      this.secondsRemaining.set(REFRESH_INTERVAL_SECONDS);
      this.refreshToken();
    }, REFRESH_INTERVAL_SECONDS * 1e3);
  }
  stopQrCycle() {
    if (this.refreshHandle) {
      clearInterval(this.refreshHandle);
      this.refreshHandle = null;
    }
    if (this.tickHandle) {
      clearInterval(this.tickHandle);
      this.tickHandle = null;
    }
  }
  refreshToken() {
    return __async(this, null, function* () {
      if (environment.mock) {
        const userId = this.auth.user()?.id;
        const token = userId ? this.mock.issueAccessToken(userId) : null;
        this.rawToken.set(token);
        this.qrDataUrl.set(token ? yield QRCode.toDataURL(token, { margin: 1, width: 280 }) : null);
        return;
      }
      const { data, error } = yield this.supabase.client.functions.invoke("issue-access-token", { body: {} });
      if (error || !data?.token) {
        this.qrDataUrl.set(null);
        return;
      }
      this.qrDataUrl.set(yield QRCode.toDataURL(data.token, { margin: 1, width: 280 }));
    });
  }
  copyToken() {
    return __async(this, null, function* () {
      const token = this.rawToken();
      if (!token) {
        return;
      }
      yield navigator.clipboard.writeText(token);
      this.tokenCopied.set(true);
      setTimeout(() => this.tokenCopied.set(false), 2e3);
    });
  }
  get progressPercent() {
    return this.secondsRemaining() / REFRESH_INTERVAL_SECONDS * 100;
  }
  static \u0275fac = function CardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CardComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(MockBackendService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CardComponent, selectors: [["app-card"]], decls: 8, vars: 2, consts: [[1, "card-page"], [1, "card"], [1, "status"], [1, "status", "error"], [1, "status-block"], ["alt", "", 1, "photo", 3, "src"], ["routerLink", "/iscriviti/profilo", 1, "photo-reminder"], [1, "member-info"], [1, "plan"], [1, "expiry"], ["routerLink", "/iscriviti/certificato", 1, "certificate-reminder"], [1, "hint"], [1, "debug-token"], ["alt", "QR di accesso", 1, "qr", 3, "src"], [1, "progress-track"], [1, "progress-fill"], [1, "debug-label"], ["readonly", "", "rows", "3", 3, "click"], ["type", "button", 3, "click"], ["routerLink", "/iscriviti"], ["routerLink", "/iscriviti/certificato"]], template: function CardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, CardComponent_Conditional_4_Template, 2, 1, "p", 2)(5, CardComponent_Conditional_5_Template, 2, 1, "p", 3)(6, CardComponent_Conditional_6_Template, 11, 7)(7, CardComponent_Conditional_7_Template, 6, 1, "div", 4);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.t.title);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 4 : ctx.offline() ? 5 : ctx.statusReason() === "active" ? 6 : 7);
    }
  }, dependencies: [CommonModule, RouterLink], styles: ["\n\n.card-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--se-space-4);\n}\n.card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 360px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-lg);\n  padding: var(--se-space-5) var(--se-space-4);\n  text-align: center;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n}\n.status[_ngcontent-%COMP%] {\n  color: var(--se-silver-dark);\n  font-size: 14px;\n}\n.status.error[_ngcontent-%COMP%] {\n  color: #e05c5c;\n}\n.status-block[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--se-space-3);\n}\n.status-block[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--se-black);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  padding: 10px 20px;\n  border-radius: var(--se-radius-sm);\n  font-weight: 700;\n  text-decoration: none;\n}\n.photo[_ngcontent-%COMP%] {\n  width: 88px;\n  height: 88px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid var(--se-gold);\n}\n.photo-reminder[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--se-gold-light);\n  background: rgba(201, 162, 39, 0.12);\n  border: 1px dashed var(--se-gold);\n  border-radius: var(--se-radius-sm);\n  padding: var(--se-space-2);\n  text-decoration: none;\n}\n.member-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.plan[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.expiry[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--se-silver-dark);\n}\n.certificate-reminder[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--se-gold-light);\n  background: rgba(201, 162, 39, 0.12);\n  border: 1px dashed var(--se-gold);\n  border-radius: var(--se-radius-sm);\n  padding: var(--se-space-2);\n  text-decoration: none;\n}\n.qr[_ngcontent-%COMP%] {\n  width: 200px;\n  height: 200px;\n  background: #fff;\n  border-radius: var(--se-radius-sm);\n  padding: 8px;\n}\n.progress-track[_ngcontent-%COMP%] {\n  width: 200px;\n  height: 4px;\n  background: rgba(255, 255, 255, 0.1);\n  border-radius: 2px;\n  overflow: hidden;\n}\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  transition: width 1s linear;\n}\n.hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--se-silver-dark);\n  margin: 0;\n}\n.debug-token[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-1);\n  padding-top: var(--se-space-3);\n  border-top: 1px dashed rgba(255, 255, 255, 0.15);\n}\n.debug-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--se-silver-dark);\n  margin: 0;\n}\n.debug-token[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  resize: none;\n  font-family: monospace;\n  font-size: 10px;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  color: var(--se-silver);\n  padding: 6px;\n  word-break: break-all;\n}\n.debug-token[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  align-self: center;\n  padding: 6px 14px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background: rgba(255, 255, 255, 0.1);\n  color: var(--se-silver);\n  font-size: 12px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=card.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardComponent, [{
    type: Component,
    args: [{ selector: "app-card", standalone: true, imports: [CommonModule, RouterLink], template: `<div class="card-page">
  <div class="card">
    <h1>{{ t.title }}</h1>

    @if (loading()) {
      <p class="status">{{ t.loading }}</p>
    } @else if (offline()) {
      <p class="status error">{{ t.offline }}</p>
    } @else if (statusReason() === 'active') {
      @if (photoUrl()) {
        <img class="photo" [src]="photoUrl()" alt="" />
      } @else {
        <a class="photo-reminder" routerLink="/iscriviti/profilo">{{ t.photoMissing }}</a>
      }

      <div class="member-info">
        <span class="plan">{{ planName() }}</span>
        @if (endDateLabel()) {
          <span class="expiry">Scadenza: {{ endDateLabel() }}</span>
        }
      </div>

      @if (certificateReminderDate()) {
        <a class="certificate-reminder" routerLink="/iscriviti/certificato">
          {{ t.certificateReminder }} {{ certificateReminderDate() }}. {{ t.uploadCertificate }}
        </a>
      }

      @if (qrDataUrl()) {
        <img class="qr" [src]="qrDataUrl()" alt="QR di accesso" />
        <div class="progress-track">
          <div class="progress-fill" [style.width.%]="progressPercent"></div>
        </div>
      }

      <p class="hint">{{ t.brightnessHint }}</p>

      @if (isMock && rawToken()) {
        <div class="debug-token">
          <p class="debug-label">Token JWT (solo demo) \u2014 incollalo su jwt.io per vedere i dati:</p>
          <textarea readonly rows="3" (click)="$any($event.target).select()">{{ rawToken() }}</textarea>
          <button type="button" (click)="copyToken()">{{ tokenCopied() ? 'Copiato!' : 'Copia token' }}</button>
        </div>
      }
    } @else {
      <div class="status-block">
        @switch (statusReason()) {
          @case ('no_subscription') {
            <p class="status">{{ t.noSubscription }}</p>
            <a routerLink="/iscriviti">{{ t.renew }}</a>
          }
          @case ('pending_payment') {
            <p class="status">{{ t.pendingPayment }}</p>
          }
          @case ('expired') {
            <p class="status">{{ t.expired }}</p>
            <a routerLink="/iscriviti">{{ t.renew }}</a>
          }
          @case ('certificate_missing') {
            <p class="status">{{ t.certificateMissing }}</p>
            <a routerLink="/iscriviti/certificato">{{ t.uploadCertificate }}</a>
          }
          @case ('certificate_pending') {
            <p class="status">{{ t.certificatePending }}</p>
          }
        }
      </div>
    }
  </div>
</div>
`, styles: ["/* src/app/features/card/card.component.scss */\n.card-page {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--se-space-4);\n}\n.card {\n  width: 100%;\n  max-width: 360px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-lg);\n  padding: var(--se-space-5) var(--se-space-4);\n  text-align: center;\n}\nh1 {\n  margin: 0;\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n}\n.status {\n  color: var(--se-silver-dark);\n  font-size: 14px;\n}\n.status.error {\n  color: #e05c5c;\n}\n.status-block {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--se-space-3);\n}\n.status-block a {\n  color: var(--se-black);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  padding: 10px 20px;\n  border-radius: var(--se-radius-sm);\n  font-weight: 700;\n  text-decoration: none;\n}\n.photo {\n  width: 88px;\n  height: 88px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid var(--se-gold);\n}\n.photo-reminder {\n  display: block;\n  font-size: 12px;\n  color: var(--se-gold-light);\n  background: rgba(201, 162, 39, 0.12);\n  border: 1px dashed var(--se-gold);\n  border-radius: var(--se-radius-sm);\n  padding: var(--se-space-2);\n  text-decoration: none;\n}\n.member-info {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.plan {\n  font-weight: 600;\n}\n.expiry {\n  font-size: 12px;\n  color: var(--se-silver-dark);\n}\n.certificate-reminder {\n  display: block;\n  font-size: 12px;\n  color: var(--se-gold-light);\n  background: rgba(201, 162, 39, 0.12);\n  border: 1px dashed var(--se-gold);\n  border-radius: var(--se-radius-sm);\n  padding: var(--se-space-2);\n  text-decoration: none;\n}\n.qr {\n  width: 200px;\n  height: 200px;\n  background: #fff;\n  border-radius: var(--se-radius-sm);\n  padding: 8px;\n}\n.progress-track {\n  width: 200px;\n  height: 4px;\n  background: rgba(255, 255, 255, 0.1);\n  border-radius: 2px;\n  overflow: hidden;\n}\n.progress-fill {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  transition: width 1s linear;\n}\n.hint {\n  font-size: 12px;\n  color: var(--se-silver-dark);\n  margin: 0;\n}\n.debug-token {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-1);\n  padding-top: var(--se-space-3);\n  border-top: 1px dashed rgba(255, 255, 255, 0.15);\n}\n.debug-label {\n  font-size: 11px;\n  color: var(--se-silver-dark);\n  margin: 0;\n}\n.debug-token textarea {\n  width: 100%;\n  resize: none;\n  font-family: monospace;\n  font-size: 10px;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  color: var(--se-silver);\n  padding: 6px;\n  word-break: break-all;\n}\n.debug-token button {\n  align-self: center;\n  padding: 6px 14px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background: rgba(255, 255, 255, 0.1);\n  color: var(--se-silver);\n  font-size: 12px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=card.component.css.map */\n"] }]
  }], () => [{ type: AuthService }, { type: SupabaseService }, { type: MockBackendService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CardComponent, { className: "CardComponent", filePath: "src/app/features/card/card.component.ts", lineNumber: 34 });
})();
export {
  CardComponent
};
//# sourceMappingURL=chunk-YXB7QE3P.js.map
