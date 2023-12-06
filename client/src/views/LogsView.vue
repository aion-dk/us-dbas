<script setup lang="ts">
import { options } from "../lib/api";
import useConfigStore from "../stores/useConfigStore";
import useBoardStore from "../stores/useBoardStore";
import { onMounted, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import BoardItem from "../components/BoardItem.vue";
import i18n from "../lib/i18n";
import router from "../router";

const route = useRoute();
const configStore = useConfigStore();
const boardStore = useBoardStore();
const configItemsOnly = ref<boolean>(false);
const type = computed(() => route.params.type);

watch(configStore, () => loadPage(currentPage()));
watch(route, () => loadPage(currentPage()));
watch(configItemsOnly, () => loadPage(1));
watch(type, () => (configItemsOnly.value = type.value === "config"));

function downloadLogs() {
  window.location.href = `${options.baseURL}/${configStore.boardSlug}/download_log`;
}

function currentPage() {
  return parseInt(
    (route.params.page || boardStore.currentPage || 1).toString(),
    10,
  );
}

function filter() {
  if (!configItemsOnly.value) return [];

  return [
    "VoterAuthorizationConfigItem",
    "VotingRoundConfigItem",
    "ThresholdConfigItem",
    "BallotConfigItem",
    "ContestConfigItem ",
    "ContestConfigItem ",
    "SegmentsConfigItem ",
    "ElectionConfigItem ",
    "GenesisItem",
  ];
}

function loadPage(page: number) {
  if (configStore.boardSlug) {
    boardStore.loadPage(configStore.boardSlug, page, filter());
  }
}

onMounted(() => {
  loadPage(currentPage());
  configItemsOnly.value = type.value === "config";
});
</script>

<template>
  <main class="LogsView">
    <div class="LogsView__Header">
      <h2>{{ $t(`views.logs.${type}.title`) }}</h2>
      <p>{{ $t(`views.logs.${type}.intro`) }}</p>
    </div>

    <ul class="LogsView__ColumnDescriptions">
      <li class="LogsView__ColumnDescriptions--event">
        {{ $t("components.ballot_activity_list.type") }}
        <AVTooltip
          :content="$t('components.ballot_activity_list.tooltips.type')"
          id="activity-type-tooltip"
          position="right"
          icon="circle-info"
          class="AVTooltip__Override"
        />
      </li>
      <li class="LogsView__ColumnDescriptions--time">
        {{ $t("components.ballot_activity_list.time") }}
      </li>
      <li
        v-if="configItemsOnly"
        class="LogsView__ColumnDescriptions--identifier"
      >
        {{ $t("components.ballot_activity_list.identifier") }}
        <AVTooltip
          :content="$t('components.ballot_activity_list.tooltips.identifier')"
          id="activity-type-tooltip"
          position="right"
          icon="circle-info"
          class="AVTooltip__Override"
        />
      </li>
      <li v-else class="LogsView__ColumnDescriptions--actor">
        {{ $t("components.ballot_activity_list.actor") }}
        <AVTooltip
          :content="$t('components.ballot_activity_list.tooltips.actor')"
          id="activity-type-tooltip"
          position="right"
          icon="circle-info"
          class="AVTooltip__Override"
        />
      </li>
    </ul>
    <BoardItem
      v-for="item in boardStore.items"
      :key="item.address"
      :item="item"
      :is-config-item="configItemsOnly"
    />

    <div class="LogsView__Pagination">
      <button
        :disabled="!boardStore.meta.prev_page"
        :aria-label="$t('views.logs.pagination_aria_label.first')"
        class="LogsView__PageLink"
        @click="
          router.push(
            `/${i18n.global.locale}/${configStore.boardSlug}/logs/${type}/1`,
          )
        "
      >
        <AVIcon icon="chevron-left" />
        <AVIcon icon="chevron-left" class="LogsView__2nd_Icon" />
      </button>
      <button
        :disabled="!boardStore.meta.prev_page"
        :aria-label="$t('views.logs.pagination_aria_label.prev')"
        class="LogsView__PageLink"
        @click="
          router.push(
            `/${i18n.global.locale}/${configStore.boardSlug}/logs/${type}/${boardStore.meta.prev_page}`,
          )
        "
      >
        <AVIcon icon="chevron-left" />
      </button>

      <span class="LogsView__PageLink">{{ boardStore.currentPage }}</span>
      <span class="LogsView__PageLink">/</span>
      <span class="LogsView__PageLink">{{ boardStore.meta.total_pages }}</span>

      <button
        :disabled="!boardStore.meta.next_page"
        :aria-label="$t('views.logs.pagination_aria_label.next')"
        class="LogsView__PageLink"
        @click="
          router.push(
            `/${i18n.global.locale}/${configStore.boardSlug}/logs/${type}/${boardStore.meta.next_page}`,
          )
        "
      >
        <AVIcon icon="chevron-right" />
      </button>
      <button
        :disabled="boardStore.meta.current_page === boardStore.meta.total_pages"
        :aria-label="$t('views.logs.pagination_aria_label.last')"
        class="LogsView__PageLink"
        @click="
          router.push(
            `/${i18n.global.locale}/${configStore.boardSlug}/logs/${type}/${boardStore.meta.total_pages}`,
          )
        "
      >
        <AVIcon icon="chevron-right" />
        <AVIcon icon="chevron-right" class="LogsView__2nd_Icon" />
      </button>
    </div>

    <div class="LogsView__Footer">
      <AVButton
        :label="$t('views.logs.download_button')"
        type="neutral"
        icon-left
        icon="download"
        @on-click="downloadLogs"
        data-test="download-btn"
        id="download-logs-btn"
      />
    </div>
  </main>
</template>

<style type="text/css" scoped>
.LogsView__Pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}

.LogsView__PageLink {
  padding: 0.5rem;
  text-decoration: none;
  color: var(--slate-900);
  border: none;
  background-color: transparent;
}

.LogsView__PageLink:is(button) {
  cursor: pointer;
  margin: 0 0.5rem;
}

.LogsView__PageLink:not(button):first-of-type {
  margin-left: 1rem;
}

.LogsView__PageLink:not(button):last-of-type {
  margin-right: 1rem;
}

.LogsView__PageLink:disabled {
  color: var(--slate-500);
  cursor: default;
}

.LogsView__Header * {
  text-align: center;
  color: var(--slate-800);
}

.LogsView h2 {
  font-weight: 600;
  font-size: 26px;
  margin: 0;
}

.LogsView p {
  margin-top: 16px;
}

.LogsView__Footer {
  text-align: center;
  margin-top: 45px;
  margin-bottom: 40px;
}

.LogsView__ColumnDescriptions {
  display: none;
}

.LogsView__ColumnDescriptions--time {
  width: 20vw;
}

.LogsView__ColumnDescriptions--event {
  width: 25vw;
}

.LogsView__ColumnDescriptions--identifier {
  width: 20vw;
}

svg {
  margin-right: 5px;
}

.LogsView__2nd_Icon {
  margin-left: -8px;
}

@media only screen and (min-width: 80rem) {
  .LogsView {
    width: 70vw;
  }

  .LogsView h2 {
    margin-top: 47px;
  }

  .LogsView__ColumnDescriptions {
    list-style: none;
    padding: 16px;
    margin: 0;
    display: flex;
    font-size: 14px;
    color: var(--slate-800);
  }
}
</style>
