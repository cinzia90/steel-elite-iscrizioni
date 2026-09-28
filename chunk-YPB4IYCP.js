import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NumberValueAccessor,
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

// src/app/features/admin/settings/admin-settings.component.ts
function AdminSettingsComponent_Conditional_3_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
function AdminSettingsComponent_Conditional_3_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.infoMessage());
  }
}
function AdminSettingsComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 2);
    \u0275\u0275listener("ngSubmit", function AdminSettingsComponent_Conditional_3_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementStart(1, "label");
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "input", 3);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSettingsComponent_Conditional_3_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.gymName, $event) || (ctx_r1.gymName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "label");
    \u0275\u0275text(5);
    \u0275\u0275elementStart(6, "input", 4);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSettingsComponent_Conditional_3_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.antiPassbackMinutes, $event) || (ctx_r1.antiPassbackMinutes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "label", 5)(8, "input", 6);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSettingsComponent_Conditional_3_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.requireApprovedCertificate, $event) || (ctx_r1.requireApprovedCertificate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "label");
    \u0275\u0275text(11);
    \u0275\u0275elementStart(12, "input", 7);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSettingsComponent_Conditional_3_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.certificateGraceDays, $event) || (ctx_r1.certificateGraceDays = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "label");
    \u0275\u0275text(14);
    \u0275\u0275elementStart(15, "input", 8);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSettingsComponent_Conditional_3_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.registrationFeeEuro, $event) || (ctx_r1.registrationFeeEuro = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "label");
    \u0275\u0275text(17);
    \u0275\u0275elementStart(18, "input", 9);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSettingsComponent_Conditional_3_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.whatsappSupport, $event) || (ctx_r1.whatsappSupport = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(19, AdminSettingsComponent_Conditional_3_Conditional_19_Template, 2, 1, "p", 10)(20, AdminSettingsComponent_Conditional_3_Conditional_20_Template, 2, 1, "p", 11);
    \u0275\u0275elementStart(21, "button", 12);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t.gymName, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.gymName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t.antiPassbackMinutes, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.antiPassbackMinutes);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.requireApprovedCertificate);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.t.requireApprovedCertificate, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t.certificateGraceDays, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.certificateGraceDays);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t.registrationFeeEuro, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.registrationFeeEuro);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t.whatsappSupport, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.whatsappSupport);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.errorMessage() ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.infoMessage() ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.t.save);
  }
}
var AdminSettingsComponent = class _AdminSettingsComponent {
  supabase;
  mock;
  t = it.admin.settings;
  loading = signal(true);
  saving = signal(false);
  infoMessage = signal(null);
  errorMessage = signal(null);
  gymName = "";
  antiPassbackMinutes = 120;
  requireApprovedCertificate = true;
  certificateGraceDays = 10;
  registrationFeeEuro = 30;
  whatsappSupport = "";
  constructor(supabase, mock) {
    this.supabase = supabase;
    this.mock = mock;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      if (environment.mock) {
        const settings = this.mock.getSettings();
        this.gymName = settings.gym_name;
        this.antiPassbackMinutes = settings.anti_passback_minutes;
        this.requireApprovedCertificate = settings.require_approved_certificate;
        this.certificateGraceDays = settings.certificate_grace_days;
        this.registrationFeeEuro = settings.registration_fee_cents / 100;
        this.whatsappSupport = settings.whatsapp_support ?? "";
        this.loading.set(false);
        return;
      }
      const { data } = yield this.supabase.client.from("settings").select("*").single();
      if (data) {
        this.gymName = data.gym_name;
        this.antiPassbackMinutes = data.anti_passback_minutes;
        this.requireApprovedCertificate = data.require_approved_certificate;
        this.certificateGraceDays = data.certificate_grace_days;
        this.registrationFeeEuro = data.registration_fee_cents / 100;
        this.whatsappSupport = data.whatsapp_support ?? "";
      }
      this.loading.set(false);
    });
  }
  save() {
    return __async(this, null, function* () {
      this.errorMessage.set(null);
      this.infoMessage.set(null);
      this.saving.set(true);
      const payload = {
        gym_name: this.gymName,
        anti_passback_minutes: this.antiPassbackMinutes,
        require_approved_certificate: this.requireApprovedCertificate,
        certificate_grace_days: this.certificateGraceDays,
        registration_fee_cents: Math.round(this.registrationFeeEuro * 100),
        whatsapp_support: this.whatsappSupport || null
      };
      if (environment.mock) {
        this.mock.saveSettings(payload);
        this.saving.set(false);
        this.infoMessage.set(this.t.saved);
        return;
      }
      const { error } = yield this.supabase.client.from("settings").update(payload).eq("id", true);
      this.saving.set(false);
      if (error) {
        this.errorMessage.set(this.t.errorGeneric);
        return;
      }
      this.infoMessage.set(this.t.saved);
    });
  }
  static \u0275fac = function AdminSettingsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminSettingsComponent)(\u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(MockBackendService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminSettingsComponent, selectors: [["app-admin-settings"]], decls: 4, vars: 2, consts: [[1, "settings-page"], [1, "settings-form"], [1, "settings-form", 3, "ngSubmit"], ["type", "text", "name", "gymName", 3, "ngModelChange", "ngModel"], ["type", "number", "name", "antiPassbackMinutes", 3, "ngModelChange", "ngModel"], [1, "checkbox"], ["type", "checkbox", "name", "requireApprovedCertificate", 3, "ngModelChange", "ngModel"], ["type", "number", "name", "certificateGraceDays", 3, "ngModelChange", "ngModel"], ["type", "number", "step", "0.01", "name", "registrationFeeEuro", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "whatsappSupport", 3, "ngModelChange", "ngModel"], [1, "status", "error"], [1, "status", "success"], ["type", "submit", 3, "disabled"]], template: function AdminSettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1");
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275template(3, AdminSettingsComponent_Conditional_3_Template, 23, 16, "form", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.t.title);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() ? 3 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm], styles: ["\n\n.settings-page[_ngcontent-%COMP%] {\n  max-width: 480px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\nh1[_ngcontent-%COMP%] {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n  margin-bottom: var(--se-space-3);\n}\n.settings-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-3);\n  padding: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-md);\n}\nlabel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\n.checkbox[_ngcontent-%COMP%] {\n  flex-direction: row;\n  align-items: center;\n  gap: var(--se-space-2);\n}\ninput[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 8px 10px;\n  color: var(--se-silver);\n  font-size: 14px;\n}\n.status.error[_ngcontent-%COMP%] {\n  color: #e05c5c;\n  font-size: 13px;\n}\n.status.success[_ngcontent-%COMP%] {\n  color: #4caf6f;\n  font-size: 13px;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 10px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=admin-settings.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminSettingsComponent, [{
    type: Component,
    args: [{ selector: "app-admin-settings", standalone: true, imports: [CommonModule, FormsModule], template: '<div class="settings-page">\n  <h1>{{ t.title }}</h1>\n\n  @if (!loading()) {\n    <form class="settings-form" (ngSubmit)="save()">\n      <label>\n        {{ t.gymName }}\n        <input type="text" name="gymName" [(ngModel)]="gymName" />\n      </label>\n\n      <label>\n        {{ t.antiPassbackMinutes }}\n        <input type="number" name="antiPassbackMinutes" [(ngModel)]="antiPassbackMinutes" />\n      </label>\n\n      <label class="checkbox">\n        <input type="checkbox" name="requireApprovedCertificate" [(ngModel)]="requireApprovedCertificate" />\n        {{ t.requireApprovedCertificate }}\n      </label>\n\n      <label>\n        {{ t.certificateGraceDays }}\n        <input type="number" name="certificateGraceDays" [(ngModel)]="certificateGraceDays" />\n      </label>\n\n      <label>\n        {{ t.registrationFeeEuro }}\n        <input type="number" step="0.01" name="registrationFeeEuro" [(ngModel)]="registrationFeeEuro" />\n      </label>\n\n      <label>\n        {{ t.whatsappSupport }}\n        <input type="text" name="whatsappSupport" [(ngModel)]="whatsappSupport" />\n      </label>\n\n      @if (errorMessage()) {\n        <p class="status error">{{ errorMessage() }}</p>\n      }\n      @if (infoMessage()) {\n        <p class="status success">{{ infoMessage() }}</p>\n      }\n\n      <button type="submit" [disabled]="saving()">{{ t.save }}</button>\n    </form>\n  }\n</div>\n', styles: ["/* src/app/features/admin/settings/admin-settings.component.scss */\n.settings-page {\n  max-width: 480px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\nh1 {\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n  margin-bottom: var(--se-space-3);\n}\n.settings-form {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-3);\n  padding: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-md);\n}\nlabel {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\n.checkbox {\n  flex-direction: row;\n  align-items: center;\n  gap: var(--se-space-2);\n}\ninput {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 8px 10px;\n  color: var(--se-silver);\n  font-size: 14px;\n}\n.status.error {\n  color: #e05c5c;\n  font-size: 13px;\n}\n.status.success {\n  color: #4caf6f;\n  font-size: 13px;\n}\nbutton {\n  padding: 10px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=admin-settings.component.css.map */\n"] }]
  }], () => [{ type: SupabaseService }, { type: MockBackendService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminSettingsComponent, { className: "AdminSettingsComponent", filePath: "src/app/features/admin/settings/admin-settings.component.ts", lineNumber: 16 });
})();
export {
  AdminSettingsComponent
};
//# sourceMappingURL=chunk-YPB4IYCP.js.map
