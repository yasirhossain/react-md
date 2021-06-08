import { ExampleList, ExamplesConfig } from "components/Examples/types";

import simpleExamples from "./SimpleExamples.md";
import themedBadges from "./ThemedBadges.md";
import withTooltips from "./WithTooltips.md";
import customizingBadges from "./CustomizingBadges.md";

export const examples: ExampleList = [
  {
    title: "Simple Examples",
    description: simpleExamples,
  },
  {
    title: "Themed Badges",
    description: themedBadges,
  },
  {
    title: "With Tooltips",
    description: withTooltips,
  },
  {
    title: "Customizing Badges",
    description: customizingBadges,
  },
];

export const config: ExamplesConfig = {
  resetIcons: true,
};
