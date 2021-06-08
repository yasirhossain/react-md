import React, { ReactElement } from "react";

import { examples } from "constants/examples";

import PreviewContainer from "./PreviewContainer";
import PreviewUnavailable from "./PreviewUnavailable";
import { ExamplePreviewOptions } from "./types";

export interface ExamplePreviewProps extends ExamplePreviewOptions {
  name: string;
  title: string;
}

export default function ExamplePreview({
  name,
  title,
  disableCard = false,
}: ExamplePreviewProps): ReactElement {
  const ExampleContent = examples[name]?.[title] ?? PreviewUnavailable;

  return (
    <PreviewContainer disableCard={disableCard}>
      <ExampleContent />
    </PreviewContainer>
  );
}
