<script setup lang="ts">
import { useRoute, RouterLink } from "vue-router";
import useConfigStore from "../stores/useConfigStore";
import { ref, watch, onMounted } from "vue";
import useBallotStore from "../stores/useBallotStore";
import router from "../router";
import useLocaleStore from "../stores/useLocaleStore";
import useVerificationStore from "../stores/useVerificationStore";
import Error from "../components/Error.vue";

const localeStore = useLocaleStore();
const ballotStore = useBallotStore();
const configStore = useConfigStore();
const route = useRoute();
const _electionSlug = ref(route.params.electionSlug);
const _locale = ref(localeStore.locale);
const _title = ref("Loading..");
const _info = ref("Loading..");
const _trackingCode = ref(null);
const _verificationCode = ref(null);
const _error = ref(null);
const _disabled = ref(false);
const verificationStore = useVerificationStore();

function setInfo() {
  _title.value = configStore.election.title[_locale.value];
  _info.value = [configStore.election.jurisdiction, configStore.election.state]
    .filter((s) => s)
    .join(", ");
}

async function lookupBallot(event: Event) {
  event.preventDefault();
  event.stopPropagation();
  _disabled.value = true;
  _error.value = null;

  if (_trackingCode.value && configStore.boardSlug) {
    await ballotStore.loadBallot(_trackingCode.value, configStore.boardSlug);
  }

  if (ballotStore.ballot?.status) {
    router.push(
      `/${_locale.value}/${_electionSlug.value}/track/${_trackingCode.value}`
    );
  } else {
    _error.value = "track.invalid_code";
  }

  _disabled.value = false;
}

async function initiateVerification(event: Event) {
  event.preventDefault();
  event.stopPropagation();
  _disabled.value = true;
  _error.value = null;

  try {
    await verificationStore.findBallot(_verificationCode.value);

    verificationStore.generatePairingCode();

    setTimeout(async () => {
      if (verificationStore.pairingCode) return;

      await router.push({
        name: "BallotVerifierFound",
        params: {
          verificationCode: _verificationCode.value,
        },
      });
    }, 2000);
  } catch (e) {
    console.error(e);
    _disabled.value = false;
    _error.value = "verify.invalid_code";
  }
}

watch(route, (newRoute) => {
  _electionSlug.value = newRoute.params.electionSlug;
  _locale.value = newRoute.params.locale.toString();
  setInfo();
});

watch(configStore, () => {
  setInfo();
});

watch(verificationStore, async (newStore) => {
  if (!newStore.pairingCode) return;

  await router.push({
    name: "BallotVerifierView",
    params: {
      pairingCode: newStore.pairingCode,
    },
  });
});

onMounted(() => {
  verificationStore.reset();
  verificationStore.setupAVVerifier(_electionSlug.value as string);

  setInfo();
  (
    document.querySelector(".BallotTrackerStart__TrackingCode") as HTMLInputElement
  )?.focus();
});
</script>

<template>
  <div class="BallotTrackerStart">
    <Error v-if="_error" :errorPath="_error" />
    <div class="BallotTrackerStart__Content">
      <AVCard class="BallotTrackerStart__Tracking">
        <div class="header">
          <h1>{{ $t("views.verifier.start.title") }}</h1>
          <p>{{ $t("views.verifier.start.intro") }}</p>
        </div>

        <form @submit="lookupBallot">
          <input
            :disabled="_disabled"
            type="text"
            name="tracking-code"
            id="tracking-code"
            :placeholder="$t('views.verifier.start.placeholder')"
            v-model="_verificationCode"
            class="BallotTrackerStart__TrackingCode"
          />
          <AVButton
            :label="$t('views.verifier.start.submit')"
            type="neutral"
            name="lookup-ballot"
            id="lookup-ballot"
            :disabled="_disabled || !_verificationCode"
            iconLeft
            fullWidth
            icon="magnifying-glass"
            @click="initiateVerification"
          />
        </form>
      </AVCard>
    </div>
    <p class="footer">
      {{ $t("views.verifier.start.footer.prefix") }}
      <RouterLink :to="{ name: 'BallotTrackerStart' }">Ballot Tracker</RouterLink>
      {{ $t("views.verifier.start.footer.suffix") }}
    </p>
  </div>
</template>

<style type="text/css" scoped>
h1 {
  font-weight: 600;
  font-size: 26px;
  margin: 0;
  padding: 0;
}

.header * {
  text-align: center;
}

.BallotTrackerStart {
  font-family: "Open Sans";
  margin: auto;
  margin-top: 121px;
}

.BallotTrackerStart__Content {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
}

.BallotTrackerStart__Text {
  padding: 40px !important;
}

.BallotTrackerStart__Tracking {
  justify-content: center;
  flex-grow: 1;
  padding: 92px 80px !important;
  align-items: center;
  max-width: 740px;
}

.BallotTrackerStart__Tracking form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 418px;
}

.BallotTrackerStart__TrackingCode {
  color: #000;
  border: solid 1px #adb5bd;
  border-radius: 12px;
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  padding: 0 20px;
  font-size: 16px;
  margin-bottom: 1rem;
}

.footer {
  margin-top: 24px;
  padding: 0;
}
</style>
