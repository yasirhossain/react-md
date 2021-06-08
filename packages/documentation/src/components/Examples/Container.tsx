import React, { ElementType, ReactElement, ReactNode } from "react";

import styles from "./Container.module.scss";

export interface ContainerProps {
  as?: ElementType;
  children?: ReactNode;
}

export function Container({
  as: Component = "div",
  children,
}: ContainerProps): ReactElement | null {
  return <Component className={styles.container}>{children}</Component>;
}
