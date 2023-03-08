<script setup lang="ts">
import router from "../router";

const props = defineProps({
  trackingCode: {
    type: String,
  },
  electionSlug: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

let _trackingCode = props.trackingCode;
let _electionSlug = props.electionSlug;

async function submitForm(event) {
  event.preventDefault();
  event.stopPropagation();
  router.push(`/${_electionSlug}/track/${_trackingCode}`);
}
</script>

<template>
  <form @submit="submitForm">
    <p>
      <input
        :disabled="disabled"
        type="text"
        name="tracking-code"
        v-model="_trackingCode"
      />
    </p>

    <p>
      <input
        :disabled="disabled"
        type="submit"
        name="submit-tracking-code"
        value="Track my ballot"
      />
    </p>
  </form>
</template>
