/**
 * This file was generated from \@react-md/dev-utils and should not be updated
 * manually.
 */

import { ComponentType } from "react";
import dynamic from "next/dynamic";

export type ExampleLookup = Record<string, Record<string, ComponentType>>;

export const examples: ExampleLookup = {
  autocomplete: {
    "Simple Example": dynamic(
      () => import("../examples/autocomplete/SimpleExample")
    ),
    "Using Object Data Sets": dynamic(
      () => import("../examples/autocomplete/UsingObjectDataSets")
    ),
    "Highlight Matches": dynamic(
      () => import("../examples/autocomplete/HighlightMatches")
    ),
  },
  badge: {
    "Simple Examples": dynamic(
      () => import("../examples/badge/SimpleExamples")
    ),
    "Themed Badges": dynamic(() => import("../examples/badge/ThemedBadges")),
    "With Tooltips": dynamic(() => import("../examples/badge/WithTooltips")),
    "Customizing Badges": dynamic(
      () => import("../examples/badge/CustomizingBadges")
    ),
  },
  button: {
    "Text Buttons": dynamic(() => import("../examples/button/TextButtons")),
    "Outlined Buttons": dynamic(
      () => import("../examples/button/OutlinedButtons")
    ),
    "Contained Buttons": dynamic(
      () => import("../examples/button/ContainedButtons")
    ),
    "Icon Buttons": dynamic(() => import("../examples/button/IconButtons")),
    "Text Buttons with Icons": dynamic(
      () => import("../examples/button/TextButtonsWithIcons")
    ),
    "Floating Action Buttons": dynamic(
      () => import("../examples/button/FloatingActionButtons")
    ),
    "Button with Circular Progress": dynamic(
      () => import("../examples/button/ButtonWithCircularProgress")
    ),
    "Custom Button Theme": dynamic(
      () => import("../examples/button/CustomButtonTheme")
    ),
  },
};
