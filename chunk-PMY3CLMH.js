import {
  it
} from "./chunk-2QEQLM23.js";
import {
  ActivatedRoute,
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
  DatePipe,
  __async,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-QKULHZCD.js";

// src/app/features/admin/clients/admin-client-detail.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AdminClientDetailComponent_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 10);
    \u0275\u0275listener("click", function AdminClientDetailComponent_Conditional_3_Conditional_1_Template_img_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePhotoZoom());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.photoUrl(), \u0275\u0275sanitizeUrl);
  }
}
function AdminClientDetailComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.t.noPhoto);
  }
}
function AdminClientDetailComponent_Conditional_3_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function AdminClientDetailComponent_Conditional_3_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removePhoto());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.t.removePhoto);
  }
}
function AdminClientDetailComponent_Conditional_3_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275listener("click", function AdminClientDetailComponent_Conditional_3_Conditional_9_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePhotoZoom());
    });
    \u0275\u0275element(1, "img", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.photoUrl(), \u0275\u0275sanitizeUrl);
  }
}
function AdminClientDetailComponent_Conditional_3_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.t.noData);
  }
}
function AdminClientDetailComponent_Conditional_3_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_13_0;
    const sub_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.planName(sub_r5));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sub_r5.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", sub_r5.start_date, " \u2192 ", (tmp_13_0 = sub_r5.end_date) !== null && tmp_13_0 !== void 0 ? tmp_13_0 : "\u2014", "");
  }
}
function AdminClientDetailComponent_Conditional_3_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.t.noData);
  }
}
function AdminClientDetailComponent_Conditional_3_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 14);
    \u0275\u0275listener("click", function AdminClientDetailComponent_Conditional_3_For_21_Template_button_click_4_listener() {
      const contract_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.downloadContract(contract_r7));
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const contract_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 2, contract_r7.created_at, "short"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t.downloadContract);
  }
}
function AdminClientDetailComponent_Conditional_3_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 14);
    \u0275\u0275listener("click", function AdminClientDetailComponent_Conditional_3_Conditional_25_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewCertificate());
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", (tmp_2_0 = ctx_r1.certificate()) == null ? null : tmp_2_0.status, " \xB7 ", ctx_r1.t.status, ": ", (tmp_2_0 = ctx_r1.certificate()) == null ? null : tmp_2_0.expiry_date, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t.viewCertificate);
  }
}
function AdminClientDetailComponent_Conditional_3_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.t.noData);
  }
}
function AdminClientDetailComponent_Conditional_3_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.t.noData);
  }
}
function AdminClientDetailComponent_Conditional_3_For_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const log_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 7, log_r9.scanned_at, "short"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("granted", log_r9.result === "granted")("denied", log_r9.result === "denied");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", log_r9.result, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(log_r9.reason);
  }
}
function AdminClientDetailComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275template(1, AdminClientDetailComponent_Conditional_3_Conditional_1_Template, 1, 1, "img", 3)(2, AdminClientDetailComponent_Conditional_3_Conditional_2_Template, 2, 1, "div", 4);
    \u0275\u0275elementStart(3, "div")(4, "h1");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 5);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, AdminClientDetailComponent_Conditional_3_Conditional_8_Template, 2, 1, "button", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, AdminClientDetailComponent_Conditional_3_Conditional_9_Template, 2, 1, "div", 7);
    \u0275\u0275elementStart(10, "section")(11, "h2");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, AdminClientDetailComponent_Conditional_3_Conditional_13_Template, 2, 1, "p", 8);
    \u0275\u0275repeaterCreate(14, AdminClientDetailComponent_Conditional_3_For_15_Template, 7, 4, "div", 9, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "section")(17, "h2");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, AdminClientDetailComponent_Conditional_3_Conditional_19_Template, 2, 1, "p", 8);
    \u0275\u0275repeaterCreate(20, AdminClientDetailComponent_Conditional_3_For_21_Template, 6, 5, "div", 9, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "section")(23, "h2");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, AdminClientDetailComponent_Conditional_3_Conditional_25_Template, 5, 4, "div", 9)(26, AdminClientDetailComponent_Conditional_3_Conditional_26_Template, 2, 1, "p", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "section")(28, "h2");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275template(30, AdminClientDetailComponent_Conditional_3_Conditional_30_Template, 2, 1, "p", 8);
    \u0275\u0275repeaterCreate(31, AdminClientDetailComponent_Conditional_3_For_32_Template, 8, 10, "div", 9, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.photoUrl() ? 1 : 2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", (tmp_2_0 = ctx_r1.profile()) == null ? null : tmp_2_0.first_name, " ", (tmp_2_0 = ctx_r1.profile()) == null ? null : tmp_2_0.last_name, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", (tmp_3_0 = ctx_r1.profile()) == null ? null : tmp_3_0.fiscal_code, " \xB7 ", (tmp_3_0 = ctx_r1.profile()) == null ? null : tmp_3_0.phone, "");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.photoUrl() ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.photoExpanded() && ctx_r1.photoUrl() ? 9 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t.subscriptions);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.subscriptions().length === 0 ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.subscriptions());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.t.contracts);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.contracts().length === 0 ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.contracts());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.t.certificate);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.certificate() ? 25 : 26);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.t.accessHistory);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.accessLogs().length === 0 ? 30 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.accessLogs());
  }
}
var AdminClientDetailComponent = class _AdminClientDetailComponent {
  route;
  supabase;
  mock;
  t = it.admin.clients;
  loading = signal(true);
  profile = signal(null);
  photoUrl = signal(null);
  subscriptions = signal([]);
  contracts = signal([]);
  certificate = signal(null);
  accessLogs = signal([]);
  photoExpanded = signal(false);
  memberId = "";
  constructor(route, supabase, mock) {
    this.route = route;
    this.supabase = supabase;
    this.mock = mock;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.memberId = this.route.snapshot.paramMap.get("id") ?? "";
      if (!this.memberId) {
        return;
      }
      if (environment.mock) {
        const detail = this.mock.getClientDetail(this.memberId);
        this.profile.set(detail.profile);
        if (detail.profile?.photo_path) {
          this.photoUrl.set(yield this.mock.getSignedUrl(detail.profile.photo_path));
        }
        this.subscriptions.set(detail.subscriptions.map((s) => ({
          id: s.id,
          status: s.status,
          start_date: s.start_date,
          end_date: s.end_date,
          sessions_remaining: s.sessions_remaining,
          plans: { name: s.planName }
        })));
        this.contracts.set(detail.contracts);
        this.certificate.set(detail.certificate);
        this.accessLogs.set(detail.accessLogs);
        this.loading.set(false);
        return;
      }
      const [profileRes, subsRes, contractsRes, certRes, logsRes] = yield Promise.all([
        this.supabase.client.from("profiles").select("*").eq("id", this.memberId).single(),
        this.supabase.client.from("subscriptions").select("id, status, start_date, end_date, sessions_remaining, plans ( name )").eq("member_id", this.memberId).order("created_at", { ascending: false }),
        this.supabase.client.from("contracts").select("id, created_at, pdf_path, pdf_sha256").eq("member_id", this.memberId).order("created_at", { ascending: false }),
        this.supabase.client.from("medical_certificates").select("id, status, expiry_date, file_path").eq("member_id", this.memberId).order("created_at", { ascending: false }).limit(1).maybeSingle(),
        this.supabase.client.from("access_logs").select("id, scanned_at, result, reason").eq("member_id", this.memberId).order("scanned_at", { ascending: false }).limit(20)
      ]);
      const profile = profileRes.data;
      this.profile.set(profile);
      if (profile?.photo_path) {
        const { data } = yield this.supabase.client.storage.from("photos").createSignedUrl(profile.photo_path, 300);
        this.photoUrl.set(data?.signedUrl ?? null);
      }
      this.subscriptions.set(subsRes.data ?? []);
      this.contracts.set(contractsRes.data ?? []);
      this.certificate.set(certRes.data ?? null);
      this.accessLogs.set(logsRes.data ?? []);
      this.loading.set(false);
    });
  }
  downloadContract(contract) {
    return __async(this, null, function* () {
      const url = environment.mock ? yield this.mock.getSignedUrl(contract.pdf_path) : (yield this.supabase.client.storage.from("contracts").createSignedUrl(contract.pdf_path, 60)).data?.signedUrl;
      if (url) {
        window.open(url, "_blank");
      }
    });
  }
  viewCertificate() {
    return __async(this, null, function* () {
      const cert = this.certificate();
      if (!cert) {
        return;
      }
      const url = environment.mock ? yield this.mock.getSignedUrl(cert.file_path) : (yield this.supabase.client.storage.from("certificates").createSignedUrl(cert.file_path, 60)).data?.signedUrl;
      if (url) {
        window.open(url, "_blank");
      }
    });
  }
  planName(sub) {
    return sub.plans?.name ?? "\u2014";
  }
  togglePhotoZoom() {
    if (this.photoUrl()) {
      this.photoExpanded.update((v) => !v);
    }
  }
  removePhoto() {
    return __async(this, null, function* () {
      if (environment.mock) {
        this.mock.deletePhoto(this.memberId);
      } else {
        yield this.supabase.client.from("profiles").update({ photo_path: null }).eq("id", this.memberId);
      }
      this.photoUrl.set(null);
      this.profile.update((p) => p ? __spreadProps(__spreadValues({}, p), { photo_path: null }) : p);
    });
  }
  static \u0275fac = function AdminClientDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminClientDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(SupabaseService), \u0275\u0275directiveInject(MockBackendService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminClientDetailComponent, selectors: [["app-admin-client-detail"]], decls: 4, vars: 2, consts: [[1, "detail-page"], ["routerLink", "/admin/clienti", 1, "back"], [1, "header"], ["alt", "", 1, "photo", 3, "src"], [1, "photo-placeholder"], [1, "meta"], [1, "remove-photo"], [1, "photo-lightbox"], [1, "status"], [1, "row"], ["alt", "", 1, "photo", 3, "click", "src"], [1, "remove-photo", 3, "click"], [1, "photo-lightbox", 3, "click"], ["alt", "", 3, "src"], [3, "click"]], template: function AdminClientDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "a", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275template(3, AdminClientDetailComponent_Conditional_3_Template, 33, 15);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("\u2190 ", ctx.t.back, "");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && ctx.profile() ? 3 : -1);
    }
  }, dependencies: [CommonModule, DatePipe, RouterLink], styles: ["\n\n.detail-page[_ngcontent-%COMP%] {\n  max-width: 720px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\n.back[_ngcontent-%COMP%] {\n  display: inline-block;\n  color: var(--se-gold);\n  text-decoration: none;\n  margin-bottom: var(--se-space-3);\n  font-size: 13px;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--se-space-3);\n  margin-bottom: var(--se-space-4);\n}\n.photo[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid var(--se-gold);\n  cursor: zoom-in;\n}\n.photo-lightbox[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 200;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0, 0, 0, 0.85);\n  cursor: zoom-out;\n}\n.photo-lightbox[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 90vw;\n  max-height: 90vh;\n  border-radius: var(--se-radius-md);\n  object-fit: contain;\n}\n.remove-photo[_ngcontent-%COMP%] {\n  margin-top: var(--se-space-1);\n  background: rgba(224, 92, 92, 0.15);\n  color: #e05c5c;\n  border: 1px solid #e05c5c;\n  padding: 4px 10px;\n  font-size: 11px;\n}\n.photo-placeholder[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--se-silver-dark);\n  font-size: 10px;\n  text-align: center;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--se-gold-light);\n  font-size: 18px;\n}\n.meta[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: var(--se-silver-dark);\n  font-size: 13px;\n}\nsection[_ngcontent-%COMP%] {\n  margin-bottom: var(--se-space-4);\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--se-gold);\n  border-bottom: 1px solid rgba(201, 162, 39, 0.25);\n  padding-bottom: 6px;\n  margin-bottom: var(--se-space-2);\n}\n.status[_ngcontent-%COMP%] {\n  color: var(--se-silver-dark);\n  font-size: 13px;\n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: var(--se-space-2);\n  padding: var(--se-space-2) 0;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n  font-size: 13px;\n}\n.row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.granted[_ngcontent-%COMP%] {\n  color: #4caf6f;\n}\n.denied[_ngcontent-%COMP%] {\n  color: #e05c5c;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n  font-size: 12px;\n}\n/*# sourceMappingURL=admin-client-detail.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminClientDetailComponent, [{
    type: Component,
    args: [{ selector: "app-admin-client-detail", standalone: true, imports: [CommonModule, RouterLink], template: `<div class="detail-page">
  <a class="back" routerLink="/admin/clienti">&larr; {{ t.back }}</a>

  @if (!loading() && profile()) {
    <div class="header">
      @if (photoUrl()) {
        <img class="photo" [src]="photoUrl()" alt="" (click)="togglePhotoZoom()" />
      } @else {
        <div class="photo-placeholder">{{ t.noPhoto }}</div>
      }
      <div>
        <h1>{{ profile()?.first_name }} {{ profile()?.last_name }}</h1>
        <p class="meta">{{ profile()?.fiscal_code }} \xB7 {{ profile()?.phone }}</p>
        @if (photoUrl()) {
          <button class="remove-photo" (click)="removePhoto()">{{ t.removePhoto }}</button>
        }
      </div>
    </div>

    @if (photoExpanded() && photoUrl()) {
      <div class="photo-lightbox" (click)="togglePhotoZoom()">
        <img [src]="photoUrl()" alt="" />
      </div>
    }

    <section>
      <h2>{{ t.subscriptions }}</h2>
      @if (subscriptions().length === 0) {
        <p class="status">{{ t.noData }}</p>
      }
      @for (sub of subscriptions(); track sub.id) {
        <div class="row">
          <span>{{ planName(sub) }}</span>
          <span>{{ sub.status }}</span>
          <span>{{ sub.start_date }} \u2192 {{ sub.end_date ?? '\u2014' }}</span>
        </div>
      }
    </section>

    <section>
      <h2>{{ t.contracts }}</h2>
      @if (contracts().length === 0) {
        <p class="status">{{ t.noData }}</p>
      }
      @for (contract of contracts(); track contract.id) {
        <div class="row">
          <span>{{ contract.created_at | date: 'short' }}</span>
          <button (click)="downloadContract(contract)">{{ t.downloadContract }}</button>
        </div>
      }
    </section>

    <section>
      <h2>{{ t.certificate }}</h2>
      @if (certificate()) {
        <div class="row">
          <span>{{ certificate()?.status }} \xB7 {{ t.status }}: {{ certificate()?.expiry_date }}</span>
          <button (click)="viewCertificate()">{{ t.viewCertificate }}</button>
        </div>
      } @else {
        <p class="status">{{ t.noData }}</p>
      }
    </section>

    <section>
      <h2>{{ t.accessHistory }}</h2>
      @if (accessLogs().length === 0) {
        <p class="status">{{ t.noData }}</p>
      }
      @for (log of accessLogs(); track log.id) {
        <div class="row">
          <span>{{ log.scanned_at | date: 'short' }}</span>
          <span [class.granted]="log.result === 'granted'" [class.denied]="log.result === 'denied'">
            {{ log.result }}
          </span>
          <span>{{ log.reason }}</span>
        </div>
      }
    </section>
  }
</div>
`, styles: ["/* src/app/features/admin/clients/admin-client-detail.component.scss */\n.detail-page {\n  max-width: 720px;\n  margin: 0 auto;\n  padding: var(--se-space-4);\n}\n.back {\n  display: inline-block;\n  color: var(--se-gold);\n  text-decoration: none;\n  margin-bottom: var(--se-space-3);\n  font-size: 13px;\n}\n.header {\n  display: flex;\n  align-items: center;\n  gap: var(--se-space-3);\n  margin-bottom: var(--se-space-4);\n}\n.photo {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid var(--se-gold);\n  cursor: zoom-in;\n}\n.photo-lightbox {\n  position: fixed;\n  inset: 0;\n  z-index: 200;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0, 0, 0, 0.85);\n  cursor: zoom-out;\n}\n.photo-lightbox img {\n  max-width: 90vw;\n  max-height: 90vh;\n  border-radius: var(--se-radius-md);\n  object-fit: contain;\n}\n.remove-photo {\n  margin-top: var(--se-space-1);\n  background: rgba(224, 92, 92, 0.15);\n  color: #e05c5c;\n  border: 1px solid #e05c5c;\n  padding: 4px 10px;\n  font-size: 11px;\n}\n.photo-placeholder {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--se-silver-dark);\n  font-size: 10px;\n  text-align: center;\n}\nh1 {\n  margin: 0;\n  color: var(--se-gold-light);\n  font-size: 18px;\n}\n.meta {\n  margin: 4px 0 0;\n  color: var(--se-silver-dark);\n  font-size: 13px;\n}\nsection {\n  margin-bottom: var(--se-space-4);\n}\nh2 {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--se-gold);\n  border-bottom: 1px solid rgba(201, 162, 39, 0.25);\n  padding-bottom: 6px;\n  margin-bottom: var(--se-space-2);\n}\n.status {\n  color: var(--se-silver-dark);\n  font-size: 13px;\n}\n.row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: var(--se-space-2);\n  padding: var(--se-space-2) 0;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n  font-size: 13px;\n}\n.row:last-child {\n  border-bottom: none;\n}\n.granted {\n  color: #4caf6f;\n}\n.denied {\n  color: #e05c5c;\n}\nbutton {\n  padding: 6px 12px;\n  border: none;\n  border-radius: var(--se-radius-sm);\n  background:\n    linear-gradient(\n      135deg,\n      var(--se-gold-light),\n      var(--se-gold));\n  color: var(--se-black);\n  font-weight: 700;\n  cursor: pointer;\n  font-size: 12px;\n}\n/*# sourceMappingURL=admin-client-detail.component.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: SupabaseService }, { type: MockBackendService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminClientDetailComponent, { className: "AdminClientDetailComponent", filePath: "src/app/features/admin/clients/admin-client-detail.component.ts", lineNumber: 47 });
})();
export {
  AdminClientDetailComponent
};
//# sourceMappingURL=chunk-PMY3CLMH.js.map
