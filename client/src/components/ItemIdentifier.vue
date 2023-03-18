<script lang="ts" setup>
import { hexToShortCode } from "@aion-dk/js-client/dist/lib/av_client/short_codes";
import { ref } from "vue";

const props = defineProps({
  address: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
  },
});

const copied = ref(false)
const shortAddress = ref(hexToShortCode(props.address.slice(0, 10)));
const style = `
--vue-popper-bg: #000;
--vue-popper-padding: 6px;
--vue-popper-text-color: #fff;
--vue-popper-border-radius: 3px;
`

async function copy() {
  await navigator.clipboard.writeText(shortAddress.value);
  copied.value = true
  setTimeout(() => copied.value = false, 300)
}
</script>

<template>
  <span class="ItemIdentifier">
    <font-awesome-icon
      icon="fa-solid fa-fingerprint"
      class="ItemIdentifier__Icon"
    />
    <span class="ItemIdentifier__Prefix" v-if="prefix">
      {{ prefix }}
    </span>

    <tooltip hover placement="top" :style="style">
      <template #default>
        <code class="ItemIdentifier__ShortCode" @click="copy">
          {{ shortAddress }}
        </code>
      </template>

      <template #content>
        <span v-if="copied">
          {{ $t("components.item_identifier.copied") }}
        </span>
        <span v-else>
          {{ $t("components.item_identifier.tooltip") }}
        </span>
      </template>
    </tooltip>
  </span>
</template>

<style type="text/css" scoped>
.ItemIdentifier__Icon {
  margin-right: 5px;
}

.ItemIdentifier__ShortCode {
  font-family: "Red Hat Mono";
  letter-spacing: 3px;
  font-weight: 400;
  cursor: pointer;
}

.ItemIdentifier__Prefix {
  margin-right: 5px;
}
</style>
