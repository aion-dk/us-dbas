<script lang="ts" setup>
import moment from "moment";
import "moment/min/locales";
import "moment-timezone";
import { computed } from "vue";

const props = defineProps({
  dateTime: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    default: "relative",
    validate: (s: string) => ["absolute", "relative"].indexOf(s) >= 0,
  },
  timeZone: {
    type: String,
    default: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
});

const value = computed(() => {
  return props.format === "absolute"
    ? absolute(props.dateTime)
    : relative(props.dateTime);
});
const label = computed(() => {
  return props.format === "absolute"
    ? relative(props.dateTime)
    : absolute(props.dateTime);
});

function relative(date: any) {
  return moment
    .parseZone(date)
    .tz(props.timeZone)
    .locale(window.navigator.language)
    .fromNow();
}

function absolute(date: any) {
  return moment
    .parseZone(date)
    .tz(props.timeZone)
    .locale(window.navigator.language)
    .format("LLLL zz");
}
</script>

<template>
  <span class="DateTime" :aria-label="label">
    <AVTooltip
      :content="label"
      id="date-tooltip"
      position="top"
      :text="value"
    />
  </span>
</template>
