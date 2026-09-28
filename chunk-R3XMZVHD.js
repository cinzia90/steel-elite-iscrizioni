import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-XXIBBBHG.js";
import {
  it
} from "./chunk-THOMXI5H.js";
import {
  MockBackendService,
  SupabaseService,
  environment
} from "./chunk-DLQI4DZU.js";
import {
  CommonModule,
  Component,
  DatePipe,
  __async,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-QKULHZCD.js";

// src/app/features/admin/access-logs/admin-access-logs.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AdminAccessLogsComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t.empty);
  }
}
function AdminAccessLogsComponent_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const log_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 8, log_r2.scanned_at, "short"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.memberName(log_r2));
    \u0275\u0275advance();
    \u0275\u0275classProp("granted", log_r2.result === "granted")("denied", log_r2.result === "denied");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", log_r2.result, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(log_r2.reason);
  }
}
var AdminAccessLogsComponent = class _AdminAccessLogsComponent {
  supabase;
  mock;
  t = it.admin.accessLogs;
  logs = signal([]);
  loading = signal(true);
  dateFrom = "";
  dateTo = "";
  result = "";
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
        this.logs.set(this.mock.listAccessLogs({ dateFrom: this.dateFrom, dateTo: this.dateTo, result: this.result }));
        this.loading.set(false);
        return;
      }
      let request = this.supabase.client.from("access_logs").select("id, scanned_at, result, reason, profiles ( first_name, last_name )").order("scanned_at", { ascending: false }).limit(200);
      if (this.dateFrom) {
        request = request.gte("scanned_at", `${this.dateFrom}T00:00:00`);
      }
      if (this.dateTo) {
        request = request.lte("scanned_at", `${this.dateTo}T23:59:59`);
      }
      if (this.result) {
        request = request.eq("result", this.result);
      }
      const { data } = yield request;
      this.logs.set(data ?? []);
      this.loading.set(false);
    });
  }
  memberName(log) {
    if (log.memberName) {
      return log.memberName;
    }
    const profile = log.profiles;
    return profile ? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim() : "\u2014";
  }
  exportCsv() {
    const header = "Data,Cliente,Esito,Motivo\n";
    const rows = this.logs().map((log) => [log.scanned_at, this.memberName(log), log.result, log.reason ?? ""].map(csvEscape).join(",")).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ingressi-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
  static \u0275fac = function AdminAccessLogsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminAccessLogsComponent)(\u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(MockBackendService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminAccessLogsComponent, selectors: [["app-admin-access-logs"]], decls: 25, vars: 12, consts: [[1, "logs-page"], [1, "filters"], ["type", "date", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], ["value", ""], ["value", "granted"], ["value", "denied"], [3, "click"], [1, "status"], [1, "logs-list"], [1, "log-row"]], template: function AdminAccessLogsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1");
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 1)(4, "label");
      \u0275\u0275text(5);
      \u0275\u0275elementStart(6, "input", 2);
      \u0275\u0275twoWayListener("ngModelChange", function AdminAccessLogsComponent_Template_input_ngModelChange_6_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.dateFrom, $event) || (ctx.dateFrom = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function AdminAccessLogsComponent_Template_input_ngModelChange_6_listener() {
        return ctx.search();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "label");
      \u0275\u0275text(8);
      \u0275\u0275elementStart(9, "input", 2);
      \u0275\u0275twoWayListener("ngModelChange", function AdminAccessLogsComponent_Template_input_ngModelChange_9_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.dateTo, $event) || (ctx.dateTo = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function AdminAccessLogsComponent_Template_input_ngModelChange_9_listener() {
        return ctx.search();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "label");
      \u0275\u0275text(11);
      \u0275\u0275elementStart(12, "select", 3);
      \u0275\u0275twoWayListener("ngModelChange", function AdminAccessLogsComponent_Template_select_ngModelChange_12_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.result, $event) || (ctx.result = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function AdminAccessLogsComponent_Template_select_ngModelChange_12_listener() {
        return ctx.search();
      });
      \u0275\u0275elementStart(13, "option", 4);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "option", 5);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "option", 6);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "button", 7);
      \u0275\u0275listener("click", function AdminAccessLogsComponent_Template_button_click_19_listener() {
        return ctx.exportCsv();
      });
      \u0275\u0275text(20);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(21, AdminAccessLogsComponent_Conditional_21_Template, 2, 1, "p", 8);
      \u0275\u0275elementStart(22, "div", 9);
      \u0275\u0275repeaterCreate(23, AdminAccessLogsComponent_For_24_Template, 10, 11, "div", 10, _forTrack0);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.title);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.t.dateFrom, " ");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.dateFrom);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.t.dateTo, " ");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.dateTo);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.t.result, " ");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.result);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.allResults);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.granted);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.denied);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.exportCsv);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && ctx.logs().length === 0 ? 21 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.logs());
    }
  }, dependencies: [CommonModule, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.logs-page[_ngcontent-%COMP%] {\n  max-width: 720px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\nh1[_ngcontent-%COMP%] {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n  margin-bottom: var(--se-space-3);\n}\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  gap: var(--se-space-2);\n  margin-bottom: var(--se-space-3);\n}\nlabel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 12px;\n  color: var(--se-silver-dark);\n}\ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 8px 10px;\n  color: var(--se-silver);\n  font-size: 13px;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 9px 14px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n  font-size: 13px;\n}\n.status[_ngcontent-%COMP%] {\n  color: var(--se-silver-dark);\n}\n.logs-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.log-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 100px 1fr;\n  gap: var(--se-space-2);\n  padding: var(--se-space-2);\n  font-size: 12px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n}\n.granted[_ngcontent-%COMP%] {\n  color: #4caf6f;\n}\n.denied[_ngcontent-%COMP%] {\n  color: #e05c5c;\n}\n/*# sourceMappingURL=admin-access-logs.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminAccessLogsComponent, [{
    type: Component,
    args: [{ selector: "app-admin-access-logs", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="logs-page">
  <h1>{{ t.title }}</h1>

  <div class="filters">
    <label>
      {{ t.dateFrom }}
      <input type="date" [(ngModel)]="dateFrom" (ngModelChange)="search()" />
    </label>
    <label>
      {{ t.dateTo }}
      <input type="date" [(ngModel)]="dateTo" (ngModelChange)="search()" />
    </label>
    <label>
      {{ t.result }}
      <select [(ngModel)]="result" (ngModelChange)="search()">
        <option value="">{{ t.allResults }}</option>
        <option value="granted">{{ t.granted }}</option>
        <option value="denied">{{ t.denied }}</option>
      </select>
    </label>
    <button (click)="exportCsv()">{{ t.exportCsv }}</button>
  </div>

  @if (!loading() && logs().length === 0) {
    <p class="status">{{ t.empty }}</p>
  }

  <div class="logs-list">
    @for (log of logs(); track log.id) {
      <div class="log-row">
        <span>{{ log.scanned_at | date: 'short' }}</span>
        <span>{{ memberName(log) }}</span>
        <span [class.granted]="log.result === 'granted'" [class.denied]="log.result === 'denied'">
          {{ log.result }}
        </span>
        <span>{{ log.reason }}</span>
      </div>
    }
  </div>
</div>
`, styles: ["/* src/app/features/admin/access-logs/admin-access-logs.component.scss */\n.logs-page {\n  max-width: 720px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\nh1 {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n  margin-bottom: var(--se-space-3);\n}\n.filters {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  gap: var(--se-space-2);\n  margin-bottom: var(--se-space-3);\n}\nlabel {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 12px;\n  color: var(--se-silver-dark);\n}\ninput,\nselect {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 8px 10px;\n  color: var(--se-silver);\n  font-size: 13px;\n}\nbutton {\n  padding: 9px 14px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n  font-size: 13px;\n}\n.status {\n  color: var(--se-silver-dark);\n}\n.logs-list {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.log-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr 100px 1fr;\n  gap: var(--se-space-2);\n  padding: var(--se-space-2);\n  font-size: 12px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n}\n.granted {\n  color: #4caf6f;\n}\n.denied {\n  color: #e05c5c;\n}\n/*# sourceMappingURL=admin-access-logs.component.css.map */\n"] }]
  }], () => [{ type: SupabaseService }, { type: MockBackendService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminAccessLogsComponent, { className: "AdminAccessLogsComponent", filePath: "src/app/features/admin/access-logs/admin-access-logs.component.ts", lineNumber: 25 });
})();
function csvEscape(value) {
  return `"${value.replace(/"/g, '""')}"`;
}
export {
  AdminAccessLogsComponent
};
//# sourceMappingURL=chunk-R3XMZVHD.js.map
