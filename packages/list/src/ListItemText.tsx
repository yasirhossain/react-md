import type { ReactElement, ReactNode } from "react";

import { listItemTextClassName } from "./styles";

export interface ListItemTextProps {
  /**
   * An optional `className` to apply to the `<span>` surrounding the `children`.
   */
  className?: string;

  /**
   * An optional `className` to apply to the `<span>` surrounding the
   * `secondaryText` if it was provided.
   */
  secondaryTextClassName?: string;

  /**
   * The main text children to display. This will be stacked above the
   * `secondaryText` if it was provided.
   */
  children?: ReactNode;

  /**
   * Optional secondary text to display that will be stacked below the
   * `children`. This also applies some styles to make the text less prominent
   * than the `children`.
   */
  secondaryText?: ReactNode;
}

/**
 * This component us used to create the one to three lines of text within a
 * `ListItem` or `SimpleListItem`.
 */
export function ListItemText({
  className,
  secondaryTextClassName,
  secondaryText,
  children,
}: ListItemTextProps): ReactElement {
  let secondaryContent: ReactNode;
  if (secondaryText) {
    secondaryContent = (
      <span
        className={listItemTextClassName(
          { secondary: true },
          secondaryTextClassName
        )}
      >
        {secondaryText}
      </span>
    );
  }

  return (
    <span className={listItemTextClassName({}, className)}>
      {children}
      {secondaryContent}
    </span>
  );
}
