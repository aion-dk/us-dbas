<script lang="ts" setup>
import DateTime from "../components/DateTime.vue";
import ExpandableSection from "./ExpandableSection.vue";
import ItemIdentifier from "./ItemIdentifier.vue";

defineProps({
  item: {
    type: Object,
    required: true,
  },
  isConfigItem: {
    type: Boolean,
    required: true,
  },
});

const getRelevantKey = (item: any) => {
  if (item.type === 'ThresholdConfigItem') return item.content.encryptionKey
  else return item.address
}
</script>

<template>
  <div class="BoardItem">
    <ExpandableSection>
      <template v-slot:collapsed>
        <span class="BoardItem__Type" aria-label="Activity">
          {{ $t(`components.board_item.${item.type}.type`) }}
        </span>

        <span class="BoardItem__Date" aria-label="Activity registered at">
          <AVIcon
            icon="clock"
            class="BoardItem__InlineIcon"
            aria-hidden="true"
          />
          <DateTime :date-time="item.registeredAt" format="relative" />
        </span>

        <span v-if="isConfigItem" class="BoardItem__ShortAddress" aria-label="Activity identifier">
          <ItemIdentifier :address="getRelevantKey(item)" />
        </span>

        <span v-else class="BoardItem__Author" aria-label="Activity authored by">
          <AVIcon
            icon="user"
            class="BoardItem__InlineIcon"
            aria-hidden="true"
          />
          {{ $t(`components.board_item.${item.type}.author`) }}
        </span>
      </template>

      <template v-slot:expanded>
        <p class="BoardItem__Type">
          {{ $t(`components.board_item.${item.type}.type`) }}
        </p>

        <p>
          <AVIcon icon="clock" class="BoardItem__InlineIcon" />
          <span>{{ $t(`components.board_item.registered`) }}</span>
          <DateTime :date-time="item.registeredAt" format="absolute" />
        </p>

        <p>
          <ItemIdentifier
            :prefix="$t(`components.board_item.address`)"
            :address="getRelevantKey(item)"
          />
        </p>

        <p>
          <AVIcon icon="user" class="BoardItem__InlineIcon" />
          <span>{{ $t(`components.board_item.author`) }}</span>
          <span>{{ $t(`components.board_item.${item.type}.author`) }}</span>
        </p>

        <p>
          <AVIcon icon="circle-info" class="BoardItem__InlineIcon" />
          <span>{{ $t(`components.board_item.info`) }}</span>
        </p>
        <p>
          {{ $t(`components.board_item.${item.type}.info`) }}
        </p>
      </template>
    </ExpandableSection>
  </div>
</template>

<style type="text/css" scoped>
.BoardItem {
  color: var(--slate-800);
}

.BoardItem__Type {
  width: 25vw;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 700;
  padding: 0;
  margin: 0;
}

.BoardItem__Date {
  width: 20vw;
}

.BoardItem__ShortAddress {
  width: 20vw;
  white-space: pre-line;
}

.BoardItem__InlineIcon {
  margin-right: 5px;
  color: var(--slate-600);
}
</style>
