<script setup lang="ts">
import BallotTrackingWidget from "../components/BallotTrackingWidget.vue";
import { useRoute } from "vue-router";
import useAVClient from "../lib/useAvClient";
import { onMounted, onUnmounted, ref, watch } from "vue";

const route = useRoute();
const _trackingCode = ref(route.params.trackingCode)
const activities = ref([])
const status = ref("not_found")
const interval = setInterval(loadBallotStatus, 1000)

watch(_trackingCode, () => loadBallotStatus())
watch(route, (newRoute) => _trackingCode.value = newRoute.params.trackingCode)

async function loadBallotStatus() {
  console.info("Tracking ballot", _trackingCode.value);

  try {
    const avClient = await useAVClient("http://dbb:3003/us");
    const { activities, status } = await avClient.checkBallotStatus(
      _trackingCode.value
    );
    state.status = status;
    state.activities = activities;
  } catch (e) {
    console.error("No ballot with tracking code", _trackingCode.value);
    console.log(e);
  }
}

onMounted(async () => {
  loadBallotStatus();
});

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="BallotTracker">
    <BallotTrackingWidget :trackingCode="_trackingCode" />

    <p class="BallotTracker__Status">{{ status }}</p>
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
