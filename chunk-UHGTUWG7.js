import {
  SignupStateService
} from "./chunk-YEFS7TCJ.js";
import {
  it
} from "./chunk-2QEQLM23.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-NKGUCW2I.js";
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-QKULHZCD.js";

// src/app/features/signup/payment-pending/payment-pending.component.ts
function PaymentPendingComponent_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 3);
    \u0275\u0275listener("click", function PaymentPendingComponent_Case_4_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retry());
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.t.cancelled);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t.retry);
  }
}
function PaymentPendingComponent_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.t.success);
  }
}
function PaymentPendingComponent_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.t.pending);
  }
}
var POLL_INTERVAL_MS = 2e3;
var POLL_TIMEOUT_MS = 6e4;
var PaymentPendingComponent = class _PaymentPendingComponent {
  route;
  router;
  supabase;
  signupState;
  mock;
  t = it.signup.paymentPending;
  status = signal("pending");
  pollHandle = null;
  constructor(route, router, supabase, signupState, mock) {
    this.route = route;
    this.router = router;
    this.supabase = supabase;
    this.signupState = signupState;
    this.mock = mock;
  }
  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;
    if (params.get("cancelled")) {
      this.status.set("cancelled");
      return;
    }
    const sessionId = params.get("session_id");
    if (!sessionId) {
      this.router.navigateByUrl("/iscriviti");
      return;
    }
    this.pollSubscriptionStatus(sessionId);
  }
  ngOnDestroy() {
    if (this.pollHandle) {
      clearInterval(this.pollHandle);
    }
  }
  retry() {
    this.router.navigateByUrl("/iscriviti/pagamento");
  }
  pollSubscriptionStatus(sessionId) {
    const deadline = Date.now() + POLL_TIMEOUT_MS;
    const check = () => __async(this, null, function* () {
      const status = environment.mock ? this.mock.getSubscriptionStatusBySessionId(sessionId)?.status : (yield this.supabase.client.from("subscriptions").select("status").eq("stripe_checkout_session_id", sessionId).single()).data?.status;
      if (status === "active") {
        this.status.set("active");
        this.signupState.clear();
        if (this.pollHandle) {
          clearInterval(this.pollHandle);
        }
        setTimeout(() => this.router.navigateByUrl("/tessera"), 1500);
        return;
      }
      if (Date.now() > deadline && this.pollHandle) {
        clearInterval(this.pollHandle);
      }
    });
    check();
    this.pollHandle = setInterval(check, POLL_INTERVAL_MS);
  }
  static \u0275fac = function PaymentPendingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaymentPendingComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(SignupStateService), \u0275\u0275directiveInject(MockBackendService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentPendingComponent, selectors: [["app-signup-payment-pending"]], decls: 7, vars: 2, consts: [[1, "pending-page"], [1, "card"], [1, "success"], [3, "click"]], template: function PaymentPendingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, PaymentPendingComponent_Case_4_Template, 4, 2)(5, PaymentPendingComponent_Case_5_Template, 2, 1, "p", 2)(6, PaymentPendingComponent_Case_6_Template, 2, 1, "p");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.t.title);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_1_0 = ctx.status()) === "cancelled" ? 4 : tmp_1_0 === "active" ? 5 : 6);
    }
  }, dependencies: [CommonModule], styles: ["\n\n.pending-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--se-space-4);\n}\n.card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 380px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-lg);\n  padding: var(--se-space-5) var(--se-space-4);\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n}\n.success[_ngcontent-%COMP%] {\n  color: var(--se-gold-light);\n  font-weight: 600;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 12px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\n/*# sourceMappingURL=payment-pending.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaymentPendingComponent, [{
    type: Component,
    args: [{ selector: "app-signup-payment-pending", standalone: true, imports: [CommonModule], template: `<div class="pending-page">
  <div class="card">
    <h1>{{ t.title }}</h1>

    @switch (status()) {
      @case ('cancelled') {
        <p>{{ t.cancelled }}</p>
        <button (click)="retry()">{{ t.retry }}</button>
      }
      @case ('active') {
        <p class="success">{{ t.success }}</p>
      }
      @default {
        <p>{{ t.pending }}</p>
      }
    }
  </div>
</div>
`, styles: ["/* src/app/features/signup/payment-pending/payment-pending.component.scss */\n.pending-page {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--se-space-4);\n}\n.card {\n  width: 100%;\n  max-width: 380px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-lg);\n  padding: var(--se-space-5) var(--se-space-4);\n}\nh1 {\n  margin: 0;\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n}\n.success {\n  color: var(--se-gold-light);\n  font-weight: 600;\n}\nbutton {\n  padding: 12px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\n/*# sourceMappingURL=payment-pending.component.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: SupabaseService }, { type: SignupStateService }, { type: MockBackendService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentPendingComponent, { className: "PaymentPendingComponent", filePath: "src/app/features/signup/payment-pending/payment-pending.component.ts", lineNumber: 22 });
})();
export {
  PaymentPendingComponent
};
//# sourceMappingURL=chunk-UHGTUWG7.js.map
