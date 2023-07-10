import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("useLocaleStore", () => {
  const locale = ref("en");

  const setLocale = (newLocale: string) => {
    console.log("Setting new locale", newLocale);
    locale.value = newLocale;
  };

  return { locale, setLocale };
});
