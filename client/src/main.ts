import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

const disallowed_icons = ["prefix"];

Object.keys(icons).map((i) => {
  console.log("Adding icon", i, icons[i]);
  if (disallowed_icons.indexOf(i) < 0) library.add(icons[i]);
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#dbas-client");
