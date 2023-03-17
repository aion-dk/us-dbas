<script lang="ts" setup>
import { ref} from "vue"

const props = defineProps({
  expanded: {
    type: Boolean,
    default: false,
  },
});

const _expanded = ref(props.expanded)
</script>

<template>
  <div
    :class="{
      ExpandableSection: true,
      ['ExpandableSection--expanded']: _expanded,
    }"
  >
    <div class="ExpandableSection__Line" v-if="!_expanded">
      <slot name="collapsed"></slot>
    </div>

    <div class="ExpandableSection__Content" v-if="_expanded">
      <slot name="expanded"></slot>
    </div>

    <button class="ExpandableSection__Expander" @click="() => _expanded = !_expanded">
      <font-awesome-icon
        v-if="_expanded"
        icon="fa-solid fa-minus"
        :aria-label="$t('components.board_item.collapse')"
      />

      <font-awesome-icon
        v-else
        icon="fa-solid fa-plus"
        :aria-label="$t('components.board_item.expand')"
      />
    </button>
  </div>
</template>

<style type="text/css" scoped>
.ExpandableSection {
  display: flex;
  border: solid 1px #dee2e6;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  flex-direction: column;
  position: relative;
}

.ExpandableSection__Line {
  display: flex;
}

.ExpandableSection__Expander {
  background-color: #343a40;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  color: #fff;
  border: none;
}
</style>
