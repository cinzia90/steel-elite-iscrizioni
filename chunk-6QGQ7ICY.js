import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-XXIBBBHG.js";
import {
  it
} from "./chunk-2QEQLM23.js";
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
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-QKULHZCD.js";

// src/app/features/admin/certificates/admin-certificates.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AdminCertificatesComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function AdminCertificatesComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t.empty);
  }
}
function AdminCertificatesComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "span", 6);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 7);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 8);
    \u0275\u0275listener("click", function AdminCertificatesComponent_For_7_Template_button_click_6_listener() {
      const cert_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.view(cert_r3));
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 9);
    \u0275\u0275listener("ngModelChange", function AdminCertificatesComponent_For_7_Template_input_ngModelChange_8_listener($event) {
      const cert_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setNote(cert_r3.id, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 10)(10, "button", 11);
    \u0275\u0275listener("click", function AdminCertificatesComponent_For_7_Template_button_click_10_listener() {
      const cert_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.decide(cert_r3, "approved"));
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 12);
    \u0275\u0275listener("click", function AdminCertificatesComponent_For_7_Template_button_click_12_listener() {
      const cert_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.decide(cert_r3, "rejected"));
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const cert_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.memberName(cert_r3));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Scadenza: ", cert_r3.expiry_date, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t.view);
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r0.t.notePlaceholder)("ngModel", ctx_r0.getNote(cert_r3.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t.approve);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t.reject);
  }
}
var AdminCertificatesComponent = class _AdminCertificatesComponent {
  supabase;
  auth;
  mock;
  t = it.admin.certificates;
  certificates = signal([]);
  loading = signal(true);
  errorMessage = signal(null);
  notes = /* @__PURE__ */ new Map();
  constructor(supabase, auth, mock) {
    this.supabase = supabase;
    this.auth = auth;
    this.mock = mock;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.load();
    });
  }
  load() {
    return __async(this, null, function* () {
      this.loading.set(true);
      if (environment.mock) {
        const pending = this.mock.listPendingCertificates();
        this.certificates.set(pending.map((c) => ({
          id: c.id,
          file_path: c.file_path,
          expiry_date: c.expiry_date,
          profiles: this.mock.getProfile(c.member_id)
        })));
        this.loading.set(false);
        return;
      }
      const { data } = yield this.supabase.client.from("medical_certificates").select("id, file_path, expiry_date, profiles ( first_name, last_name )").eq("status", "pending").order("created_at", { ascending: true });
      this.certificates.set(data ?? []);
      this.loading.set(false);
    });
  }
  getNote(certId) {
    return this.notes.get(certId) ?? "";
  }
  setNote(certId, value) {
    this.notes.set(certId, value);
  }
  memberName(cert) {
    const profile = cert.profiles;
    return profile ? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim() : "\u2014";
  }
  view(cert) {
    return __async(this, null, function* () {
      const url = environment.mock ? yield this.mock.getSignedUrl(cert.file_path) : (yield this.supabase.client.storage.from("certificates").createSignedUrl(cert.file_path, 60)).data?.signedUrl;
      if (url) {
        window.open(url, "_blank");
      }
    });
  }
  decide(cert, status) {
    return __async(this, null, function* () {
      this.errorMessage.set(null);
      const userId = this.auth.user()?.id;
      if (environment.mock) {
        this.mock.decideCertificate(cert.id, status, this.notes.get(cert.id) ?? null, userId ?? "");
        yield this.load();
        return;
      }
      const { error } = yield this.supabase.client.from("medical_certificates").update({
        status,
        reviewed_by: userId,
        reviewed_at: (/* @__PURE__ */ new Date()).toISOString(),
        notes: this.notes.get(cert.id) ?? null
      }).eq("id", cert.id);
      if (error) {
        this.errorMessage.set(this.t.errorGeneric);
        return;
      }
      yield this.load();
    });
  }
  static \u0275fac = function AdminCertificatesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminCertificatesComponent)(\u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MockBackendService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminCertificatesComponent, selectors: [["app-admin-certificates"]], decls: 8, vars: 3, consts: [[1, "certificates-page"], [1, "status", "error"], [1, "status"], [1, "certificates-list"], [1, "certificate-card"], [1, "info"], [1, "member"], [1, "expiry"], [3, "click"], ["type", "text", 3, "ngModelChange", "placeholder", "ngModel"], [1, "actions"], [1, "approve", 3, "click"], [1, "reject", 3, "click"]], template: function AdminCertificatesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1");
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275template(3, AdminCertificatesComponent_Conditional_3_Template, 2, 1, "p", 1)(4, AdminCertificatesComponent_Conditional_4_Template, 2, 1, "p", 2);
      \u0275\u0275elementStart(5, "div", 3);
      \u0275\u0275repeaterCreate(6, AdminCertificatesComponent_For_7_Template, 14, 7, "div", 4, _forTrack0);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.title);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && ctx.certificates().length === 0 ? 4 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.certificates());
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.certificates-page[_ngcontent-%COMP%] {\n  max-width: 640px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\nh1[_ngcontent-%COMP%] {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n  margin-bottom: var(--se-space-3);\n}\n.status[_ngcontent-%COMP%] {\n  color: var(--se-silver-dark);\n}\n.status.error[_ngcontent-%COMP%] {\n  color: #e05c5c;\n}\n.certificates-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-3);\n}\n.certificate-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-2);\n  padding: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: var(--se-radius-md);\n}\n.info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.member[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.expiry[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--se-silver-dark);\n}\ninput[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 8px 10px;\n  color: var(--se-silver);\n  font-size: 13px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--se-space-2);\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  font-weight: 700;\n  cursor: pointer;\n  background: rgba(255, 255, 255, 0.08);\n  color: var(--se-silver);\n}\n.approve[_ngcontent-%COMP%] {\n  background: #4caf6f;\n  color: #05130a;\n}\n.reject[_ngcontent-%COMP%] {\n  background: #e05c5c;\n  color: #1a0505;\n}\n/*# sourceMappingURL=admin-certificates.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminCertificatesComponent, [{
    type: Component,
    args: [{ selector: "app-admin-certificates", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="certificates-page">
  <h1>{{ t.title }}</h1>

  @if (errorMessage()) {
    <p class="status error">{{ errorMessage() }}</p>
  }

  @if (!loading() && certificates().length === 0) {
    <p class="status">{{ t.empty }}</p>
  }

  <div class="certificates-list">
    @for (cert of certificates(); track cert.id) {
      <div class="certificate-card">
        <div class="info">
          <span class="member">{{ memberName(cert) }}</span>
          <span class="expiry">Scadenza: {{ cert.expiry_date }}</span>
        </div>
        <button (click)="view(cert)">{{ t.view }}</button>
        <input
          type="text"
          [placeholder]="t.notePlaceholder"
          [ngModel]="getNote(cert.id)"
          (ngModelChange)="setNote(cert.id, $event)"
        />
        <div class="actions">
          <button class="approve" (click)="decide(cert, 'approved')">{{ t.approve }}</button>
          <button class="reject" (click)="decide(cert, 'rejected')">{{ t.reject }}</button>
        </div>
      </div>
    }
  </div>
</div>
`, styles: ["/* src/app/features/admin/certificates/admin-certificates.component.scss */\n.certificates-page {\n  max-width: 640px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\nh1 {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n  margin-bottom: var(--se-space-3);\n}\n.status {\n  color: var(--se-silver-dark);\n}\n.status.error {\n  color: #e05c5c;\n}\n.certificates-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-3);\n}\n.certificate-card {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-2);\n  padding: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: var(--se-radius-md);\n}\n.info {\n  display: flex;\n  flex-direction: column;\n}\n.member {\n  font-weight: 600;\n}\n.expiry {\n  font-size: 12px;\n  color: var(--se-silver-dark);\n}\ninput {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 8px 10px;\n  color: var(--se-silver);\n  font-size: 13px;\n}\n.actions {\n  display: flex;\n  gap: var(--se-space-2);\n}\nbutton {\n  padding: 8px 14px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  font-weight: 700;\n  cursor: pointer;\n  background: rgba(255, 255, 255, 0.08);\n  color: var(--se-silver);\n}\n.approve {\n  background: #4caf6f;\n  color: #05130a;\n}\n.reject {\n  background: #e05c5c;\n  color: #1a0505;\n}\n/*# sourceMappingURL=admin-certificates.component.css.map */\n"] }]
  }], () => [{ type: SupabaseService }, { type: AuthService }, { type: MockBackendService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminCertificatesComponent, { className: "AdminCertificatesComponent", filePath: "src/app/features/admin/certificates/admin-certificates.component.ts", lineNumber: 24 });
})();
export {
  AdminCertificatesComponent
};
//# sourceMappingURL=chunk-6QGQ7ICY.js.map
