<script setup lang="ts">
import useConfigStore from "../stores/useConfigStore";
import router from "../router";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import useVerificationStore from "../stores/useVerificationStore";
import Timedown from "@/components/Timedown.vue";
import i18n from "../lib/i18n";

const configStore = useConfigStore();
const verificationStore = useVerificationStore();
const route = useRoute();
const showAlert = ref(false);

function cancel() {
  router.push(`/${route.params.locale}/${route.params.electionSlug}`);
}

function redirectUnlessPairingCode() {
  if (!verificationStore.pairingCode) cancel();
}

function getOptionName(contest: any, selection: any) {
  return configStore.getContestOption(contest.reference, selection.reference)
    .title[i18n.global.locale];
}

onMounted(redirectUnlessPairingCode);
</script>

<template>
  <div class="BallotVerifier">
    <AVCard v-if="verificationStore.ballot" class="BallotVerifier__Spoiled">
      <h1 class="BallotVerifier__Title">
        {{ $t("views.verifier.spoiled.title") }}
      </h1>
      <p>{{ $t("views.verifier.spoiled.description") }}</p>
      <div
        v-for="contest in verificationStore.ballot"
        :key="contest.reference"
        class="BallotVerifier__Contest"
      >
        <AVIcon icon="envelope-open-text" aria-hidden="true" />
        <div class="BallotVerifier__ContestName">
          {{ configStore.getContest(contest.reference).title[$i18n.locale] }}
        </div>
        <div
          v-for="(pile, pIndex) in contest.piles"
          class="BallotVerifier__Pile"
          :key="pIndex"
        >
          <p
            class="BallotVerifier__Option"
            v-for="(selection, oIndex) in pile.optionSelections"
            :key="oIndex"
          >
            {{ getOptionName(contest, selection) }}
          </p>
        </div>
      </div>

      <AVButton
        :label="$t('views.BallotVerifierView.finish')"
        type="neutral"
        full-width
        @on-click="router.push({ name: 'Welcome' })"
      />
    </AVCard>

    <div v-else class="BallotVerifier__Spoiled">
      <AVAlert
        v-if="showAlert"
        type="warning"
        icon="triangle-exclamation"
        :title="$t('views.verifier.inprogress.alert_title')"
        @dismiss="showAlert = false"
        class="BallotVerifier__Spoiled_Alert"
      >
        {{ $t("views.verifier.inprogress.alert_text") }}
      </AVAlert>

      <AVCard class="BallotVerifier__Card">
        <div class="BallotVerifier__InProgress">
          <h1 class="BallotVerifier__Title">
            {{ $t("views.verifier.inprogress.title") }}
          </h1>

          <p class="BallotVerifier__Info">
            {{ $t("views.verifier.inprogress.info") }}
          </p>

          <code class="BallotVerifier__Code">{{
            verificationStore.pairingCode
          }}</code>
        </div>
      </AVCard>

      <Timedown
        v-if="!verificationStore.ballot"
        :maxSeconds="configStore.election.bcTimeout"
        :currentSeconds="configStore.election.bcTimeout"
        style="margin-bottom: 20px"
        @alert="showAlert = true"
        @timeout="
          () => {
            router.push({ name: 'SessionExpired' });
          }
        "
      />
    </div>
  </div>
</template>

<style type="text/css" scoped>
.BallotVerifier {
  display: flex;
  justify-content: center;
  margin: auto;
}

.BallotVerifier p {
  text-align: center;
}

.BallotVerifier__Spoiled {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 14rem;
}

.BallotVerifier__Title {
  color: var(--slate-700);
  text-align: center;
  font-size: 26px;
  font-weight: 600;
  line-height: 30px;
}

.BallotVerifier__Info {
  text-align: center;
}

.BallotVerifier__Code {
  font-size: 40px;
  font-family: "Red Hat Mono";
  text-align: center;
  display: block;
  letter-spacing: 5px;
}

.BallotVerifier__DecryptedVoteBox {
  margin-bottom: 20px;
}

.BallotVerifier__ContestName {
  font-weight: 600;
  color: var(--slate-800);
}

.BallotVerifier__ContestName::after {
  color: var(--slate-800);
  content: ":";
}

.BallotVerifier__Contest {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 12px;
  border: 1px solid var(--slate-300);
  background-color: var(--slate-100);
  padding: 1rem;
  width: 100%;
}

.BallotVerifier__Pile {
  color: var(--slate-800);
}

.BallotVerifier__Contest svg {
  color: var(--slate-600);
  height: 24px;
  width: 24px;
}

.BallotVerifier__Option {
  margin: 0;
}

.BallotVerifier__PileMultiplier {
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  background: black;
  color: white;
  padding: 1px 20px;
}

.BallotVerifier__Card {
  padding: 2.5rem !important;
  width: 100%;
}

.BallotVerifier__Finish {
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  border: none;
  background: var(--neutrals-g-800, #343a40);
  color: var(--neutrals-white, #fff);
  text-align: center;
  font-size: 16px;
  font-family: Open Sans;
  font-style: normal;
  line-height: 24px;
  cursor: pointer;
  width: 100%;
  max-width: 600px;
}

.BallotVerifier__Spoiled_Alert {
  margin-bottom: 2rem !important;
}

@media only screen and (min-width: 80rem) {
  .BallotVerifier {
    margin-top: 6rem;
  }

  .BallotVerifier__Spoiled {
    padding: 3.75rem !important;
    margin-bottom: 0;
  }

  .BallotVerifier__Card {
    padding: 3.75rem 2.5rem !important;
  }

  .BallotVerifier__Contest {
    flex-direction: row;
    margin-bottom: 40px;
    margin-top: 16px;
    padding: 1rem 1.25rem;
  }

  .BallotVerifier__ContestName {
    margin-right: .5rem;
  }

  .BallotVerifier__Contest svg {
    margin-right: 1rem;
  }
}
</style>
