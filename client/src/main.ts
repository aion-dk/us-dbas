import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import * as UILibrary from "@assemblyvoting/ui-library"; // Imports components
import "@assemblyvoting/ui-library/styles";
import VuePopper from "@kalimahapps/vue-popper";
import i18n from "./lib/i18n"

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(UILibrary.default);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("tooltip", VuePopper);

app.mount("#dbas-client");
