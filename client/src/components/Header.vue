<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import useElectionStore from "../stores/useElectionStore";
import useLocaleStore from "../stores/useLocaleStore";
import config from "../lib/config";
import router from "../router";
import enFlag from "../assets/en.svg"
import esFlag from "../assets/es.svg"

const localeStore = useLocaleStore();
const electionStore = useElectionStore();
const route = useRoute();
const slug = ref(null);
const locale = ref("en");
const locales = ref(["en"])

watch(electionStore, (newElectionStore) => setElectionInfo());
watch(localeStore, () => (locale.value = localeStore.locale));

function setElectionInfo() {
  slug.value = electionStore.election?.slug
  locales.value = electionStore.election.content.locales
}

function setLocale(locale) {
  const oldLocale = localeStore.locale;
  localeStore.setLocale(locale);

  const url = window.location.href;
  const newUrl = url.replace(`/${oldLocale}/`, `/${locale}/`);
  window.location.href = newUrl;
}

const localeImages = {
  en: enFlag,
  es: esFlag,
}

onMounted(() => {
  locale.value = localeStore.locale;
});
</script>

<template>
  <nav class="Header">
    <img class="Header__Logo" :src="config.logoUrl" alt="DBAS Logo" />

    <RouterLink class="Header__Title" :to="`/${locale}/${slug}`" v-if="slug">
      {{ $t("header.dbas") }}
    </RouterLink>

    <div class="Header__Links" v-if="slug">
      <RouterLink class="Header__Link" :to="`/${locale}/${slug}/about`">
        {{ $t("header.about") }}
      </RouterLink>
      <RouterLink class="Header__Link" :to="`/${locale}/${slug}/logs`">
        {{ $t("header.logs") }}
      </RouterLink>
      <RouterLink class="Header__Link" :to="`/${locale}/${slug}/help`">
        {{ $t("header.help") }}
      </RouterLink>
      <RouterLink class="Header__Link" :to="`/${locale}/${slug}/contact`">
        {{ $t("header.contact") }}
      </RouterLink>

      <div class="Header__Flags">
        <img
          v-for="l in locales"
          :src="localeImages[l]"
          :class="{
            Header__Flag: true,
            ['Header__Flag--current']: locale === l,
            [`Header__Flag--${l}`]: locale === l,
          }"
          @click="() => setLocale(l)"
        />
      </div>
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
  padding: 20px;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  color: #495057;
}

.Header__Flags {
  margin-left: 20px;
  margin-right: 10px;
}

.Header__Flag {
  width: 30px;
  height: 24px;
  margin: 3px;
  cursor: pointer;
}

.Header__Flag--current {
  border: solid 1px #000;
}
</style>
