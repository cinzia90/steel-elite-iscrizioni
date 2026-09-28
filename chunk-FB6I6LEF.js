import {
  it
} from "./chunk-2QEQLM23.js";
import {
  MockBackendService,
  SupabaseService,
  environment
} from "./chunk-NZILXJS5.js";
import {
  CommonModule,
  Component,
  DatePipe,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-QKULHZCD.js";

// src/app/features/admin/contracts/admin-contracts.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AdminContractsComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t.loading);
  }
}
function AdminContractsComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t.empty);
  }
}
function AdminContractsComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function AdminContractsComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "span", 6);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 7);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 8);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 9);
    \u0275\u0275listener("click", function AdminContractsComponent_For_8_Template_button_click_9_listener() {
      const contract_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.download(contract_r3));
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const contract_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.memberName(contract_r3));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 5, contract_r3.created_at, "short"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r0.t.hash, ": ", contract_r3.pdf_sha256, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t.download);
  }
}
var AdminContractsComponent = class _AdminContractsComponent {
  supabase;
  mock;
  t = it.admin.contracts;
  contracts = signal([]);
  loading = signal(true);
  errorMessage = signal(null);
  constructor(supabase, mock) {
    this.supabase = supabase;
    this.mock = mock;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      if (environment.mock) {
        this.contracts.set(this.mock.listContracts().map((c) => ({
          id: c.id,
          created_at: c.created_at,
          pdf_path: c.pdf_path,
          pdf_sha256: c.pdf_sha256,
          profiles: this.mock.getProfile(c.member_id)
        })));
        this.loading.set(false);
        return;
      }
      const { data } = yield this.supabase.client.from("contracts").select("id, created_at, pdf_path, pdf_sha256, profiles ( first_name, last_name )").order("created_at", { ascending: false }).limit(50);
      this.contracts.set(data ?? []);
      this.loading.set(false);
    });
  }
  memberName(contract) {
    const profile = contract.profiles;
    return profile ? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim() : "\u2014";
  }
  download(contract) {
    return __async(this, null, function* () {
      this.errorMessage.set(null);
      if (environment.mock) {
        const url = yield this.mock.getSignedUrl(contract.pdf_path);
        if (!url) {
          this.errorMessage.set(this.t.errorGeneric);
          return;
        }
        window.open(url, "_blank");
        return;
      }
      const { data, error } = yield this.supabase.client.storage.from("contracts").createSignedUrl(contract.pdf_path, 60);
      if (error || !data?.signedUrl) {
        this.errorMessage.set(this.t.errorGeneric);
        return;
      }
      window.open(data.signedUrl, "_blank");
    });
  }
  static \u0275fac = function AdminContractsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminContractsComponent)(\u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(MockBackendService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminContractsComponent, selectors: [["app-admin-contracts"]], decls: 9, vars: 3, consts: [[1, "admin-page"], [1, "status"], [1, "status", "error"], [1, "contracts"], [1, "contract-row"], [1, "info"], [1, "member"], [1, "date"], [1, "hash"], [3, "click"]], template: function AdminContractsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1");
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275template(3, AdminContractsComponent_Conditional_3_Template, 2, 1, "p", 1)(4, AdminContractsComponent_Conditional_4_Template, 2, 1, "p", 1)(5, AdminContractsComponent_Conditional_5_Template, 2, 1, "p", 2);
      \u0275\u0275elementStart(6, "div", 3);
      \u0275\u0275repeaterCreate(7, AdminContractsComponent_For_8_Template, 11, 8, "div", 4, _forTrack0);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.title);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 3 : ctx.contracts().length === 0 ? 4 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.errorMessage() ? 5 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.contracts());
    }
  }, dependencies: [CommonModule, DatePipe], styles: ["\n\n.admin-page[_ngcontent-%COMP%] {\n  max-width: 720px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\nh1[_ngcontent-%COMP%] {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n  margin-bottom: var(--se-space-4);\n}\n.status[_ngcontent-%COMP%] {\n  color: var(--se-silver-dark);\n}\n.status.error[_ngcontent-%COMP%] {\n  color: #e05c5c;\n}\n.contracts[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-2);\n}\n.contract-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: var(--se-space-3);\n  padding: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: var(--se-radius-md);\n}\n.info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.member[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--se-silver-dark);\n}\n.hash[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--se-silver-dark);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\nbutton[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 8px 16px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\n/*# sourceMappingURL=admin-contracts.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminContractsComponent, [{
    type: Component,
    args: [{ selector: "app-admin-contracts", standalone: true, imports: [CommonModule], template: `<div class="admin-page">
  <h1>{{ t.title }}</h1>

  @if (loading()) {
    <p class="status">{{ t.loading }}</p>
  } @else if (contracts().length === 0) {
    <p class="status">{{ t.empty }}</p>
  }

  @if (errorMessage()) {
    <p class="status error">{{ errorMessage() }}</p>
  }

  <div class="contracts">
    @for (contract of contracts(); track contract.id) {
      <div class="contract-row">
        <div class="info">
          <span class="member">{{ memberName(contract) }}</span>
          <span class="date">{{ contract.created_at | date: 'short' }}</span>
          <span class="hash">{{ t.hash }}: {{ contract.pdf_sha256 }}</span>
        </div>
        <button (click)="download(contract)">{{ t.download }}</button>
      </div>
    }
  </div>
</div>
`, styles: ["/* src/app/features/admin/contracts/admin-contracts.component.scss */\n.admin-page {\n  max-width: 720px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\nh1 {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n  margin-bottom: var(--se-space-4);\n}\n.status {\n  color: var(--se-silver-dark);\n}\n.status.error {\n  color: #e05c5c;\n}\n.contracts {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-2);\n}\n.contract-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: var(--se-space-3);\n  padding: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: var(--se-radius-md);\n}\n.info {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.member {\n  font-weight: 600;\n}\n.date {\n  font-size: 12px;\n  color: var(--se-silver-dark);\n}\n.hash {\n  font-size: 11px;\n  color: var(--se-silver-dark);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\nbutton {\n  flex-shrink: 0;\n  padding: 8px 16px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\n/*# sourceMappingURL=admin-contracts.component.css.map */\n"] }]
  }], () => [{ type: SupabaseService }, { type: MockBackendService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminContractsComponent, { className: "AdminContractsComponent", filePath: "src/app/features/admin/contracts/admin-contracts.component.ts", lineNumber: 26 });
})();
export {
  AdminContractsComponent
};
//# sourceMappingURL=chunk-FB6I6LEF.js.map
