<script setup lang="ts">
import { useRoute, RouterLink } from "vue-router";
import useConfigStore from "../stores/useConfigStore";
import { ref, watch, onMounted } from "vue";
import router from "../router";
import useLocaleStore from "../stores/useLocaleStore";
import useVerificationStore from "../stores/useVerificationStore";
import Error from "../components/Error.vue";
import type { Locale } from "../Types";

const localeStore = useLocaleStore();
const configStore = useConfigStore();
const route = useRoute();
const _electionSlug = ref(route.params.electionSlug);
const _locale = ref(localeStore.locale);
const _title = ref("Loading..");
const _info = ref("Loading..");
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
  _locale.value = newRoute.params.locale as Locale;
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
  (document.querySelector("#checking-code") as HTMLInputElement)?.focus();
});
</script>

<template>
  <div class="BallotVerifierStart">
    <Error v-if="_error" :errorPath="_error" />
    <div class="BallotVerifierStart__Content">
      <AVCard class="BallotVerifierStart__Checking">
        <div class="BallotVerifierStart__Header">
          <h3>{{ $t("views.verifier.start.title") }}</h3>
          <p>{{ $t("views.verifier.start.intro") }}</p>
        </div>

        <form @submit="initiateVerification">
          <AVTextInput
            :disabled="_disabled"
            type="text"
            name="checking-code"
            id="checking-code"
            :placeholder="$t('views.verifier.start.placeholder')"
            :error="_error"
            v-model="_verificationCode"
            class="AVTextInput__Override"
          />
          <AVButton
            :label="$t('views.verifier.start.submit')"
            type="neutral"
            name="lookup-ballot"
            id="lookup-ballot"
            :disabled="_disabled || !_verificationCode"
            fullWidth
            @click="initiateVerification"
          />
        </form>
      </AVCard>
    </div>
    <p class="BallotVerifierStart__Footer">
      {{ $t("views.verifier.start.footer.prefix") }}
      <RouterLink
        :to="{ name: 'BallotTrackerStart' }"
        class="BallotVerifierStart__Footer_link"
        >{{ $t("views.verifier.start.footer.main") }}</RouterLink
      >
      {{ $t("views.verifier.start.footer.suffix") }}

      <AVTooltip
        :content="$t('views.verifier.start.ballot_tracker_info_tooltip')"
        id="checking-code-tooltip"
        position="bottom"
        icon="circle-info"
      />
    </p>
  </div>
</template>

<style type="text/css" scoped>
.BallotVerifierStart__Header > h3 {
  font-weight: 800;
  font-size: 26px;
  line-height: 30px;
  margin-top: 0;
}

.BallotVerifierStart__Header > p {
  font-size: 20px;
}

.BallotVerifierStart__Header {
  text-align: center;
  color: var(--slate-700);
}

.BallotVerifierStart {
  font-family: "Open Sans";
  margin: auto;
  margin-top: 8rem;
}

.BallotVerifierStart__Content {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
}

.BallotVerifierStart__Checking {
  padding: 92px 80px !important;
  align-items: center;
  width: 100%;
  gap: 1rem;
}

.BallotVerifierStart__Checking form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 418px;
}

.AVTextInput__Override {
  margin-bottom: 1rem;
}

.BallotVerifierStart__Footer {
  margin-top: 24px;
  padding: 0;
}

.BallotVerifierStart__Footer_link {
  font-weight: 800;
  color: var(--slate-800);
}
</style>
