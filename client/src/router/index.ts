import { createWebHistory, createRouter } from "vue-router";
import Welcome from "../views/Welcome.vue";
import BallotTracker from "../views/BallotTracker.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Welcome",
      path: "/:electionSlug",
      component: Welcome,
    },
    {
      name: "BallotTracker",
      path: "/:electionSlug/track/:trackingCode",
      component: BallotTracker,
    },
  ],
});

export default router;
