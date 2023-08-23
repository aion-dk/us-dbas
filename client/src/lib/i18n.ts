import { createI18n } from "vue-i18n";
import { nextTick } from "vue";
import type { Locale } from "../Types";
import { en } from "../assets/locales/en";
import { es } from "../assets/locales/es";

let locale: Locale = "en";
const url = new URL(window.location.href);
if (url.pathname.split("/")[1]) locale = url.pathname.split("/")[1] as Locale;

const i18n = createI18n({
  locale: locale,
  fallbackLocale: "en",
  messages: { en, es },
  datetimeFormats: {
    en: {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
      long: {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
      },
    },
    es: {
      short: {
        year: "numeric",
        day: "numeric",
      },
      long: {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
      },
    },
  },
});

export function setLocale(locale: Locale) {
  i18n.global.locale = locale as Locale;
}

export function loadLocaleMessages(locale: string, messages: object) {
  i18n.global.setLocaleMessage(locale, messages as any);

  return nextTick();
}

export default i18n;
