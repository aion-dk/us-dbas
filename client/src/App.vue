<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import useLocaleStore from "./stores/useLocaleStore"
import useElectionStore from "./stores/useElectionStore"
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"

const electionStore = useElectionStore()
const localeStore = useLocaleStore()
const route = useRoute()

watch(route, async (newRoute) => {
  const slug = newRoute.params.electionSlug
  if (slug) electionStore.loadElection(slug)
})

watch(electionStore, () => {
  setTitle()
})

function setTitle() {
  const title = [
    "DBAS",
    electionStore.election?.content?.title[localeStore.locale],
  ].filter(s => s)
  window.top.document.title = title.join(" - ")
}
</script>

<template>
  <div class="DBAS">
    <Header class="DBAS__Header" />
    <RouterView class="DBAS__Content" />
    <Footer class="DBAS__Footer" />
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

  .DBAS__Header {
    height: 70px;
  }

  .DBAS__Content {
    flex-grow: 1;
    height: calc(100vh - calc(70px + 40px));
  }
</style>
