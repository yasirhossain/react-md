import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { Children, cloneElement, forwardRef, isValidElement } from "react";
import cn from "classnames";
import type { ClassNameCloneableChild } from "@react-md/utils";

import type { IconRotatorClassNameOptions } from "./styles";
import { iconRotatorClasses } from "./styles";

/**
 * @remarks \@since REPLACE_VERSION Extends the {@link IconRotatorClassNameOptions}
 * interface and added missing default value annotations.
 */
export interface IconRotatorBaseProps
  extends HTMLAttributes<HTMLSpanElement>,
    IconRotatorClassNameOptions {
  /**
   * An optional style to apply to the surrounding span when the `forceIconWrap`
   * prop is enabled or the children is not a single react element.
   */
  style?: CSSProperties;

  /**
   * An optional className to apply.
   */
  className?: string;

  /**
   * Boolean if the child icon should be "forcefully" wrapped in a `<span>`
   * element. This should be enabled if you have a custom icon that does not
   * pass the `className` prop down.
   *
   * @defaultValue `false`
   */
  forceIconWrap?: boolean;
}

export interface IconRotatorProps extends IconRotatorBaseProps {
  /**
   * The icon that should be rotated. If this is a valid React Element, the
   * class names will be cloned into that icon, otherwise the icon will be
   * wrapped in a span with the correct class names applied.
   */
  children: ReactNode;
}

/**
 * The `IconRotator` is a simple component that is used to rotate an icon from a
 * one degrees to another.
 *
 * @example
 * Simple Example
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { Button } from "@react-md/button";
 * import { IconRotator } from "@react-md/icon";
 * import { KeyboardArrowDownSVGIcon } from "@react-md/material-icons";
 *
 * function Example(): ReactElement {
 *   const [rotated, setRotated] = useState(false);
 *
 *   return (
 *     <Button
 *       aria-label="Expand"
 *       aria-pressed={rotated}
 *       onClick={() => setRotated((prevRotated) => !prevRotated)}
 *     >
 *       <IconRotator rotated={rotated}>
 *         <KeyboardArrowDownSVGIcon />
 *       </IconRotator>
 *     </Button>
 *   );
 * }
 * ```
 *
 * @remarks \@since REPLACE_VERSION Added example documentation.
 */
export const IconRotator = forwardRef<HTMLSpanElement, IconRotatorProps>(
  function IconRotator(
    {
      style,
      className: propClassName,
      animate = true,
      rotated,
      children,
      forceIconWrap = false,
      ...props
    },
    ref
  ) {
    const className = iconRotatorClasses({ animate, rotated }, propClassName);
    if (!forceIconWrap && isValidElement(children)) {
      const child = Children.only<ClassNameCloneableChild>(children);
      return cloneElement(child, {
        className: cn(className, child.props.className),
      });
    }

    return (
      <span {...props} style={style} className={className} ref={ref}>
        {children}
      </span>
    );
  }
);
