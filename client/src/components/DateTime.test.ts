import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import DateTime from "./DateTime.vue";
import { AVTooltip } from "@assemblyvoting/ui-library";

const props: any = {
  dateTime: new Date().toISOString(),
  timeZone: "CET",
};
const components = { AVTooltip: AVTooltip };
const options = { props, global: { components } };

test("displays relative time", async () => {
  const wrapper = mount(DateTime, options);
  expect(wrapper.text()).toContain("a few seconds ago");
});

test("displays absolute time", async () => {
  props.format = "absolute";
  props.dateTime = "2023-01-01T10:00:00+0100";
  const wrapper = mount(DateTime, options);
  expect(wrapper.text()).toContain("Sunday, January 1, 2023 10:00 AM CET");
});
