import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import Infobox from "./Infobox.vue";

test("BallotActivity mounts", async () => {
  const wrapper = mount(Infobox, {
    slots: {
      default: "Hello",
    },
  });
  expect(wrapper.text()).toContain("Hello");
});
