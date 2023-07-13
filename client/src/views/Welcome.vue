<script setup lang="ts">
import { computed } from "vue";
import useConfigStore from "../stores/useConfigStore";
import useLocaleStore from "../stores/useLocaleStore";
import Infobox from "../components/Infobox.vue";

const configStore = useConfigStore();
const localeStore = useLocaleStore();

const subtitle = computed(() => {
  return [configStore.election.jurisdiction, configStore.election.stateName]
    .filter((i) => i)
    .join(",");
});
</script>

<template>
  <div class="Welcome">
    <h1>
      <div class="Welcome__Title">{{ $t("header.dbas") }}</div>
      <div class="Welcome__Election">
        {{ configStore.election.title[localeStore.locale] }}
      </div>
      <div class="Welcome__Subtitle">{{ subtitle }}</div>
    </h1>

    <p class="Welcome__Intro">{{ $t("views.welcome.intro") }}</p>

    <Infobox class="Welcome__Alert">
      <h2 class="Welcome__AlertTitle">{{ $t("views.welcome.title") }}</h2>

      <div class="Welcome__Buttons">
        <RouterLink :to="{ name: 'BallotVerifierStart' }" data-test="ballot-verifier">
          {{ $t("views.welcome.no") }}
        </RouterLink>
        <RouterLink :to="{ name: 'BallotTrackerStart' }" data-test="ballot-tracker">
          {{ $t("views.welcome.yes") }}
        </RouterLink>
      </div>
    </Infobox>
  </div>
</template>

<style type="text/css" scoped>
.Welcome {
  max-width: 950px;
  margin: auto;
  margin-top: 40px;
}

h1 {
  margin: 0;
  padding: 0;
}

.Welcome__Title {
  font-size: 32px;
  font-weight: 600;
}

.Welcome__Election {
  margin-top: 12px;
  font-weight: 600;
  font-size: 26px;
}

.Welcome__Subtitle {
  margin-top: 12px;
  font-size: 24px;
  font-weight: 600;
  color: #6c757d;
}

.Welcome__Alert {
  text-align: center;
  max-width: 700px;
  margin: auto;
  margin-top: 70px;
}

.Welcome__Intro {
  color: #6c757d;
}

.Welcome__AlertTitle {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  padding: 0;
}

.Welcome__Buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 72px;
}

.Welcome__Buttons a {
  background-color: #212529;
  color: #fff;
  width: 304px;
  padding: 16px;
  margin: 16px;
  border-radius: 12px;
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
}
</style>
