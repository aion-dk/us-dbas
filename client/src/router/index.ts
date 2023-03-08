import { createWebHistory, createRouter } from "vue-router";
import Welcome from "../views/Welcome.vue";
import BallotTrackerView from "../views/BallotTrackerView.vue";
import MissingSlugView from "../views/MissingSlugView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: to => "/en",
    },
    {
      path: "/:locale",
      component: MissingSlugView,
    },
    {
      name: "Welcome",
      path: "/:locale/:electionSlug",
      component: Welcome,
    },
    {
      name: "BallotTrackerView",
      path: "/:locale/:electionSlug/track/:trackingCode",
      component: BallotTrackerView,
    },
  ],
});

export default router;
