import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import BallotActivityList from "./BallotActivityList.vue";
import { createI18n } from "vue-i18n";
const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: {
      components: {
        ballot_activity_list: {
          title: "Fun activities",
          type: "Item type",
          time: "Item time",
          actor: "Item actor",
        },
        ballot_activity: {
          SessionItem: {
            author: "Bob the builder",
          },
        },
      },
    },
  },
});

const stubs = {
  DateTime: {
    template: "<span />",
  },
  AVIcon: {
    template: "<span />",
  },
};

test("that BallotActivityList mounts", async () => {
  const wrapper = mount(BallotActivityList, {
    global: {
      plugins: [i18n],
      stubs,
    },
    props: {
      activities: [],
    },
  });
  expect(wrapper.text()).toContain("Fun activities");
  expect(wrapper.text()).toContain("Item type");
  expect(wrapper.text()).toContain("Item time");
  expect(wrapper.text()).toContain("Item actor");
});

test("that activities are listed", async () => {
  const wrapper = mount(BallotActivityList, {
    global: {
      plugins: [i18n],
      stubs,
    },
    props: {
      activities: [
        {
          type: "SessionItem",
          registeredAt: "2023-01-01T10:00:00+0100",
        },
      ],
    },
  });
  expect(wrapper.text()).toContain("Bob the builder");
});
