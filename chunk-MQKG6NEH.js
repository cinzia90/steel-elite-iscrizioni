import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-QKULHZCD.js";

// src/app/features/admin/plans/admin-plans.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AdminPlansComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function AdminPlansComponent_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startNew());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.t.newPlan);
  }
}
function AdminPlansComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
function AdminPlansComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 7);
    \u0275\u0275listener("ngSubmit", function AdminPlansComponent_Conditional_6_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementStart(1, "label");
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "input", 8);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlansComponent_Conditional_6_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.name, $event) || (ctx_r1.form.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "label");
    \u0275\u0275text(5);
    \u0275\u0275elementStart(6, "input", 9);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlansComponent_Conditional_6_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.description, $event) || (ctx_r1.form.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "label");
    \u0275\u0275text(8);
    \u0275\u0275elementStart(9, "select", 10);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlansComponent_Conditional_6_Template_select_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.category, $event) || (ctx_r1.form.category = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(10, "option", 11);
    \u0275\u0275text(11, "Open");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "option", 12);
    \u0275\u0275text(13, "PT Privato");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "option", 13);
    \u0275\u0275text(15, "PT Small Group");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "label");
    \u0275\u0275text(17);
    \u0275\u0275elementStart(18, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlansComponent_Conditional_6_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.priceEuro, $event) || (ctx_r1.form.priceEuro = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "label");
    \u0275\u0275text(20);
    \u0275\u0275elementStart(21, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlansComponent_Conditional_6_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.durationDays, $event) || (ctx_r1.form.durationDays = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "label");
    \u0275\u0275text(23);
    \u0275\u0275elementStart(24, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlansComponent_Conditional_6_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.sessionCount, $event) || (ctx_r1.form.sessionCount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "label", 17)(26, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlansComponent_Conditional_6_Template_input_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.isRecurring, $event) || (ctx_r1.form.isRecurring = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "label", 17)(29, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlansComponent_Conditional_6_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.active, $event) || (ctx_r1.form.active = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 20)(32, "button", 21);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "button", 22);
    \u0275\u0275listener("click", function AdminPlansComponent_Conditional_6_Template_button_click_34_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancel());
    });
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t.name, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t.description, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t.category, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.category);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t.priceEuro, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.priceEuro);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t.durationDays, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.durationDays);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t.sessionCount, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.sessionCount);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.isRecurring);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.t.recurring, " ");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.active);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.t.active, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t.save);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t.cancel);
  }
}
function AdminPlansComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 24)(2, "span", 25);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 26);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 20)(7, "button", 6);
    \u0275\u0275listener("click", function AdminPlansComponent_For_9_Template_button_click_7_listener() {
      const plan_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startEdit(plan_r5));
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 6);
    \u0275\u0275listener("click", function AdminPlansComponent_For_9_Template_button_click_9_listener() {
      const plan_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleActive(plan_r5));
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const plan_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("inactive", !plan_r5.active);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(plan_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", plan_r5.category, " \xB7 ", (plan_r5.price_cents / 100).toFixed(2), " \u20AC");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t.edit);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plan_r5.active ? ctx_r1.t.deactivate : ctx_r1.t.activate);
  }
}
function emptyForm() {
  return {
    id: null,
    name: "",
    description: "",
    category: "open",
    priceEuro: 0,
    durationDays: null,
    sessionCount: null,
    isRecurring: false,
    stripePriceId: "",
    active: true
  };
}
var AdminPlansComponent = class _AdminPlansComponent {
  supabase;
  mock;
  t = it.admin.plans;
  plans = signal([]);
  loading = signal(true);
  errorMessage = signal(null);
  editing = signal(false);
  form = emptyForm();
  constructor(supabase, mock) {
    this.supabase = supabase;
    this.mock = mock;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.load();
    });
  }
  load() {
    return __async(this, null, function* () {
      this.loading.set(true);
      if (environment.mock) {
        this.plans.set(this.mock.listAllPlans());
        this.loading.set(false);
        return;
      }
      const { data } = yield this.supabase.client.from("plans").select("*").order("sort_order", { ascending: true });
      this.plans.set(data ?? []);
      this.loading.set(false);
    });
  }
  startNew() {
    this.form = emptyForm();
    this.editing.set(true);
  }
  startEdit(plan) {
    this.form = {
      id: plan.id,
      name: plan.name,
      description: plan.description ?? "",
      category: plan.category,
      priceEuro: plan.price_cents / 100,
      durationDays: plan.duration_days,
      sessionCount: plan.session_count,
      isRecurring: plan.is_recurring,
      stripePriceId: "",
      active: plan.active
    };
    this.editing.set(true);
  }
  cancel() {
    this.editing.set(false);
  }
  save() {
    return __async(this, null, function* () {
      this.errorMessage.set(null);
      const payload = {
        name: this.form.name,
        description: this.form.description || null,
        category: this.form.category,
        price_cents: Math.round(this.form.priceEuro * 100),
        duration_days: this.form.durationDays,
        session_count: this.form.sessionCount,
        is_recurring: this.form.isRecurring,
        stripe_price_id: this.form.stripePriceId || null,
        active: this.form.active
      };
      if (environment.mock) {
        this.mock.savePlan(this.form.id, payload);
        this.editing.set(false);
        yield this.load();
        return;
      }
      const { error } = this.form.id ? yield this.supabase.client.from("plans").update(payload).eq("id", this.form.id) : yield this.supabase.client.from("plans").insert(payload);
      if (error) {
        this.errorMessage.set(this.t.errorGeneric);
        return;
      }
      this.editing.set(false);
      yield this.load();
    });
  }
  toggleActive(plan) {
    return __async(this, null, function* () {
      if (environment.mock) {
        this.mock.togglePlanActive(plan.id);
        yield this.load();
        return;
      }
      const { error } = yield this.supabase.client.from("plans").update({ active: !plan.active }).eq("id", plan.id);
      if (error) {
        this.errorMessage.set(this.t.errorGeneric);
        return;
      }
      yield this.load();
    });
  }
  static \u0275fac = function AdminPlansComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminPlansComponent)(\u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(MockBackendService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminPlansComponent, selectors: [["app-admin-plans"]], decls: 10, vars: 4, consts: [[1, "plans-page"], [1, "header-row"], [1, "status", "error"], [1, "plan-form"], [1, "plans-list"], [1, "plan-row", 3, "inactive"], [3, "click"], [1, "plan-form", 3, "ngSubmit"], ["type", "text", "name", "name", "required", "", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "description", 3, "ngModelChange", "ngModel"], ["name", "category", 3, "ngModelChange", "ngModel"], ["value", "open"], ["value", "pt_privato"], ["value", "pt_small_group"], ["type", "number", "step", "0.01", "name", "priceEuro", "required", "", 3, "ngModelChange", "ngModel"], ["type", "number", "name", "durationDays", 3, "ngModelChange", "ngModel"], ["type", "number", "name", "sessionCount", 3, "ngModelChange", "ngModel"], [1, "checkbox"], ["type", "checkbox", "name", "isRecurring", 3, "ngModelChange", "ngModel"], ["type", "checkbox", "name", "active", 3, "ngModelChange", "ngModel"], [1, "actions"], ["type", "submit"], ["type", "button", 3, "click"], [1, "plan-row"], [1, "info"], [1, "name"], [1, "meta"]], template: function AdminPlansComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, AdminPlansComponent_Conditional_4_Template, 2, 1, "button");
      \u0275\u0275elementEnd();
      \u0275\u0275template(5, AdminPlansComponent_Conditional_5_Template, 2, 1, "p", 2)(6, AdminPlansComponent_Conditional_6_Template, 36, 18, "form", 3);
      \u0275\u0275elementStart(7, "div", 4);
      \u0275\u0275repeaterCreate(8, AdminPlansComponent_For_9_Template, 11, 7, "div", 5, _forTrack0);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.t.title);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.editing() ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.editing() ? 6 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.plans());
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ["\n\n.plans-page[_ngcontent-%COMP%] {\n  max-width: 640px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\n.header-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: var(--se-space-3);\n}\nh1[_ngcontent-%COMP%] {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n}\n.status[_ngcontent-%COMP%] {\n  color: var(--se-silver-dark);\n}\n.status.error[_ngcontent-%COMP%] {\n  color: #e05c5c;\n}\n.plan-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-2);\n  padding: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-md);\n  margin-bottom: var(--se-space-3);\n}\nlabel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\n.checkbox[_ngcontent-%COMP%] {\n  flex-direction: row;\n  align-items: center;\n  gap: var(--se-space-2);\n}\ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 8px 10px;\n  color: var(--se-silver);\n  font-size: 14px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--se-space-2);\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n  font-size: 13px;\n}\n.plans-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-2);\n}\n.plan-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--se-space-2) var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: var(--se-radius-sm);\n}\n.plan-row.inactive[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.name[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--se-silver-dark);\n}\n/*# sourceMappingURL=admin-plans.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminPlansComponent, [{
    type: Component,
    args: [{ selector: "app-admin-plans", standalone: true, imports: [CommonModule, FormsModule], template: '<div class="plans-page">\n  <div class="header-row">\n    <h1>{{ t.title }}</h1>\n    @if (!editing()) {\n      <button (click)="startNew()">{{ t.newPlan }}</button>\n    }\n  </div>\n\n  @if (errorMessage()) {\n    <p class="status error">{{ errorMessage() }}</p>\n  }\n\n  @if (editing()) {\n    <form class="plan-form" (ngSubmit)="save()">\n      <label>\n        {{ t.name }}\n        <input type="text" name="name" [(ngModel)]="form.name" required />\n      </label>\n\n      <label>\n        {{ t.description }}\n        <input type="text" name="description" [(ngModel)]="form.description" />\n      </label>\n\n      <label>\n        {{ t.category }}\n        <select name="category" [(ngModel)]="form.category">\n          <option value="open">Open</option>\n          <option value="pt_privato">PT Privato</option>\n          <option value="pt_small_group">PT Small Group</option>\n        </select>\n      </label>\n\n      <label>\n        {{ t.priceEuro }}\n        <input type="number" step="0.01" name="priceEuro" [(ngModel)]="form.priceEuro" required />\n      </label>\n\n      <label>\n        {{ t.durationDays }}\n        <input type="number" name="durationDays" [(ngModel)]="form.durationDays" />\n      </label>\n\n      <label>\n        {{ t.sessionCount }}\n        <input type="number" name="sessionCount" [(ngModel)]="form.sessionCount" />\n      </label>\n\n      <label class="checkbox">\n        <input type="checkbox" name="isRecurring" [(ngModel)]="form.isRecurring" />\n        {{ t.recurring }}\n      </label>\n\n      <label class="checkbox">\n        <input type="checkbox" name="active" [(ngModel)]="form.active" />\n        {{ t.active }}\n      </label>\n\n      <div class="actions">\n        <button type="submit">{{ t.save }}</button>\n        <button type="button" (click)="cancel()">{{ t.cancel }}</button>\n      </div>\n    </form>\n  }\n\n  <div class="plans-list">\n    @for (plan of plans(); track plan.id) {\n      <div class="plan-row" [class.inactive]="!plan.active">\n        <div class="info">\n          <span class="name">{{ plan.name }}</span>\n          <span class="meta">{{ plan.category }} \xB7 {{ (plan.price_cents / 100).toFixed(2) }} \u20AC</span>\n        </div>\n        <div class="actions">\n          <button (click)="startEdit(plan)">{{ t.edit }}</button>\n          <button (click)="toggleActive(plan)">{{ plan.active ? t.deactivate : t.activate }}</button>\n        </div>\n      </div>\n    }\n  </div>\n</div>\n', styles: ["/* src/app/features/admin/plans/admin-plans.component.scss */\n.plans-page {\n  max-width: 640px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\n.header-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: var(--se-space-3);\n}\nh1 {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n}\n.status {\n  color: var(--se-silver-dark);\n}\n.status.error {\n  color: #e05c5c;\n}\n.plan-form {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-2);\n  padding: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-md);\n  margin-bottom: var(--se-space-3);\n}\nlabel {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\n.checkbox {\n  flex-direction: row;\n  align-items: center;\n  gap: var(--se-space-2);\n}\ninput,\nselect {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 8px 10px;\n  color: var(--se-silver);\n  font-size: 14px;\n}\n.actions {\n  display: flex;\n  gap: var(--se-space-2);\n}\nbutton {\n  padding: 8px 14px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n  font-size: 13px;\n}\n.plans-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-2);\n}\n.plan-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--se-space-2) var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: var(--se-radius-sm);\n}\n.plan-row.inactive {\n  opacity: 0.5;\n}\n.info {\n  display: flex;\n  flex-direction: column;\n}\n.name {\n  font-weight: 600;\n}\n.meta {\n  font-size: 12px;\n  color: var(--se-silver-dark);\n}\n/*# sourceMappingURL=admin-plans.component.css.map */\n"] }]
  }], () => [{ type: SupabaseService }, { type: MockBackendService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminPlansComponent, { className: "AdminPlansComponent", filePath: "src/app/features/admin/plans/admin-plans.component.ts", lineNumber: 45 });
})();
export {
  AdminPlansComponent
};
//# sourceMappingURL=chunk-MQKG6NEH.js.map
