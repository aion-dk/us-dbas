<script lang="ts" setup>
import DateTime from "./DateTime.vue";

defineProps({
  activity: Object,
  required: true,
});

const activityMap = {
  AffidavitRejectItem: "Rejected",
  AffidavitAcceptItem: "Accepted",
  CastRequestItem: "Cast vote",
  VoterSessionItem: "Authenticated",
};
</script>

<template>
  <div class="BallotActivity">
    <span class="BallotActivity__Type">
      {{ activityMap[activity.type] || activity.type }}
    </span>

    <DateTime
      class="BallotActivity__RegisteredAt"
      :date-time="activity.registered_at"
    />
  </div>
</template>

<style type="text/css" scoped>
.BallotActivity__RegisteredAt {
  margin-left: 10px;
}
</style>
