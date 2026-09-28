import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel
} from "./chunk-XXIBBBHG.js";
import {
  SignupStateService
} from "./chunk-YEFS7TCJ.js";
import {
  it
} from "./chunk-VDIJZGGP.js";
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

// src/app/features/signup/contract/contract.component.ts
function ContractComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function ContractComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function ContractComponent_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.sendOtp());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r0.canSendOtp || ctx_r0.sendingOtp());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.sendingOtp() ? ctx_r0.t.sendingOtp : ctx_r0.t.sendOtp, " ");
  }
}
function ContractComponent_Conditional_15_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1, "Modalit\xE0 demo \u2014 codice: ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.demoCode());
  }
}
function ContractComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(2, ContractComponent_Conditional_15_Conditional_2_Template, 4, 1, "p", 10);
    \u0275\u0275elementStart(3, "label");
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "input", 11);
    \u0275\u0275twoWayListener("ngModelChange", function ContractComponent_Conditional_15_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.otpCode, $event) || (ctx_r0.otpCode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 8);
    \u0275\u0275listener("click", function ContractComponent_Conditional_15_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.verifyOtp());
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t.otpSentLabel);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isMock && ctx_r0.demoCode() ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t.otpCode, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.otpCode);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.verifyingOtp() || ctx_r0.otpCode.length !== 6);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.verifyingOtp() ? ctx_r0.t.verifyingOtp : ctx_r0.t.verifyOtp, " ");
  }
}
var ContractComponent = class _ContractComponent {
  supabase;
  signupState;
  auth;
  mock;
  router;
  t = it.signup.contract;
  isMock = environment.mock;
  acceptedTerms = false;
  acceptedRules = false;
  acceptedPrivacy = false;
  otpCode = "";
  otpSent = signal(false);
  sendingOtp = signal(false);
  verifyingOtp = signal(false);
  errorMessage = signal(null);
  demoCode = signal(null);
  constructor(supabase, signupState, auth, mock, router) {
    this.supabase = supabase;
    this.signupState = signupState;
    this.auth = auth;
    this.mock = mock;
    this.router = router;
  }
  get canSendOtp() {
    return this.acceptedTerms && this.acceptedRules && this.acceptedPrivacy;
  }
  sendOtp() {
    return __async(this, null, function* () {
      if (!this.canSendOtp) {
        this.errorMessage.set(this.t.acceptanceRequired);
        return;
      }
      this.errorMessage.set(null);
      this.sendingOtp.set(true);
      if (environment.mock) {
        const userId = this.auth.user()?.id;
        if (userId) {
          const { plainCode } = yield this.mock.requestOtp(userId);
          this.demoCode.set(plainCode);
        }
        this.sendingOtp.set(false);
        this.otpSent.set(true);
        return;
      }
      const { error } = yield this.supabase.client.functions.invoke("contract-otp", {
        body: { action: "request" }
      });
      this.sendingOtp.set(false);
      if (error) {
        this.errorMessage.set(this.t.errorGeneric);
        return;
      }
      this.otpSent.set(true);
    });
  }
  verifyOtp() {
    return __async(this, null, function* () {
      this.errorMessage.set(null);
      this.verifyingOtp.set(true);
      const userId = this.auth.user()?.id;
      const data = environment.mock ? userId ? yield this.mock.verifyOtp(userId, this.otpCode) : null : (yield this.supabase.client.functions.invoke("contract-otp", {
        body: { action: "verify", code: this.otpCode }
      })).data;
      if (!data) {
        this.verifyingOtp.set(false);
        this.errorMessage.set(this.t.errorGeneric);
        return;
      }
      if (!data.verified) {
        this.verifyingOtp.set(false);
        if (data.blocked) {
          this.errorMessage.set(this.t.otpBlocked);
        } else if (data.expired) {
          this.errorMessage.set(this.t.otpExpired);
        } else if (typeof data.attemptsRemaining === "number") {
          this.errorMessage.set(this.t.otpInvalidWithAttempts.replace("{n}", String(data.attemptsRemaining)));
        } else {
          this.errorMessage.set(this.t.otpInvalid);
        }
        return;
      }
      if (environment.mock) {
        if (userId) {
          yield this.mock.generateContract(userId);
        }
      } else {
        const planId = this.signupState.selectedPlanId();
        const { error: contractError } = yield this.supabase.client.functions.invoke("generate-contract", {
          body: {
            planId,
            acceptedTerms: this.acceptedTerms,
            acceptedRules: this.acceptedRules,
            acceptedPrivacy: this.acceptedPrivacy
          }
        });
        if (contractError) {
          this.verifyingOtp.set(false);
          this.errorMessage.set(this.t.errorGeneric);
          return;
        }
      }
      this.verifyingOtp.set(false);
      this.router.navigateByUrl("/iscriviti/pagamento");
    });
  }
  static \u0275fac = function ContractComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractComponent)(\u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(SignupStateService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MockBackendService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractComponent, selectors: [["app-signup-contract"]], decls: 16, vars: 9, consts: [[1, "contract-page"], [1, "card"], [1, "checkbox"], ["type", "checkbox", "name", "acceptedTerms", 3, "ngModelChange", "ngModel"], ["type", "checkbox", "name", "acceptedRules", 3, "ngModelChange", "ngModel"], ["type", "checkbox", "name", "acceptedPrivacy", 3, "ngModelChange", "ngModel"], [1, "error"], ["type", "button", 3, "disabled"], ["type", "button", 3, "click", "disabled"], [1, "otp-sent"], [1, "demo-code"], ["type", "text", "inputmode", "numeric", "maxlength", "6", "name", "otpCode", 3, "ngModelChange", "ngModel"]], template: function ContractComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "label", 2)(5, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function ContractComponent_Template_input_ngModelChange_5_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.acceptedTerms, $event) || (ctx.acceptedTerms = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "label", 2)(8, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function ContractComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.acceptedRules, $event) || (ctx.acceptedRules = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "label", 2)(11, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function ContractComponent_Template_input_ngModelChange_11_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.acceptedPrivacy, $event) || (ctx.acceptedPrivacy = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275template(13, ContractComponent_Conditional_13_Template, 2, 1, "p", 6)(14, ContractComponent_Conditional_14_Template, 2, 2, "button", 7)(15, ContractComponent_Conditional_15_Template, 8, 6);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.t.title);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.acceptedTerms);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.t.acceptContract, " ");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.acceptedRules);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.t.acceptRules, " ");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.acceptedPrivacy);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.t.acceptPrivacy, " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 13 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.otpSent() ? 14 : 15);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, MaxLengthValidator, NgModel], styles: ["\n\n.contract-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--se-space-4);\n}\n.card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-lg);\n  padding: var(--se-space-5) var(--se-space-4);\n}\nh1[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 0;\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n}\n.checkbox[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--se-space-2);\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\n.checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin-top: 3px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-1);\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\ninput[type=text][_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 10px 12px;\n  color: var(--se-silver);\n  font-size: 18px;\n  letter-spacing: 0.3em;\n  text-align: center;\n}\ninput[type=text][_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--se-gold);\n}\n.demo-code[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--se-silver);\n  font-size: 13px;\n  background: rgba(201, 162, 39, 0.15);\n  border: 1px dashed var(--se-gold);\n  border-radius: var(--se-radius-sm);\n  padding: var(--se-space-2);\n  margin: 0;\n}\n.otp-sent[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--se-gold-light);\n  font-size: 13px;\n  margin: 0;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 12px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.error[_ngcontent-%COMP%] {\n  color: #e05c5c;\n  font-size: 13px;\n  margin: 0;\n}\n/*# sourceMappingURL=contract.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractComponent, [{
    type: Component,
    args: [{ selector: "app-signup-contract", standalone: true, imports: [CommonModule, FormsModule], template: '<div class="contract-page">\n  <div class="card">\n    <h1>{{ t.title }}</h1>\n\n    <label class="checkbox">\n      <input type="checkbox" name="acceptedTerms" [(ngModel)]="acceptedTerms" />\n      {{ t.acceptContract }}\n    </label>\n\n    <label class="checkbox">\n      <input type="checkbox" name="acceptedRules" [(ngModel)]="acceptedRules" />\n      {{ t.acceptRules }}\n    </label>\n\n    <label class="checkbox">\n      <input type="checkbox" name="acceptedPrivacy" [(ngModel)]="acceptedPrivacy" />\n      {{ t.acceptPrivacy }}\n    </label>\n\n    @if (errorMessage()) {\n      <p class="error">{{ errorMessage() }}</p>\n    }\n\n    @if (!otpSent()) {\n      <button type="button" [disabled]="!canSendOtp || sendingOtp()" (click)="sendOtp()">\n        {{ sendingOtp() ? t.sendingOtp : t.sendOtp }}\n      </button>\n    } @else {\n      <p class="otp-sent">{{ t.otpSentLabel }}</p>\n\n      @if (isMock && demoCode()) {\n        <p class="demo-code">Modalit\xE0 demo \u2014 codice: <strong>{{ demoCode() }}</strong></p>\n      }\n\n      <label>\n        {{ t.otpCode }}\n        <input type="text" inputmode="numeric" maxlength="6" name="otpCode" [(ngModel)]="otpCode" />\n      </label>\n\n      <button type="button" [disabled]="verifyingOtp() || otpCode.length !== 6" (click)="verifyOtp()">\n        {{ verifyingOtp() ? t.verifyingOtp : t.verifyOtp }}\n      </button>\n    }\n  </div>\n</div>\n', styles: ["/* src/app/features/signup/contract/contract.component.scss */\n.contract-page {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--se-space-4);\n}\n.card {\n  width: 100%;\n  max-width: 420px;\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-lg);\n  padding: var(--se-space-5) var(--se-space-4);\n}\nh1 {\n  text-align: center;\n  margin: 0;\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n}\n.checkbox {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--se-space-2);\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\n.checkbox input {\n  margin-top: 3px;\n}\nlabel {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-1);\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\ninput[type=text] {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 10px 12px;\n  color: var(--se-silver);\n  font-size: 18px;\n  letter-spacing: 0.3em;\n  text-align: center;\n}\ninput[type=text]:focus {\n  outline: none;\n  border-color: var(--se-gold);\n}\n.demo-code {\n  text-align: center;\n  color: var(--se-silver);\n  font-size: 13px;\n  background: rgba(201, 162, 39, 0.15);\n  border: 1px dashed var(--se-gold);\n  border-radius: var(--se-radius-sm);\n  padding: var(--se-space-2);\n  margin: 0;\n}\n.otp-sent {\n  text-align: center;\n  color: var(--se-gold-light);\n  font-size: 13px;\n  margin: 0;\n}\nbutton {\n  padding: 12px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.error {\n  color: #e05c5c;\n  font-size: 13px;\n  margin: 0;\n}\n/*# sourceMappingURL=contract.component.css.map */\n"] }]
  }], () => [{ type: SupabaseService }, { type: SignupStateService }, { type: AuthService }, { type: MockBackendService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractComponent, { className: "ContractComponent", filePath: "src/app/features/signup/contract/contract.component.ts", lineNumber: 27 });
})();
export {
  ContractComponent
};
//# sourceMappingURL=chunk-FIR4ABU5.js.map
