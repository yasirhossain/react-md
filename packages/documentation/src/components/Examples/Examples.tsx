import { IconProvider } from "@react-md/icon";
import React, { Fragment, ReactElement } from "react";
import { toId } from "utils/toTitle";
import { Example } from "./Example";
import Font from "./Font";
import { Header } from "./Header";
import { ExampleList, ExamplesConfig } from "./types";

export interface ExamplesProps extends ExamplesConfig {
  name: string;
  description: string;
  examples: ExampleList;
}

const EMPTY_LIST = [] as const;

export default function Examples({
  name,
  description,
  examples,
  fonts = EMPTY_LIST,
  resetIcons = false,
}: ExamplesProps): ReactElement | null {
  const Container = resetIcons ? IconProvider : Fragment;
  return (
    <Container>
      {fonts.map((font) => (
        <Font key={font} font={font} />
      ))}
      {resetIcons && <Font font="Material Icons" />}
      <Header name={name}>{description}</Header>
      {examples.map((example, i) => {
        const id = toId(example.title);

        return (
          <Example {...example} key={id} id={id} first={i === 0} name={name} />
        );
      })}
    </Container>
  );
}
