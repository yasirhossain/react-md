import React, { ReactElement } from "react";

import Markdown, { MarkdownProps } from "components/Markdown/Markdown";

import styles from "./Description.module.scss";

export function Description({
  children,
  ...props
}: MarkdownProps): ReactElement {
  return (
    <Markdown {...props} className={styles.container}>
      {children}
    </Markdown>
  );
}
