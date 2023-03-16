<script lang="ts" setup>
import { ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import useElectionStore from "../stores/useElectionStore";
import config from "../lib/config"

const electionStore = useElectionStore();
const route = useRoute();
const locale = ref(route.params.locale);
const slug = ref(null);

watch(route, (newRoute) => (locale.value = newRoute.params.locale));
watch(
  electionStore,
  (newElectionStore) => (slug.value = newElectionStore?.election?.slug)
);
</script>

<template>
  <nav class="Header">
    <img class="Header__Logo" :src="config.logoUrl" alt="DBAS Logo" />
    <RouterLink class="Header__Title" :to="`/${locale}/${slug}`" v-if="slug">
      Digital Ballot Audit Site
    </RouterLink>

    <div class="Header__Links" v-if="slug">
      <RouterLink class="Header__Link" :to="`/${locale}/${slug}/about`"
        >About</RouterLink
      >
      <RouterLink class="Header__Link" :to="`/${locale}/${slug}/logs`"
        >Logs</RouterLink
      >
      <RouterLink class="Header__Link" :to="`/${locale}/${slug}/help`"
        >Help</RouterLink
      >
      <RouterLink class="Header__Link" :to="`/${locale}/${slug}/contact`"
        >Contact</RouterLink
      >
    </div>
  </nav>
</template>

<style type="text/css" scoped>
.Header {
  display: flex;
  font-family: "Open Sans";
  align-items: center;
  box-shadow: 0px 4px 10px #ccc;
  position: fixed;
  width: 100%;
  z-index: 2;
  background-color: #fff;
  box-sizing: border-box;
}

.Header__Title {
  font-weight: 600;
  font-size: 26px;
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: #495057;
}

.Header__Logo {
  height: 54px;
  width: 54px;
  object-fit: cover;
  margin: 8px 11px;
  border-radius: 3px;
}

.Header__Links {
  flex-grow: 1;
  justify-content: flex-end;
  align-items: center;
  display: flex;
}

.Header__Link {
  padding: 20px 8px;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  min-width: 127px;
  text-decoration: none;
  color: #495057;
}
</style>
