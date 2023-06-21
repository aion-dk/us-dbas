import { createI18n } from "vue-i18n";
import { nextTick } from "vue";
import type { Locale } from "../Types";
import { en } from "../assets/locales/en";
import { es } from "../assets/locales/es";

let locale = "en";
const url = new URL(window.location.href);
if (url.pathname.split("/")[1]) locale = url.pathname.split("/")[1];

export default createI18n({
  locale: locale,
  fallbackLocale: "en",
  messages: {
    en: en,
    es: es,
  },
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
    da: {
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
