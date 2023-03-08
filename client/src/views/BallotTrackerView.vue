<script setup lang="ts">
import BallotTrackingWidget from "../components/BallotTrackingWidget.vue";
import { useRoute } from "vue-router";
import useAVClient from "../lib/useAvClient";
import { onMounted, onUnmounted, ref, watch } from "vue";
import DateTime from "../components/DateTime.vue";

const route = useRoute();
const _trackingCode = ref(route.params.trackingCode);
const _electionSlug = ref(route.params.electionSlug);
const activities = ref([]);
const status = ref("loading");
const interval = setInterval(loadBallotStatus, 1000);

watch(_trackingCode, () => loadBallotStatus());
watch(_electionSlug, () => loadBallotStatus());
watch(route, (newRoute) => {
  _trackingCode.value = newRoute.params.trackingCode;
  _electionSlug.value = newRoute.params.electionSlug;
});

async function loadBallotStatus() {
  console.info("Tracking ballot", _trackingCode.value);

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
      :trackingCode="_trackingCode"
      :electionSlug="_electionSlug"
    />

    <p class="BallotTracker__Status">{{ status }}</p>

    <ol>
      <li v-for="activity in activities">
        <DateTime :date-time="activity.registered_at" />
        {{ activity.type }}
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
