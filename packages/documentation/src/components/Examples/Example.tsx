import React, { ReactElement } from "react";

import Heading from "components/Heading";

import { Container } from "./Container";
import { Description } from "./Description";
import ExamplePreview from "./ExamplePreview";
import { Example as ExampleConfig } from "./types";

export interface ExampleProps extends ExampleConfig {
  id: string;
  first: boolean;
  name: string;
}

export function Example({
  id,
  first,
  name,
  title,
  description,
  ...props
}: ExampleProps): ReactElement {
  return (
    <Container>
      <Heading
        level={2}
        id={`${id}-title`}
        margin={!first ? "bottom" : "initial"}
      >
        {title}
      </Heading>
      <Description id={`${id}-description`}>{description}</Description>
      <ExamplePreview {...props} name={name} title={title} />
    </Container>
  );
}
