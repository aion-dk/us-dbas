import { createWebHistory, createRouter } from "vue-router";
import Welcome from "../views/Welcome.vue";
import BallotTrackerView from "../views/BallotTrackerView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Welcome",
      path: "/:electionSlug",
      component: Welcome,
    },
    {
      name: "BallotTrackerView",
      path: "/:electionSlug/track/:trackingCode",
      component: BallotTrackerView,
    },
  ],
});

export default router;
