<script setup lang="ts">
import BallotTrackingWidget from "../components/BallotTrackingWidget.vue";
import { useRoute } from "vue-router";
import useAVClient from "../lib/useAVClient";
import { onMounted, onUnmounted, ref, watch, reactive } from "vue";
import BallotActivity from "../components/BallotActivity.vue";
import InfoBox from "../components/Infobox.vue"
import BallotActivityList from "../components/BallotActivityList.vue"
import useElectionStore from "../stores/useElectionStore"

const electionStore = useElectionStore()
const route = useRoute();
const _trackingCode = ref(route.params.trackingCode);
const _electionSlug = ref(route.params.electionSlug);
const activities = ref([]);
const status = ref(null);
const interval = setInterval(() => loadBallotStatus(true), 30000);
const loading = ref(false);
const _locale = ref(route.params.locale)
const _title = ref("Loading..")
const _info = ref("Loading...")

watch(_trackingCode, () => loadBallotStatus());
watch(_electionSlug, () => loadBallotStatus());
watch(_locale, () => loadInfo());
watch(route, async (newRoute) => routeChange());
watch(electionStore, newElectionStore => loadInfo())

function loadInfo() {
  _title.value = electionStore.election?.content?.title[_locale.value]
  _info.value = [
    electionStore.election?.content?.jurisdiction,
    electionStore.election?.content?.state,
    ].filter(s => s).join(", ")
}

function routeChange(r) {
  console.log("Route changed", r.params)
  _trackingCode.value = r.params.trackingCode;
  _electionSlug.value = r.params.electionSlug;
  _locale.value = r.params.locale;
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
    activities.value = []
    console.error("No ballot with tracking code", _trackingCode.value);
    console.log(e);
  } finally {
    loading.value = false;
  }
}

const statusMap = {
  rejected: "Ballot not accepted",
}

const statusDetailMap = {
  received: "Hello",
  rejected: "There is a problem with your signature affidavit. It was not accepted. Contact your local election official for next steps and to cure your affidavit.",
}

onMounted(async () => {
  await electionStore.loadElection(route.params.electionSlug)
  loadBallotStatus();
  routeChange(route)
  loadInfo()
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="BallotTracker">
    <div class="BallotTracker__Header">
      <h2 class="BallotTracker__Title">{{ _title }}</h2>
      <div class="BallotTracker__CircleSpacer" v-if="_info" />
      <p class="BallotTracker__Info">{{ _info }}</p>
    </div>

    <div class="BallotTracker__Content1">
      <InfoBox class="BallotTracker__Infobox1">
        <h3>Ballot found</h3>
        <p>See the status of your ballot below. You can also see all activity connected to your ballot tracking code.</p>
      </InfoBox>

      <InfoBox class="BallotTracker__Infobox2">
        <p>You are currently tracking</p>
        <code>{{ _trackingCode }}</code>
      </InfoBox>
    </div>

    <InfoBox class="BallotTracker__Status">
      <h3>{{ statusMap[status] }}</h3>
      <p>{{ statusDetailMap[status] || status }}</p>
    </InfoBox>

    <h3 class="BallotTracker__ActivityTitle">
      Activity connected to the tracking code
    </h3>

    <BallotActivityList v-if="activities.length"
      class="BallotTracker__BallotActivity"
      :activities="activities" />
  </div>
</template>

<style type="text/css" scoped>
.BallotTracker {
  font-family: "Open Sans";
  padding: 40px 166px;
  width: 900px;
  margin: auto;
}

.BallotTracker__Content1 {
  display: flex;
}

.BallotTracker__Content2 {
}

.BallotTracker__Infobox1 {
  width: 350px;
}

.BallotTracker__Infobox1 h3 {
  color: #495057;
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
  color: #6C757D;
  font-size: 22px;
  font-weight: 400;
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

.BallotTracker__Header {
  display: flex;
  align-items: center;
  color: #6C757D;
  margin-bottom: 40px;
}

.BallotTracker__Title {
  font-size: 16px;
}

.BallotTracker__Info {
  font-size: 16px;
}

.BallotTracker__CircleSpacer {
  height: 6px;
  width: 6px;
  background-color: #CED4DA;
  border-radius: 100%;
  display: block;
  margin: 0 8px;
}
</style>
