<script setup lang="ts">
import CompactHeader from "../components/CompactHeader.vue";
</script>

<template>
  <main class="HelpView">
    <CompactHeader />

    <div class="HelpView__Header">
      <h2 class="HelpView__Title">{{ $t("views.help.title") }}</h2>
      <p class="HelpView__Info">{{ $t("views.help.info") }}</p>
    </div>
  </main>
</template>

<style type="text/css" scoped>
.HelpView__Header {
  text-align: center;
}

.HelpView__Title {
  font-size: 26px;
  font-weight: 600;
}

.HelpView__Info {
  font-weight: 400;
  font-size: 16px;
}
</style>
