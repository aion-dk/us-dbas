<script lang="ts" setup>
import DateTime from "../components/DateTime.vue";
import { hexToShortCode } from "@aion-dk/js-client/dist/lib/av_client/short_codes";

defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="BoardItem">
    <span class="BoardItem__Type">{{ item.type }}</span>
    <DateTime
      class="BoardItem__Date"
      :date-time="item.registeredAt"
      format="relative"
    />
    <span>{{ hexToShortCode(item.address.slice(0, 10)) }}</span>
  </div>
</template>

<style type="text/css" scoped>
.BoardItem {
  display: flex;
}

.BoardItem__Type {
  width: 250px;
}

.BoardItem__Date {
  width: 170px;
}
</style>
