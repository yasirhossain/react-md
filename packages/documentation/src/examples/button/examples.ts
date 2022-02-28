import { ExampleList, ExamplesConfig } from "components/Examples/types";

import buttonWithCircularProgress from "./ButtonWithCircularProgress.md";
import containedButtons from "./ContainedButtons.md";
import customButtonTheme from "./CustomButtonTheme.md";
import floatingActionButtons from "./FloatingActionButtons.md";
import iconButtons from "./IconButtons.md";
import outlinedButtons from "./OutlinedButtons.md";
import textButtons from "./TextButtons.md";
import textButtonsWithIcons from "./TextButtonsWithIcons.md";

export { default as description } from "./README.md";

export const examples: ExampleList = [
  {
    title: "Text Buttons",
    description: textButtons,
  },
  {
    title: "Outlined Buttons",
    description: outlinedButtons,
  },
  {
    title: "Contained Buttons",
    description: containedButtons,
  },
  {
    title: "Icon Buttons",
    description: iconButtons,
  },
  {
    title: "Text Buttons with Icons",
    description: textButtonsWithIcons,
  },
  {
    title: "Floating Action Buttons",
    description: floatingActionButtons,
    disableCard: true,
    // emulated: { fabOffset: true },
  },
  {
    title: "Button with Circular Progress",
    description: buttonWithCircularProgress,
  },
  {
    title: "Custom Button Theme",
    description: customButtonTheme,
  },
];

export const config: ExamplesConfig = {
  fonts: ["Material Icons"],
};
