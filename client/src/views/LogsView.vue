<script setup lang="ts">
import CompactHeader from "../components/CompactHeader.vue";
import { options } from "../lib/api";
import useLocaleStore from "../stores/useLocaleStore";
import useElectionStore from "../stores/useElectionStore";
import useBoardStore from "../stores/useBoardStore";
import { onMounted, watch } from "vue";
import { useRoute, RouterLink } from "vue-router";
import DateTime from "../components/DateTime.vue"
import { hexToShortCode } from '@aion-dk/js-client/dist/lib/av_client/short_codes';

const route = useRoute()
const localeStore = useLocaleStore()
const electionStore = useElectionStore();
const boardStore = useBoardStore();

watch(electionStore, () => loadPage(currentPage()));
watch(route, () => loadPage(currentPage()));

function currentPage() {
  return parseInt(route.params.page || boardStore.currentPage || 1, 10)
}

function loadPage(page: number) {
  if (electionStore.election.slug) {
    boardStore.loadPage(electionStore.election.slug, page);
  }
}

onMounted(() => loadPage(currentPage()));
</script>

<template>
  <main class="LogsView">
    <CompactHeader />

    <div class="LogsView__Header">
      <h1>Election Configuration log</h1>
      <p>
        This log filters out voter activity and only displays the election
        configuration log.
      </p>
    </div>

    <div v-for="item in boardStore.items" class="Item">
      <div>{{ item.type }}</div>
      <DateTime :date-time="item.registered_at" format="long" />
      <div>{{ hexToShortCode(item.address.slice(0, 10)) }}</div>
      <!-- <pre>{{ item }}</pre> -->
    </div>

    <div class="Pagination">
      <RouterLink
        :class="{
          Pagination__Page: true,
          ['Pagination__Page--current']: i + 1 === boardStore.meta.current_page,
        }"
        v-for="(_, i) in Array(boardStore.meta.total_pages)"
        :to="`/${localeStore.locale}/${electionStore.election.slug}/logs/${i + 1}`"
      >
        {{ i + 1 }}
      </RouterLink>
    </div>

    <div class="LogsView__Footer">
      <a
        class="LogsView__DownloadButton"
        :href="`${options.baseURL}/${electionStore.election.slug}/download_log`"
      >
        Download the full election activity log (json)
      </a>
    </div>
  </main>
</template>

<style type="text/css" scoped>
.Item {
  display: flex;
}

.Pagination {
  display: flex;
}

.LogsView {
  width: 900px;
  margin: auto;
  font-family: "Open Sans";
}

.LogsView__Header * {
  text-align: center;
}

.LogsView h1 {
  margin-top: 47px;
  font-weight: 600;
  font-size: 26px;
}

.LogsView p {
  margin-top: 16px;
}

.LogsView__Footer {
  text-align: center;
  margin-top: 45px;
}

.LogsView__DownloadButton {
  text-decoration: none;
  background-color: #343a40;
  color: #fff;
  padding: 10px 43px;
  border-radius: 12px;
}
</style>
