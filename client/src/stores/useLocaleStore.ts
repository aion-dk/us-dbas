import { defineStore } from "pinia";
import { ref } from "vue";
import type { Locale } from "../Types";

export default defineStore("useLocaleStore", () => {
  const locale = ref<Locale>("en");

  const setLocale = (newLocale: Locale) => {
    console.log("Setting new locale", newLocale);
    locale.value = newLocale;
  };

  return { locale, setLocale };
});
