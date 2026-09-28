import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-XXIBBBHG.js";
import {
  it
} from "./chunk-2QEQLM23.js";
import {
  RouterLink
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-QKULHZCD.js";

// src/app/features/admin/clients/admin-clients.component.ts
var _c0 = (a0) => ["/admin/clienti", a0];
var _forTrack0 = ($index, $item) => $item.id;
function AdminClientsComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t.empty);
  }
}
function AdminClientsComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const client_r2 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(3, _c0, client_r2.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", client_r2.first_name, " ", client_r2.last_name, " ");
  }
}
var AdminClientsComponent = class _AdminClientsComponent {
  supabase;
  mock;
  t = it.admin.clients;
  clients = signal([]);
  loading = signal(true);
  query = "";
  constructor(supabase, mock) {
    this.supabase = supabase;
    this.mock = mock;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.search();
    });
  }
  search() {
    return __async(this, null, function* () {
      this.loading.set(true);
      if (environment.mock) {
        this.clients.set(this.mock.listClients(this.query));
        this.loading.set(false);
        return;
      }
      let request = this.supabase.client.from("profiles").select("id, first_name, last_name").eq("role", "member");
      if (this.query.trim().length >= 2) {
        request = request.or(`first_name.ilike.%${this.query}%,last_name.ilike.%${this.query}%`);
      }
      const { data } = yield request.order("created_at", { ascending: false }).limit(100);
      this.clients.set(data ?? []);
      this.loading.set(false);
    });
  }
  static \u0275fac = function AdminClientsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminClientsComponent)(\u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(MockBackendService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminClientsComponent, selectors: [["app-admin-clients"]], decls: 8, vars: 4, consts: [[1, "clients-page"], ["type", "text", 3, "ngModelChange", "ngModel", "placeholder"], [1, "status"], [1, "clients-list"], [1, "client-row", 3, "routerLink"]], template: function AdminClientsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1");
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "input", 1);
      \u0275\u0275twoWayListener("ngModelChange", function AdminClientsComponent_Template_input_ngModelChange_3_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.query, $event) || (ctx.query = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function AdminClientsComponent_Template_input_ngModelChange_3_listener() {
        return ctx.search();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, AdminClientsComponent_Conditional_4_Template, 2, 1, "p", 2);
      \u0275\u0275elementStart(5, "div", 3);
      \u0275\u0275repeaterCreate(6, AdminClientsComponent_For_7_Template, 2, 5, "a", 4, _forTrack0);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.title);
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.query);
      \u0275\u0275property("placeholder", ctx.t.searchPlaceholder);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && ctx.clients().length === 0 ? 4 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.clients());
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterLink], styles: ["\n\n.clients-page[_ngcontent-%COMP%] {\n  max-width: 640px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\nh1[_ngcontent-%COMP%] {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n  margin-bottom: var(--se-space-3);\n}\ninput[_ngcontent-%COMP%] {\n  width: 100%;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 10px 12px;\n  color: var(--se-silver);\n  font-size: 15px;\n  margin-bottom: var(--se-space-3);\n}\n.status[_ngcontent-%COMP%] {\n  color: var(--se-silver-dark);\n}\n.clients-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-1);\n}\n.client-row[_ngcontent-%COMP%] {\n  display: block;\n  padding: var(--se-space-2) var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: var(--se-radius-sm);\n  color: var(--se-silver);\n  text-decoration: none;\n}\n.client-row[_ngcontent-%COMP%]:hover {\n  border-color: var(--se-gold);\n}\n/*# sourceMappingURL=admin-clients.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminClientsComponent, [{
    type: Component,
    args: [{ selector: "app-admin-clients", standalone: true, imports: [CommonModule, FormsModule, RouterLink], template: `<div class="clients-page">
  <h1>{{ t.title }}</h1>

  <input
    type="text"
    [(ngModel)]="query"
    (ngModelChange)="search()"
    [placeholder]="t.searchPlaceholder"
  />

  @if (!loading() && clients().length === 0) {
    <p class="status">{{ t.empty }}</p>
  }

  <div class="clients-list">
    @for (client of clients(); track client.id) {
      <a class="client-row" [routerLink]="['/admin/clienti', client.id]">
        {{ client.first_name }} {{ client.last_name }}
      </a>
    }
  </div>
</div>
`, styles: ["/* src/app/features/admin/clients/admin-clients.component.scss */\n.clients-page {\n  max-width: 640px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\nh1 {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n  margin-bottom: var(--se-space-3);\n}\ninput {\n  width: 100%;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 10px 12px;\n  color: var(--se-silver);\n  font-size: 15px;\n  margin-bottom: var(--se-space-3);\n}\n.status {\n  color: var(--se-silver-dark);\n}\n.clients-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-1);\n}\n.client-row {\n  display: block;\n  padding: var(--se-space-2) var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: var(--se-radius-sm);\n  color: var(--se-silver);\n  text-decoration: none;\n}\n.client-row:hover {\n  border-color: var(--se-gold);\n}\n/*# sourceMappingURL=admin-clients.component.css.map */\n"] }]
  }], () => [{ type: SupabaseService }, { type: MockBackendService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminClientsComponent, { className: "AdminClientsComponent", filePath: "src/app/features/admin/clients/admin-clients.component.ts", lineNumber: 23 });
})();
export {
  AdminClientsComponent
};
//# sourceMappingURL=chunk-AVRZMRNQ.js.map
