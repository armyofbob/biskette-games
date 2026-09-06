export const MEASUREMENT_ID = "G-H5YYLHY3ST";
export const CONSENT_KEY = "biskette.analytics-consent.v1";
export const CONSENT_DAYS = 180;
export type Choice = "accepted" | "rejected" | null;
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  "ga-disable-G-H5YYLHY3ST"?: boolean;
};

export function createConsentController(w: AnalyticsWindow) {
  const d = w.document;
  let loaded = false;
  let choice: Choice = null;
  let expiresAt = 0;
  let timer: number | undefined;
  let notify: (value: Choice) => void = () => {};
  const disableKey = `ga-disable-${MEASUREMENT_ID}` as const;

  function read(): Choice {
    try {
      const saved = JSON.parse(w.localStorage.getItem(CONSENT_KEY) || "null");
      if (saved && (saved.choice === "accepted" || saved.choice === "rejected") &&
          Number.isFinite(saved.expiresAt) && saved.expiresAt > Date.now() &&
          saved.expiresAt <= Date.now() + CONSENT_DAYS * 86400000) {
        expiresAt = saved.expiresAt;
        return saved.choice;
      }
    } catch { /* Storage unavailable or invalid: analytics stays off. */ }
    expiresAt = 0;
    return null;
  }

  function clearCookies() {
    const domains = ["", w.location.hostname, `.${w.location.hostname}`, "biskettegames.com", ".biskettegames.com"];
    for (const item of d.cookie.split(";")) {
      const name = item.trim().split("=")[0];
      if (name === "_ga" || name.startsWith("_ga_")) {
        for (const domain of domains) {
          d.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""} SameSite=Lax`;
        }
      }
    }
  }

  function start() {
    if (loaded) return;
    loaded = true;
    w[disableKey] = false;
    w.dataLayer = w.dataLayer || [];
    // Google's command queue expects an Arguments object.
    // eslint-disable-next-line prefer-rest-params
    w.gtag = function () { w.dataLayer!.push(arguments); };
    w.gtag("consent", "default", {
      analytics_storage: "denied", ad_storage: "denied",
      ad_user_data: "denied", ad_personalization: "denied",
    });
    w.gtag("consent", "update", { analytics_storage: "granted" });
    w.gtag("js", new Date());
    w.gtag("config", MEASUREMENT_ID, {
      allow_google_signals: false, allow_ad_personalization_signals: false,
      cookie_expires: CONSENT_DAYS * 86400, cookie_update: false, cookie_path: "/",
    });
    const script = d.createElement("script");
    script.id = "biskette-google-analytics";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    d.head.appendChild(script);
  }

  function apply(next: Choice) {
    choice = next;
    notify(choice);
    w.clearTimeout(timer);
    if (next === "accepted") start();
    else {
      w[disableKey] = true;
      clearCookies();
      // Unload the already-running library, including timers/history listeners.
      // The disable flag is set first, so unload cannot send further GA hits.
      if (loaded) { w.location.reload(); return; }
    }
    if (expiresAt) timer = w.setTimeout(refresh, Math.min(Math.max(expiresAt - Date.now(), 1), 86400000));
  }

  function refresh() { apply(read()); }
  function storage(event: StorageEvent) {
    if (event.key === CONSENT_KEY || event.key === null) refresh();
  }

  return {
    init(onChange: (value: Choice) => void) {
      notify = onChange;
      refresh();
      w.addEventListener("storage", storage);
      w.addEventListener("focus", refresh);
    },
    choose(next: Exclude<Choice, null>) {
      expiresAt = Date.now() + CONSENT_DAYS * 86400000;
      try { w.localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice: next, expiresAt })); }
      catch { /* Explicit consent still applies to this page; ask again next visit. */ }
      apply(next);
    },
    dispose() {
      w.clearTimeout(timer);
      w.removeEventListener("storage", storage);
      w.removeEventListener("focus", refresh);
    },
  };
}
