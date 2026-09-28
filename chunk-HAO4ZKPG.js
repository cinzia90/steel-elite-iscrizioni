import {
  DefaultValueAccessor,
  FormsModule,
  MinLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-XXIBBBHG.js";
import {
  it
} from "./chunk-THOMXI5H.js";
import {
  Router,
  RouterLink
} from "./chunk-NKGUCW2I.js";
import {
  AuthService
} from "./chunk-TBK4PKTS.js";
import "./chunk-DLQI4DZU.js";
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

// src/app/features/signup/account/account.component.ts
function AccountComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t.confirmEmail);
  }
}
function AccountComponent_Conditional_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function AccountComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 2);
    \u0275\u0275listener("ngSubmit", function AccountComponent_Conditional_2_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submit());
    });
    \u0275\u0275elementStart(1, "h1");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label");
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "input", 3);
    \u0275\u0275twoWayListener("ngModelChange", function AccountComponent_Conditional_2_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.firstName, $event) || (ctx_r0.firstName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "label");
    \u0275\u0275text(7);
    \u0275\u0275elementStart(8, "input", 4);
    \u0275\u0275twoWayListener("ngModelChange", function AccountComponent_Conditional_2_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.lastName, $event) || (ctx_r0.lastName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "label");
    \u0275\u0275text(10);
    \u0275\u0275elementStart(11, "input", 5);
    \u0275\u0275twoWayListener("ngModelChange", function AccountComponent_Conditional_2_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.email, $event) || (ctx_r0.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "label");
    \u0275\u0275text(13);
    \u0275\u0275elementStart(14, "input", 6);
    \u0275\u0275twoWayListener("ngModelChange", function AccountComponent_Conditional_2_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.password, $event) || (ctx_r0.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(15, AccountComponent_Conditional_2_Conditional_15_Template, 2, 1, "p", 7);
    \u0275\u0275elementStart(16, "button", 8);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p", 9);
    \u0275\u0275text(19);
    \u0275\u0275elementStart(20, "a", 10);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t.firstName, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.firstName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t.lastName, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.lastName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t.email, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t.password, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.password);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.errorMessage() ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.loading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.loading() ? ctx_r0.t.submitting : ctx_r0.t.submit, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t.alreadyHaveAccount, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t.login);
  }
}
var AccountComponent = class _AccountComponent {
  auth;
  router;
  t = it.signup.account;
  email = "";
  password = "";
  firstName = "";
  lastName = "";
  loading = signal(false);
  errorMessage = signal(null);
  awaitingConfirmation = signal(false);
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }
  submit() {
    return __async(this, null, function* () {
      this.errorMessage.set(null);
      this.loading.set(true);
      const { data, error } = yield this.auth.signUp(this.email, this.password, this.firstName, this.lastName);
      this.loading.set(false);
      if (error) {
        this.errorMessage.set(this.t.errorGeneric);
        return;
      }
      if (data.session) {
        this.router.navigateByUrl("/iscriviti/profilo");
        return;
      }
      this.awaitingConfirmation.set(true);
    });
  }
  static \u0275fac = function AccountComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccountComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccountComponent, selectors: [["app-signup-account"]], decls: 3, vars: 1, consts: [[1, "account-page"], [1, "card"], [1, "card", 3, "ngSubmit"], ["type", "text", "name", "firstName", "required", "", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "lastName", "required", "", 3, "ngModelChange", "ngModel"], ["type", "email", "name", "email", "required", "", "autocomplete", "email", 3, "ngModelChange", "ngModel"], ["type", "password", "name", "password", "required", "", "minlength", "8", "autocomplete", "new-password", 3, "ngModelChange", "ngModel"], [1, "error"], ["type", "submit", 3, "disabled"], [1, "login-hint"], ["routerLink", "/login"]], template: function AccountComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, AccountComponent_Conditional_1_Template, 3, 1, "div", 1)(2, AccountComponent_Conditional_2_Template, 22, 14, "form", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.awaitingConfirmation() ? 1 : 2);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, NgModel, NgForm, RouterLink], styles: ["\n\n.account-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--se-space-4);\n}\n.card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 380px;\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-lg);\n  padding: var(--se-space-5) var(--se-space-4);\n}\nh1[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 0 0 var(--se-space-2);\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-1);\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\ninput[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 10px 12px;\n  color: var(--se-silver);\n  font-size: 15px;\n}\ninput[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--se-gold);\n}\nbutton[_ngcontent-%COMP%] {\n  margin-top: var(--se-space-2);\n  padding: 12px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.error[_ngcontent-%COMP%] {\n  color: #e05c5c;\n  font-size: 13px;\n  margin: 0;\n}\n.login-hint[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 13px;\n  color: var(--se-silver-dark);\n  margin: 0;\n}\n.login-hint[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--se-gold);\n}\n/*# sourceMappingURL=account.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccountComponent, [{
    type: Component,
    args: [{ selector: "app-signup-account", standalone: true, imports: [CommonModule, FormsModule, RouterLink], template: '<div class="account-page">\n  @if (awaitingConfirmation()) {\n    <div class="card">\n      <p>{{ t.confirmEmail }}</p>\n    </div>\n  } @else {\n    <form class="card" (ngSubmit)="submit()">\n      <h1>{{ t.title }}</h1>\n\n      <label>\n        {{ t.firstName }}\n        <input type="text" name="firstName" [(ngModel)]="firstName" required />\n      </label>\n\n      <label>\n        {{ t.lastName }}\n        <input type="text" name="lastName" [(ngModel)]="lastName" required />\n      </label>\n\n      <label>\n        {{ t.email }}\n        <input type="email" name="email" [(ngModel)]="email" required autocomplete="email" />\n      </label>\n\n      <label>\n        {{ t.password }}\n        <input type="password" name="password" [(ngModel)]="password" required minlength="8" autocomplete="new-password" />\n      </label>\n\n      @if (errorMessage()) {\n        <p class="error">{{ errorMessage() }}</p>\n      }\n\n      <button type="submit" [disabled]="loading()">\n        {{ loading() ? t.submitting : t.submit }}\n      </button>\n\n      <p class="login-hint">\n        {{ t.alreadyHaveAccount }} <a routerLink="/login">{{ t.login }}</a>\n      </p>\n    </form>\n  }\n</div>\n', styles: ["/* src/app/features/signup/account/account.component.scss */\n.account-page {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--se-space-4);\n}\n.card {\n  width: 100%;\n  max-width: 380px;\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-lg);\n  padding: var(--se-space-5) var(--se-space-4);\n}\nh1 {\n  text-align: center;\n  margin: 0 0 var(--se-space-2);\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n}\nlabel {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-1);\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\ninput {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 10px 12px;\n  color: var(--se-silver);\n  font-size: 15px;\n}\ninput:focus {\n  outline: none;\n  border-color: var(--se-gold);\n}\nbutton {\n  margin-top: var(--se-space-2);\n  padding: 12px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.error {\n  color: #e05c5c;\n  font-size: 13px;\n  margin: 0;\n}\n.login-hint {\n  text-align: center;\n  font-size: 13px;\n  color: var(--se-silver-dark);\n  margin: 0;\n}\n.login-hint a {\n  color: var(--se-gold);\n}\n/*# sourceMappingURL=account.component.css.map */\n"] }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccountComponent, { className: "AccountComponent", filePath: "src/app/features/signup/account/account.component.ts", lineNumber: 15 });
})();
export {
  AccountComponent
};
//# sourceMappingURL=chunk-HAO4ZKPG.js.map
