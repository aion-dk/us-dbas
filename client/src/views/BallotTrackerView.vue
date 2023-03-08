<script setup lang="ts">
import BallotTrackingWidget from "../components/BallotTrackingWidget.vue";
import { useRoute } from "vue-router";
import useAVClient from "../lib/useAvClient";
import { onMounted, onUnmounted, ref, watch } from "vue";
import BallotActivity from "../components/BallotActivity.vue";

const route = useRoute();
const _trackingCode = ref(route.params.trackingCode);
const _electionSlug = ref(route.params.electionSlug);
const activities = ref([]);
const status = ref(null);
const interval = setInterval(() => loadBallotStatus(true), 1000);
const loading = ref(false);

watch(_trackingCode, () => loadBallotStatus());
watch(_electionSlug, () => loadBallotStatus());
watch(route, (newRoute) => {
  _trackingCode.value = newRoute.params.trackingCode;
  _electionSlug.value = newRoute.params.electionSlug;
});

async function loadBallotStatus(background: boolean) {
  console.info("Tracking ballot", _trackingCode.value, background);
  if (!background) loading.value = true;

  try {
    const avClient = await useAVClient(
      `http://dbb:3003/${_electionSlug.value}`
    );
    const res = await avClient.checkBallotStatus(_trackingCode.value);
    status.value = res.status;
    activities.value = res.activities.reverse();
  } catch (e) {
    status.value = "not_found";
    console.error("No ballot with tracking code", _trackingCode.value);
    console.log(e);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  loadBallotStatus();
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="BallotTracker">
    <BallotTrackingWidget
      :disabled="loading"
      :trackingCode="_trackingCode"
      :electionSlug="_electionSlug"
    />

    <p class="BallotTracker__Status" v-if="status">Currently: {{ status }}</p>

    <p v-if="activities.length" class="BallotTracker__ActivityTitle">
      Recent activity
    </p>

    <ol class="BallotTracker__ActivityList" v-if="activities.length">
      <li v-for="activity in activities">
        <BallotActivity :activity="activity" />
      </li>
    </ol>
  </div>
</template>

<style type="text/css" scoped>
.Welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
