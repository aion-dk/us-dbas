<script setup lang="ts">
import { useRoute, RouterLink } from "vue-router";
import useConfigStore from "../stores/useConfigStore";
import { ref, watch, onMounted } from "vue";
import useBallotStore from "../stores/useBallotStore";
import router from "../router";
import useVerificationStore from "../stores/useVerificationStore";
import Error from "../components/Error.vue";
import type { Locale } from "../Types";
import i18n from "../lib/i18n";

const ballotStore = useBallotStore();
const configStore = useConfigStore();
const route = useRoute();
const _electionSlug = ref(route.params.electionSlug);
const _locale = ref(i18n.global.locale);
const _title = ref("Loading..");
const _info = ref("Loading..");
const _trackingCode = ref(null);
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
  (document.querySelector("#tracking-code") as HTMLInputElement)?.focus();
});
</script>

<template>
  <div class="BallotTrackerStart">
    <Error v-if="_error" :errorPath="_error" />
    <div class="BallotTrackerStart__Content">
      <AVCard class="BallotTrackerStart__Text">
        <h3 class="BallotTrackerStart__Header">
          {{ $t("views.BallotTrackerStart.header") }}
        </h3>
        <p class="BallotTrackerStart__Subheader">
          {{ $t("views.BallotTrackerStart.p1") }}
        </p>
        <p>{{ $t("views.BallotTrackerStart.p2") }}</p>
      </AVCard>
      <AVCard class="BallotTrackerStart__Tracking">
        <form @submit="lookupBallot">
          <AVTextInput
            :disabled="_disabled"
            type="text"
            name="tracking-code"
            id="tracking-code"
            :placeholder="$t('views.BallotTrackerStart.tracking_code_input')"
            :error="_error"
            v-model="_trackingCode"
            class="AVTextInput__Override"
          />
          <AVButton
            :label="$t('views.BallotTrackerStart.track_ballot_button')"
            type="neutral"
            name="lookup-ballot"
            id="lookup-ballot"
            :disabled="_disabled || !_trackingCode"
            fullWidth
            @click="lookupBallot"
          />
        </form>

        <AVTooltip
          :content="$t('views.BallotTrackerStart.locate_tracking_code_tooltip')"
          id="where-find-tracking-code"
          position="bottom"
          icon="circle-question"
          :text="$t('views.BallotTrackerStart.locate_tracking_code')"
          class="AVTooltip__Override"
        />
      </AVCard>
    </div>

    <p class="BallotTrackerStart__Footer">
      {{ $t("views.BallotTrackerStart.footer.prefix") }}
      <RouterLink
        :to="{ name: 'BallotVerifierStart' }"
        class="BallotTrackerStart__Footer_link"
        >{{ $t("views.BallotTrackerStart.footer.main") }}</RouterLink
      >
      {{ $t("views.BallotTrackerStart.footer.suffix") }}

      <AVTooltip
        :content="$t('views.BallotTrackerStart.ballot_checker_info_tooltip')"
        id="tracking-code-tooltip"
        position="bottom"
        icon="circle-info"
      />
    </p>
  </div>
</template>

<style type="text/css" scoped>
.BallotTrackerStart {
  margin-top: 6rem;
}

.BallotTrackerStart__Content {
  display: flex;
  gap: 2.5rem;
}

.BallotTrackerStart__Text {
  padding: 80px !important;
  color: var(--slate-700);
}

.BallotTrackerStart__Tracking {
  justify-content: center;
  min-width: 40%;
  padding: 80px !important;
}

.BallotTrackerStart__Tracking form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.BallotTrackerStart__Subheader {
  font-size: 20px;
}

.BallotTrackerStart__Header {
  font-weight: 800;
  font-size: 26px;
  line-height: 30px;
  margin-top: 0;
}

.BallotTrackerStart__Footer {
  margin-top: 24px;
  padding: 0;
}

.BallotTrackerStart__Footer_link {
  font-weight: 800;
  color: var(--slate-800);
}

.AVTextInput__Override {
  margin-bottom: 1rem;
}

.AVTooltip__Override {
  margin-top: 1rem;
}
</style>
