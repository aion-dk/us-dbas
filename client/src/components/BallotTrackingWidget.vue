<script setup lang="ts">
import router from "../router";
import { useRoute } from "vue-router"
import Infobox from "./Infobox.vue"

const route = useRoute()
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

async function submitForm(event: any) {
  event.preventDefault();
  event.stopPropagation();
  router.push(`/${route.params.locale}/${_electionSlug}/track/${_trackingCode}`);
}
</script>

<template>
  <Infobox class="BallotTrackingWidget">
    <form @submit="submitForm">
      <p>
        <input
          :disabled="disabled"
          type="text"
          name="ballot tracking code"
          v-model="_trackingCode"
          autofocus="true"
        />
      </p>

      <p>
        <input
          :disabled="disabled"
          type="submit"
          name="submit tracking code"
          value="Track my ballot"
        />
      </p>
    </form>
  </Infobox>
</template>

<style type="text/css" scoped>
  .BallotTrackingWidget {
  }
</style>
