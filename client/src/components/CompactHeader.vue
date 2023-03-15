<script lang="ts" setup>
import useElectionStore from "../stores/useElectionStore";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const electionStore = useElectionStore();
const _locale = ref("en");
const _title = ref("Loading...");
const _area = ref("Loading...");

watch(route, () => setInfo());
watch(electionStore, () => setInfo());

function setInfo() {
  _locale.value = route.params.locale;
  _title.value = electionStore.election?.content?.title[_locale.value];
  _area.value = [
    electionStore.election?.jurisdiction,
    electionStore.election?.state,
  ]
    .filter((s) => s)
    .join(", ");
}

onMounted(() => setInfo());
</script>

<template>
  <div class="CompactHeader">
    <h2 class="CompactHeader__Title">{{ _title }}</h2>
    <div class="CompactHeader__CircleSpacer" v-if="_area" />
    <p class="CompactHeader__Area">{{ _area }}</p>
  </div>
</template>

<style type="text/css" scoped>
.CompactHeader {
  margin: 47px 0;
  display: flex;
  align-items: center;
  font-family: "Open Sans";
  color: #6c757d;
}

.CompactHeader__Title {
  font-size: 16px;
  font-weight: 600;
  padding: 0;
  margin: 0;
}

.CompactHeader__Area {
  font-size: 16px;
}

.CompactHeader__CircleSpacer {
  height: 6px;
  width: 6px;
  background-color: #ced4da;
  border-radius: 100%;
  display: block;
  margin: 0 8px;
}
</style>
