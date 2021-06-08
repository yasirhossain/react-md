import { ExampleList } from "components/Examples/types";

import simpleExample from "./SimpleExample.md";
import usingObjectDataSets from "./UsingObjectDataSets.md";
import highlightMatches from "./HighlightMatches.md";

export { default as description } from "./README.md";

export const examples: ExampleList = [
  {
    title: "Simple Example",
    description: simpleExample,
  },
  {
    title: "Using Object Data Sets",
    description: usingObjectDataSets,
  },
  {
    title: "Highlight Matches",
    description: highlightMatches,
  },
];
