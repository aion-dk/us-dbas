<script setup lang="ts">
  import CompactHeader from "../components/CompactHeader.vue"
  import { useRoute } from "vue-router"
  import { options } from "../lib/api"

  const route = useRoute()
</script>

<template>
  <main class="LogsView">
    <CompactHeader />

    <div class="LogsView__Header">
      <h1>Election Configuration log</h1>
      <p>This log filters out voter activity and only displays the election configuration log.</p>
    </div>

    <div class="LogsView__Footer">
      <a class="LogsView__DownloadButton" :href="`${options.baseURL}/${route.params.electionSlug}/download_log`">
        Download the full election activity log (json)
      </a>
    </div>
  </main>
</template>

<style type="text/css" scoped>
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
    background-color: #343A40;
    color: #fff;
    padding: 10px 43px;
    border-radius: 12px;
  }
</style>
