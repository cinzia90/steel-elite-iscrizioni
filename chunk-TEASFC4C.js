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
} from "./chunk-VDIJZGGP.js";
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
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
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

// src/app/features/admin/staff/admin-staff.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AdminStaffComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function AdminStaffComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.infoMessage());
  }
}
function AdminStaffComponent_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "span", 11);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 12);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 13);
    \u0275\u0275listener("click", function AdminStaffComponent_For_21_Template_button_click_8_listener() {
      const member_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggle(member_r3));
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const member_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", member_r3.firstName, " ", member_r3.lastName, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(member_r3.email);
    \u0275\u0275advance();
    \u0275\u0275classProp("active-badge", !member_r3.disabled)("disabled-badge", member_r3.disabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", member_r3.disabled ? ctx_r0.t.disabled : ctx_r0.t.active, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(member_r3.disabled ? ctx_r0.t.enable : ctx_r0.t.disable);
  }
}
var AdminStaffComponent = class _AdminStaffComponent {
  supabase;
  mock;
  t = it.admin.staff;
  staff = signal([]);
  loading = signal(true);
  inviting = signal(false);
  errorMessage = signal(null);
  infoMessage = signal(null);
  email = "";
  firstName = "";
  lastName = "";
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
        this.staff.set(this.mock.listStaff());
        this.loading.set(false);
        return;
      }
      const { data } = yield this.supabase.client.functions.invoke("admin-staff", {
        body: { action: "list" }
      });
      this.staff.set(data?.staff ?? []);
      this.loading.set(false);
    });
  }
  invite() {
    return __async(this, null, function* () {
      this.errorMessage.set(null);
      this.infoMessage.set(null);
      this.inviting.set(true);
      if (environment.mock) {
        this.mock.inviteStaff(this.email, this.firstName, this.lastName);
        this.inviting.set(false);
        this.infoMessage.set(this.t.inviteSent);
        this.email = "";
        this.firstName = "";
        this.lastName = "";
        yield this.load();
        return;
      }
      const { error } = yield this.supabase.client.functions.invoke("admin-staff", {
        body: { action: "invite", email: this.email, firstName: this.firstName, lastName: this.lastName }
      });
      this.inviting.set(false);
      if (error) {
        this.errorMessage.set(this.t.errorGeneric);
        return;
      }
      this.infoMessage.set(this.t.inviteSent);
      this.email = "";
      this.firstName = "";
      this.lastName = "";
      yield this.load();
    });
  }
  toggle(member) {
    return __async(this, null, function* () {
      this.errorMessage.set(null);
      if (environment.mock) {
        this.mock.toggleStaffDisabled(member.id);
        yield this.load();
        return;
      }
      const { error } = yield this.supabase.client.functions.invoke("admin-staff", {
        body: { action: member.disabled ? "enable" : "disable", userId: member.id }
      });
      if (error) {
        this.errorMessage.set(this.t.errorGeneric);
        return;
      }
      yield this.load();
    });
  }
  static \u0275fac = function AdminStaffComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminStaffComponent)(\u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(MockBackendService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminStaffComponent, selectors: [["app-admin-staff"]], decls: 22, vars: 12, consts: [[1, "staff-page"], [1, "invite-form", 3, "ngSubmit"], ["type", "email", "name", "email", "required", "", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "firstName", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "lastName", 3, "ngModelChange", "ngModel"], [1, "status", "error"], [1, "status", "success"], ["type", "submit", 3, "disabled"], [1, "staff-list"], [1, "staff-row"], [1, "info"], [1, "name"], [1, "email"], [3, "click"]], template: function AdminStaffComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1");
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "form", 1);
      \u0275\u0275listener("ngSubmit", function AdminStaffComponent_Template_form_ngSubmit_3_listener() {
        return ctx.invite();
      });
      \u0275\u0275elementStart(4, "h2");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "label");
      \u0275\u0275text(7);
      \u0275\u0275elementStart(8, "input", 2);
      \u0275\u0275twoWayListener("ngModelChange", function AdminStaffComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "label");
      \u0275\u0275text(10);
      \u0275\u0275elementStart(11, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function AdminStaffComponent_Template_input_ngModelChange_11_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.firstName, $event) || (ctx.firstName = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "label");
      \u0275\u0275text(13);
      \u0275\u0275elementStart(14, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function AdminStaffComponent_Template_input_ngModelChange_14_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.lastName, $event) || (ctx.lastName = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(15, AdminStaffComponent_Conditional_15_Template, 2, 1, "p", 5)(16, AdminStaffComponent_Conditional_16_Template, 2, 1, "p", 6);
      \u0275\u0275elementStart(17, "button", 7);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 8);
      \u0275\u0275repeaterCreate(20, AdminStaffComponent_For_21_Template, 10, 9, "div", 9, _forTrack0);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.title);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.t.inviteTitle);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.t.email, " ");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.email);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.t.firstName, " ");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.firstName);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.t.lastName, " ");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.lastName);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.infoMessage() ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.inviting());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.inviting() ? ctx.t.inviting : ctx.t.invite, " ");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.staff());
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ["\n\n.staff-page[_ngcontent-%COMP%] {\n  max-width: 560px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\nh1[_ngcontent-%COMP%] {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n  margin-bottom: var(--se-space-3);\n}\n.invite-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-2);\n  padding: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-md);\n  margin-bottom: var(--se-space-4);\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--se-gold);\n  margin: 0 0 var(--se-space-1);\n}\nlabel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\ninput[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 8px 10px;\n  color: var(--se-silver);\n  font-size: 14px;\n}\n.status.error[_ngcontent-%COMP%] {\n  color: #e05c5c;\n  font-size: 13px;\n}\n.status.success[_ngcontent-%COMP%] {\n  color: #4caf6f;\n  font-size: 13px;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.staff-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-2);\n}\n.staff-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--se-space-3);\n  padding: var(--se-space-2) var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: var(--se-radius-sm);\n}\n.info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.name[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.email[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--se-silver-dark);\n}\n.active-badge[_ngcontent-%COMP%] {\n  color: #4caf6f;\n  font-size: 12px;\n}\n.disabled-badge[_ngcontent-%COMP%] {\n  color: #e05c5c;\n  font-size: 12px;\n}\n/*# sourceMappingURL=admin-staff.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminStaffComponent, [{
    type: Component,
    args: [{ selector: "app-admin-staff", standalone: true, imports: [CommonModule, FormsModule], template: '<div class="staff-page">\n  <h1>{{ t.title }}</h1>\n\n  <form class="invite-form" (ngSubmit)="invite()">\n    <h2>{{ t.inviteTitle }}</h2>\n\n    <label>\n      {{ t.email }}\n      <input type="email" name="email" [(ngModel)]="email" required />\n    </label>\n    <label>\n      {{ t.firstName }}\n      <input type="text" name="firstName" [(ngModel)]="firstName" />\n    </label>\n    <label>\n      {{ t.lastName }}\n      <input type="text" name="lastName" [(ngModel)]="lastName" />\n    </label>\n\n    @if (errorMessage()) {\n      <p class="status error">{{ errorMessage() }}</p>\n    }\n    @if (infoMessage()) {\n      <p class="status success">{{ infoMessage() }}</p>\n    }\n\n    <button type="submit" [disabled]="inviting()">\n      {{ inviting() ? t.inviting : t.invite }}\n    </button>\n  </form>\n\n  <div class="staff-list">\n    @for (member of staff(); track member.id) {\n      <div class="staff-row">\n        <div class="info">\n          <span class="name">{{ member.firstName }} {{ member.lastName }}</span>\n          <span class="email">{{ member.email }}</span>\n        </div>\n        <span [class.active-badge]="!member.disabled" [class.disabled-badge]="member.disabled">\n          {{ member.disabled ? t.disabled : t.active }}\n        </span>\n        <button (click)="toggle(member)">{{ member.disabled ? t.enable : t.disable }}</button>\n      </div>\n    }\n  </div>\n</div>\n', styles: ["/* src/app/features/admin/staff/admin-staff.component.scss */\n.staff-page {\n  max-width: 560px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\nh1 {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n  margin-bottom: var(--se-space-3);\n}\n.invite-form {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-2);\n  padding: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-md);\n  margin-bottom: var(--se-space-4);\n}\nh2 {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--se-gold);\n  margin: 0 0 var(--se-space-1);\n}\nlabel {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\ninput {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 8px 10px;\n  color: var(--se-silver);\n  font-size: 14px;\n}\n.status.error {\n  color: #e05c5c;\n  font-size: 13px;\n}\n.status.success {\n  color: #4caf6f;\n  font-size: 13px;\n}\nbutton {\n  padding: 10px 16px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.staff-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-2);\n}\n.staff-row {\n  display: flex;\n  align-items: center;\n  gap: var(--se-space-3);\n  padding: var(--se-space-2) var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: var(--se-radius-sm);\n}\n.info {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.name {\n  font-weight: 600;\n}\n.email {\n  font-size: 12px;\n  color: var(--se-silver-dark);\n}\n.active-badge {\n  color: #4caf6f;\n  font-size: 12px;\n}\n.disabled-badge {\n  color: #e05c5c;\n  font-size: 12px;\n}\n/*# sourceMappingURL=admin-staff.component.css.map */\n"] }]
  }], () => [{ type: SupabaseService }, { type: MockBackendService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminStaffComponent, { className: "AdminStaffComponent", filePath: "src/app/features/admin/staff/admin-staff.component.ts", lineNumber: 24 });
})();
export {
  AdminStaffComponent
};
//# sourceMappingURL=chunk-TEASFC4C.js.map
