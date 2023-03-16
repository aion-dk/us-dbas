<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import useElectionStore from "../stores/useElectionStore";
import useLocaleStore from "../stores/useLocaleStore";
import config from "../lib/config";
import router from "../router"

const localeStore = useLocaleStore();
const electionStore = useElectionStore();
const route = useRoute();
const slug = ref(null);
const locale = ref("en");

watch(
  electionStore,
  (newElectionStore) => (slug.value = newElectionStore.election?.slug)
);

watch(localeStore, () => (locale.value = localeStore.locale));

function setLocale(locale) {
  localeStore.setLocale(locale)
  const url = [
    locale,
    electionStore.election.slug,
  ]

  if (route.params.trackingCode) {
    url.push("track")
    url.push(route.params.trackingCode)
  }

  router.replace(`/${url.join('/')}`)
}

onMounted(() => {
  locale.value = localeStore.locale;
});
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

      <img
        src="../assets/us.svg"
        :class="{ Header__Flag: true, ['Header__Flag--current']: locale === 'en'}"
        @click="() => setLocale('en')" />

      <img
        src="../assets/es.svg"
        :class="{ Header__Flag: true, ['Header__Flag--current']: locale === 'es'}"
        @click="() => setLocale('es')" />
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

.Header__Flag {
  width: 30px;
  height: 24px;
  margin-right: 20px;
  cursor: pointer;
}

.Header__Flag--current {
  border: solid 1px #000;
}
</style>
