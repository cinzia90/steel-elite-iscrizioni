import {
  SignupStateService
} from "./chunk-YEFS7TCJ.js";
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
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-QKULHZCD.js";

// src/app/features/signup/payment/payment.component.ts
var PaymentComponent = class _PaymentComponent {
  supabase;
  signupState;
  auth;
  mock;
  router;
  t = it.signup.payment;
  errorMessage = signal(null);
  constructor(supabase, signupState, auth, mock, router) {
    this.supabase = supabase;
    this.signupState = signupState;
    this.auth = auth;
    this.mock = mock;
    this.router = router;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const planId = this.signupState.selectedPlanId();
      if (!planId) {
        this.router.navigateByUrl("/iscriviti");
        return;
      }
      if (environment.mock) {
        const userId = this.auth.user()?.id;
        if (!userId) {
          this.errorMessage.set(this.t.errorGeneric);
          return;
        }
        const { sessionId } = yield this.mock.startCheckout(userId, planId);
        this.router.navigateByUrl(`/iscriviti/conferma?session_id=${sessionId}`);
        return;
      }
      const { data, error } = yield this.supabase.client.functions.invoke("create-checkout-session", { body: { planId } });
      if (error || !data?.url) {
        this.errorMessage.set(this.t.errorGeneric);
        return;
      }
      window.location.href = data.url;
    });
  }
  static \u0275fac = function PaymentComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaymentComponent)(\u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(SignupStateService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MockBackendService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentComponent, selectors: [["app-signup-payment"]], decls: 3, vars: 1, consts: [[1, "payment-page"]], template: function PaymentComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "p");
      \u0275\u0275text(2);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate((tmp_0_0 = ctx.errorMessage()) !== null && tmp_0_0 !== void 0 ? tmp_0_0 : ctx.t.redirecting);
    }
  }, dependencies: [CommonModule], styles: ["\n\n.payment-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--se-space-4);\n  text-align: center;\n  color: var(--se-silver-dark);\n}\n/*# sourceMappingURL=payment.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaymentComponent, [{
    type: Component,
    args: [{ selector: "app-signup-payment", standalone: true, imports: [CommonModule], template: `
    <div class="payment-page">
      <p>{{ errorMessage() ?? t.redirecting }}</p>
    </div>
  `, styles: ["/* src/app/features/signup/payment/payment.component.scss */\n.payment-page {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--se-space-4);\n  text-align: center;\n  color: var(--se-silver-dark);\n}\n/*# sourceMappingURL=payment.component.css.map */\n"] }]
  }], () => [{ type: SupabaseService }, { type: SignupStateService }, { type: AuthService }, { type: MockBackendService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentComponent, { className: "PaymentComponent", filePath: "src/app/features/signup/payment/payment.component.ts", lineNumber: 22 });
})();
export {
  PaymentComponent
};
//# sourceMappingURL=chunk-GRJKQTZC.js.map
