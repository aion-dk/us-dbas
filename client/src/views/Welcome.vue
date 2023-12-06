<script setup lang="ts">
import { computed } from "vue";
import useConfigStore from "../stores/useConfigStore";
import i18n from "../lib/i18n";
import router from "../router";

const configStore = useConfigStore();

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
        {{ configStore.election.title[i18n.global.locale] }}
      </div>
      <div class="Welcome__Subtitle">{{ subtitle }}</div>
    </h1>

    <p class="Welcome__Intro">{{ $t("views.welcome.intro") }}</p>

    <AVCard class="AVCard__Override">
      <h2 class="Welcome__AlertTitle">{{ $t("views.welcome.title") }}</h2>

      <div class="Welcome__Buttons">
        <AVButton
          :label="$t('views.welcome.no')"
          type="neutral"
          size="large"
          data-test="ballot-verifier"
          full-width
          @on-click="router.push({ name: 'BallotVerifierStart' })"
        />
        <AVButton
          :label="$t('views.welcome.yes')"
          type="neutral"
          size="large"
          data-test="ballot-tracker"
          full-width
          @on-click="router.push({ name: 'BallotTrackerStart' })"
        />
      </div>
    </AVCard>
  </div>
</template>

<style type="text/css" scoped>
.Welcome {
  padding: 2rem;
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
  color: var(--slate-600);
}

.AVCard__Override {
  text-align: center;
  padding: 2rem !important;
  margin-top: 2rem;
}

.Welcome__Intro {
  color: var(--slate-600);
}

.Welcome__AlertTitle {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  padding: 0;
}

.Welcome__Buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
}

@media only screen and (min-width: 80rem) {
  .Welcome {
    max-width: 950px;
    margin: auto;
    margin-top: 40px;
  }

  .AVCard__Override {
    margin: auto;
    padding: 4rem !important;
    margin-top: 70px;
  }

  .Welcome__Buttons {
    flex-direction: row;
    margin-top: 4.5rem;
    gap: 2rem;
  }
}
</style>
