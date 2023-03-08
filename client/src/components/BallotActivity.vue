<script lang="ts" setup>
import DateTime from "./DateTime.vue";
import PlainBallotActivity from "./PlainBallotActivity.vue"
import RejectedBallotActivity from "./RejectedBallotActivity.vue"

defineProps({
  activity: {
    type: Object,
    required: true,
  },
});

const activityMap = {
  AffidavitRejectItem: RejectedBallotActivity,
  AffidavitAcceptItem: PlainBallotActivity,
  CastRequestItem: PlainBallotActivity,
  VoterSessionItem: PlainBallotActivity,
};
</script>

<template>
  <div class="BallotActivity">
    <component
      :is="activityMap[activity.type]"
      :activity="activity"
      class="BallotActivity__Type" />

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
