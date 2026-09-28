import {
  it
} from "./chunk-THOMXI5H.js";
import {
  MockBackendService,
  SupabaseService,
  environment
} from "./chunk-DLQI4DZU.js";
import {
  CommonModule,
  Component,
  __async,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-QKULHZCD.js";

// src/app/features/admin/dashboard/admin-dashboard.component.ts
function AdminDashboardComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 1);
    \u0275\u0275text(1, "\u2026");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 5);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 3)(7, "span", 4);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 5);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 3)(12, "span", 4);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 5);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 3)(17, "span", 4);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 5);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 3)(22, "span", 4);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 5);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.todayAccessCount());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t.todayAccess);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.activeClientsCount());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t.activeClients);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.expiringSoonCount());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t.expiringSoon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.certificatesExpiringCount());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t.certificatesExpiring);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.certificatesPendingCount());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t.certificatesPending);
  }
}
var CERTIFICATE_EXPIRY_WINDOW_DAYS = 30;
var AdminDashboardComponent = class _AdminDashboardComponent {
  supabase;
  mock;
  t = it.admin.dashboard;
  loading = signal(true);
  todayAccessCount = signal(0);
  activeClientsCount = signal(0);
  expiringSoonCount = signal(0);
  certificatesExpiringCount = signal(0);
  certificatesPendingCount = signal(0);
  constructor(supabase, mock) {
    this.supabase = supabase;
    this.mock = mock;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      if (environment.mock) {
        const stats = this.mock.dashboardStats();
        this.todayAccessCount.set(stats.todayAccessCount);
        this.activeClientsCount.set(stats.activeClientsCount);
        this.expiringSoonCount.set(stats.expiringSoonCount);
        this.certificatesExpiringCount.set(stats.certificatesExpiringCount);
        this.certificatesPendingCount.set(stats.certificatesPendingCount);
        this.loading.set(false);
        return;
      }
      const todayStart = /* @__PURE__ */ new Date();
      todayStart.setHours(0, 0, 0, 0);
      const in7Days = /* @__PURE__ */ new Date();
      in7Days.setDate(in7Days.getDate() + 7);
      const in7DaysLabel = in7Days.toISOString().slice(0, 10);
      const inCertWindow = /* @__PURE__ */ new Date();
      inCertWindow.setDate(inCertWindow.getDate() + CERTIFICATE_EXPIRY_WINDOW_DAYS);
      const inCertWindowLabel = inCertWindow.toISOString().slice(0, 10);
      const todayLabel = todayStart.toISOString().slice(0, 10);
      const [todayAccess, activeSubs, expiringSoon, certsExpiring, certsPending] = yield Promise.all([
        this.supabase.client.from("access_logs").select("id", { count: "exact", head: true }).eq("result", "granted").gte("scanned_at", todayStart.toISOString()),
        this.supabase.client.from("subscriptions").select("member_id").eq("status", "active"),
        this.supabase.client.from("subscriptions").select("id", { count: "exact", head: true }).eq("status", "active").gte("end_date", todayLabel).lte("end_date", in7DaysLabel),
        this.supabase.client.from("medical_certificates").select("id", { count: "exact", head: true }).gte("expiry_date", todayLabel).lte("expiry_date", inCertWindowLabel),
        this.supabase.client.from("medical_certificates").select("id", { count: "exact", head: true }).eq("status", "pending")
      ]);
      this.todayAccessCount.set(todayAccess.count ?? 0);
      this.activeClientsCount.set(new Set((activeSubs.data ?? []).map((s) => s.member_id)).size);
      this.expiringSoonCount.set(expiringSoon.count ?? 0);
      this.certificatesExpiringCount.set(certsExpiring.count ?? 0);
      this.certificatesPendingCount.set(certsPending.count ?? 0);
      this.loading.set(false);
    });
  }
  static \u0275fac = function AdminDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminDashboardComponent)(\u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(MockBackendService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminDashboardComponent, selectors: [["app-admin-dashboard"]], decls: 5, vars: 2, consts: [[1, "dashboard-page"], [1, "status"], [1, "stats-grid"], [1, "stat-card"], [1, "value"], [1, "label"]], template: function AdminDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1");
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275template(3, AdminDashboardComponent_Conditional_3_Template, 2, 0, "p", 1)(4, AdminDashboardComponent_Conditional_4_Template, 26, 10, "div", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.title);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 3 : 4);
    }
  }, dependencies: [CommonModule], styles: ["\n\n.dashboard-page[_ngcontent-%COMP%] {\n  max-width: 960px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\nh1[_ngcontent-%COMP%] {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n  margin-bottom: var(--se-space-4);\n}\n.status[_ngcontent-%COMP%] {\n  color: var(--se-silver-dark);\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: var(--se-space-3);\n}\n.stat-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: var(--se-radius-md);\n}\n.value[_ngcontent-%COMP%] {\n  font-family: var(--se-font-display);\n  font-size: 32px;\n  font-weight: 800;\n  color: var(--se-gold-light);\n}\n.label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--se-silver-dark);\n}\n/*# sourceMappingURL=admin-dashboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminDashboardComponent, [{
    type: Component,
    args: [{ selector: "app-admin-dashboard", standalone: true, imports: [CommonModule], template: '<div class="dashboard-page">\n  <h1>{{ t.title }}</h1>\n\n  @if (loading()) {\n    <p class="status">\u2026</p>\n  } @else {\n    <div class="stats-grid">\n      <div class="stat-card">\n        <span class="value">{{ todayAccessCount() }}</span>\n        <span class="label">{{ t.todayAccess }}</span>\n      </div>\n      <div class="stat-card">\n        <span class="value">{{ activeClientsCount() }}</span>\n        <span class="label">{{ t.activeClients }}</span>\n      </div>\n      <div class="stat-card">\n        <span class="value">{{ expiringSoonCount() }}</span>\n        <span class="label">{{ t.expiringSoon }}</span>\n      </div>\n      <div class="stat-card">\n        <span class="value">{{ certificatesExpiringCount() }}</span>\n        <span class="label">{{ t.certificatesExpiring }}</span>\n      </div>\n      <div class="stat-card">\n        <span class="value">{{ certificatesPendingCount() }}</span>\n        <span class="label">{{ t.certificatesPending }}</span>\n      </div>\n    </div>\n  }\n</div>\n', styles: ["/* src/app/features/admin/dashboard/admin-dashboard.component.scss */\n.dashboard-page {\n  max-width: 960px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\nh1 {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n  margin-bottom: var(--se-space-4);\n}\n.status {\n  color: var(--se-silver-dark);\n}\n.stats-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: var(--se-space-3);\n}\n.stat-card {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: var(--se-radius-md);\n}\n.value {\n  font-family: var(--se-font-display);\n  font-size: 32px;\n  font-weight: 800;\n  color: var(--se-gold-light);\n}\n.label {\n  font-size: 12px;\n  color: var(--se-silver-dark);\n}\n/*# sourceMappingURL=admin-dashboard.component.css.map */\n"] }]
  }], () => [{ type: SupabaseService }, { type: MockBackendService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminDashboardComponent, { className: "AdminDashboardComponent", filePath: "src/app/features/admin/dashboard/admin-dashboard.component.ts", lineNumber: 17 });
})();
export {
  AdminDashboardComponent
};
//# sourceMappingURL=chunk-AE64I3YW.js.map
