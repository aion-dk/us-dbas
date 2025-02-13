import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import DateTime from "./DateTime.vue";
import { AVTooltip } from "@assemblyvoting/ui-library";
import { AVIcon } from "@assemblyvoting/ui-library";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VuePopper from "@kalimahapps/vue-popper";

const date = new Date();
date.setHours(date.getHours() - 5);

const props: any = {
  dateTime: date.toISOString(),
  timeZone: "CET",
};
const components = {
  AVTooltip: AVTooltip,
  AVIcon: AVIcon,
  "popper-tooltip": VuePopper,
};

const options = { props, global: { components } };

test("displays relative time", async () => {
  const wrapper = mount(DateTime, options);
  expect(wrapper.text()).toContain("hours ago");
});

test("displays absolute time", async () => {
  props.format = "absolute";
  props.dateTime = "2023-01-01T10:00:00+0100";
  const wrapper = mount(DateTime, options);
  expect(wrapper.text()).toContain("Sunday, January 1, 2023 at 10:00 AM");
});
