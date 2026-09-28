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
  Router
} from "./chunk-NKGUCW2I.js";
import {
  AuthService
} from "./chunk-5JC44RXL.js";
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-QKULHZCD.js";

// src/app/features/signup/profile/profile.component.ts
function ProfileComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.photoPreviewUrl(), \u0275\u0275sanitizeUrl);
  }
}
function ProfileComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
var ProfileComponent = class _ProfileComponent {
  auth;
  supabase;
  mock;
  router;
  t = it.signup.profile;
  firstName = "";
  lastName = "";
  fiscalCode = "";
  birthDate = "";
  phone = "";
  address = "";
  photoFile = null;
  photoPreviewUrl = signal(null);
  loading = signal(false);
  errorMessage = signal(null);
  // true se il member ha già un abbonamento: sta ricaricando la foto (o
  // aggiornando i dati) dopo l'iscrizione, non durante il flusso iniziale —
  // dopo il salvataggio si torna alla tessera invece che al certificato.
  alreadySubscribed = signal(false);
  constructor(auth, supabase, mock, router) {
    this.auth = auth;
    this.supabase = supabase;
    this.mock = mock;
    this.router = router;
    const profile = this.auth.profile();
    if (profile) {
      this.firstName = profile.first_name ?? "";
      this.lastName = profile.last_name ?? "";
      this.fiscalCode = profile.fiscal_code ?? "";
      this.birthDate = profile.birth_date ?? "";
      this.phone = profile.phone ?? "";
      this.address = profile.address ?? "";
      if (profile.photo_path) {
        this.photoPreviewUrl.set(null);
      }
    }
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const userId = this.auth.user()?.id;
      if (!userId) {
        return;
      }
      if (environment.mock) {
        this.alreadySubscribed.set(!!this.mock.getLatestSubscription(userId));
        return;
      }
      const { data } = yield this.supabase.client.from("subscriptions").select("id").eq("member_id", userId).limit(1).maybeSingle();
      this.alreadySubscribed.set(!!data);
    });
  }
  onPhotoSelected(event) {
    const input = event.target;
    const file = input.files?.[0] ?? null;
    this.photoFile = file;
    this.photoPreviewUrl.set(file ? URL.createObjectURL(file) : null);
  }
  nextRoute() {
    return this.alreadySubscribed() ? "/tessera" : "/iscriviti/certificato";
  }
  submit() {
    return __async(this, null, function* () {
      this.errorMessage.set(null);
      if (!this.photoFile) {
        this.errorMessage.set(this.t.photoRequired);
        return;
      }
      const userId = this.auth.user()?.id;
      if (!userId) {
        return;
      }
      this.loading.set(true);
      try {
        const extension = this.photoFile.name.split(".").pop() ?? "jpg";
        const photoPath = `${userId}/photo.${extension}`;
        const profileUpdate = {
          first_name: this.firstName,
          last_name: this.lastName,
          fiscal_code: this.fiscalCode,
          birth_date: this.birthDate,
          phone: this.phone,
          address: this.address,
          photo_path: photoPath
        };
        if (environment.mock) {
          yield this.mock.uploadFile(photoPath, this.photoFile);
          yield this.mock.updateProfile(userId, profileUpdate);
        } else {
          const { error: uploadError } = yield this.supabase.client.storage.from("photos").upload(photoPath, this.photoFile, { upsert: true });
          if (uploadError) {
            throw uploadError;
          }
          const { error: updateError } = yield this.supabase.client.from("profiles").update(profileUpdate).eq("id", userId);
          if (updateError) {
            throw updateError;
          }
        }
        this.router.navigateByUrl(this.nextRoute());
      } catch {
        this.errorMessage.set(this.t.errorGeneric);
      } finally {
        this.loading.set(false);
      }
    });
  }
  static \u0275fac = function ProfileComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProfileComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(MockBackendService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileComponent, selectors: [["app-signup-profile"]], decls: 29, vars: 18, consts: [[1, "profile-page"], [1, "card", 3, "ngSubmit"], [1, "photo-label"], ["alt", "", 1, "photo-preview", 3, "src"], ["type", "file", "accept", "image/*", 3, "change"], ["type", "text", "name", "firstName", "required", "", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "lastName", "required", "", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "fiscalCode", "required", "", 3, "ngModelChange", "ngModel"], ["type", "date", "name", "birthDate", "required", "", 3, "ngModelChange", "ngModel"], ["type", "tel", "name", "phone", "required", "", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "address", "required", "", 3, "ngModelChange", "ngModel"], [1, "error"], ["type", "submit", 3, "disabled"]], template: function ProfileComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "form", 1);
      \u0275\u0275listener("ngSubmit", function ProfileComponent_Template_form_ngSubmit_1_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementStart(2, "h1");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "label", 2);
      \u0275\u0275text(5);
      \u0275\u0275template(6, ProfileComponent_Conditional_6_Template, 1, 1, "img", 3);
      \u0275\u0275elementStart(7, "input", 4);
      \u0275\u0275listener("change", function ProfileComponent_Template_input_change_7_listener($event) {
        return ctx.onPhotoSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "label");
      \u0275\u0275text(9);
      \u0275\u0275elementStart(10, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.firstName, $event) || (ctx.firstName = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "label");
      \u0275\u0275text(12);
      \u0275\u0275elementStart(13, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_13_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.lastName, $event) || (ctx.lastName = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "label");
      \u0275\u0275text(15);
      \u0275\u0275elementStart(16, "input", 7);
      \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_16_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.fiscalCode, $event) || (ctx.fiscalCode = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "label");
      \u0275\u0275text(18);
      \u0275\u0275elementStart(19, "input", 8);
      \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_19_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.birthDate, $event) || (ctx.birthDate = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "label");
      \u0275\u0275text(21);
      \u0275\u0275elementStart(22, "input", 9);
      \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_22_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.phone, $event) || (ctx.phone = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "label");
      \u0275\u0275text(24);
      \u0275\u0275elementStart(25, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_25_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.address, $event) || (ctx.address = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(26, ProfileComponent_Conditional_26_Template, 2, 1, "p", 11);
      \u0275\u0275elementStart(27, "button", 12);
      \u0275\u0275text(28);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.t.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.t.photo, " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.photoPreviewUrl() ? 6 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.t.firstName, " ");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.firstName);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.t.lastName, " ");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.lastName);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.t.fiscalCode, " ");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.fiscalCode);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.t.birthDate, " ");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.birthDate);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.t.phone, " ");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.phone);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.t.address, " ");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.address);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 26 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.loading() ? ctx.t.submitting : ctx.alreadySubscribed() ? ctx.t.submitReturning : ctx.t.submit, " ");
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ["\n\n.profile-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--se-space-4);\n}\n.card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-lg);\n  padding: var(--se-space-5) var(--se-space-4);\n}\nh1[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 0 0 var(--se-space-2);\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-1);\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\n.photo-label[_ngcontent-%COMP%] {\n  align-items: center;\n  text-align: center;\n}\n.photo-preview[_ngcontent-%COMP%] {\n  width: 96px;\n  height: 96px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid var(--se-gold);\n}\ninput[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 10px 12px;\n  color: var(--se-silver);\n  font-size: 15px;\n}\ninput[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--se-gold);\n}\ninput[type=file][_ngcontent-%COMP%] {\n  border: none;\n  padding: 0;\n  color: var(--se-silver-dark);\n}\nbutton[_ngcontent-%COMP%] {\n  margin-top: var(--se-space-2);\n  padding: 12px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.error[_ngcontent-%COMP%] {\n  color: #e05c5c;\n  font-size: 13px;\n  margin: 0;\n}\n/*# sourceMappingURL=profile.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProfileComponent, [{
    type: Component,
    args: [{ selector: "app-signup-profile", standalone: true, imports: [CommonModule, FormsModule], template: '<div class="profile-page">\n  <form class="card" (ngSubmit)="submit()">\n    <h1>{{ t.title }}</h1>\n\n    <label class="photo-label">\n      {{ t.photo }}\n      @if (photoPreviewUrl()) {\n        <img class="photo-preview" [src]="photoPreviewUrl()" alt="" />\n      }\n      <input type="file" accept="image/*" (change)="onPhotoSelected($event)" />\n    </label>\n\n    <label>\n      {{ t.firstName }}\n      <input type="text" name="firstName" [(ngModel)]="firstName" required />\n    </label>\n\n    <label>\n      {{ t.lastName }}\n      <input type="text" name="lastName" [(ngModel)]="lastName" required />\n    </label>\n\n    <label>\n      {{ t.fiscalCode }}\n      <input type="text" name="fiscalCode" [(ngModel)]="fiscalCode" required />\n    </label>\n\n    <label>\n      {{ t.birthDate }}\n      <input type="date" name="birthDate" [(ngModel)]="birthDate" required />\n    </label>\n\n    <label>\n      {{ t.phone }}\n      <input type="tel" name="phone" [(ngModel)]="phone" required />\n    </label>\n\n    <label>\n      {{ t.address }}\n      <input type="text" name="address" [(ngModel)]="address" required />\n    </label>\n\n    @if (errorMessage()) {\n      <p class="error">{{ errorMessage() }}</p>\n    }\n\n    <button type="submit" [disabled]="loading()">\n      {{ loading() ? t.submitting : (alreadySubscribed() ? t.submitReturning : t.submit) }}\n    </button>\n  </form>\n</div>\n', styles: ["/* src/app/features/signup/profile/profile.component.scss */\n.profile-page {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--se-space-4);\n}\n.card {\n  width: 100%;\n  max-width: 420px;\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-3);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(201, 162, 39, 0.25);\n  border-radius: var(--se-radius-lg);\n  padding: var(--se-space-5) var(--se-space-4);\n}\nh1 {\n  text-align: center;\n  margin: 0 0 var(--se-space-2);\n  color: var(--se-gold-light);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 20px;\n}\nlabel {\n  display: flex;\n  flex-direction: column;\n  gap: var(--se-space-1);\n  font-size: 13px;\n  color: var(--se-silver-dark);\n}\n.photo-label {\n  align-items: center;\n  text-align: center;\n}\n.photo-preview {\n  width: 96px;\n  height: 96px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid var(--se-gold);\n}\ninput {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--se-silver-dark);\n  border-radius: var(--se-radius-sm);\n  padding: 10px 12px;\n  color: var(--se-silver);\n  font-size: 15px;\n}\ninput:focus {\n  outline: none;\n  border-color: var(--se-gold);\n}\ninput[type=file] {\n  border: none;\n  padding: 0;\n  color: var(--se-silver-dark);\n}\nbutton {\n  margin-top: var(--se-space-2);\n  padding: 12px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.error {\n  color: #e05c5c;\n  font-size: 13px;\n  margin: 0;\n}\n/*# sourceMappingURL=profile.component.css.map */\n"] }]
  }], () => [{ type: AuthService }, { type: SupabaseService }, { type: MockBackendService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "src/app/features/signup/profile/profile.component.ts", lineNumber: 18 });
})();
export {
  ProfileComponent
};
//# sourceMappingURL=chunk-KTHG7JWK.js.map
