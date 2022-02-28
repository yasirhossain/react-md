import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { listClassName } from "./styles";
import type { ListClassNameOptions } from "./types";

export type ListElement = HTMLUListElement | HTMLOListElement;

/**
 * @remarks \@since REPLACE_VERSION Extends {@link ListClassNameOptions} interface and
 * added missing default value annotations.
 */
export interface ListProps
  extends HTMLAttributes<ListElement>,
    ListClassNameOptions {
  /**
   * The role is set to `"none"` by default for lists screen readers announce
   * lists differently than other elements on the page. Since the major use-case
   * for lists is to contain clickable items, setting this to `"none"` fixes
   * this issue.
   *
   * @defaultValue `"none"`
   */
  role?: HTMLAttributes<ListElement>["role"];

  /**
   * Boolean if the list's order is important. This will update the list to be
   * rendered as an `<ol>` instead of `<ul>`.
   *
   * @defaultValue `false`
   */
  ordered?: boolean;
}

/**
 * The `List` component creates an unstyled ordered or unordered list that
 * should be used with the `ListItem`, `ListItemLink`, and `SimpleListItem`
 * components.
 */
export const List = forwardRef<ListElement, ListProps>(function List(
  {
    role = "none",
    dense = false,
    ordered = false,
    horizontal = false,
    className,
    children,
    ...props
  },
  ref
) {
  const Component = (ordered ? "ol" : "ul") as "ul";

  return (
    <Component
      {...props}
      ref={ref}
      role={role}
      className={listClassName({ dense, horizontal }, className)}
    >
      {children}
    </Component>
  );
});
