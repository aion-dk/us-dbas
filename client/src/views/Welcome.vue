<script setup lang="ts">
import { useRoute } from "vue-router";
import useElectionStore from "../stores/useElectionStore";
import { ref, watch, onMounted } from "vue";
import Infobox from "../components/Infobox.vue";
import useBallotStore from "../stores/useBallotStore";
import router from "../router";
import useLocaleStore from "../stores/useLocaleStore"

const localeStore = useLocaleStore()
const ballotStore = useBallotStore();
const electionStore = useElectionStore();
const route = useRoute();
const _electionSlug = ref(route.params.electionSlug);
const _locale = ref(localeStore.locale);
const _title = ref("Loading..");
const _info = ref("Loading..");
const _trackingCode = ref(null);
const _error = ref(false);

function setInfo() {
  _title.value = electionStore.election?.content?.title[_locale.value];
  _info.value = [
    electionStore.election?.content?.jurisdiction,
    electionStore.election?.content?.state,
  ]
    .filter((s) => s)
    .join(", ");
}

async function lookupBallot(event) {
  event.preventDefault();
  event.stopPropagation();
  await ballotStore.loadBallot(
    _trackingCode.value,
    electionStore.election.slug
  );

  if (ballotStore.ballot?.status) {
    router.push(
      `/${_locale.value}/${_electionSlug.value}/track/${_trackingCode.value}`
    );
  } else {
    _error.value = true;
  }
}

watch(route, (newRoute) => {
  _electionSlug.value = newRoute.params.electionSlug;
  _locale.value = newRoute.params.locale;
  setInfo();
});

watch(electionStore, (newElectionStore) => {
  setInfo();
});

onMounted(() => {
  setInfo();
  document.querySelector(".Welcome__TrackingCode").focus();
});
</script>

<template>
  <div class="Welcome">
    <div class="Welcome__Header">
      <h2 class="Welcome__Title">{{ _title }}</h2>
      <h3 class="Welcome__Info">{{ _info }}</h3>
    </div>

    <div v-if="_error" role="alert">
      <p>Tracking code not found</p>

      <p>
        Please check that the tracking code was entered correctly. The code is
        case sensitive. If you are checking to make sure your ballot was
        recorded correctly before submitting, use the ballot check site instead.
        Still having problems? Contact your local election official.
      </p>
    </div>

    <div class="Welcome__Content">
      <Infobox class="Welcome__About">
        <p>Ballot tracker</p>
        <p>I have voted and I want to track my ballot</p>
        <p>
          To check the status of your ballot, you need to input the tracking
          code from the Voter receipt.
        </p>
      </Infobox>

      <Infobox class="Welcome__Tracking">
        <form @submit="lookupBallot">
          <input
            type="text"
            name="tracking-code"
            id="tracking-code"
            placeholder="Ballot tracking code"
            v-model="_trackingCode"
            class="Welcome__TrackingCode"
          />

          <input
            type="submit"
            name="lookup-ballot"
            id="lookup-ballot"
            value="Track my ballot"
            class="Welcome__SubmitButton"
          />
        </form>
      </Infobox>
    </div>

    <div class="Welcome__Footer">
      <p>Did you mean Ballot Check instead?</p>
    </div>
  </div>
</template>

<style type="text/css" scoped>
.Welcome {
  font-family: "Open Sans";
}

.Welcome__Title {
  font-size: 32px;
  font-weight: 600;
  padding: 0;
  margin: 0;
  color: #212529;
}

.Welcome__Info {
  color: #6c757d;
  font-size: 26px;
  margin: 0;
  padding: 0;
  font-weight: 600;
}

.Welcome__Header {
  margin-bottom: 60px;
  margin-top: 120px;
}

.Welcome__Content {
  display: flex;
}

.Welcome__About {
  margin-right: 40px;
  flex-shrink: 1;
}

.Welcome__Footer {
  margin-top: 24px;
}

.Welcome__Widget {
  width: 100%;
}

.Welcome__Tracking {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-width: 480px;
}

.Welcome__Tracking form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.Welcome__TrackingCode {
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
}

.Welcome__SubmitButton {
  box-sizing: border-box;
  width: 100%;
  background-color: #343a40;
  color: #fff;
  border: none;
  border-radius: 12px;
  height: 44px;
  line-height: 44px;
  margin-top: 16px;
  cursor: pointer;
  font-size: 16px;
}
</style>
