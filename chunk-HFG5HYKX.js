import {
  it
} from "./chunk-THOMXI5H.js";
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-NKGUCW2I.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-QKULHZCD.js";

// src/app/features/admin/layout/admin-layout.component.ts
var _c0 = () => ({ exact: true });
var AdminLayoutComponent = class _AdminLayoutComponent {
  t = it.admin.nav;
  static \u0275fac = function AdminLayoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminLayoutComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminLayoutComponent, selectors: [["app-admin-layout"]], decls: 22, vars: 11, consts: [[1, "admin-layout"], [1, "admin-nav"], ["routerLink", "/admin", "routerLinkActive", "active", 3, "routerLinkActiveOptions"], ["routerLink", "/admin/clienti", "routerLinkActive", "active"], ["routerLink", "/admin/certificati", "routerLinkActive", "active"], ["routerLink", "/admin/piani", "routerLinkActive", "active"], ["routerLink", "/admin/ingressi", "routerLinkActive", "active"], ["routerLink", "/admin/staff", "routerLinkActive", "active"], ["routerLink", "/admin/contratti", "routerLinkActive", "active"], ["routerLink", "/admin/qr-locandina", "routerLinkActive", "active"], ["routerLink", "/admin/impostazioni", "routerLinkActive", "active"], [1, "admin-content"]], template: function AdminLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "nav", 1)(2, "a", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "a", 3);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "a", 4);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "a", 5);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "a", 6);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "a", 7);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "a", 8);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "a", 9);
      \u0275\u0275text(17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "a", 10);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "main", 11);
      \u0275\u0275element(21, "router-outlet");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(10, _c0));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.t.dashboard);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.clients);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.certificates);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.plans);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.accessLogs);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.staff);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.contracts);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.qrPoster);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.settings);
    }
  }, dependencies: [RouterLink, RouterLinkActive, RouterOutlet], styles: ["\n\n.admin-layout[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n.admin-nav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--se-space-1);\n  padding: var(--se-space-3);\n  border-bottom: 1px solid rgba(201, 162, 39, 0.25);\n}\n.admin-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-radius: var(--se-radius-sm);\n  color: var(--se-silver-dark);\n  text-decoration: none;\n  font-size: 13px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.admin-nav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  color: var(--se-black);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n}\n.admin-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n/*# sourceMappingURL=admin-layout.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminLayoutComponent, [{
    type: Component,
    args: [{ selector: "app-admin-layout", standalone: true, imports: [RouterLink, RouterLinkActive, RouterOutlet], template: '<div class="admin-layout">\n  <nav class="admin-nav">\n    <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">{{ t.dashboard }}</a>\n    <a routerLink="/admin/clienti" routerLinkActive="active">{{ t.clients }}</a>\n    <a routerLink="/admin/certificati" routerLinkActive="active">{{ t.certificates }}</a>\n    <a routerLink="/admin/piani" routerLinkActive="active">{{ t.plans }}</a>\n    <a routerLink="/admin/ingressi" routerLinkActive="active">{{ t.accessLogs }}</a>\n    <a routerLink="/admin/staff" routerLinkActive="active">{{ t.staff }}</a>\n    <a routerLink="/admin/contratti" routerLinkActive="active">{{ t.contracts }}</a>\n    <a routerLink="/admin/qr-locandina" routerLinkActive="active">{{ t.qrPoster }}</a>\n    <a routerLink="/admin/impostazioni" routerLinkActive="active">{{ t.settings }}</a>\n  </nav>\n\n  <main class="admin-content">\n    <router-outlet />\n  </main>\n</div>\n', styles: ["/* src/app/features/admin/layout/admin-layout.component.scss */\n.admin-layout {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n.admin-nav {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--se-space-1);\n  padding: var(--se-space-3);\n  border-bottom: 1px solid rgba(201, 162, 39, 0.25);\n}\n.admin-nav a {\n  padding: 8px 14px;\n  border-radius: var(--se-radius-sm);\n  color: var(--se-silver-dark);\n  text-decoration: none;\n  font-size: 13px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.admin-nav a.active {\n  color: var(--se-black);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n}\n.admin-content {\n  flex: 1;\n}\n/*# sourceMappingURL=admin-layout.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminLayoutComponent, { className: "AdminLayoutComponent", filePath: "src/app/features/admin/layout/admin-layout.component.ts", lineNumber: 12 });
})();
export {
  AdminLayoutComponent
};
//# sourceMappingURL=chunk-HFG5HYKX.js.map
