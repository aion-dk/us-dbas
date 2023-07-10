<script setup lang="ts">
import Infobox from "../components/Infobox.vue";
import { watch, onMounted } from "vue";
import router from "@/router";
import useVerificationStore from "@/stores/useVerificationStore";

const verificationStore = useVerificationStore();

async function checkForPairingCode(store: any) {
  if (!store.pairingCode) return;

  await router.push({
    name: "BallotVerifierView",
    params: {
      pairingCode: store.pairingCode,
    },
  });
}

watch(verificationStore, async (store) => {
  await checkForPairingCode(store);
});

onMounted(async () => {
  await checkForPairingCode(verificationStore);
});
</script>

<template>
  <div class="BallotVerifier">
    <div class="BallotVerifier__Found">
      <Infobox class="BallotVerifier__Infobox" id="infobox">
        <h2>{{ $t("views.verifier.found.title") }}</h2>
        <p>{{ $t("views.verifier.found.description") }}</p>
      </Infobox>
    </div>
  </div>
</template>

<style type="text/css" scoped>
.BallotVerifier {
  font-family: "Open Sans";
  text-align: center;
  max-width: 800px;
  display: flex;
  padding-top: 100px;
}

.BallotVerifier__Infobox {
  margin-bottom: 20px;
}
</style>
