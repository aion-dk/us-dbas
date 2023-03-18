<script lang="ts" setup>
import { hexToShortCode } from "@aion-dk/js-client/dist/lib/av_client/short_codes";
import { ref } from "vue"

  const props = defineProps({
    address: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
    }
  })

  const shortAddress = ref(hexToShortCode(props.address.slice(0, 10)))

  async function copy() {
    await navigator.clipboard.writeText(shortAddress.value);
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
    <code class="ItemIdentifier__ShortCode" @click="copy">
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
    cursor: pointer;
  }

  .ItemIdentifier__Prefix {
    margin-right: 5px;
  }
</style>
