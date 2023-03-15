<script lang="ts" setup>
import BallotActivity from "./BallotActivity.vue";

defineProps({
  activities: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="BallotActivitiesList">
    <BallotActivity :activity="activity" v-for="activity in activities" />
  </div>
</template>
