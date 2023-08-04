<script lang="ts" setup>
import { hexToShortCode } from "@aion-dk/js-client/dist/lib/av_client/short_codes";
import { AVIcon } from "@assemblyvoting/ui-library";
import { computed } from "vue";

const props = defineProps({
  address: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
  },
});

const shortAddress = computed(() => hexToShortCode(props.address.slice(0, 10)));
const periodicedShortAddress = computed(() => {
  return props.address?.split("")?.join(". ");
});
</script>

<template>
  <span class="ItemIdentifier">
    <AVIcon icon="fingerprint" class="ItemIdentifier__Icon" />
    <span class="ItemIdentifier__Prefix" v-if="prefix">
      {{ prefix }}
    </span>
    <code
      class="ItemIdentifier__ShortCode"
      role="button"
      :aria-label="periodicedShortAddress"
    >
      {{ shortAddress }}
    </code>
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
}

.ItemIdentifier__Prefix {
  margin-right: 5px;
}
</style>
