import { createWebHistory, createRouter } from "vue-router";
import Welcome from "../views/Welcome.vue";
import BallotTrackerView from "../views/BallotTrackerView.vue";
import BallotTrackerStart from "../views/BallotTrackerStart.vue";
import BallotVerifierStart from "../views/BallotVerifierStart.vue";
import BallotVerifierView from "../views/BallotVerifierView.vue";
import MissingSlugView from "../views/MissingSlugView.vue";
import LogsView from "../views/LogsView.vue";
import HelpView from "../views/HelpView.vue";
import AboutView from "../views/AboutView.vue";
import BallotVerifierFound from "@/views/BallotVerifierFound.vue";
import SessionTimeout from "@/views/SessionTimeout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: () => "/en",
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
      name: "BallotTrackerStart",
      path: "/:locale/:electionSlug/track",
      component: BallotTrackerStart,
    },
    {
      name: "BallotVerifierStart",
      path: "/:locale/:electionSlug/verify",
      component: BallotVerifierStart,
    },
    {
      name: "BallotVerifierView",
      path: "/:locale/:electionSlug/verify/:pairingCode",
      component: BallotVerifierView,
    },
    {
      name: "BallotVerifierFound",
      path: "/:locale/:electionSlug/verify/:verificationCode/found",
      component: BallotVerifierFound,
    },
    {
      name: "LogsView",
      path: "/:locale/:electionSlug/logs/:type/:page?",
      component: LogsView,
    },
    {
      name: "HelpView",
      path: "/:locale/:electionSlug/help",
      component: HelpView,
    },
    {
      name: "AboutView",
      path: "/:locale/:electionSlug/about",
      component: AboutView,
    },
    {
      name: "SessionExpired",
      path: "/:locale/:electionSlug/session_expired",
      component: SessionTimeout,
    },
  ],
});

export default router;
