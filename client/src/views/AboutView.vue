<script setup lang="ts"></script>

<template>
  <main class="AboutView">
    <h1>{{ $t("views.about.title") }}</h1>

    <div v-html="$t('views.about.content')"></div>
  </main>
</template>

<style type="text/css">
.AboutView {
  max-width: 800px;
  margin: auto;
  font-family: "Open Sans";
}

.AboutView h1 {
  text-align: center;
  color: var(--neutrals-g-800, #343a40);
  text-align: center;
  font-size: 26px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
}

.AboutView h2 {
  color: var(--neutrals-g-800, #343a40);
  font-size: 24px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
}
</style>
