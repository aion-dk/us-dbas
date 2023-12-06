<script setup lang="ts">
import { watch, ref, reactive, computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import useConfigStore from "./stores/useConfigStore";
import useBallotStore from "./stores/useBallotStore";
import useVerificationStore from "./stores/useVerificationStore";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import router from "./router";
import i18n, { setLocale } from "./lib/i18n";
import type { Locale } from "./Types";

const ballotStore = useBallotStore();
const configStore = useConfigStore();
const reactiveLocale = computed(() => i18n.global.locale);
const verificationStore = useVerificationStore();
const route = useRoute();
const isLoaded = ref(false);
const footer = reactive({
  show: false,
  index: 0,
});

const restartFooter = () => {
  footer.show = false;
  footer.index = 0;
};

watch(route, async (newRoute) => {
  const slug = newRoute.params.electionSlug;

  if (slug) await configStore.loadConfig(slug.toString());

  const locale = newRoute.params.locale.toString();
  if (locale) setLocale(locale as Locale);
});

watch(reactiveLocale, async (n) => {
  await router.push({ name: route.name, params: { locale: n } });
});

watch(configStore, async () => {
  setTitle();
  if (route.params.electionSlug) {
    await configStore.loadConfig(route.params.electionSlug.toString());

    isLoaded.value = true;

    if (route.params.trackingCode) {
      await ballotStore.loadBallot(
        route.params.trackingCode.toString(),
        configStore.boardSlug
      );
    }
  }
});

watch([route, verificationStore], async () => {
  if (route.name.toString().startsWith("BallotVerifier")) {
    switch (route.name.toString()) {
      case "BallotVerifierStart":
        footer.show = true;
        footer.index = 0;
        break;
      case "BallotVerifierFound":
        footer.index = 1;
        break;
      case "BallotVerifierView":
        if (!verificationStore.ballot) footer.index = 2;
        else footer.index = 3;
        break;
      default:
        footer.index = 0;
        break;
    }
  } else restartFooter();
});

function setTitle() {
  const title = ["DBAS", configStore.election.title[i18n.global.locale]].filter(
    (s) => s
  );
  if (window.top) window.top.document.title = title.join(" - ");
}
</script>

<template>
  <div class="DBAS" v-if="isLoaded">
    <!-- <a href="#main" class="DBAS_SkipToContentLink">Skip to main content</a> -->

    <Header :election="configStore.election" :locale="i18n.global.locale" />
    <main class="DBAS__Content" id="main">
      <RouterView class="DBAS__InnerContent" />
    </main>
    <Footer
      v-if="footer.show"
      :current-step="footer.index"
      :steps="i18n.global.messages[i18n.global.locale].footer"
    />
  </div>
</template>

<style type="text/css">
:root {
  --slate-100: #f7f7f7;
  --slate-200: #e9ecef;
  --slate-300: #dee2e6;
  --slate-400: #ced4da;
  --slate-500: #adb5bd;
  --slate-600: #6c757d;
  --slate-700: #495057;
  --slate-800: #343a40;
  --slate-900: #212529;

  --avblue-100: #eff2fc;
  --avblue-200: #d9dfef;
  --avblue-300: #9eaeda;
  --avblue-400: #7c8fc1;
  --avblue-500: #5a6fa7;
  --avblue-600: #163075;
  --avblue-700: #0d1d46;
  --avblue-800: #09132f;
  --avblue-900: #040a17;

  --semantic-danger-1: #ea4e2c;
  --semantic-danger-2: #ecc9c1;
  --semantic-danger-3: #fcede9;
  --semantic-success-1: #3fc063;
  --semantic-success-2: #c5e1cc;
  --semantic-success-3: #eaf7ee;
  --semantic-warning-1: #ee9500;
  --semantic-warning-2: #f5deb6;
  --semantic-warning-3: #fef7ea;
  --semantic-info-1: #006ce5;
  --semantic-info-2: #b4cceb;
  --semantic-info-3: #e6effa;

  /* This is not being correctly imported from the UI lib and couldn't find out why, but this will do the trick. */
  .AVSteps--step[data-v-a4539298]:before,
  .AVSteps--step[data-v-a4539298]:after {
    transform: rotate(90deg);
  }
}

body {
  padding: 0;
  margin: 0;
  font-family: "Open Sans";
  color: var(--slate-800);
}

* {
  box-sizing: border-box;
}

.DBAS {
  height: 100dvh;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.DBAS__Content {
  height: calc(100dvh - 70px);
  height: calc(100vh - 70px);
  margin-top: 70px;
  overflow-y: scroll;
}

.DBAS__InnerContent {
  width: 100%;
  margin: auto;
  padding: 2rem;
}

.popper-content-wrapper {
  max-width: 36rem;
  --vue-popper-bg: white;
  --vue-popper-padding: 1rem;
  --vue-popper-text-color: var(--slate-800);
  --vue-popper-border-radius: 0px;
  --vue-popper-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.15);
}

.DBAS_SkipToContentLink {
  position: absolute;
  margin-top: -100px;
}

.DBAS_SkipToContentLink:focus {
  margin-top: 100px;
}

/* Style overrides for UI Lib components */
.AVTextInput {
  text-align: center;
}

.AVTextInput--error-icon {
  z-index: 0 !important;
}

@media only screen and (max-width: 32rem) {
  .AVAlert--title-container {
    flex-direction: column !important;
  }

  .AVAlert--title {
    font-size: 1rem !important;
    text-align: left !important;
  }

  #download-logs-btn {
    font-size: 1rem;
    padding: .5rem 1rem;
  }
}

@media only screen and (min-width: 80rem) {
  .DBAS__InnerContent {
    width: 80vw;
  }
}
</style>
