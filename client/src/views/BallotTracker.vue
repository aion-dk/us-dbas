<script setup lang="ts">
import TrackingWidget from "../components/TrackingWidget.vue";
import { useRoute } from "vue-router";
import useAVClient from "../lib/useAvClient";
import { onMounted, reactive } from "vue";

const route = useRoute();
const ballotStatus = reactive({ status: "not_found", activities: [] });

let trackingCode = route.params.trackingCode;

async function loadBallotStatus() {
  try {
    const avClient = await useAVClient("http://dbb:3003/us");
    const { activities, status } = await avClient.checkBallotStatus(
      trackingCode
    );
    ballotStatus.status = status;
    ballotStatus.activities = activities;
  } catch (e) {
    console.error("No ballot with tracking code", trackingCode);
  }
}

onMounted(async () => {
  loadBallotStatus();
});
</script>

<template>
  <div class="BallotTracker">
    <TrackingWidget :trackingCode="trackingCode" />

    <pre>{{ JSON.stringify(ballotStatus) }}</pre>
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
