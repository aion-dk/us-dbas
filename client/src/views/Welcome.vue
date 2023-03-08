<script setup lang="ts">
import BallotTrackingWidget from "../components/BallotTrackingWidget.vue";
</script>

<template>
  <div class="Welcome">
    <h1 class="Welcome__Title">Digital Ballot Audit Site</h1>

    <BallotTrackingWidget />
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
