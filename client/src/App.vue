<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import useLocaleStore from "./stores/useLocaleStore";
import useElectionStore from "./stores/useElectionStore";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const electionStore = useElectionStore();
const localeStore = useLocaleStore();
const route = useRoute();

watch(route, async (newRoute) => {
  const slug = newRoute.params.electionSlug;
  if (slug) electionStore.loadElection(slug);
});

watch(electionStore, () => {
  setTitle();
  if (route.params.electionSlug) {
    electionStore.loadElection(route.params.electionSlug);
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
  width: 900px;
  margin: auto;
  padding: 20px;
}
</style>
