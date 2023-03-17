<script lang="ts" setup>
import DateTime from "../components/DateTime.vue";
import { hexToShortCode } from "@aion-dk/js-client/dist/lib/av_client/short_codes";
import { ref } from "vue"

defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const expanded = ref(false)

function toggleExpanded() {
  expanded.value = !expanded.value
}

</script>

<template>
  <div :class="{ BoardItem: true, ['BoardItem--expanded']: expanded }">
    <div class="BoardItem__Line">
      <span class="BoardItem__Type">
        {{ $t(`components.board_item.${item.type}.type`) }}
      </span>

      <span class="BoardItem__Date" v-if="!expanded">
        <font-awesome-icon icon="fa-solid fa-clock" />
        <DateTime
          :date-time="item.registeredAt"
          format="relative"
        />
      </span>

      <span class="BoardItem__ShortAddress" v-if="!expanded">
        <font-awesome-icon icon="fa-solid fa-fingerprint" />
        {{ hexToShortCode(item.address.slice(0, 10)) }}
      </span>

      <span class="BoardItem__Author" v-if="!expanded">
        <font-awesome-icon icon="fa-solid fa-user" />
        {{ $t(`components.board_item.${item.type}.author`) }}
      </span>

      <span class="BoardItem__Expander" @click="toggleExpanded">
        <font-awesome-icon
          v-if="expanded"
          icon="fa-solid fa-minus"
          :aria-label="$t('components.board_item.collapse')"
        />
        <font-awesome-icon
          v-else
          icon="fa-solid fa-plus"
          :aria-label="$t('components.board_item.expand')"
        />
      </span>
    </div>

    <div class="BoardItem__Content" v-if="expanded">
      <p>
        <font-awesome-icon icon="fa-solid fa-clock" />
        <DateTime
          :date-time="item.registeredAt"
          format="absolute"
        />
      </p>

      <p>
        <font-awesome-icon icon="fa-solid fa-fingerprint" />
        {{ hexToShortCode(item.address.slice(0, 10)) }}
      </p>

      <p>
        <font-awesome-icon icon="fa-solid fa-user" />
        {{ $t(`components.board_item.${item.type}.author`) }}
      </p>

      <p>
        <font-awesome-icon icon="fa-solid fa-circle-info" />
        {{ $t(`components.board_item.info`) }}
      </p>

      <p>
        {{ $t(`components.board_item.${item.type}.info`) }}
      </p>
    </div>
  </div>
</template>

<style type="text/css" scoped>
.BoardItem {
  display: flex;
  border: solid 1px #DEE2E6;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  flex-direction: column;
}

.BoardItem__Expander {
  background-color: #343A40;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  color: #fff;
}

.BoardItem__Line {
  display: flex;
  position: relative;
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

.BoardItem__Date svg {
  margin-right: 5px;
}

.BoardItem__ShortAddress {
  width: 170px;
}

.BoardItem__Content svg,
.BoardItem__ShortAddress svg,
.BoardItem__Author svg {
  margin-right: 5px;
}
</style>
