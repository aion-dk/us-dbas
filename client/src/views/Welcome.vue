<script setup lang="ts">
import BallotTrackingWidget from "../components/BallotTrackingWidget.vue";
import { useRoute } from "vue-router";
import useElectionStore from "../stores/useElectionStore"
import { ref, watch } from "vue";
import Infobox from "../components/Infobox.vue"

const electionStore = useElectionStore()
const route = useRoute();
const _electionSlug = ref(route.params.electionSlug);
const _locale = ref(route.params.locale)
const _title = ref("Loading..")
const _info = ref("Loading..")

function setTitle() {
  _title.value = electionStore.election?.content?.title[_locale.value]
}

function setInfo() {
  _info.value = [
    electionStore.election?.content?.jurisdiction,
    electionStore.election?.content?.state,
  ].filter(s => s).join(", ")
}

watch(route, (newRoute) => {
  _electionSlug.value = newRoute.params.electionSlug;
  _locale.value = newRoute.params.locale;
  setTitle()
  setInfo()
});

watch(electionStore, (newElectionStore) => {
  setTitle()
  setInfo()
});
</script>

<template>
  <div class="Welcome">
    <div class="Welcome__Header">
      <h2 class="Welcome__Title">{{ _title }}</h2>
      <h3 class="Welcome__Info">{{ _info }}</h3>
    </div>

    <div class="Welcome__Content">
      <Infobox class="Welcome__About">
        <p>Ballot tracker</p>
        <p>I have voted and I want to track my ballot</p>
        <p>To check the status of your ballot, you need to input the tracking code from the Voter receipt.</p>
      </Infobox>
      <BallotTrackingWidget class="Welcome__Widget" :election-slug="_electionSlug" />
    </div>

    <div class="Welcome__Footer">
      <p>Did you mean Ballot Check instead?</p>
    </div>
  </div>
</template>

<style type="text/css" scoped>
.Welcome {
  font-family: "Open Sans";
  padding: 121px 166px;
  width: 900px;
  margin: auto;
}

.Welcome__Title {
  font-size: 32px;
  font-weight: 600;
  padding: 0;
  margin: 0;
  color: #212529;
}

.Welcome__Info {
  color: #6C757D;
  font-size: 26px;
  margin: 0;
  padding: 0;
  font-weight: 600;
}

.Welcome__Header {
  margin-bottom: 60px;
}

.Welcome__Content {
  display: flex;
}

.Welcome__About {
  width: 350px;
  margin-right: 40px;
}

.Welcome__Footer {
  margin-top: 24px;
}

.Welcome__Widget {
  width: 100%;
}
</style>
