import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("useLocaleStore", () => {
  const locale = ref("en");

  const setLocale = (newLocale) => {
    locale.value = newLocale;
  };

  return { locale, setLocale };
});
