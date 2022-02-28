import type { ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";
import cn from "classnames";
import type { TextIconSpacingClassNameOptions } from "./styles";
import { textIconSpacingClasses } from "./styles";

/**
 * @remarks \@since REPLACE_VERSION Extends the {@link TextIconSpacingClassNameOptions}
 * interface and added missing default value annotations.
 */
export interface TextIconSpacingProps extends TextIconSpacingClassNameOptions {
  /**
   * An optional className to apply to the surroudning `<span>` when the
   * `forceIconWrap` prop is enabled or the icon is not a valid React Element.
   * If the `forceIconWrap` prop is not enabled, it will be cloned into the icon
   * instead.
   */
  className?: string;

  /**
   * An optional icon to display with a text button. This is invalid for icon
   * buttons. If this is a single element, a new class name will be cloned into
   * the element to get correct spacing so if you have a custom icon element,
   * you **must** also pass that class name down. If you are using one of the
   * react-md icon component packages, this is handled automatically.
   *
   * If this is not a valid react element, the icon will be wrapped in a
   * `<span>` instead with the class names applied.
   */
  icon?: ReactElement | ReactNode;

  /**
   * The children to render before or after the provided icon. This is defaulted
   * to `null` so that providing a `null` icon will correctly render without
   * React crashing.
   *
   * @defaultValue `null`
   */
  children?: ReactNode;

  /**
   * Boolean if the icon should be forced into a `<span>` with the class names
   * applied instead of attempting to clone into the provided icon.
   *
   * @defaultValue `false`
   */
  forceIconWrap?: boolean;
}

/**
 * Applies spacing in a flex container between two elements. This is generally
 * for icons and text, but there are no restictions on usage.
 *
 * @example
 * Simple Example
 * ```tsx
 * import type { ReactElement } from "react";
 * import { Button } from "@react-md/button";
 * import { TextIconSpacing } from "@react-md/icon";
 * import { HomeSVGIcon } from "@react-md/material-icons";
 *
 * function Example(): ReactElement {
 *   return (
 *     <Button>
 *       <TextIconSpacing icon={<HomeSVGIcon />}>Button</TextIconSpacing>
 *     </Button>
 *   );
 * }
 * ```
 *
 * @example
 * Multiple Usage
 * ```tsx
 * import type { ReactElement } from "react";
 * import { Button } from "@react-md/button";
 * import { TextIconSpacing } from "@react-md/icon";
 * import { CloseSVGIcon, HomeSVGIcon } from "@react-md/material-icons";
 *
 * function Example(): ReactElement {
 *   return (
 *     <Button>
 *       <TextIconSpacing icon={<HomeSVGIcon />}>
 *         <TextIconSpacing icon={<CloseSVGIcon />} iconAfter>
 *           Multiple
 *         </TextIconSpacing>
 *       </TextIconSpacing>
 *     </Button>
 *   );
 * }
 * ```
 *
 * @remarks \@since REPLACE_VERSION Added documentation.
 */
export function TextIconSpacing({
  className,
  icon: propIcon,
  children = null,
  stacked,
  iconAfter,
  flexReverse,
  forceIconWrap = false,
  beforeClassName,
  afterClassName,
  aboveClassName,
  belowClassName,
}: TextIconSpacingProps): ReactElement {
  if (!propIcon) {
    return <>{children}</>;
  }

  const baseClassName = textIconSpacingClasses(
    {
      stacked,
      iconAfter,
      flexReverse,
      beforeClassName,
      afterClassName,
      aboveClassName,
      belowClassName,
    },
    className
  );

  let iconEl = propIcon;
  let content = children;
  if (!forceIconWrap && isValidElement(propIcon)) {
    const icon = Children.only(propIcon);
    iconEl = cloneElement(icon, {
      className: cn(baseClassName, icon.props.className),
    });
  } else if (propIcon) {
    iconEl = (
      <span className={cn("rmd-text-icon-spacing", baseClassName)}>
        {propIcon}
      </span>
    );
  }

  if (iconEl) {
    content = (
      <>
        {!iconAfter && iconEl}
        {children}
        {iconAfter && iconEl}
      </>
    );
  }

  return <>{content}</>;
}
