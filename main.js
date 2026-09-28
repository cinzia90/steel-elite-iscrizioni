import {
  Router,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-NKGUCW2I.js";
import {
  AuthService
} from "./chunk-5JC44RXL.js";
import {
  MockBackendService,
  environment
} from "./chunk-NZILXJS5.js";
import {
  ApplicationRef,
  Component,
  Injectable,
  InjectionToken,
  Injector,
  NEVER,
  NgModule,
  NgZone,
  Observable,
  RuntimeError,
  Subject,
  __async,
  __spreadValues,
  filter,
  formatRuntimeError,
  inject,
  isDevMode,
  makeEnvironmentProviders,
  map,
  provideAppInitializer,
  provideZoneChangeDetection,
  setClassMetadata,
  switchMap,
  take,
  ɵsetClassDebugInfo,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-QKULHZCD.js";

// src/app/core/guards/auth.guard.ts
var authGuard = () => __async(null, null, function* () {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.ready()) {
    yield new Promise((resolve) => {
      const check = () => auth.ready() ? resolve() : setTimeout(check, 25);
      check();
    });
  }
  if (auth.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(["/login"]);
});

// src/app/core/guards/role.guard.ts
function roleGuard(allowed) {
  return () => __async(null, null, function* () {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (!auth.ready()) {
      yield new Promise((resolve) => {
        const check = () => auth.ready() ? resolve() : setTimeout(check, 25);
        check();
      });
    }
    const role = auth.role();
    if (role && allowed.includes(role)) {
      return true;
    }
    return router.createUrlTree(["/login"]);
  });
}

// src/app/app.routes.ts
var routes = [
  {
    path: "login",
    loadComponent: () => import("./chunk-4D7QILLZ.js").then((m) => m.LoginComponent)
  },
  {
    path: "iscriviti",
    loadComponent: () => import("./chunk-HE5ZHVDG.js").then((m) => m.PlanSelectComponent)
  },
  {
    path: "iscriviti/account",
    loadComponent: () => import("./chunk-PEY26U7C.js").then((m) => m.AccountComponent)
  },
  {
    path: "iscriviti/profilo",
    loadComponent: () => import("./chunk-HKBCNSVM.js").then((m) => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: "iscriviti/certificato",
    loadComponent: () => import("./chunk-NZM5JVF2.js").then((m) => m.CertificateComponent),
    canActivate: [authGuard]
  },
  {
    path: "iscriviti/contratto",
    loadComponent: () => import("./chunk-7VN2Y6UJ.js").then((m) => m.ContractComponent),
    canActivate: [authGuard]
  },
  {
    path: "iscriviti/pagamento",
    loadComponent: () => import("./chunk-GRJKQTZC.js").then((m) => m.PaymentComponent),
    canActivate: [authGuard]
  },
  {
    path: "iscriviti/conferma",
    loadComponent: () => import("./chunk-UHGTUWG7.js").then((m) => m.PaymentPendingComponent),
    canActivate: [authGuard]
  },
  {
    path: "tessera",
    loadComponent: () => import("./chunk-YXB7QE3P.js").then((m) => m.CardComponent),
    canActivate: [authGuard]
  },
  {
    path: "staff/check-in",
    loadComponent: () => import("./chunk-FQOFAGYU.js").then((m) => m.CheckInComponent),
    canActivate: [roleGuard(["staff", "admin"])]
  },
  {
    path: "admin",
    loadComponent: () => import("./chunk-NX54IYUB.js").then((m) => m.AdminLayoutComponent),
    canActivate: [roleGuard(["admin"])],
    children: [
      {
        path: "",
        loadComponent: () => import("./chunk-DWFSI2F3.js").then((m) => m.AdminDashboardComponent)
      },
      {
        path: "clienti",
        loadComponent: () => import("./chunk-AVRZMRNQ.js").then((m) => m.AdminClientsComponent)
      },
      {
        path: "clienti/:id",
        loadComponent: () => import("./chunk-PMY3CLMH.js").then((m) => m.AdminClientDetailComponent)
      },
      {
        path: "certificati",
        loadComponent: () => import("./chunk-6QGQ7ICY.js").then((m) => m.AdminCertificatesComponent)
      },
      {
        path: "piani",
        loadComponent: () => import("./chunk-OTE7MZE2.js").then((m) => m.AdminPlansComponent)
      },
      {
        path: "ingressi",
        loadComponent: () => import("./chunk-MWERRMSL.js").then((m) => m.AdminAccessLogsComponent)
      },
      {
        path: "staff",
        loadComponent: () => import("./chunk-WL57PRGI.js").then((m) => m.AdminStaffComponent)
      },
      {
        path: "contratti",
        loadComponent: () => import("./chunk-FB6I6LEF.js").then((m) => m.AdminContractsComponent)
      },
      {
        path: "qr-locandina",
        loadComponent: () => import("./chunk-F74N5JXW.js").then((m) => m.AdminQrPosterComponent)
      },
      {
        path: "impostazioni",
        loadComponent: () => import("./chunk-4JNHJEDO.js").then((m) => m.AdminSettingsComponent)
      }
    ]
  },
  {
    path: "",
    loadComponent: () => import("./chunk-QGP4RYRJ.js").then((m) => m.HomeComponent),
    canActivate: [authGuard]
  },
  { path: "**", redirectTo: "" }
];

// node_modules/@angular/service-worker/fesm2022/service-worker.mjs
var ERR_SW_NOT_SUPPORTED = "Service workers are disabled or not supported by this browser";
var NgswCommChannel = class {
  serviceWorker;
  worker;
  registration;
  events;
  constructor(serviceWorker, injector) {
    this.serviceWorker = serviceWorker;
    if (!serviceWorker) {
      this.worker = this.events = this.registration = new Observable((subscriber) => subscriber.error(new RuntimeError(5601, (typeof ngDevMode === "undefined" || ngDevMode) && ERR_SW_NOT_SUPPORTED)));
    } else {
      let currentWorker = null;
      const workerSubject = new Subject();
      this.worker = new Observable((subscriber) => {
        if (currentWorker !== null) {
          subscriber.next(currentWorker);
        }
        return workerSubject.subscribe((v) => subscriber.next(v));
      });
      const updateController = () => {
        const {
          controller
        } = serviceWorker;
        if (controller === null) {
          return;
        }
        currentWorker = controller;
        workerSubject.next(currentWorker);
      };
      serviceWorker.addEventListener("controllerchange", updateController);
      updateController();
      this.registration = this.worker.pipe(switchMap(() => serviceWorker.getRegistration()));
      const _events = new Subject();
      this.events = _events.asObservable();
      const messageListener = (event) => {
        const {
          data
        } = event;
        if (data?.type) {
          _events.next(data);
        }
      };
      serviceWorker.addEventListener("message", messageListener);
      const appRef = injector?.get(ApplicationRef, null, {
        optional: true
      });
      appRef?.onDestroy(() => {
        serviceWorker.removeEventListener("controllerchange", updateController);
        serviceWorker.removeEventListener("message", messageListener);
      });
    }
  }
  postMessage(action, payload) {
    return new Promise((resolve) => {
      this.worker.pipe(take(1)).subscribe((sw) => {
        sw.postMessage(__spreadValues({
          action
        }, payload));
        resolve();
      });
    });
  }
  postMessageWithOperation(type, payload, operationNonce) {
    const waitForOperationCompleted = this.waitForOperationCompleted(operationNonce);
    const postMessage = this.postMessage(type, payload);
    return Promise.all([postMessage, waitForOperationCompleted]).then(([, result]) => result);
  }
  generateNonce() {
    return Math.round(Math.random() * 1e7);
  }
  eventsOfType(type) {
    let filterFn;
    if (typeof type === "string") {
      filterFn = (event) => event.type === type;
    } else {
      filterFn = (event) => type.includes(event.type);
    }
    return this.events.pipe(filter(filterFn));
  }
  nextEventOfType(type) {
    return this.eventsOfType(type).pipe(take(1));
  }
  waitForOperationCompleted(nonce) {
    return new Promise((resolve, reject) => {
      this.eventsOfType("OPERATION_COMPLETED").pipe(filter((event) => event.nonce === nonce), take(1), map((event) => {
        if (event.result !== void 0) {
          return event.result;
        }
        throw new Error(event.error);
      })).subscribe({
        next: resolve,
        error: reject
      });
    });
  }
  get isEnabled() {
    return !!this.serviceWorker;
  }
};
var SwPush = class _SwPush {
  sw;
  /**
   * Emits the payloads of the received push notification messages.
   */
  messages;
  /**
   * Emits the payloads of the received push notification messages as well as the action the user
   * interacted with. If no action was used the `action` property contains an empty string `''`.
   *
   * Note that the `notification` property does **not** contain a
   * [Notification][Mozilla Notification] object but rather a
   * [NotificationOptions](https://notifications.spec.whatwg.org/#dictdef-notificationoptions)
   * object that also includes the `title` of the [Notification][Mozilla Notification] object.
   *
   * [Mozilla Notification]: https://developer.mozilla.org/en-US/docs/Web/API/Notification
   */
  notificationClicks;
  /**
   * Emits the currently active
   * [PushSubscription](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription)
   * associated to the Service Worker registration or `null` if there is no subscription.
   */
  subscription;
  /**
   * True if the Service Worker is enabled (supported by the browser and enabled via
   * `ServiceWorkerModule`).
   */
  get isEnabled() {
    return this.sw.isEnabled;
  }
  pushManager = null;
  subscriptionChanges = new Subject();
  constructor(sw) {
    this.sw = sw;
    if (!sw.isEnabled) {
      this.messages = NEVER;
      this.notificationClicks = NEVER;
      this.subscription = NEVER;
      return;
    }
    this.messages = this.sw.eventsOfType("PUSH").pipe(map((message) => message.data));
    this.notificationClicks = this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(map((message) => message.data));
    this.pushManager = this.sw.registration.pipe(map((registration) => registration.pushManager));
    const workerDrivenSubscriptions = this.pushManager.pipe(switchMap((pm) => pm.getSubscription()));
    this.subscription = new Observable((subscriber) => {
      const workerDrivenSubscription = workerDrivenSubscriptions.subscribe(subscriber);
      const subscriptionChanges = this.subscriptionChanges.subscribe(subscriber);
      return () => {
        workerDrivenSubscription.unsubscribe();
        subscriptionChanges.unsubscribe();
      };
    });
  }
  /**
   * Subscribes to Web Push Notifications,
   * after requesting and receiving user permission.
   *
   * @param options An object containing the `serverPublicKey` string.
   * @returns A Promise that resolves to the new subscription object.
   */
  requestSubscription(options) {
    if (!this.sw.isEnabled || this.pushManager === null) {
      return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
    }
    const pushOptions = {
      userVisibleOnly: true
    };
    let key = this.decodeBase64(options.serverPublicKey.replace(/_/g, "/").replace(/-/g, "+"));
    let applicationServerKey = new Uint8Array(new ArrayBuffer(key.length));
    for (let i = 0; i < key.length; i++) {
      applicationServerKey[i] = key.charCodeAt(i);
    }
    pushOptions.applicationServerKey = applicationServerKey;
    return new Promise((resolve, reject) => {
      this.pushManager.pipe(switchMap((pm) => pm.subscribe(pushOptions)), take(1)).subscribe({
        next: (sub) => {
          this.subscriptionChanges.next(sub);
          resolve(sub);
        },
        error: reject
      });
    });
  }
  /**
   * Unsubscribes from Service Worker push notifications.
   *
   * @returns A Promise that is resolved when the operation succeeds, or is rejected if there is no
   *          active subscription or the unsubscribe operation fails.
   */
  unsubscribe() {
    if (!this.sw.isEnabled) {
      return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
    }
    const doUnsubscribe = (sub) => {
      if (sub === null) {
        throw new RuntimeError(5602, (typeof ngDevMode === "undefined" || ngDevMode) && "Not subscribed to push notifications.");
      }
      return sub.unsubscribe().then((success) => {
        if (!success) {
          throw new RuntimeError(5603, (typeof ngDevMode === "undefined" || ngDevMode) && "Unsubscribe failed!");
        }
        this.subscriptionChanges.next(null);
      });
    };
    return new Promise((resolve, reject) => {
      this.subscription.pipe(take(1), switchMap(doUnsubscribe)).subscribe({
        next: resolve,
        error: reject
      });
    });
  }
  decodeBase64(input) {
    return atob(input);
  }
  static \u0275fac = function SwPush_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SwPush)(\u0275\u0275inject(NgswCommChannel));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _SwPush,
    factory: _SwPush.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SwPush, [{
    type: Injectable
  }], () => [{
    type: NgswCommChannel
  }], null);
})();
var SwUpdate = class _SwUpdate {
  sw;
  /**
   * Emits a `VersionDetectedEvent` event whenever a new version is detected on the server.
   *
   * Emits a `VersionInstallationFailedEvent` event whenever checking for or downloading a new
   * version fails.
   *
   * Emits a `VersionReadyEvent` event whenever a new version has been downloaded and is ready for
   * activation.
   */
  versionUpdates;
  /**
   * Emits an `UnrecoverableStateEvent` event whenever the version of the app used by the service
   * worker to serve this client is in a broken state that cannot be recovered from without a full
   * page reload.
   */
  unrecoverable;
  /**
   * True if the Service Worker is enabled (supported by the browser and enabled via
   * `ServiceWorkerModule`).
   */
  get isEnabled() {
    return this.sw.isEnabled;
  }
  constructor(sw) {
    this.sw = sw;
    if (!sw.isEnabled) {
      this.versionUpdates = NEVER;
      this.unrecoverable = NEVER;
      return;
    }
    this.versionUpdates = this.sw.eventsOfType(["VERSION_DETECTED", "VERSION_INSTALLATION_FAILED", "VERSION_READY", "NO_NEW_VERSION_DETECTED"]);
    this.unrecoverable = this.sw.eventsOfType("UNRECOVERABLE_STATE");
  }
  /**
   * Checks for an update and waits until the new version is downloaded from the server and ready
   * for activation.
   *
   * @returns a promise that
   * - resolves to `true` if a new version was found and is ready to be activated.
   * - resolves to `false` if no new version was found
   * - rejects if any error occurs
   */
  checkForUpdate() {
    if (!this.sw.isEnabled) {
      return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
    }
    const nonce = this.sw.generateNonce();
    return this.sw.postMessageWithOperation("CHECK_FOR_UPDATES", {
      nonce
    }, nonce);
  }
  /**
   * Updates the current client (i.e. browser tab) to the latest version that is ready for
   * activation.
   *
   * In most cases, you should not use this method and instead should update a client by reloading
   * the page.
   *
   * <div class="docs-alert docs-alert-important">
   *
   * Updating a client without reloading can easily result in a broken application due to a version
   * mismatch between the application shell and other page resources,
   * such as lazy-loaded chunks, whose filenames may change between
   * versions.
   *
   * Only use this method, if you are certain it is safe for your specific use case.
   *
   * </div>
   *
   * @returns a promise that
   *  - resolves to `true` if an update was activated successfully
   *  - resolves to `false` if no update was available (for example, the client was already on the
   *    latest version).
   *  - rejects if any error occurs
   */
  activateUpdate() {
    if (!this.sw.isEnabled) {
      return Promise.reject(new RuntimeError(5601, (typeof ngDevMode === "undefined" || ngDevMode) && ERR_SW_NOT_SUPPORTED));
    }
    const nonce = this.sw.generateNonce();
    return this.sw.postMessageWithOperation("ACTIVATE_UPDATE", {
      nonce
    }, nonce);
  }
  static \u0275fac = function SwUpdate_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SwUpdate)(\u0275\u0275inject(NgswCommChannel));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _SwUpdate,
    factory: _SwUpdate.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SwUpdate, [{
    type: Injectable
  }], () => [{
    type: NgswCommChannel
  }], null);
})();
var SCRIPT = new InjectionToken(ngDevMode ? "NGSW_REGISTER_SCRIPT" : "");
function ngswAppInitializer() {
  if (false) {
    return;
  }
  const options = inject(SwRegistrationOptions);
  if (!("serviceWorker" in navigator && options.enabled !== false)) {
    return;
  }
  const script = inject(SCRIPT);
  const ngZone = inject(NgZone);
  const appRef = inject(ApplicationRef);
  ngZone.runOutsideAngular(() => {
    const sw = navigator.serviceWorker;
    const onControllerChange = () => sw.controller?.postMessage({
      action: "INITIALIZE"
    });
    sw.addEventListener("controllerchange", onControllerChange);
    appRef.onDestroy(() => {
      sw.removeEventListener("controllerchange", onControllerChange);
    });
  });
  ngZone.runOutsideAngular(() => {
    let readyToRegister;
    const {
      registrationStrategy
    } = options;
    if (typeof registrationStrategy === "function") {
      readyToRegister = new Promise((resolve) => registrationStrategy().subscribe(() => resolve()));
    } else {
      const [strategy, ...args] = (registrationStrategy || "registerWhenStable:30000").split(":");
      switch (strategy) {
        case "registerImmediately":
          readyToRegister = Promise.resolve();
          break;
        case "registerWithDelay":
          readyToRegister = delayWithTimeout(+args[0] || 0);
          break;
        case "registerWhenStable":
          readyToRegister = Promise.race([appRef.whenStable(), delayWithTimeout(+args[0])]);
          break;
        default:
          throw new RuntimeError(5600, (typeof ngDevMode === "undefined" || ngDevMode) && `Unknown ServiceWorker registration strategy: ${options.registrationStrategy}`);
      }
    }
    readyToRegister.then(() => {
      if (appRef.destroyed) {
        return;
      }
      navigator.serviceWorker.register(script, {
        scope: options.scope
      }).catch((err) => console.error(formatRuntimeError(5604, (typeof ngDevMode === "undefined" || ngDevMode) && "Service worker registration failed with: " + err)));
    });
  });
}
function delayWithTimeout(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
function ngswCommChannelFactory(opts, injector) {
  const isBrowser = true;
  return new NgswCommChannel(isBrowser && opts.enabled !== false ? navigator.serviceWorker : void 0, injector);
}
var SwRegistrationOptions = class {
  /**
   * Whether the ServiceWorker will be registered and the related services (such as `SwPush` and
   * `SwUpdate`) will attempt to communicate and interact with it.
   *
   * Default: true
   */
  enabled;
  /**
   * A URL that defines the ServiceWorker's registration scope; that is, what range of URLs it can
   * control. It will be used when calling
   * [ServiceWorkerContainer#register()](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register).
   */
  scope;
  /**
   * Defines the ServiceWorker registration strategy, which determines when it will be registered
   * with the browser.
   *
   * The default behavior of registering once the application stabilizes (i.e. as soon as there are
   * no pending micro- and macro-tasks) is designed to register the ServiceWorker as soon as
   * possible but without affecting the application's first time load.
   *
   * Still, there might be cases where you want more control over when the ServiceWorker is
   * registered (for example, there might be a long-running timeout or polling interval, preventing
   * the app from stabilizing). The available option are:
   *
   * - `registerWhenStable:<timeout>`: Register as soon as the application stabilizes (no pending
   *     micro-/macro-tasks) but no later than `<timeout>` milliseconds. If the app hasn't
   *     stabilized after `<timeout>` milliseconds (for example, due to a recurrent asynchronous
   *     task), the ServiceWorker will be registered anyway.
   *     If `<timeout>` is omitted, the ServiceWorker will only be registered once the app
   *     stabilizes.
   * - `registerImmediately`: Register immediately.
   * - `registerWithDelay:<timeout>`: Register with a delay of `<timeout>` milliseconds. For
   *     example, use `registerWithDelay:5000` to register the ServiceWorker after 5 seconds. If
   *     `<timeout>` is omitted, is defaults to `0`, which will register the ServiceWorker as soon
   *     as possible but still asynchronously, once all pending micro-tasks are completed.
   * - An Observable factory function: A function that returns an `Observable`.
   *     The function will be used at runtime to obtain and subscribe to the `Observable` and the
   *     ServiceWorker will be registered as soon as the first value is emitted.
   *
   * Default: 'registerWhenStable:30000'
   */
  registrationStrategy;
};
function provideServiceWorker(script, options = {}) {
  return makeEnvironmentProviders([SwPush, SwUpdate, {
    provide: SCRIPT,
    useValue: script
  }, {
    provide: SwRegistrationOptions,
    useValue: options
  }, {
    provide: NgswCommChannel,
    useFactory: ngswCommChannelFactory,
    deps: [SwRegistrationOptions, Injector]
  }, provideAppInitializer(ngswAppInitializer)]);
}
var ServiceWorkerModule = class _ServiceWorkerModule {
  /**
   * Register the given Angular Service Worker script.
   *
   * If `enabled` is set to `false` in the given options, the module will behave as if service
   * workers are not supported by the browser, and the service worker will not be registered.
   */
  static register(script, options = {}) {
    return {
      ngModule: _ServiceWorkerModule,
      providers: [provideServiceWorker(script, options)]
    };
  }
  static \u0275fac = function ServiceWorkerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ServiceWorkerModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _ServiceWorkerModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [SwPush, SwUpdate]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServiceWorkerModule, [{
    type: NgModule,
    args: [{
      providers: [SwPush, SwUpdate]
    }]
  }], null, null);
})();

