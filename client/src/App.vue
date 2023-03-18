<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import useLocaleStore from "./stores/useLocaleStore";
import useElectionStore from "./stores/useElectionStore";
import useBallotStore from "./stores/useBallotStore";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const ballotStore = useBallotStore();
const electionStore = useElectionStore();
const localeStore = useLocaleStore();
const route = useRoute();

watch(route, async (newRoute) => {
  const slug = newRoute.params.electionSlug;
  if (slug) electionStore.loadElection(slug.toString());

  const locale = newRoute.params.locale;
  if (locale) localeStore.setLocale(locale);
});

watch(electionStore, () => {
  setTitle();
  if (route.params.electionSlug) {
    electionStore.loadElection(route.params.electionSlug);

    if (route.params.trackingCode) {
      ballotStore.loadBallot(
        route.params.trackingCode,
        electionStore.election.slug
      );
    }
  }
});

function setTitle() {
  const title = [
    "DBAS",
    electionStore.election?.content?.title[localeStore.locale],
  ].filter((s) => s);
  window.top.document.title = title.join(" - ");
}
</script>

<template>
  <div class="DBAS">
    <Header />
    <div class="DBAS__Content">
      <RouterView class="DBAS__InnerContent" />
    </div>
    <Footer />
  </div>
</template>

<style type="text/css">
body {
  padding: 0;
  margin: 0;
}

.DBAS {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.DBAS__Content {
  height: calc(100vh - 120px);
  margin-top: 80px;
  overflow-y: scroll;
}

.DBAS__InnerContent {
  width: 80vw;
  margin: auto;
  padding: 0;
}

.popper-content-wrapper {
  max-width: 400px;
  --vue-popper-bg: #000;
  --vue-popper-padding: 6px;
  --vue-popper-text-color: #fff;
  --vue-popper-border-radius: 3px;
}
</style>
