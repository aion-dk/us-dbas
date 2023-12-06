<script lang="ts" setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
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

const isMenuOpened = ref<boolean>(false);
const isMobile = ref<boolean>(false);

const toggleMenu = () => {
  isMenuOpened.value = !isMenuOpened.value;
};

const onResize = (e: Event) => {
  isMenuOpened.value = false;
  isMobile.value = (e.target as Window).innerWidth <= 1280;
};

onMounted(() => {
  window.addEventListener("resize", onResize);
  isMobile.value = window.innerWidth <= 1280;
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<template>
  <AVNavbar class="Header__Navbar_Overrides">
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
        @click="isMenuOpened && toggleMenu"
      >
        <span>{{ $t("header.dbas") }}</span>
        <span class="sub">{{ name }}</span>
      </RouterLink>
    </div>

    <div
      class="Header__Links"
      :class="{
        Header__Show: !isMenuOpened,
      }"
    >
      <RouterLink
        role="menuitem"
        :class="classes('verify')"
        :to="{ name: 'BallotVerifierStart' }"
        @click="toggleMenu"
      >
        <span>{{ $t("header.check") }}</span>
      </RouterLink>

      <RouterLink
        role="menuitem"
        :class="classes('track')"
        :to="{ name: 'BallotTrackerStart' }"
        @click="toggleMenu"
      >
        <span>{{ $t("header.track") }}</span>
      </RouterLink>

      <RouterLink
        v-if="!isMobile"
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
              >{{ $t("header.logs.activity") }}
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'LogsView', params: { type: 'config', page: 1 } }"
              >{{ $t("header.logs.config") }}
            </RouterLink>
          </li>
        </ul>
      </RouterLink>

      <RouterLink
        v-if="isMobile"
        :class="classes('logs')"
        :to="{ name: 'LogsView', params: { type: 'activity', page: 1 } }"
        @click="toggleMenu"
        >{{ $t("header.logs.activity") }}</RouterLink
      >

      <RouterLink
        v-if="isMobile"
        :class="classes('logs')"
        :to="{ name: 'LogsView', params: { type: 'config', page: 1 } }"
        @click="toggleMenu"
        >{{ $t("header.logs.config") }}</RouterLink
      >

      <RouterLink
        :class="classes('AboutView')"
        role="menuitem"
        :to="{ name: 'AboutView' }"
        @click="toggleMenu"
      >
        <span>{{ $t("header.about") }}</span>
      </RouterLink>

      <RouterLink
        role="menuitem"
        :class="classes('HelpView')"
        :to="{ name: 'HelpView' }"
        @click="toggleMenu"
      >
        <span>{{ $t("header.help") }}</span>
      </RouterLink>

      <a
        role="menuitem"
        class="Header__Link"
        :href="config.contactUrl"
        target="_blank"
        @click="toggleMenu"
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

    <button
      class="Header__Hamburger_Btn"
      :aria-label="
        isMenuOpened
          ? $t('header.close_menu_aria_label')
          : $t('header.open_menu_aria_label')
      "
      @click="toggleMenu"
    >
      <AVIcon
        v-if="isMenuOpened"
        icon="xmark"
        class="Header__Hamburger_Icon"
        aria-hidden="true"
      />
      <AVIcon
        v-else
        icon="bars"
        class="Header__Hamburger_Icon"
        aria-hidden="true"
      />
    </button>
  </AVNavbar>
</template>

<style type="text/css" scoped>
.Header__Navbar_Overrides {
  padding: 0.5rem !important;
}

.Header__logo-section {
  display: flex;
  align-items: center;
}

.Header__Logo {
  height: 54px;
  width: 54px;
  object-fit: cover;
}

.Header__Title {
  font-weight: 600;
  font-size: 16px;
  margin-left: 1rem;
  text-decoration: none;
  color: var(--slate-700);
  display: flex;
  flex-direction: column;
}

.Header__Title .sub {
  font-size: 12px;
}

.Header__Links {
  position: absolute;
  top: 70px;
  left: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(100dvh - 70px);
  padding-bottom: 3rem;
  background-color: white;
  z-index: 30 !important;
}

.Header__Show {
  display: none;
}

.Header__Hamburger_Btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  font-size: 1.5rem;
  height: 54px;
  width: 54px;
  color: var(--slate-800);
}

.Header__Link {
  padding: 1.25rem;
  font-size: 1.125rem;
  font-weight: 400;
  text-decoration: none;
  color: var(--slate-700);
}

.Header__Link:hover {
  color: var(--slate-900);
}

.Header__Link:hover:not(.router-link-active) {
  background-color: var(--slate-100);
}

.Header__Locales {
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--slate-700);
  border: none;
  background-color: white;
  padding: 1rem 0 1rem 1rem;
}

@media only screen and (min-width: 80rem) {
  .Header__Navbar_Overrides {
    padding-right: 1.5rem !important;
    padding-left: 1rem !important;
  }

  .Header__Hamburger_Btn {
    display: none;
  }

  .Header__Title {
    font-size: 22px;
  }

  .Header__Title .sub {
    font-size: 16px;
  }

  .Header__Links {
    display: block;
    position: static;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: fit-content;
    height: fit-content;
    text-wrap: nowrap;
    padding-bottom: 0;
    flex-grow: 1;
    gap: 1rem;
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
}
</style>
