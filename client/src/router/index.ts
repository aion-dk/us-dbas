import { createWebHistory, createRouter } from "vue-router";
import Welcome from "../views/Welcome.vue";
import BallotTracker from "../views/BallotTracker.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Welcome",
      path: "/",
      component: Welcome,
    },
    {
      name: "BallotTracker",
      path: "/track/:trackingCode",
      component: BallotTracker,
    },
  ],
});

export default router;
