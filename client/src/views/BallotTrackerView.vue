<script setup lang="ts">
import useElectionStore from "../stores/useElectionStore";
import useBallotstore from "../stores/useBallotstore";
import useLocaleStore from "../stores/useLocaleStore";
import CompactHeader from "../components/CompactHeader.vue";
import Infobox from "../components/Infobox.vue";
import { ref, watch, onMounted } from "vue";
import BallotActivityList from "../components/BallotActivityList.vue";
import router from "../router";

const localeStore = useLocaleStore();
const electionStore = useElectionStore();
const ballotStore = useBallotstore();
const ballot = ref(null);

watch(ballotStore, () => setBallot());

const statusMap = {
  found: {
    title: "Ballot received",
    body: "Your ballot package has been received. Check back to verify that your ballot was accepted for counting.",
  },
  rejected: {
    title: "Ballot Not Accepted",
    body: "There is a problem with your signature affidavit. Contact your local election official for next steps and to cure your affidavit.",
  },
  accepted: {
    title: "Ballot accepted",
    body: "Your signature affidavit has been verified and your ballot is accepted for counting.",
  },
  extracted: {
    title: "Ballot decrypted for printing",
    body: "Your ballot has been extracted from the digital ballot box and decrypted offline. It has been printed onto a paper ballot for scanning and tabulation with other absentee ballots.",
  },
};

function setBallot() {
  ballot.value = ballotStore.ballot;
}

function cancel() {
  router.push(`/${localeStore.locale}/${electionStore.election.slug}`);
}

onMounted(() => setBallot());
</script>

<template>
  <div class="BallotTracker" v-if="ballot">
    <CompactHeader />

    <div class="BallotTracker__Row">
      <Infobox class="BallotTracker__Infobox">
        <h2 role="status">Ballot found</h2>

        <p>
          See the status of your ballot below. You can also see all activity
          connected to your ballot tracking code.
        </p>
      </Infobox>

      <Infobox class="BallotTracker__TrackingCode">
        <button
          class="BallotTracker__Cancel"
          @click="cancel"
          aria-label="Cancel and track a new ballot"
        >
          ×
        </button>
        <h3>
          <span>You are currently tracking</span>
          <code>{{ ballot.trackingCode }}</code>
        </h3>
      </Infobox>
    </div>

    <div class="BallotTracker__Row">
      <Infobox class="BallotTracker__StatusInfo">
        <h3>{{ statusMap[ballot.status].title }}</h3>
        <p>{{ statusMap[ballot.status].body }}</p>
      </Infobox>
    </div>

    <div
      class="BallotTracker__Row BallotTracker__Row--stacked"
      v-if="ballot.activities.length"
    >
      <h3>Activity connected to the tracking code</h3>

      <BallotActivityList :activities="ballot.activities" />
    </div>
  </div>
</template>

<style type="text/css" scoped>
.BallotTracker {
  font-family: "Open Sans";
}

.BallotTracker__Row {
  display: flex;
  margin-bottom: 40px;
}

.BallotTracker__Row--stacked {
  flex-direction: column;
}

.BallotTracker__TrackingCode {
  margin-left: 40px;
  flex-grow: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.BallotTracker__Infobox {
  max-width: 350px;
}

.BallotTracker__TrackingCode h3 {
  padding: 0;
  margin: 0;
}

.BallotTracker__TrackingCode code {
  font-size: 40px;
  font-family: "Red Hat Mono";
  letter-spacing: 5px;
}

.BallotTracker__TrackingCode h3 span {
  color: #6c757d;
  font-weight: 600;
  display: block;
  margin-bottom: 20px;
}

.BallotTracker__StatusInfo {
  width: 100%;
}

.BallotTracker__StatusInfo h3 {
  font-size: 24px;
}

.BallotTracker__Cancel {
  border: none;
  background: transparent;
  position: absolute;
  top: 0;
  right: 8px;
  font-size: 40px;
  cursor: pointer;
  color: #adb5bd;
}
</style>
