<script setup lang="ts">
import useConfigStore from "../stores/useConfigStore";
import useBallotStore from "../stores/useBallotStore";
import useLocaleStore from "../stores/useLocaleStore";
import CompactHeader from "../components/CompactHeader.vue";
import Infobox from "../components/Infobox.vue";
import { ref, watch, computed, onMounted } from "vue";
import BallotActivityList from "../components/BallotActivityList.vue";
import router from "../router";
import { useRoute } from "vue-router";
import type { Ballot } from "../Types";

const route = useRoute();
const localeStore = useLocaleStore();
const configStore = useConfigStore();
const ballotStore = useBallotStore();
const ballot = ref<Ballot>(null);
const periodicedTrackingCode = computed(() => {
  return ballotStore.ballot?.trackingCode?.split("")?.join(". ");
});

watch(ballotStore, () => setBallot());
watch(route, () => setBallot());

function setBallot() {
  ballot.value = ballotStore.ballot;
}

function cancel() {
  router.push(`/${localeStore.locale}/${configStore.boardSlug}`);
}

onMounted(() => setBallot());
</script>

<template>
  <div class="BallotTracker" v-if="ballot" aria-flowto="tracking-code">
    <h1 class="h1">{{ $t("views.tracker.info.title") }}</h1>

    <Infobox class="BallotTracker__TrackingCode" role="alertdialog">
      <h3 role="alert" id="tracking-code" aria-flowto="infobox">
        <span>{{ $t("views.tracker.currently_tracking") }}</span>
        <code :aria-label="periodicedTrackingCode">
          {{ ballot.trackingCode }}
        </code>
      </h3>
      <button
        class="BallotTracker__Cancel"
        @click="cancel"
        data-testid="cancel"
        :aria-label="
          $t('views.tracker.cancel_cross_label', {
            trackingCode: ballot.trackingCode,
          })
        "
      >
        ×
      </button>
    </Infobox>

    <Infobox class="BallotTracker__StatusInfo">
      <h3>{{ $t(`views.tracker.status_map.${ballot.status}.title`) }}</h3>
      <p>{{ $t(`views.tracker.status_map.${ballot.status}.description`) }}</p>
    </Infobox>

    <div
      class="BallotTracker__ActivityList"
      v-if="ballot.activities.length"
    >
      <h3 class="h1">{{ $t(`views.tracker.activity_log`) }}</h3>
      <BallotActivityList :showHeader="false" :activities="ballot.activities" />
    </div>
  </div>
</template>

<style type="text/css" scoped>
.h1 {
  font-size: 24px;
  font-weight: 600;
}

.BallotTracker {
  font-family: "Open Sans";
}

.BallotTracker__Row {
  display: flex;
  margin-bottom: 40px;
}

.BallotTracker__Row--stacked {
  flex-direction: column;
}

.BallotTracker__TrackingCode {
  text-align: center;
  margin-top: 40px;
  position: relative;
}

.BallotTracker__Infobox {
  max-width: 350px;
}

.BallotTracker__TrackingCode h3 {
  padding: 0;
  margin: 0;
}

.BallotTracker__TrackingCode code {
  font-size: 40px;
  font-family: "Red Hat Mono";
  letter-spacing: 5px;
  font-weight: 400;
}

.BallotTracker__TrackingCode h3 span {
  color: #6c757d;
  font-weight: 600;
  display: block;
  margin-bottom: 20px;
}

.BallotTracker__StatusInfo {
  margin-top: 40px;
}

.BallotTracker__StatusInfo h3 {
  font-size: 24px;
  font-weight: 600;
}

.BallotTracker__Cancel {
  border: none;
  background: transparent;
  position: absolute;
  top: 0;
  right: 8px;
  font-size: 40px;
  cursor: pointer;
  color: #adb5bd;
}

.BallotTracker__ActivityList {
  margin-top: 40px;
}
</style>
