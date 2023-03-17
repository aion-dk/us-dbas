<script lang="ts" setup>
import DateTime from "../components/DateTime.vue";
import { hexToShortCode } from "@aion-dk/js-client/dist/lib/av_client/short_codes";
import ExpandableSection from "./ExpandableSection.vue";

defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="BoardItem">
    <ExpandableSection>
      <template v-slot:collapsed>
        <span class="BoardItem__Type">
          {{ $t(`components.board_item.${item.type}.type`) }}
        </span>

        <span class="BoardItem__Date">
          <font-awesome-icon
            icon="fa-solid fa-clock"
            class="BoardItem__InlineIcon"
          />
          <DateTime :date-time="item.registeredAt" format="relative" />
        </span>

        <span class="BoardItem__ShortAddress">
          <font-awesome-icon
            icon="fa-solid fa-fingerprint"
            class="BoardItem__InlineIcon"
          />
          {{ hexToShortCode(item.address.slice(0, 10)) }}
        </span>

        <span class="BoardItem__Author">
          <font-awesome-icon
            icon="fa-solid fa-user"
            class="BoardItem__InlineIcon"
          />
          {{ $t(`components.board_item.${item.type}.author`) }}
        </span>
      </template>

      <template v-slot:expanded>
        <p class="BoardItem__Type">
          {{ $t(`components.board_item.${item.type}.type`) }}
        </p>

        <p>
          <font-awesome-icon
            icon="fa-solid fa-clock"
            class="BoardItem__InlineIcon"
          />
          <DateTime :date-time="item.registeredAt" format="absolute" />
        </p>

        <p>
          <font-awesome-icon
            icon="fa-solid fa-fingerprint"
            class="BoardItem__InlineIcon"
          />
          <span>{{ hexToShortCode(item.address.slice(0, 10)) }}</span>
        </p>

        <p>
          <font-awesome-icon
            icon="fa-solid fa-user"
            class="BoardItem__InlineIcon"
          />
          <span>{{ $t(`components.board_item.${item.type}.author`) }}</span>
        </p>

        <p>
          {{ $t(`components.board_item.${item.type}.info`) }}
        </p>
      </template>
    </ExpandableSection>
  </div>
</template>

<style type="text/css" scoped>
.BoardItem__Type {
  width: 300px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 700;
  padding: 0;
  margin: 0;
}

.BoardItem__Date {
  width: 170px;
}

.BoardItem__ShortAddress {
  width: 170px;
  white-space: pre-line;
}

.BoardItem__InlineIcon {
  margin-right: 5px;
}
</style>
