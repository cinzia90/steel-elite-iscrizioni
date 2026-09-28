import {
  require_browser
} from "./chunk-IZLSK5IJ.js";
import {
  it
} from "./chunk-THOMXI5H.js";
import {
  CommonModule,
  Component,
  __async,
  __toESM,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-QKULHZCD.js";

// src/app/features/admin/qr-poster/admin-qr-poster.component.ts
var QRCode = __toESM(require_browser());
function AdminQrPosterComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 10);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.qrDataUrl(), \u0275\u0275sanitizeUrl);
  }
}
var AdminQrPosterComponent = class _AdminQrPosterComponent {
  t = it.admin.qrPoster;
  qrDataUrl = signal(null);
  signupUrl = new URL("iscriviti", document.baseURI).toString();
  ngOnInit() {
    return __async(this, null, function* () {
      this.qrDataUrl.set(yield QRCode.toDataURL(this.signupUrl, { margin: 1, width: 600, color: { dark: "#050505", light: "#ffffff" } }));
    });
  }
  download() {
    const url = this.qrDataUrl();
    if (!url) {
      return;
    }
    const link = document.createElement("a");
    link.href = url;
    link.download = "steel-elite-qr-iscrizione.png";
    link.click();
  }
  print() {
    window.print();
  }
  static \u0275fac = function AdminQrPosterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminQrPosterComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminQrPosterComponent, selectors: [["app-admin-qr-poster"]], decls: 22, vars: 7, consts: [[1, "qr-poster-page"], [1, "controls"], [1, "description"], [1, "actions"], [3, "click"], [1, "poster"], ["src", "assets/logo.jpg", "alt", "Steel Elite", 1, "logo"], [1, "rule"], [1, "wordmark"], [1, "qr-frame"], ["alt", "QR iscrizione", 1, "qr", 3, "src"], [1, "scan-hint"], [1, "url-label"]], template: function AdminQrPosterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 2);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3)(7, "button", 4);
      \u0275\u0275listener("click", function AdminQrPosterComponent_Template_button_click_7_listener() {
        return ctx.download();
      });
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 4);
      \u0275\u0275listener("click", function AdminQrPosterComponent_Template_button_click_9_listener() {
        return ctx.print();
      });
      \u0275\u0275text(10);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 5);
      \u0275\u0275element(12, "img", 6)(13, "div", 7);
      \u0275\u0275elementStart(14, "div", 8);
      \u0275\u0275text(15, "Steel Elite");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 9);
      \u0275\u0275template(17, AdminQrPosterComponent_Conditional_17_Template, 1, 1, "img", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 11);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 12);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.t.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.description);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.t.download);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.print);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.qrDataUrl() ? 17 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.scanHint);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.signupUrl);
    }
  }, dependencies: [CommonModule], styles: ["\n\n.qr-poster-page[_ngcontent-%COMP%] {\n  max-width: 640px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--se-space-4);\n}\n.controls[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: center;\n}\nh1[_ngcontent-%COMP%] {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n  margin-bottom: var(--se-space-2);\n}\n.description[_ngcontent-%COMP%] {\n  color: var(--se-silver-dark);\n  font-size: 13px;\n  max-width: 420px;\n  margin: 0 auto var(--se-space-3);\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: var(--se-space-2);\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 10px 18px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\n.poster[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: var(--se-space-5) var(--se-space-4);\n  background: var(--se-black);\n  border: 1px solid rgba(201, 162, 39, 0.35);\n  border-radius: var(--se-radius-lg);\n  text-align: center;\n}\n.logo[_ngcontent-%COMP%] {\n  width: 96px;\n  height: 96px;\n  border-radius: 50%;\n  object-fit: cover;\n  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.6));\n}\n.rule[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--se-gold),\n      transparent);\n  margin-top: var(--se-space-3);\n}\n.wordmark[_ngcontent-%COMP%] {\n  margin-top: var(--se-space-2);\n  font-family: var(--se-font-display);\n  font-weight: 800;\n  font-size: 22px;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n  color: var(--se-silver);\n}\n.qr-frame[_ngcontent-%COMP%] {\n  margin-top: var(--se-space-4);\n  padding: var(--se-space-3);\n  background: #fff;\n  border-radius: var(--se-radius-md);\n}\n.qr[_ngcontent-%COMP%] {\n  display: block;\n  width: 240px;\n  height: 240px;\n}\n.scan-hint[_ngcontent-%COMP%] {\n  margin-top: var(--se-space-4);\n  font-size: 20px;\n  font-weight: 700;\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.url-label[_ngcontent-%COMP%] {\n  margin-top: var(--se-space-1);\n  font-size: 12px;\n  color: var(--se-silver-dark);\n  word-break: break-all;\n}\n@media print {\n  .controls[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .qr-poster-page[_ngcontent-%COMP%] {\n    max-width: none;\n    padding: 0;\n  }\n  .poster[_ngcontent-%COMP%] {\n    max-width: none;\n    width: 100vw;\n    height: 100vh;\n    justify-content: center;\n    border: none;\n    border-radius: 0;\n  }\n}\n/*# sourceMappingURL=admin-qr-poster.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminQrPosterComponent, [{
    type: Component,
    args: [{ selector: "app-admin-qr-poster", standalone: true, imports: [CommonModule], template: '<div class="qr-poster-page">\n  <div class="controls">\n    <h1>{{ t.title }}</h1>\n    <p class="description">{{ t.description }}</p>\n    <div class="actions">\n      <button (click)="download()">{{ t.download }}</button>\n      <button (click)="print()">{{ t.print }}</button>\n    </div>\n  </div>\n\n  <div class="poster">\n    <img class="logo" src="assets/logo.jpg" alt="Steel Elite" />\n    <div class="rule"></div>\n    <div class="wordmark">Steel Elite</div>\n\n    <div class="qr-frame">\n      @if (qrDataUrl()) {\n        <img class="qr" [src]="qrDataUrl()" alt="QR iscrizione" />\n      }\n    </div>\n\n    <div class="scan-hint">{{ t.scanHint }}</div>\n    <div class="url-label">{{ signupUrl }}</div>\n  </div>\n</div>\n', styles: ["/* src/app/features/admin/qr-poster/admin-qr-poster.component.scss */\n.qr-poster-page {\n  max-width: 640px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--se-space-4);\n}\n.controls {\n  width: 100%;\n  text-align: center;\n}\nh1 {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n  margin-bottom: var(--se-space-2);\n}\n.description {\n  color: var(--se-silver-dark);\n  font-size: 13px;\n  max-width: 420px;\n  margin: 0 auto var(--se-space-3);\n}\n.actions {\n  display: flex;\n  justify-content: center;\n  gap: var(--se-space-2);\n}\nbutton {\n  padding: 10px 18px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\n.poster {\n  width: 100%;\n  max-width: 420px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: var(--se-space-5) var(--se-space-4);\n  background: var(--se-black);\n  border: 1px solid rgba(201, 162, 39, 0.35);\n  border-radius: var(--se-radius-lg);\n  text-align: center;\n}\n.logo {\n  width: 96px;\n  height: 96px;\n  border-radius: 50%;\n  object-fit: cover;\n  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.6));\n}\n.rule {\n  width: 64px;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--se-gold),\n      transparent);\n  margin-top: var(--se-space-3);\n}\n.wordmark {\n  margin-top: var(--se-space-2);\n  font-family: var(--se-font-display);\n  font-weight: 800;\n  font-size: 22px;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n  color: var(--se-silver);\n}\n.qr-frame {\n  margin-top: var(--se-space-4);\n  padding: var(--se-space-3);\n  background: #fff;\n  border-radius: var(--se-radius-md);\n}\n.qr {\n  display: block;\n  width: 240px;\n  height: 240px;\n}\n.scan-hint {\n  margin-top: var(--se-space-4);\n  font-size: 20px;\n  font-weight: 700;\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.url-label {\n  margin-top: var(--se-space-1);\n  font-size: 12px;\n  color: var(--se-silver-dark);\n  word-break: break-all;\n}\n@media print {\n  .controls {\n    display: none;\n  }\n  .qr-poster-page {\n    max-width: none;\n    padding: 0;\n  }\n  .poster {\n    max-width: none;\n    width: 100vw;\n    height: 100vh;\n    justify-content: center;\n    border: none;\n    border-radius: 0;\n  }\n}\n/*# sourceMappingURL=admin-qr-poster.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminQrPosterComponent, { className: "AdminQrPosterComponent", filePath: "src/app/features/admin/qr-poster/admin-qr-poster.component.ts", lineNumber: 20 });
})();
export {
  AdminQrPosterComponent
};
//# sourceMappingURL=chunk-2VAVQGX7.js.map
