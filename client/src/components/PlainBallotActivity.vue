<script lang="ts" setup>
defineProps({
  activity: {
    type: Object,
    required: true,
  },
});

const translationMap = {
  AffidavitAcceptItem: "Accepted",
  CastRequestItem: "Was cast",
  VoterSessionItem: "Authenticated",
};
</script>

<template>
  <span class="PlainBallotActivity">{{ translationMap[activity.type] }}</span>
</template>
