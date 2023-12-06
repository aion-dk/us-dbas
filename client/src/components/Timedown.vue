<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";

const ALERT_TIMEOUT = 180; // Time left for the 'running out of time' alert to pop up

const emit = defineEmits(["timeout", "alert"]);

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

const msToTimeLeft = (ms: number) => {
  let min = Math.floor(ms / 60000);
  let sec = Number.parseInt(((ms % 60000) / 1000).toFixed(0));
  return min + ":" + (sec < 10 ? "0" : "") + sec;
};

const secondsLeft = ref(props.currentSeconds);
const interval = ref(null);
const miliseconds = computed(() => secondsLeft.value * 1000);
const percentageWidth = computed(
  () => (secondsLeft.value / props.maxSeconds) * 100,
);
const progressBgColor = computed(() =>
  secondsLeft.value <= ALERT_TIMEOUT ? "--semantic-warning-1" : "--slate-800",
);
const style = computed(() => {
  return `
      --width: ${percentageWidth.value}%;
      background-color: var(${progressBgColor.value});
    `;
});

watch(secondsLeft, () => {
  if (secondsLeft.value === ALERT_TIMEOUT) emit("alert");
  if (secondsLeft.value === 0) emit("timeout");
});

onMounted(() => {
  interval.value = setInterval(() => decrementSeconds(), 1000);
});
</script>

<template>
  <div class="Timedown">
    <div class="Timedown__Progress" :style="style" />
    <div>
      {{ $t("timedown.title", { timeLeft: msToTimeLeft(miliseconds) }) }}
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
  text-align: right;
  padding: 0 5px;
  min-width: 20px;
  height: 6px;
  line-height: 20px;
}
</style>
