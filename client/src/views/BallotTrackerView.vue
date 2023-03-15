<script setup lang="ts">
import BallotTrackingWidget from "../components/BallotTrackingWidget.vue";
import { useRoute } from "vue-router";
import useAVClient from "../lib/useAVClient";
import { onMounted, onUnmounted, ref, watch, reactive } from "vue";
import BallotActivity from "../components/BallotActivity.vue";
import InfoBox from "../components/Infobox.vue";
import BallotActivityList from "../components/BallotActivityList.vue";
import useElectionStore from "../stores/useElectionStore";
import CompactHeader from "../components/CompactHeader.vue";
import router from "../router";

const electionStore = useElectionStore();
const route = useRoute();
const _trackingCode = ref(route.params.trackingCode);
const _electionSlug = ref(route.params.electionSlug);
const activities = ref([]);
const status = ref(null);
const interval = setInterval(() => loadBallotStatus(true), 30000);
const loading = ref(false);
const _locale = ref(route.params.locale);
const _title = ref("Loading..");
const _info = ref("Loading...");

watch(_trackingCode, () => loadBallotStatus());
watch(_electionSlug, () => loadBallotStatus());
watch(_locale, () => loadInfo());
watch(route, async (newRoute) => routeChange());
watch(electionStore, (newElectionStore) => loadInfo());

function loadInfo() {
  _title.value = electionStore.election?.content?.title[_locale.value];
  _info.value = [
    electionStore.election?.content?.jurisdiction,
    electionStore.election?.content?.state,
  ]
    .filter((s) => s)
    .join(", ");
}

function routeChange(r) {
  _trackingCode.value = r.params.trackingCode;
  _electionSlug.value = r.params.electionSlug;
  _locale.value = r.params.locale;
}

function reset() {
  router.push(`/${_locale.value}/${_electionSlug.value}`);
}

async function loadBallotStatus(background: boolean) {
  console.info("Tracking ballot", _trackingCode.value);

  if (!background) loading.value = true;

  try {
    const avClient = await useAVClient(_electionSlug.value);
    const res = await avClient.checkBallotStatus(_trackingCode.value);
    status.value = res.status;
    activities.value = res.activities.reverse();
  } catch (e) {
    status.value = "not_found";
    activities.value = [];
    console.error("No ballot with tracking code", _trackingCode.value);
    console.log(e);
  } finally {
    loading.value = false;
  }
}

const statusMap = {
  rejected: "Ballot not accepted",
  not_found: "Not Found",
};

const statusDetailMap = {
  received: "Hello",
  rejected:
    "There is a problem with your signature affidavit. It was not accepted. Contact your local election official for next steps and to cure your affidavit.",
  not_found:
    "Please check that the tracking code was entered correctly. The code is case sensitive. If you are checking to make sure your ballot was recorded correctly before submitting, use the ballot check site instead. Still having problems? Contact your local election official.",
};

onMounted(async () => {
  await electionStore.loadElection(route.params.electionSlug);
  loadBallotStatus();
  routeChange(route);
  loadInfo();
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="BallotTracker">
    <CompactHeader class="BallotTracker__Header" />

    <div class="BallotTracker__Content1">
      <InfoBox
        :class="{
          BallotTracker__Infobox1: true,
          [`BallotTracker__Infobox1--${status}`]: true,
        }"
      >
        <h3>{{ statusMap[status] }}</h3>
        <p>{{ statusDetailMap[status] || status }}</p>
      </InfoBox>

      <InfoBox class="BallotTracker__Infobox2">
        <button class="BallotTracker__Close" @click="reset">×</button>
        <p>You are currently tracking</p>
        <code>{{ _trackingCode }}</code>
      </InfoBox>
    </div>

    <h3 class="BallotTracker__ActivityTitle" v-if="status !== 'not_found'">
      Activity connected to the tracking code
    </h3>

    <BallotActivityList
      v-if="activities.length"
      class="BallotTracker__BallotActivity"
      :activities="activities"
    />
  </div>
</template>

<style type="text/css" scoped>
.BallotTracker {
  font-family: "Open Sans";
}

.BallotTracker__Content1 {
  display: flex;
}

.BallotTracker__Content2 {
}

.BallotTracker__Infobox1 {
  width: 350px;
}

.BallotTracker__Infobox1--not_found,
.BallotTracker__Infobox1--rejected {
  border-color: red;
  color: darkred;
}

.BallotTracker__Infobox1 h3 {
  font-weight: 600;
  font-size: 26px;
}

.BallotTracker__Infobox2 {
  margin-left: 40px;
  width: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 22px;
  font-weight: 400;
  position: relative;
}

.BallotTracker__Infobox2 p {
  margin: 0;
  padding: 0;
}

.BallotTracker__Status {
  margin-top: 40px;
}

.BallotTracker__Status h3 {
  text-transform: capitalize;
  font-size: 24px;
  font-weight: 600;
}

.BallotTracker__ActivityTitle {
  margin-top: 40px;
  font-size: 24px;
  font-weight: 600;
}

code {
  font-family: "Roboto Mono";
  font-weight: 400;
  font-size: 40px;
  color: #212529;
}

.BallotTracker__Close {
  color: #adb5bd;
  background-color: transparent;
  border: none;
  font-size: 3rem;
  position: absolute;
  top: 0;
  right: 5px;
  cursor: pointer;
}
</style>
