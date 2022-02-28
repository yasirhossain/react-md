import React, { Fragment, ReactElement } from "react";
import { Divider } from "@react-md/divider";
import { IconProvider } from "@react-md/icon";

import { toId } from "utils/toTitle";

import styles from "./Examples.module.scss";
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
          <Fragment key={id}>
            {i > 0 && <Divider className={styles.divider} />}
            <Example {...example} id={id} first={i === 0} name={name} />
          </Fragment>
        );
      })}
    </Container>
  );
}
