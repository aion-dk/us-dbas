<template>
  <AVFooter class="Footer" :steps="steps" :done="doneSteps" :active="steps[currentStep]" disable-banner enable-steps /> 
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  currentStep: {
    type: Number,
    default: null,
    validate: (v: number) =>
      [0,1,2,3,4].includes(v),
  },
});

const steps: string[] = [
  "Check My Ballot",
  "Code Found",
  "Verify Passkey",
  "Review Unsealed Ballot",
  "Finish",
];

const doneSteps = computed(() => steps.slice(0, props.currentStep));
</script>
