<script setup lang="ts">
import BallotTrackingWidget from "../components/BallotTrackingWidget.vue";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();
const _electionSlug = ref(route.params.electionSlug);

watch(route, (newRoute) => {
  _electionSlug.value = newRoute.params.electionSlug;
});
</script>

<template>
  <div class="Welcome">
    <h1 class="Welcome__Title">Digital Ballot Audit Site</h1>

    <BallotTrackingWidget :election-slug="_electionSlug" />
  </div>
</template>

<style type="text/css" scoped>
.Welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.Welcome .Welcome__Title {
  font-size: 2rem;
}
</style>
