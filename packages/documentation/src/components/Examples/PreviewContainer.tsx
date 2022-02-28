import { Card } from "@react-md/card";
import React, { ReactElement, ReactNode } from "react";

import styles from "./PreviewContainer.module.scss";

export interface PreviewContainerProps {
  children: ReactNode;
  disableCard?: boolean;
}

export default function PreviewContainer({
  children,
  disableCard = false,
}: PreviewContainerProps): ReactElement {
  if (disableCard) {
    return <>{children}</>;
  }

  return (
    <Card fullWidth className={styles.container}>
      {children}
    </Card>
  );
}
