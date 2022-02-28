import type { HTMLAttributes } from "react";
import { Children, cloneElement, forwardRef, isValidElement } from "react";
import cn from "classnames";

import type { GridListCellClassNameOptions } from "./styles";
import { gridListCellClassName } from "./styles";

/**
 * @remarks \@since REPLACE_VERSION Extends the {@link GridListCellClassNameOptions}
 * interface ad added missing default value annotations.
 */
export interface GridListCellProps
  extends HTMLAttributes<HTMLDivElement>,
    GridListCellClassNameOptions {
  /**
   * Boolean if the className should be cloned into the child instead of
   * wrapping in another div. This will only work if the `children` is a single
   * ReactElement.
   *
   * @defaultValue `false`
   */
  clone?: boolean;
}

export const GridListCell = forwardRef<HTMLDivElement, GridListCellProps>(
  function GridListCell(
    { className, children, square = false, clone = false, ...props },
    ref
  ) {
    const cellClassName = gridListCellClassName({ square }, className);
    if (clone && isValidElement(children)) {
      const child = Children.only(children);
      return cloneElement(child, {
        className: cn(cellClassName, child.props.className),
      });
    }

    return (
      <div {...props} ref={ref} className={cellClassName}>
        {children}
      </div>
    );
  }
);
