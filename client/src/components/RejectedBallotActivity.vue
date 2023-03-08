<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
});

const reasonMap = {
  invalid: "it's invalid",
};

const _text = ref(
  `Rejected because ${reasonMap[props.activity.content.rejectionReason]}`
);
</script>

<template>
  <span class="RejectedBallotActivity">{{ _text }}</span>
</template>
