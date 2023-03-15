<script lang="ts" setup>
import moment from "moment";
import "moment/min/locales";
import "moment-timezone";

const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

defineProps({
  dateTime: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    required: true,
    default: "relative",
  },
});

function relative(date: any) {
  return moment
    .parseZone(date)
    .tz(tz)
    .locale(window.navigator.language)
    .fromNow();
}

function absolute(date: any) {
  return moment
    .parseZone(date)
    .tz(tz)
    .locale(window.navigator.language)
    .format("LLLL zz");
}
</script>

<template>
  <span
    v-if="format === 'relative'"
    class="DateTime"
    :title="absolute(dateTime)"
  >
    {{ relative(dateTime) }}
  </span>

  <span v-else class="DateTime" :title="absolute(dateTime)">
    {{ absolute(dateTime) }}
  </span>
</template>
