<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import humanizeDuration from "humanize-duration";
import i18n from "../lib/i18n";

const emit = defineEmits(["timeout"]);

const props = defineProps({
  maxSeconds: {
    type: Number,
    default: 600,
  },
  currentSeconds: {
    type: Number,
    default: 600,
  },
});

function decrementSeconds() {
  if (secondsLeft.value > 0) secondsLeft.value--;
}

const secondsLeft = ref(props.currentSeconds);
const interval = ref(null);
const miliseconds = computed(() => secondsLeft.value * 1000);
const displayValue = computed(() =>
  humanizeDuration(miliseconds.value, { language: i18n.global.locale })
);
const percentageWidth = computed(
  () => (secondsLeft.value / props.maxSeconds) * 100
);
const style = computed(() => {
  return `
      --width: ${percentageWidth.value}%;
    `;
});

watch(secondsLeft, () => (secondsLeft.value === 0 ? emit("timeout") : null));

onMounted(() => {
  interval.value = setInterval(() => decrementSeconds(), 1000);
});
</script>

<template>
  <div class="Timedown">
    <div class="Timedown__Progress" :style="style" />
    <div>
      {{ $t("timedown.title", { timeLeft: displayValue }) }}
    </div>
  </div>
</template>

<style type="text/css" scoped>
.Timedown {
  width: 100%;
  text-align: left;
}

.Timedown__Progress {
  width: var(--width);
  background-color: #333;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  text-align: right;
  padding: 0 5px;
  min-width: 20px;
  height: 6px;
  line-height: 20px;
}
</style>
