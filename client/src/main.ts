import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createI18n } from "vue-i18n";
import translations from "./assets/translations.json";
import * as UILibrary from "@assemblyvoting/ui-library"; // Imports components
import "@assemblyvoting/ui-library/styles";
import VuePopper from "@kalimahapps/vue-popper";

let locale = "en";
const url = new URL(window.location.href);
if (url.pathname.split("/")[1]) locale = url.pathname.split("/")[1];

const i18n = createI18n({
  locale: locale,
  fallbackLocale: "en",
  messages: translations,
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(UILibrary.default);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("tooltip", VuePopper);

app.mount("#dbas-client");
