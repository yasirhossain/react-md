import { BrokenImageSVGIcon } from "@react-md/material-icons";
import { Text } from "@react-md/typography";
import { Markdown } from "components/Markdown";
import React, { ReactElement } from "react";

import styles from "./PreviewUnavailable.module.scss";

const message = `This error normally only happens when a new example has been added without
running the \`yarn dev-utils examples\` command.
  `;

export default function PreviewUnavailable(): ReactElement {
  return (
    <div className={styles.container}>
      <Text type="headline-5">Preview unavailable</Text>
      {process.env.NODE_ENV !== "production" && <Markdown>{message}</Markdown>}
      <BrokenImageSVGIcon />
    </div>
  );
}
