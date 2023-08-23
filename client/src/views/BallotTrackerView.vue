<script setup lang="ts">
import useConfigStore from "../stores/useConfigStore";
import useBallotStore from "../stores/useBallotStore";
import { ref, watch, computed, onMounted } from "vue";
import BallotActivityList from "../components/BallotActivityList.vue";
import router from "../router";
import { useRoute } from "vue-router";
import type { Ballot } from "../Types";
import i18n from "../lib/i18n";

const route = useRoute();
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
  router.push(`/${i18n.global.locale}/${configStore.boardSlug}`);
}

onMounted(() => setBallot());
</script>

<template>
  <div class="BallotTracker" v-if="ballot" aria-flowto="tracking-code">
    <h1 class="h1">{{ $t("views.tracker.info.title") }}</h1>

    <AVCard class="BallotTracker__TrackingCode" role="alertdialog">
      <div role="alert" id="tracking-code" aria-flowto="ballot-status">
        <span>{{ $t("views.tracker.currently_tracking") }}</span>
        <code :aria-label="periodicedTrackingCode">
          {{ ballot.trackingCode }}
        </code>
      </div>
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
    </AVCard>

    <AVCard class="BallotTracker__StatusInfo" id="ballot-status">
      <h3>{{ $t(`views.tracker.status_map.${ballot.status}.title`) }}</h3>
      <p>{{ $t(`views.tracker.status_map.${ballot.status}.description`) }}</p>
    </AVCard>

    <div class="BallotTracker__ActivityList" v-if="ballot.activities.length">
      <h3 class="h1">{{ $t(`views.tracker.activity_log`) }}</h3>
      <BallotActivityList :showHeader="false" :activities="ballot.activities" />
    </div>
  </div>
</template>

<style type="text/css" scoped>
.h1 {
  font-size: 24px;
  font-weight: 600;
  margin-top: 40px;
}

.BallotTracker__TrackingCode {
  text-align: center;
  margin-top: 40px;
  position: relative;
  padding: 2rem !important;
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

.BallotTracker__TrackingCode span {
  color: var(--slate-600);
  font-weight: 600;
  display: block;
  margin-bottom: 20px;
}

.BallotTracker__StatusInfo {
  margin-top: 40px;
  padding: 2rem 4rem !important;
}

.BallotTracker__StatusInfo h3 {
  font-size: 24px;
  font-weight: 600;
}

.BallotTracker__Cancel {
  border: none;
  background: transparent;
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 40px;
  cursor: pointer;
  color: var(--slate-500);
}

.BallotTracker__Cancel:hover {
  color: var(--slate-800);
}

.BallotTracker__ActivityList {
  margin-top: 40px;
}
</style>
