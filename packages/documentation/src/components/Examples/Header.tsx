import React, { ReactElement } from "react";

import Heading from "components/Heading";
import { toTitle } from "utils/toTitle";

import { Container } from "./Container";
import { Description } from "./Description";

export interface HeaderProps {
  name: string;
  children?: string;
}

export function Header({ name, children }: HeaderProps): ReactElement | null {
  if (!children) {
    return null;
  }

  return (
    <Container as="header">
      <Heading level={2} id="demo-page-title">
        {toTitle(name)}
      </Heading>
      <Description>{children}</Description>
    </Container>
  );
}
