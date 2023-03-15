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
  <span class="DateTime" :title="absolute(dateTime)">
    {{ relative(dateTime) }}
  </span>
</template>
