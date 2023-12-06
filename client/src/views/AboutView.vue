<script setup lang="ts">
import config from "../lib/config";
</script>

<template>
  <main class="AboutView">
    <h1>{{ $t("views.about.content.main_title") }}</h1>
    <p>{{ $t("views.about.content.main_description") }}</p>
    <hr />
    <h2>{{ $t("views.about.content.ballot_check_title") }}</h2>
    <p>
      {{ $t("views.about.content.ballot_check_description") }}
      <a :href="config.securityFeaturesUrl" target="_blank">{{
        $t("views.about.content.ballot_check_link")
      }}</a
      >.
    </p>
    <h2>{{ $t("views.about.content.ballot_track_title") }}</h2>
    <p>{{ $t("views.about.content.ballot_track_description") }}</p>
    <h2>{{ $t("views.about.content.activity_log_title") }}</h2>
    <p>{{ $t("views.about.content.activity_log_description") }}</p>
    <h2>{{ $t("views.about.content.configuration_log_title") }}</h2>
    <p>{{ $t("views.about.content.configuration_log_description") }}</p>
  </main>
</template>

<style type="text/css">
.AboutView {
  display: flex;
  flex-direction: column;
}

.AboutView h1 {
  text-align: center;
  color: var(--slate-700);
  font-size: 26px;
  font-weight: 600;
  line-height: 30px;
}

.AboutView h2 {
  text-align: center;
  color: var(--slate-700);
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
}

.AboutView hr {
  border: 1px solid var(--slate-300);
  border-radius: 999px;
  margin: 2rem 0;
}

.AboutView a {
  color: var(--slate-900);
  font-weight: 600;
}

.AboutView p {
  text-align: center;
}

@media only screen and (min-width: 80rem) {
  .AboutView {
    padding-top: 6rem !important;
    width: 60vw !important;
    gap: 1rem;
  }

  .AboutView h2 {
    text-align: left;
  }

  .AboutView p {
    text-align: left;
  }
}
</style>
