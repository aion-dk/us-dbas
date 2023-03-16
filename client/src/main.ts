import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlus,
  faMinus,
  faTriangleExclamation,
  faCircleQuestion,
  faClock,
  faUser,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { createI18n } from "vue-i18n";
import translations from "./assets/translations.json";

library.add(faPlus);
library.add(faMinus);
library.add(faTriangleExclamation);
library.add(faCircleQuestion);
library.add(faClock);
library.add(faCircleInfo);
library.add(faUser);

let locale = "en"
const url = new URL(window.location.href)
if (url.pathname.split("/")[1]) locale = url.pathname.split("/")[1]

const i18n = createI18n({
  locale: locale,
  fallbackLocale: "en",
  messages: translations,
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#dbas-client");
