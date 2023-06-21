<script lang="ts" setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import config from "../lib/config";
import DropDown from "./DropDown.vue";
import { uniq } from "lodash";
import i18n from "../lib/i18n";
import type { DropdownOption } from "@/Types";
const { t } = i18n.global;

const props = defineProps({
  locale: {
    type: String,
    default: "en",
  },
  election: {
    type: Object,
    required: true,
  },
  displayElectionName: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["changeLocale"]);

const _locales = computed(() => uniq(props.election.locales || ["en"]));
const name = computed(() => props.election.title[props.locale]);
const availableLocales = computed(() => {
  return _locales.value.map((l: unknown): DropdownOption => {
    return {
      selected: l === props.locale,
      value: l.toString(),
      display: t(`locales.${l}`),
    };
  });
});

function setLocale(newLocale: string) {
  console.log("Setting new locale", newLocale);
  emit("changeLocale", newLocale);
}
</script>

<template>
  <nav class="Header" role="menubar">
    <img
      class="Header__Logo"
      aria-hidden="true"
      :src="config.logoUrl"
      alt="DBAS Logo"
    />

    <RouterLink class="Header__Title" :to="`/${locale}/${election.slug}`" v-if="displayElectionName">
      <span>{{ $t("header.dbas") }}</span>
      <span class="sub">{{ name }}</span>
    </RouterLink>

    <div class="Header__Links">
      <RouterLink
        role="menuitem"
        class="Header__Link"
        :to="{ name: 'BallotVerifierStart' }"
      >
        <span>{{ $t("header.check") }}</span>
      </RouterLink>

      <RouterLink
        role="menuitem"
        class="Header__Link"
        :to="{ name: 'BallotTrackerStart' }"
      >
        <span>{{ $t("header.track") }}</span>
      </RouterLink>

      <RouterLink
        role="menuitem"
        class="Header__Link"
        :to="{ name: 'LogsView' }"
      >
        <span>{{ $t("header.logs") }}</span>
      </RouterLink>

      <RouterLink
        class="Header__Link"
        role="menuitem"
        :to="{ name: 'AboutView' }"
      >
        <span>{{ $t("header.about") }}</span>
      </RouterLink>

      <RouterLink
        role="menuitem"
        class="Header__Link"
        :to="{ name: 'HelpView' }"
      >
        <span>{{ $t("header.help") }}</span>
      </RouterLink>

      <a
        role="menuitem"
        class="Header__Link"
        :href="config.contactUrl"
        target="_blank"
      >
        <span>
          <font-awesome-icon
            aria-hidden="true"
            icon="fa-solid fa-arrow-up-right-from-square"
          />
          {{ $t("header.contact") }}
        </span>
      </a>

      <DropDown
        class="Header__Locales"
        :options="availableLocales"
        @change="(value) => setLocale(value)"
      />
    </div>
  </nav>
</template>

<style type="text/css" scoped>
.Header {
  display: flex;
  font-family: "Open Sans";
  align-items: center;
  box-shadow: 0px 4px 10px #ccc;
  position: fixed;
  width: 100%;
  z-index: 2;
  background-color: #fff;
  box-sizing: border-box;
  height: 70px;
}

.Header__Title {
  font-weight: 600;
  font-size: 22px;
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: #495057;
  display: flex;
  flex-direction: column;
}

.Header__Title .sub {
  font-size: 16px;
}

.Header__Logo {
  height: 54px;
  width: 54px;
  object-fit: cover;
  margin: 8px 11px;
  border-radius: 3px;
}

.Header__Links {
  flex-grow: 1;
  justify-content: flex-end;
  align-items: center;
  display: flex;
}

.Header__Link {
  padding: 20px;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  color: #495057;
}

.Header__Locales {
  margin-right: 20px;
  font-size: 16px;
  text-decoration: none;
  color: #495057;
  border: none;
}

.Header__Links .router-link-active span {
  border: solid 2px #DEE2E6;
  border-radius: 12px;
  padding: 7px 8px;
}
</style>
