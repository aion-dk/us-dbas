<script setup lang="ts">
import useConfigStore from "../stores/useConfigStore";
import useLocaleStore from "../stores/useLocaleStore";
import router from "../router";
import { onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import useVerificationStore from "../stores/useVerificationStore";
import Timedown from "@/components/Timedown.vue";

const localeStore = useLocaleStore();
const configStore = useConfigStore();
const verificationStore = useVerificationStore();
const route = useRoute();

function cancel() {
  router.push(`/${route.params.locale}/${route.params.electionSlug}`);
}

function redirectUnlessPairingCode() {
  if (!verificationStore.pairingCode) cancel();
}

function getOptionName(contest: any, selection: any) {
  return configStore.getContestOption(contest.reference, selection.reference)
    .title[localeStore.locale];
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
        <font-awesome-icon :icon="['fas', 'envelope-open-text']" />
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

      <RouterLink
        class="BallotVerifier__Finish"
        :to="{ name: 'BallotVerifierStart' }"
        >Finish</RouterLink
      >
    </AVCard>

    <div v-else class="BallotVerifier__Spoiled">
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
        @timeout="
          () => {
            router.push({ name: 'Welcome' });
          }
        "
      />
    </div>
  </div>
</template>

<style type="text/css" scoped>
.BallotVerifier {
  font-family: "Open Sans";
  padding-top: 85px;
  display: flex;
  justify-content: center;
}

.BallotVerifier p {
  text-align: center;
}

.BallotVerifier__Spoiled {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  padding: 60px !important;
}

.BallotVerifier__Title {
  color: var(--neutrals-g-700, #495057);
  text-align: center;
  font-size: 26px;
  font-family: Open Sans;
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

.BallotVerifier__Infobox,
.BallotVerifier__DecryptedVoteBox {
  margin-bottom: 20px;
}

.BallotVerifier__ContestName {
  margin-right: 8px;
  font-weight: 600;
}

.BallotVerifier__ContestName::after {
  content: ":";
}

.BallotVerifier__Contest {
  margin-bottom: 40px;
  margin-top: 16px;
  display: flex;
  border-radius: 12px;
  border: 1px solid var(--neutrals-g-300, #dee2e6);
  background: var(--neutrals-g-100, #f7f7f7);
  padding: 12px;
  align-items: baseline;
  width: 600px;
}

.BallotVerifier__Pile {
  /*  margin-bottom: 20px;*/
}

.BallotVerifier__Contest svg {
  height: 24px;
  width: 24px;
  margin-right: 16px;
  margin-bottom: -10px;
}

.BallotVerifier__Option {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  margin-bottom: 5px;
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
  padding: 60px 40px !important;
  box-sizing: border-box;
  width: 100%;
}

.BallotVerifier__Finish {
  display: flex;
  padding: 10px;
  /*  box-sizing: border-box;*/
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
</style>
