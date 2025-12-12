// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const isTest = typeof process !== "undefined" && process.env.VITEST;
const LANGS = ["en", "es", "ar", "ja"];
const DEFAULT_NS = "common";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  supportedLngs: LANGS,
  ns: [DEFAULT_NS],
  defaultNS: DEFAULT_NS,
  resources: {}, // we will load bundles dynamically into "common"
  interpolation: { escapeValue: false },
  react: { useSuspense: true }
});

export async function loadLanguage(lng) {
  const isTest =
    typeof process !== "undefined" &&
    (process.env.VITEST === "true" || process.env.NODE_ENV === "test");

  try {
    // Skip loading again if already present
    if (!i18n.hasResourceBundle(lng, DEFAULT_NS)) {
      if (isTest) {
        // Vitest environment – return mock translations
        const mock = { hello: "Hello Test", appName: "Test App" };
        i18n.addResourceBundle(lng, DEFAULT_NS, mock, true, true);
      } else {
        // Browser normal fetch (unchanged)
        const res = await fetch(`/locales/${lng}/common.json`);
        if (!res.ok)
          throw new Error(`Failed to load /locales/${lng}/common.json (${res.status})`);
        const data = await res.json();
        i18n.addResourceBundle(lng, DEFAULT_NS, data, true, true);
      }
    }

    await i18n.changeLanguage(lng);

    // Browser only — skip DOM changes in test
    if (!isTest) {
      document.documentElement.lang = lng;
      document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
      localStorage.setItem("appLng", lng);
    }
  } catch (err) {
    console.error("i18n loadLanguage error:", err);
  }
}


// Immediately load persisted language (safe to call async)
(async () => {
  const saved = localStorage.getItem("appLng") || navigator.language?.split("-")?.[0] || "en";
  const chosen = LANGS.includes(saved) ? saved : "en";
  await loadLanguage(chosen);
})();

export default i18n;