// src/app/app.config.ts
var appConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideServiceWorker("ngsw-worker.js", {
    enabled: !isDevMode(),
    registrationStrategy: "registerWhenStable:30000"
  })]
};

// src/app/shared/components/demo-banner/demo-banner.component.ts
var DemoBannerComponent = class _DemoBannerComponent {
  mock;
  constructor(mock) {
    this.mock = mock;
  }
  reset() {
    this.mock.resetDemo();
    window.location.href = "/";
  }
  static \u0275fac = function DemoBannerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DemoBannerComponent)(\u0275\u0275directiveInject(MockBackendService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DemoBannerComponent, selectors: [["app-demo-banner"]], decls: 7, vars: 0, consts: [[1, "demo-banner"], [3, "click"]], template: function DemoBannerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "span")(2, "strong");
      \u0275\u0275text(3, "MODALIT\xC0 DEMO");
      \u0275\u0275elementEnd();
      \u0275\u0275text(4, " \u2014 nessun dato reale. Admin: admin@demo.steelelite.it / demo1234 \xB7 Staff: staff@demo.steelelite.it / demo1234 \xB7 Cliente: cliente@demo.steelelite.it / demo1234 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 1);
      \u0275\u0275listener("click", function DemoBannerComponent_Template_button_click_5_listener() {
        return ctx.reset();
      });
      \u0275\u0275text(6, "Reset dati demo");
      \u0275\u0275elementEnd()();
    }
  }, styles: ["\n\n.demo-banner[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 1000;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 8px 16px;\n  background: #c9a227;\n  color: #050505;\n  font-size: 12px;\n  font-weight: 600;\n  text-align: center;\n}\nbutton[_ngcontent-%COMP%] {\n  border: 1px solid #050505;\n  background: transparent;\n  color: #050505;\n  padding: 2px 10px;\n  border-radius: 4px;\n  font-weight: 700;\n  font-size: 11px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=demo-banner.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DemoBannerComponent, [{
    type: Component,
    args: [{ selector: "app-demo-banner", standalone: true, template: `
    <div class="demo-banner">
      <span>
        <strong>MODALIT\xC0 DEMO</strong> \u2014 nessun dato reale. Admin: admin&#64;demo.steelelite.it / demo1234 \xB7 Staff:
        staff&#64;demo.steelelite.it / demo1234 \xB7 Cliente: cliente&#64;demo.steelelite.it / demo1234
      </span>
      <button (click)="reset()">Reset dati demo</button>
    </div>
  `, styles: ["/* angular:styles/component:scss;51fbc948753e359fba1c1544953b4b04d2083437108307c069b7d239b142a47f;C:/Users/39389/steel-elite-iscrizioni/app/src/app/shared/components/demo-banner/demo-banner.component.ts */\n.demo-banner {\n  position: sticky;\n  top: 0;\n  z-index: 1000;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 8px 16px;\n  background: #c9a227;\n  color: #050505;\n  font-size: 12px;\n  font-weight: 600;\n  text-align: center;\n}\nbutton {\n  border: 1px solid #050505;\n  background: transparent;\n  color: #050505;\n  padding: 2px 10px;\n  border-radius: 4px;\n  font-weight: 700;\n  font-size: 11px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=demo-banner.component.css.map */\n"] }]
  }], () => [{ type: MockBackendService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DemoBannerComponent, { className: "DemoBannerComponent", filePath: "src/app/shared/components/demo-banner/demo-banner.component.ts", lineNumber: 48 });
})();

// src/app/app.component.ts
function AppComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-demo-banner");
  }
}
var AppComponent = class _AppComponent {
  title = "app";
  isMock = environment.mock;
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 2, vars: 1, template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, AppComponent_Conditional_0_Template, 1, 0, "app-demo-banner");
      \u0275\u0275element(1, "router-outlet");
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.isMock ? 0 : -1);
    }
  }, dependencies: [RouterOutlet, DemoBannerComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{ selector: "app-root", imports: [RouterOutlet, DemoBannerComponent], template: "@if (isMock) {\n  <app-demo-banner />\n}\n<router-outlet />\n" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 12 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
/*! Bundled license information:

@angular/service-worker/fesm2022/service-worker.mjs:
  (**
   * @license Angular v19.2.25
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
  (*!
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.dev/license
   *)
*/
//# sourceMappingURL=main.js.map
