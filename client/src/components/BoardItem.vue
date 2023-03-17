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
    <span class="BoardItem__Type">
      {{ $t(`components.board_item.${item.type}.type`) }}
    </span>

    <span class="BoardItem__Date">
      <font-awesome-icon icon="fa-solid fa-clock" />
      <DateTime
        :date-time="item.registeredAt"
        format="relative"
      />
    </span>

    <span class="BoardItem__ShortAddress">
      <font-awesome-icon icon="fa-solid fa-fingerprint" />
      {{ hexToShortCode(item.address.slice(0, 10)) }}
    </span>

    <span class="BoardItem__Author">
      <font-awesome-icon icon="fa-solid fa-user" />
      {{ $t(`components.board_item.${item.type}.author`) }}
    </span>
  </div>
</template>

<style type="text/css" scoped>
.BoardItem {
  display: flex;
  border: solid 1px #DEE2E6;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
}

.BoardItem svg {
  margin-right: 5px;
}

.BoardItem__Type {
  width: 300px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 700;
}

.BoardItem__Date {
  width: 170px;
}

.BoardItem__ShortAddress {
  width: 170px;
}
</style>
