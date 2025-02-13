<script setup lang="ts">
import ExpandableSection from "../components/ExpandableSection.vue";
import i18n from "../lib/i18n";
import { en } from "@/assets/locales/en";
import { es } from "@/assets/locales/es";
import config from "@/lib/config";

const messages: any = {
  en: en,
  es: es,
};
</script>

<template>
  <main class="HelpView">
    <div class="HelpView__Header">
      <h1 class="HelpView__Title">{{ $t("views.help.title") }}</h1>
      <p>{{ $t("views.help.info") }}</p>
    </div>

    <h2>{{ $t("views.help.ballot_check_title") }}</h2>
    <ExpandableSection
      v-for="question in messages[i18n.global.locale].views.help.ballot_check"
      :key="question.question"
      class="HelpView__FAQ"
    >
      <template v-slot:collapsed>
        <h3>{{ question.question }}</h3>
      </template>

      <template v-slot:expanded>
        <h3>{{ question.question }}</h3>
        <p v-for="paragraph in question.answer" :key="paragraph">
          {{ paragraph }}
        </p>
      </template>
    </ExpandableSection>

    <h2>{{ $t("views.help.ballot_track_title") }}</h2>
    <ExpandableSection
      v-for="question in messages[i18n.global.locale].views.help.ballot_track"
      :key="question.question"
      class="HelpView__FAQ"
    >
      <template v-slot:collapsed>
        <h3>{{ question.question }}</h3>
      </template>

      <template v-slot:expanded>
        <h3>{{ question.question }}</h3>

        <p v-for="paragraph in question.answer" :key="paragraph">
          {{ paragraph }}
        </p>
      </template>
    </ExpandableSection>

    <footer>
      <h2>{{ $t("views.help.still_have_questions") }}</h2>
      <p>{{ $t("views.help.cant_find_answers") }}</p>
      <AVLink
        :label="$t('views.help.election_office_website')"
        :href="config.contactUrl"
        referrerpolicy="no-referrer"
        target="_blank"
      />
    </footer>
  </main>
</template>

<style type="text/css" scoped>
.HelpView__Header {
  text-align: center;
}

.HelpView__Title {
  color: var(--slate-700);
  font-size: 26px;
  font-weight: 600;
  line-height: 30px;
}

.HelpView h2 {
  font-size: 24px;
  line-height: 28px;
  color: var(--slate-700);
  font-weight: 600;
  text-align: center;
}

footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 4rem;
}

footer > h2 {
  margin: 2rem 0 0 0 !important;
}

.HelpView__FAQ h3 {
  margin: 0;
  padding: 0;
  width: 80%;
}

.HelpView__FAQ p:last-of-type {
  margin-bottom: 0;
}

@media only screen and (min-width: 80rem) {
  .HelpView {
    padding-top: 6rem !important;
  }

  .HelpView h2 {
    text-align: left;
    margin-top: 4rem;
    margin-bottom: 2rem;
  }
}
</style>
