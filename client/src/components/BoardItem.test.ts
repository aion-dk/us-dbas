import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import BoardItem from "./BoardItem.vue";
import { createI18n } from "vue-i18n";
import { en } from "../assets/locales/en.ts";

const i18n = createI18n({ locale: "en", messages: { en } });

const item = {
  type: "VoterSessionItem",
  address: "00dd8a9310e8d572e53fb297e96758ded086f424df7ad63dd9ee5639ce13d281",
  registeredAt: new Date().toString(),
};

const options = {
  global: {
    plugins: [i18n],
  },
  props: { item },
};

test("includes short address", async () => {
  const wrapper = mount(BoardItem, options);
  expect(wrapper.text()).toContain("16fSovo");
});

test("includes item type", async () => {
  const wrapper = mount(BoardItem, options);
  console.log(wrapper.text());
  expect(wrapper.text()).toContain("Voter session");
});

test("includes item author", async () => {
  const wrapper = mount(BoardItem, options);
  expect(wrapper.text()).toContain("Voter");
});
