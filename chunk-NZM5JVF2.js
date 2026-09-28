import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-XXIBBBHG.js";
import {
  it
} from "./chunk-2QEQLM23.js";
import {
  Router
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-QKULHZCD.js";

// src/app/features/signup/certificate/certificate.component.ts
function CertificateComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function CertificateComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function CertificateComponent_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.skip());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t.skip);
  }
}
var CertificateComponent = class _CertificateComponent {
  auth;
  supabase;
  mock;
  router;
  t = it.signup.certificate;
  expiryDate = "";
  certificateFile = null;
  loading = signal(false);
  errorMessage = signal(null);
  // true se il member ha già un abbonamento (sta caricando il certificato in
  // un secondo momento, non durante l'iscrizione): niente pulsante "salta",
  // e dopo il salvataggio si torna alla tessera invece che al contratto.
  alreadySubscribed = signal(false);
  constructor(auth, supabase, mock, router) {
    this.auth = auth;
    this.supabase = supabase;
    this.mock = mock;
    this.router = router;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const userId = this.auth.user()?.id;
      if (!userId) {
        return;
      }
      if (environment.mock) {
        this.alreadySubscribed.set(!!this.mock.getLatestSubscription(userId));
        return;
      }
      const { data } = yield this.supabase.client.from("subscriptions").select("id").eq("member_id", userId).limit(1).maybeSingle();
      this.alreadySubscribed.set(!!data);
    });
  }
  onFileSelected(event) {
    const input = event.target;
    this.certificateFile = input.files?.[0] ?? null;
  }
  skip() {
    this.router.navigateByUrl("/iscriviti/contratto");
  }
  nextRoute() {
    return this.alreadySubscribed() ? "/tessera" : "/iscriviti/contratto";
  }
  submit() {
    return __async(this, null, function* () {
      this.errorMessage.set(null);
      if (!this.certificateFile) {
        this.errorMessage.set(this.t.fileRequired);
        return;
      }
      const userId = this.auth.user()?.id;
      if (!userId) {
        return;
      }
      this.loading.set(true);
      try {
        if (environment.mock) {
          yield this.mock.submitCertificate(userId, this.certificateFile, this.expiryDate);
        } else {
          const extension = this.certificateFile.name.split(".").pop() ?? "pdf";
          const filePath = `${userId}/certificato-${Date.now()}.${extension}`;
          const { error: uploadError } = yield this.supabase.client.storage.from("certificates").upload(filePath, this.certificateFile, { upsert: false });
          if (uploadError) {
            throw uploadError;
          }
          const { error: insertError } = yield this.supabase.client.from("medical_certificates").insert({
            member_id: userId,
            file_path: filePath,
            expiry_date: this.expiryDate
          });
          if (insertError) {
            throw insertError;
          }
        }
        this.router.navigateByUrl(this.nextRoute());
      } catch {
        this.errorMessage.set(this.t.errorGeneric);
      } finally {
        this.loading.set(false);
      }
    });
  }
  static \u0275fac = function CertificateComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CertificateComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(MockBackendService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CertificateComponent, selectors: [["app-signup-certificate"]], decls: 16, vars: 9, consts: [[1, "certificate-page"], [1, "card", 3, "ngSubmit"], [1, "description"], ["type", "file", "accept", "application/pdf,image/*", 3, "change"], ["type", "date", "name", "expiryDate", "required", "", 3, "ngModelChange", "ngModel"], [1, "error"], ["type", "submit", 3, "disabled"], ["type", "button", 1, "skip"], ["type", "button", 1, "skip", 3, "click"]], template: function CertificateComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "form", 1);
      \u0275\u0275listener("ngSubmit", function CertificateComponent_Template_form_ngSubmit_1_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementStart(2, "h1");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 2);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "label");
      \u0275\u0275text(7);
      \u0275\u0275elementStart(8, "input", 3);
      \u0275\u0275listener("change", function CertificateComponent_Template_input_change_8_listener($event) {
        return ctx.onFileSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "label");
      \u0275\u0275text(10);
      \u0275\u0275elementStart(11, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function CertificateComponent_Template_input_ngModelChange_11_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.expiryDate, $event) || (ctx.expiryDate = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(12, CertificateComponent_Conditional_12_Template, 2, 1, "p", 5);
      \u0275\u0275elementStart(13, "button", 6);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd();
      \u0275\u0275template(15, CertificateComponent_Conditional_15_Template, 2, 1, "button", 7);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.t.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.description);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.t.file, " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.t.expiryDate, " ");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.expiryDate);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.loading() ? ctx.t.submitting : ctx.alreadySubscribed() ? ctx.t.submitReturning : ctx.t.submit, " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.alreadySubscribed() ? 15 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ["\n\n.certificate-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--se-space-4);\n}\n.card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-lg);\n  padding: var(--se-space-5) var(--se-space-4);\n}\nh1[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 0;\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n}\n.description[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 13px;\n  color: var(--se-silver-dark);\n  margin: 0;\n}\nlabel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-1);\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\ninput[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 10px 12px;\n  color: var(--se-silver);\n  font-size: 15px;\n}\ninput[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--se-gold);\n}\ninput[type=file][_ngcontent-%COMP%] {\n  border: none;\n  padding: 0;\n  color: var(--se-silver-dark);\n}\nbutton[_ngcontent-%COMP%] {\n  margin-top: var(--se-space-2);\n  padding: 12px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.error[_ngcontent-%COMP%] {\n  color: #e05c5c;\n  font-size: 13px;\n  margin: 0;\n}\n.skip[_ngcontent-%COMP%] {\n  margin-top: 0;\n  background: none;\n  color: var(--se-silver-dark);\n  font-weight: 600;\n  text-decoration: underline;\n}\n/*# sourceMappingURL=certificate.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CertificateComponent, [{
    type: Component,
    args: [{ selector: "app-signup-certificate", standalone: true, imports: [CommonModule, FormsModule], template: '<div class="certificate-page">\n  <form class="card" (ngSubmit)="submit()">\n    <h1>{{ t.title }}</h1>\n    <p class="description">{{ t.description }}</p>\n\n    <label>\n      {{ t.file }}\n      <input type="file" accept="application/pdf,image/*" (change)="onFileSelected($event)" />\n    </label>\n\n    <label>\n      {{ t.expiryDate }}\n      <input type="date" name="expiryDate" [(ngModel)]="expiryDate" required />\n    </label>\n\n    @if (errorMessage()) {\n      <p class="error">{{ errorMessage() }}</p>\n    }\n\n    <button type="submit" [disabled]="loading()">\n      {{ loading() ? t.submitting : (alreadySubscribed() ? t.submitReturning : t.submit) }}\n    </button>\n\n    @if (!alreadySubscribed()) {\n      <button type="button" class="skip" (click)="skip()">{{ t.skip }}</button>\n    }\n  </form>\n</div>\n', styles: ["/* src/app/features/signup/certificate/certificate.component.scss */\n.certificate-page {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--se-space-4);\n}\n.card {\n  width: 100%;\n  max-width: 420px;\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-lg);\n  padding: var(--se-space-5) var(--se-space-4);\n}\nh1 {\n  text-align: center;\n  margin: 0;\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n}\n.description {\n  text-align: center;\n  font-size: 13px;\n  color: var(--se-silver-dark);\n  margin: 0;\n}\nlabel {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-1);\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\ninput {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 10px 12px;\n  color: var(--se-silver);\n  font-size: 15px;\n}\ninput:focus {\n  outline: none;\n  border-color: var(--se-gold);\n}\ninput[type=file] {\n  border: none;\n  padding: 0;\n  color: var(--se-silver-dark);\n}\nbutton {\n  margin-top: var(--se-space-2);\n  padding: 12px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.error {\n  color: #e05c5c;\n  font-size: 13px;\n  margin: 0;\n}\n.skip {\n  margin-top: 0;\n  background: none;\n  color: var(--se-silver-dark);\n  font-weight: 600;\n  text-decoration: underline;\n}\n/*# sourceMappingURL=certificate.component.css.map */\n"] }]
  }], () => [{ type: AuthService }, { type: SupabaseService }, { type: MockBackendService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CertificateComponent, { className: "CertificateComponent", filePath: "src/app/features/signup/certificate/certificate.component.ts", lineNumber: 18 });
})();
export {
  CertificateComponent
};
//# sourceMappingURL=chunk-NZM5JVF2.js.map
