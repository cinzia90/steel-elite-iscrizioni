import {
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-QKULHZCD.js";

// src/app/features/signup/signup-state.service.ts
var STORAGE_KEY = "se-signup-selected-plan-id";
var SignupStateService = class _SignupStateService {
  selectedPlanId = signal(this.readStoredPlanId());
  setSelectedPlanId(planId) {
    this.selectedPlanId.set(planId);
    sessionStorage.setItem(STORAGE_KEY, planId);
  }
  clear() {
    this.selectedPlanId.set(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }
  readStoredPlanId() {
    try {
      return sessionStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }
  static \u0275fac = function SignupStateService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SignupStateService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SignupStateService, factory: _SignupStateService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SignupStateService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  SignupStateService
};
//# sourceMappingURL=chunk-YEFS7TCJ.js.map
