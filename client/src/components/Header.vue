<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import config from "../lib/config";
import DropDown from "./DropDown.vue";
import { uniq } from "lodash";
import i18n, { setLocale } from "../lib/i18n";
import type { DropdownOption, RouteGroups } from "@/Types";

const { t } = i18n.global;
const route = useRoute();

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

const routeGroups: RouteGroups = {
  track: ["BallotTrackerView", "BallotTrackerStart"],
  verify: ["BallotVerifierView", "BallotVerifierStart", "BallotVerifierFound"],
  logs: ["LogsView"],
};

function classes(name: string) {
  return {
    Header__Link: true,
    "router-link-active":
      (routeGroups[name] || []).indexOf(route.name.toString()) >= 0,
  };
}
</script>

<template>
  <AVNavbar>
    <div class="Header__logo-section">
      <img
        class="Header__Logo"
        aria-hidden="true"
        :src="config.logoUrl"
        alt="Jurisdiction Seal"
      />

      <RouterLink
        class="Header__Title"
        :to="`/${locale}/${election.slug}`"
        v-if="displayElectionName"
      >
        <span>{{ $t("header.dbas") }}</span>
        <span class="sub">{{ name }}</span>
      </RouterLink>
    </div>

    <div class="Header__Links">
      <RouterLink
        role="menuitem"
        :class="classes('verify')"
        :to="{ name: 'BallotVerifierStart' }"
      >
        <span>{{ $t("header.check") }}</span>
      </RouterLink>

      <RouterLink
        role="menuitem"
        :class="classes('track')"
        :to="{ name: 'BallotTrackerStart' }"
      >
        <span>{{ $t("header.track") }}</span>
      </RouterLink>

      <RouterLink
        id="logs"
        role="menuitem"
        :class="classes('logs')"
        :to="{ name: 'LogsView', params: { type: 'config', page: 1 } }"
      >
        <span>{{ $t("header.logs.logs") }}</span>
        <ul id="logs-submenu">
          <li>
            <RouterLink
              :to="{ name: 'LogsView', params: { type: 'activity', page: 1 } }"
              >{{ $t("header.logs.activity") }}</RouterLink
            >
          </li>
          <li>
            <RouterLink
              :to="{ name: 'LogsView', params: { type: 'config', page: 1 } }"
              >{{ $t("header.logs.config") }}</RouterLink
            >
          </li>
        </ul>
      </RouterLink>

      <RouterLink
        :class="classes('AboutView')"
        role="menuitem"
        :to="{ name: 'AboutView' }"
      >
        <span>{{ $t("header.about") }}</span>
      </RouterLink>

      <RouterLink
        role="menuitem"
        :class="classes('HelpView')"
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
          <AVIcon icon="arrow-up-right-from-square" aria-hidden="true" />
          {{ $t("header.contact") }}
        </span>
      </a>

      <DropDown
        class="Header__Locales"
        :options="availableLocales"
        @change="(value) => setLocale(value)"
      />
    </div>
  </AVNavbar>
</template>

<style type="text/css" scoped>
.Header__logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.Header__Title {
  font-weight: 600;
  font-size: 22px;
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: var(--slate-700);
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
  gap: 12px;
}

.Header__Link {
  padding: 8px 16px;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--slate-700);
  border-radius: 12px;
  border: transparent 2px solid;
}

.Header__Link:hover:not(.router-link-active) {
  background-color: var(--slate-100);
}

ul > li > .router-link-active {
  border: none;
}

.router-link-active:not(.Header__Title) {
  border-color: var(--slate-300);
}

.Header__Locales {
  margin-right: 20px;
  font-size: 16px;
  text-decoration: none;
  color: var(--slate-700);
  border: none;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 18px;
  padding: 4px;
}

#logs-submenu {
  display: none;
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 12px 0 0 -16px;
  background-color: white;
  box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.15);
}

#logs-submenu a:hover {
  background-color: var(--slate-100);
}

#logs-submenu a {
  display: block;
  padding: 16px 20px;
  text-decoration: none;
  color: var(--slate-700);
}

#logs:hover #logs-submenu {
  display: block;
}
</style>
