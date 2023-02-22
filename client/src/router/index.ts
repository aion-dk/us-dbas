import { createWebHistory, createRouter } from "vue-router";
import Welcome from "../views/Welcome.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Welcome",
      path: "/",
      component: Welcome,
    },
  ],
});

export default router;
