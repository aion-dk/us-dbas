import { defineStore } from "pinia";
import { ref } from "vue";
import useAVClient from "../lib/useAVClient";

export default defineStore("useBallotStore", () => {
  const ballot = ref(null);

  const setBallot = (newBallot) => {
    ballot.value = newBallot;
  };

  function resetBallot() {
    ballot.value = null;
  }

  async function loadBallot(trackingCode: string, electionSlug: string) {
    console.info("Tracking ballot", trackingCode);
    resetBallot();

    try {
      const avClient = await useAVClient(electionSlug);
      const res = await avClient.checkBallotStatus(trackingCode);

      ballot.value = {
        trackingCode: trackingCode,
        status: res.status,
        activities: res.activities.reverse(),
      };
    } catch (e) {
      console.log("Unable to find ballot", trackingCode);
      resetBallot();
    }
  }

  return { ballot, setBallot, loadBallot };
});
