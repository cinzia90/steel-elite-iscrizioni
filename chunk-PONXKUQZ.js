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
} from "./chunk-THOMXI5H.js";
import {
  Router
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-QKULHZCD.js";

// src/app/core/auth/login/login.component.ts
function LoginComponent_Conditional_11_Template(rf, ctx) {
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
var LoginComponent = class _LoginComponent {
  auth;
  router;
  t = it;
  email = "";
  password = "";
  loading = signal(false);
  errorMessage = signal(null);
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }
  submit() {
    return __async(this, null, function* () {
      this.errorMessage.set(null);
      this.loading.set(true);
      const { error } = yield this.auth.signInWithPassword(this.email, this.password);
      this.loading.set(false);
      if (error) {
        this.errorMessage.set(this.t.login.error);
        return;
      }
      this.router.navigateByUrl("/");
    });
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 14, vars: 8, consts: [[1, "login-page"], [1, "login-card", 3, "ngSubmit"], ["src", "assets/logo.jpg", "alt", "Steel Elite", 1, "logo"], [1, "motto"], ["type", "email", "name", "email", "required", "", "autocomplete", "email", 3, "ngModelChange", "ngModel"], ["type", "password", "name", "password", "required", "", "autocomplete", "current-password", 3, "ngModelChange", "ngModel"], [1, "error"], ["type", "submit", 3, "disabled"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "form", 1);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_1_listener() {
        return ctx.submit();
      });
      \u0275\u0275element(2, "img", 2);
      \u0275\u0275elementStart(3, "p", 3);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "label");
      \u0275\u0275text(6);
      \u0275\u0275elementStart(7, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "label");
      \u0275\u0275text(9);
      \u0275\u0275elementStart(10, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(11, LoginComponent_Conditional_11_Template, 2, 1, "p", 6);
      \u0275\u0275elementStart(12, "button", 7);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.t.login.motto);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.t.login.email, " ");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.email);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.t.login.password, " ");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.password);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.loading() ? ctx.t.login.submitting : ctx.t.login.submit, " ");
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ["\n\n.login-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--se-space-4);\n}\n.login-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 360px;\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-lg);\n  padding: var(--se-space-5) var(--se-space-4);\n}\n.logo[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  object-fit: cover;\n  align-self: center;\n}\n.motto[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 0 0 var(--se-space-2);\n  font-style: italic;\n  font-weight: 500;\n  font-size: 14px;\n  line-height: 1.4;\n  color: rgba(255, 255, 255, 0.55);\n}\nlabel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-1);\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\ninput[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 10px 12px;\n  color: var(--se-silver);\n  font-size: 15px;\n}\ninput[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--se-gold);\n}\nbutton[_ngcontent-%COMP%] {\n  margin-top: var(--se-space-2);\n  padding: 12px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.error[_ngcontent-%COMP%] {\n  color: #e05c5c;\n  font-size: 13px;\n  margin: 0;\n}\n/*# sourceMappingURL=login.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [CommonModule, FormsModule], template: '<div class="login-page">\n  <form class="login-card" (ngSubmit)="submit()">\n    <img class="logo" src="assets/logo.jpg" alt="Steel Elite" />\n    <p class="motto">{{ t.login.motto }}</p>\n\n    <label>\n      {{ t.login.email }}\n      <input type="email" name="email" [(ngModel)]="email" required autocomplete="email" />\n    </label>\n\n    <label>\n      {{ t.login.password }}\n      <input type="password" name="password" [(ngModel)]="password" required autocomplete="current-password" />\n    </label>\n\n    @if (errorMessage()) {\n      <p class="error">{{ errorMessage() }}</p>\n    }\n\n    <button type="submit" [disabled]="loading()">\n      {{ loading() ? t.login.submitting : t.login.submit }}\n    </button>\n  </form>\n</div>\n', styles: ["/* src/app/core/auth/login/login.component.scss */\n.login-page {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--se-space-4);\n}\n.login-card {\n  width: 100%;\n  max-width: 360px;\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-lg);\n  padding: var(--se-space-5) var(--se-space-4);\n}\n.logo {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  object-fit: cover;\n  align-self: center;\n}\n.motto {\n  text-align: center;\n  margin: 0 0 var(--se-space-2);\n  font-style: italic;\n  font-weight: 500;\n  font-size: 14px;\n  line-height: 1.4;\n  color: rgba(255, 255, 255, 0.55);\n}\nlabel {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-1);\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\ninput {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 10px 12px;\n  color: var(--se-silver);\n  font-size: 15px;\n}\ninput:focus {\n  outline: none;\n  border-color: var(--se-gold);\n}\nbutton {\n  margin-top: var(--se-space-2);\n  padding: 12px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.error {\n  color: #e05c5c;\n  font-size: 13px;\n  margin: 0;\n}\n/*# sourceMappingURL=login.component.css.map */\n"] }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/core/auth/login/login.component.ts", lineNumber: 15 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-PONXKUQZ.js.map
