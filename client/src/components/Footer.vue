<template>
  <AVFooter
    :steps="steps"
    :done="doneSteps"
    :active="steps[currentStep]"
    disable-banner
    enable-steps
    style="z-index: 5 !important;"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  currentStep: {
    type: Number,
    default: null,
    validate: (v: number) => [0, 1, 2, 3, 4].includes(v),
  },
  steps: {
    type: Array,
    required: true,
  },
});

const doneSteps = computed(() => props.steps.slice(0, props.currentStep));
</script>
