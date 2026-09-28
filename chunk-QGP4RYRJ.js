import {
  it
} from "./chunk-2QEQLM23.js";
import {
  Router,
  RouterLink
} from "./chunk-NKGUCW2I.js";
import {
  AuthService
} from "./chunk-5JC44RXL.js";
import "./chunk-NZILXJS5.js";
import {
  Component,
  __async,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate3
} from "./chunk-QKULHZCD.js";

// src/app/shared/components/home/home.component.ts
function HomeComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "a", 2);
    \u0275\u0275text(2, "Tessera");
    \u0275\u0275elementEnd()();
  }
}
function HomeComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "a", 3);
    \u0275\u0275text(2, "Check-in");
    \u0275\u0275elementEnd()();
  }
}
function HomeComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "a", 4);
    \u0275\u0275text(2, "Pannello admin");
    \u0275\u0275elementEnd()();
  }
}
var HomeComponent = class _HomeComponent {
  auth;
  router;
  t = it;
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }
  logout() {
    return __async(this, null, function* () {
      yield this.auth.signOut();
      this.router.navigateByUrl("/login");
    });
  }
  static \u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomeComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 10, vars: 7, consts: [[2, "padding", "24px"], [3, "click"], ["routerLink", "/tessera"], ["routerLink", "/staff/check-in"], ["routerLink", "/admin"]], template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1");
      \u0275\u0275text(2, "Steel Elite");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p");
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275template(5, HomeComponent_Conditional_5_Template, 3, 0, "p")(6, HomeComponent_Conditional_6_Template, 3, 0, "p")(7, HomeComponent_Conditional_7_Template, 3, 0, "p");
      \u0275\u0275elementStart(8, "button", 1);
      \u0275\u0275listener("click", function HomeComponent_Template_button_click_8_listener() {
        return ctx.logout();
      });
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate3("", ctx.t.home.greeting, " ", ((tmp_0_0 = ctx.auth.profile()) == null ? null : tmp_0_0.first_name) || ((tmp_0_0 = ctx.auth.user()) == null ? null : tmp_0_0.email), " (", ctx.auth.role(), ")");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.auth.role() === "member" ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.auth.role() === "staff" || ctx.auth.role() === "admin" ? 6 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.auth.role() === "admin" ? 7 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.home.logout);
    }
  }, dependencies: [RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomeComponent, [{
    type: Component,
    args: [{
      selector: "app-home",
      standalone: true,
      imports: [RouterLink],
      template: `
    <div style="padding: 24px;">
      <h1>Steel Elite</h1>
      <p>{{ t.home.greeting }} {{ auth.profile()?.first_name || auth.user()?.email }} ({{ auth.role() }})</p>
      @if (auth.role() === 'member') {
        <p><a routerLink="/tessera">Tessera</a></p>
      }
      @if (auth.role() === 'staff' || auth.role() === 'admin') {
        <p><a routerLink="/staff/check-in">Check-in</a></p>
      }
      @if (auth.role() === 'admin') {
        <p><a routerLink="/admin">Pannello admin</a></p>
      }
      <button (click)="logout()">{{ t.home.logout }}</button>
    </div>
  `
    }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src/app/shared/components/home/home.component.ts", lineNumber: 27 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-QGP4RYRJ.js.map
