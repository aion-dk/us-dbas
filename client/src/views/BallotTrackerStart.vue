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
    document.querySelector(
      ".BallotTrackerStart__TrackingCode"
    ) as HTMLInputElement
  )?.focus();
});
</script>

<template>
  <div class="BallotTrackerStart">
    <Error v-if="_error" :errorPath="_error" />
    <div class="BallotTrackerStart__Content">
      <AVCard class="BallotTrackerStart__Text">
        <h3 class="header">{{ $t("views.BallotTrackerStart.header") }}</h3>
        <p class="p1">{{ $t("views.BallotTrackerStart.p1") }}</p>
        <p class="p2">{{ $t("views.BallotTrackerStart.p2") }}</p>
      </AVCard>
      <AVCard class="BallotTrackerStart__Tracking">
        <form @submit="lookupBallot">
          <input
            :disabled="_disabled"
            type="text"
            name="tracking-code"
            id="tracking-code"
            :placeholder="$t('views.BallotTrackerStart.tracking_code_input')"
            v-model="_trackingCode"
            class="BallotTrackerStart__TrackingCode"
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

        <p class="Tooltip">
          <tooltip hover placement="bottom">
            <template #default>
              <span
                :aria-label="
                  $t('views.BallotTrackerStart.locate_tracking_code_tooltip')
                "
              >
                <font-awesome-icon icon="fa-solid fa-circle-question" />
              </span>
              <span>{{
                $t("views.BallotTrackerStart.locate_tracking_code")
              }}</span>
            </template>

            <template #content>
              <span id="tracking-code-tooltip">
                {{
                  $t("views.BallotTrackerStart.locate_tracking_code_tooltip")
                }}
              </span>
            </template>
          </tooltip>
        </p>
      </AVCard>
    </div>
    <p class="footer">
      {{ $t("views.BallotTrackerStart.footer.prefix") }}
      <RouterLink :to="{ name: 'BallotVerifierStart' }"
        >Ballot Check</RouterLink
      >
      {{ $t("views.BallotTrackerStart.footer.suffix") }}
    </p>
  </div>
</template>

<style type="text/css" scoped>
.BallotTrackerStart {
  font-family: "Open Sans";
  margin-top: 121px;
}

.BallotTrackerStart__Content {
  display: flex;
  gap: 2.5rem;
}

.BallotTrackerStart__Text {
  padding: 40px !important;
}

.BallotTrackerStart__Tracking {
  justify-content: center;
  min-width: 40%;
  flex-grow: 1;
  padding: 92px 80px !important;
}

.BallotTrackerStart__Tracking form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.BallotTrackerStart__TrackingCode {
  color: #000;
  border: solid 1px #adb5bd;
  border-radius: 12px;
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  padding: 0 20px;
  font-size: 16px;
  margin-bottom: 1rem;
}

svg {
  margin-right: 5px;
  margin-left: 5px;
}

.p1 {
  font-size: 20px;
}

.header {
  font-size: 26px;
}

.Tooltip {
  text-align: center;
  color: #6c757d;
}

.footer {
  margin-top: 24px;
  padding: 0;
}
</style>
