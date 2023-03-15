<script setup lang="ts">
import router from "../router";
import { useRoute } from "vue-router";
import Infobox from "./Infobox.vue";
import { ref, watch, onMounted } from "vue";

const route = useRoute();
const props = defineProps({
  trackingCode: {
    type: String,
  },
  electionSlug: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: true,
  },
});

const _disabled = ref(props.disabled);
const _trackingCode = ref(props.trackingCode);
const _electionSlug = ref(props.electionSlug);

watch(_trackingCode, (_newTrackingCode) => {
  _disabled.value = !_newTrackingCode;
});

async function submitForm(event: any) {
  event.preventDefault();
  event.stopPropagation();
  _disabled.value = true;
  router.push(
    `/${route.params.locale}/${_electionSlug.value}/track/${_trackingCode.value}`
  );
}

onMounted(() => {
  document.querySelector("#ballot-tracking-code").focus();
});
</script>

<template>
  <Infobox class="BallotTrackingWidget">
    <form @submit="submitForm" class="BallotTrackingWidget__Form">
      <p
        :class="{
          BallotTrackingWidget__Input: true,
          'BallotTrackingWidget__Input--filled': _trackingCode,
        }"
      >
        <label for="ballot-tracking-code"> Ballot tracking code </label>

        <input
          type="text"
          id="ballot-tracking-code"
          name="ballot-tracking-code"
          v-model="_trackingCode"
          autofocus="true"
        />
      </p>

      <p class="BallotTrackingWidget__Submit">
        <input
          :disabled="_disabled"
          type="submit"
          name="submit-tracking-code"
          value="Track my ballot"
        />
      </p>
    </form>
  </Infobox>
</template>

<style type="text/css" scoped>
.BallotTrackingWidget {
  display: flex;
  align-items: center;
}

.BallotTrackingWidget__Form {
  flex-grow: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.BallotTrackingWidget__Input {
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0;
}

.BallotTrackingWidget__Input label {
  position: absolute;
  width: 100%;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-style: italic;
  color: #adb5bd;
}

.BallotTrackingWidget__Input input {
  width: 100%;
  border-radius: 12px;
  padding: 0 12px;
  text-align: center;
  border: solid 1px #adb5bd;
  height: 44px;
  line-height: 44px;
  box-sizing: border-box;
  font-size: 16px;
}

.BallotTrackingWidget__Input--filled label {
  position: initial;
  color: initial;
  font-style: initial;
}

.BallotTrackingWidget__Submit {
  width: 100%;
  padding: 0;
  margin: 0;
  margin-top: 16px;
}

.BallotTrackingWidget__Submit input {
  box-sizing: border-box;
  background-color: #343a40;
  border: none;
  border-radius: 12px;
  padding: 10px 12px;
  width: 100%;
  display: block;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.BallotTrackingWidget__Submit input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
