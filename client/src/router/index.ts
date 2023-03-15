import { createWebHistory, createRouter } from "vue-router";
import Welcome from "../views/Welcome.vue";
import BallotTrackerView from "../views/BallotTrackerView.vue";
import MissingSlugView from "../views/MissingSlugView.vue";
import LogsView from "../views/LogsView.vue"
import HelpView from "../views/HelpView.vue"
import AboutView from "../views/AboutView.vue"
import ContactView from "../views/ContactView.vue"

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
    {
      name: "LogsView",
      path: "/:locale/:electionSlug/logs",
      component: LogsView,
    },
    {
      name: "HelpView",
      path: "/:locale/:electionSlug/help",
      component: HelpView,
    },
    {
      name: "ContactView",
      path: "/:locale/:electionSlug/contact",
      component: ContactView,
    },
    {
      name: "AboutView",
      path: "/:locale/:electionSlug/about",
      component: AboutView,
    },
  ],
});

export default router;
