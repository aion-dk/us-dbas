<script setup lang="ts">
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
      <AVCard class="AVCard__Override" id="found-box">
        <h2>{{ $t("views.verifier.found.title") }}</h2>
        <p>{{ $t("views.verifier.found.description") }}</p>
      </AVCard>
    </div>
  </div>
</template>

<style type="text/css" scoped>
.BallotVerifier {
  text-align: center;
}

.AVCard__Override {
  margin: auto;
  width: 100%;
}

@media only screen and (min-width: 80rem) {
  .AVCard__Override {
    margin-top: 6rem;
    padding: 4rem !important;
    width: 100%;
  }
}
</style>
