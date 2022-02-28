import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { listSubheaderClassName } from "./styles";
import type { ListSubheaderClassNameOptions } from "./types";

/**
 * @remarks \@since REPLACE_VERSION Extends the {@link ListSubheaderClassNameOptions}
 * interface and added missing default value annotations.
 */
export interface ListSubheaderProps
  extends HTMLAttributes<HTMLLIElement>,
    ListSubheaderClassNameOptions {}

/**
 * This is a simple component that will render a `<li>` with the subheader
 * typography styles. It also supports an `inset` variant that adds some spacing
 * to the left of the text to align with other `ListItem` that have left addons.
 */
export const ListSubheader = forwardRef<HTMLLIElement, ListSubheaderProps>(
  function ListSubheader({ className, inset = false, ...props }, ref) {
    return (
      <li
        {...props}
        ref={ref}
        className={listSubheaderClassName({ inset }, className)}
      />
    );
  }
);
