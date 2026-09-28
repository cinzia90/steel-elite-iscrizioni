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
  Injectable,
  __async,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-QKULHZCD.js";

// src/app/core/services/plans.service.ts
var PlansService = class _PlansService {
  supabase;
  mock;
  constructor(supabase, mock) {
    this.supabase = supabase;
    this.mock = mock;
  }
  listActivePlans() {
    return __async(this, null, function* () {
      if (environment.mock) {
        return this.mock.listActivePlans();
      }
      const { data, error } = yield this.supabase.client.from("plans").select("*").eq("active", true).order("sort_order", { ascending: true });
      if (error) {
        throw error;
      }
      return data;
    });
  }
  static \u0275fac = function PlansService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlansService)(\u0275\u0275inject(SupabaseService), \u0275\u0275inject(MockBackendService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PlansService, factory: _PlansService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlansService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: SupabaseService }, { type: MockBackendService }], null);
})();

// src/app/features/signup/plan-select/plan-select.component.ts
var _forTrack0 = ($index, $item) => $item.category;
var _forTrack1 = ($index, $item) => $item.id;
function PlanSelectComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t.loading);
  }
}
function PlanSelectComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function PlanSelectComponent_For_13_For_5_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(plan_r3.description);
  }
}
function PlanSelectComponent_For_13_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12)(2, "span", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, PlanSelectComponent_For_13_For_5_Conditional_4_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 15)(6, "span", 16);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 17);
    \u0275\u0275listener("click", function PlanSelectComponent_For_13_For_5_Template_button_click_8_listener() {
      const plan_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.choose(plan_r3));
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const plan_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(plan_r3.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(plan_r3.description ? 4 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.formatPrice(plan_r3.price_cents));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t.choose);
  }
}
function PlanSelectComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 8)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 10);
    \u0275\u0275repeaterCreate(4, PlanSelectComponent_For_13_For_5_Template, 10, 4, "div", 11, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r4.label);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(group_r4.plans);
  }
}
var PlanSelectComponent = class _PlanSelectComponent {
  plansService;
  signupState;
  auth;
  router;
  t = it.signup.planSelect;
  groups = signal([]);
  loading = signal(true);
  errorMessage = signal(null);
  constructor(plansService, signupState, auth, router) {
    this.plansService = plansService;
    this.signupState = signupState;
    this.auth = auth;
    this.router = router;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      try {
        const plans = yield this.plansService.listActivePlans();
        const order = ["open", "pt_privato", "pt_small_group"];
        this.groups.set(order.map((category) => ({
          category,
          label: this.t.categories[category],
          plans: plans.filter((plan) => plan.category === category)
        })).filter((group) => group.plans.length > 0));
      } catch {
        this.errorMessage.set(this.t.error);
      } finally {
        this.loading.set(false);
      }
    });
  }
  formatPrice(cents) {
    return (cents / 100).toLocaleString("it-IT", { style: "currency", currency: "EUR" });
  }
  choose(plan) {
    this.signupState.setSelectedPlanId(plan.id);
    this.router.navigateByUrl(this.auth.isAuthenticated() ? "/iscriviti/profilo" : "/iscriviti/account");
  }
  static \u0275fac = function PlanSelectComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlanSelectComponent)(\u0275\u0275directiveInject(PlansService), \u0275\u0275directiveInject(SignupStateService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlanSelectComponent, selectors: [["app-plan-select"]], decls: 16, vars: 6, consts: [[1, "plan-page"], [1, "hero"], ["src", "assets/logo.jpg", "alt", "Steel Elite", 1, "logo"], [1, "rule"], [1, "eyebrow"], [1, "subtitle"], [1, "status"], [1, "status", "error"], [1, "group"], [1, "page-footer"], [1, "plans"], [1, "plan-card"], [1, "plan-info"], [1, "plan-name"], [1, "plan-description"], [1, "plan-action"], [1, "plan-price"], [3, "click"]], template: function PlanSelectComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "img", 2)(3, "div", 3);
      \u0275\u0275elementStart(4, "span", 4);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "h1");
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 5);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(10, PlanSelectComponent_Conditional_10_Template, 2, 1, "p", 6)(11, PlanSelectComponent_Conditional_11_Template, 2, 1, "p", 7);
      \u0275\u0275repeaterCreate(12, PlanSelectComponent_For_13_Template, 6, 1, "section", 8, _forTrack0);
      \u0275\u0275elementStart(14, "footer", 9);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.t.eyebrow);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.subtitle);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.groups());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.t.footer);
    }
  }, dependencies: [CommonModule], styles: ["\n\n.plan-page[_ngcontent-%COMP%] {\n  max-width: 640px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\n.hero[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  margin-bottom: var(--se-space-4);\n}\n.logo[_ngcontent-%COMP%] {\n  display: block;\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  object-fit: cover;\n  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.6));\n}\n.rule[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--se-gold),\n      transparent);\n  margin-top: var(--se-space-2);\n}\n.eyebrow[_ngcontent-%COMP%] {\n  margin-top: var(--se-space-2);\n  font-size: 12px;\n  letter-spacing: 0.25em;\n  text-transform: uppercase;\n  color: var(--se-silver-dark);\n}\nh1[_ngcontent-%COMP%] {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 24px;\n  font-family: var(--se-font-display);\n  margin: var(--se-space-1) 0 0;\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin: var(--se-space-2) 0 0;\n  font-size: 14px;\n  color: var(--se-silver-dark);\n  max-width: 320px;\n}\n.status[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--se-silver-dark);\n}\n.status.error[_ngcontent-%COMP%] {\n  color: #e05c5c;\n}\n.group[_ngcontent-%COMP%] {\n  margin-bottom: var(--se-space-4);\n}\n.group[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 16px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--se-gold);\n  border-bottom: 1px solid rgba(201, 162, 39, 0.25);\n  padding-bottom: var(--se-space-1);\n  margin-bottom: var(--se-space-2);\n}\n.plans[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-2);\n}\n.plan-card[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: var(--se-space-3);\n  padding: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: var(--se-radius-md);\n}\n.plan-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.plan-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.plan-description[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\n.plan-action[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: var(--se-space-1);\n}\n.plan-price[_ngcontent-%COMP%] {\n  font-family: var(--se-font-display);\n  font-weight: 800;\n  color: var(--se-gold-light);\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\n.page-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: var(--se-space-5);\n  padding-bottom: var(--se-space-4);\n  font-size: 12px;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: var(--se-silver-dark);\n}\n/*# sourceMappingURL=plan-select.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlanSelectComponent, [{
    type: Component,
    args: [{ selector: "app-plan-select", standalone: true, imports: [CommonModule], template: '<div class="plan-page">\n  <div class="hero">\n    <img class="logo" src="assets/logo.jpg" alt="Steel Elite" />\n    <div class="rule"></div>\n    <span class="eyebrow">{{ t.eyebrow }}</span>\n    <h1>{{ t.title }}</h1>\n    <p class="subtitle">{{ t.subtitle }}</p>\n  </div>\n\n  @if (loading()) {\n    <p class="status">{{ t.loading }}</p>\n  }\n\n  @if (errorMessage()) {\n    <p class="status error">{{ errorMessage() }}</p>\n  }\n\n  @for (group of groups(); track group.category) {\n    <section class="group">\n      <h2>{{ group.label }}</h2>\n      <div class="plans">\n        @for (plan of group.plans; track plan.id) {\n          <div class="plan-card">\n            <div class="plan-info">\n              <span class="plan-name">{{ plan.name }}</span>\n              @if (plan.description) {\n                <span class="plan-description">{{ plan.description }}</span>\n              }\n            </div>\n            <div class="plan-action">\n              <span class="plan-price">{{ formatPrice(plan.price_cents) }}</span>\n              <button (click)="choose(plan)">{{ t.choose }}</button>\n            </div>\n          </div>\n        }\n      </div>\n    </section>\n  }\n\n  <footer class="page-footer">{{ t.footer }}</footer>\n</div>\n', styles: ["/* src/app/features/signup/plan-select/plan-select.component.scss */\n.plan-page {\n  max-width: 640px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\n.hero {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  margin-bottom: var(--se-space-4);\n}\n.logo {\n  display: block;\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  object-fit: cover;\n  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.6));\n}\n.rule {\n  width: 56px;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--se-gold),\n      transparent);\n  margin-top: var(--se-space-2);\n}\n.eyebrow {\n  margin-top: var(--se-space-2);\n  font-size: 12px;\n  letter-spacing: 0.25em;\n  text-transform: uppercase;\n  color: var(--se-silver-dark);\n}\nh1 {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 24px;\n  font-family: var(--se-font-display);\n  margin: var(--se-space-1) 0 0;\n}\n.subtitle {\n  margin: var(--se-space-2) 0 0;\n  font-size: 14px;\n  color: var(--se-silver-dark);\n  max-width: 320px;\n}\n.status {\n  text-align: center;\n  color: var(--se-silver-dark);\n}\n.status.error {\n  color: #e05c5c;\n}\n.group {\n  margin-bottom: var(--se-space-4);\n}\n.group h2 {\n  font-size: 16px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--se-gold);\n  border-bottom: 1px solid rgba(201, 162, 39, 0.25);\n  padding-bottom: var(--se-space-1);\n  margin-bottom: var(--se-space-2);\n}\n.plans {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-2);\n}\n.plan-card {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: var(--se-space-3);\n  padding: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: var(--se-radius-md);\n}\n.plan-info {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.plan-name {\n  font-weight: 600;\n}\n.plan-description {\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\n.plan-action {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: var(--se-space-1);\n}\n.plan-price {\n  font-family: var(--se-font-display);\n  font-weight: 800;\n  color: var(--se-gold-light);\n}\nbutton {\n  padding: 8px 16px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\n.page-footer {\n  text-align: center;\n  margin-top: var(--se-space-5);\n  padding-bottom: var(--se-space-4);\n  font-size: 12px;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: var(--se-silver-dark);\n}\n/*# sourceMappingURL=plan-select.component.css.map */\n"] }]
  }], () => [{ type: PlansService }, { type: SignupStateService }, { type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlanSelectComponent, { className: "PlanSelectComponent", filePath: "src/app/features/signup/plan-select/plan-select.component.ts", lineNumber: 23 });
})();
export {
  PlanSelectComponent
};
//# sourceMappingURL=chunk-HE5ZHVDG.js.map
