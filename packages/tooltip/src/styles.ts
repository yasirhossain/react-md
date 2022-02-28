import type { Argument } from "classnames";
import cn from "classnames";
import type { SimplePosition } from "@react-md/utils";
import { bem } from "@react-md/utils";
import { DEFAULT_TOOLTIP_POSITION } from "./constants";

const tooltipStyles = bem("rmd-tooltip");

/** @remarks \@since REPLACE_VERSION */
export interface TooltipClassNameOptions {
  /**
   * Boolean if the tooltip is using the dense spec. This will reduce the
   * padding, margin and font size for the tooltip and is usually used for
   * desktop displays.
   *
   * @defaultValue `false`
   */
  dense?: boolean;

  /**
   * Boolean if the tooltip should allow line wrapping. This is disabled by
   * default since the tooltip will display weirdly when its container element
   * is small in size. It is advised to only enable line wrapping when there are
   * long tooltips or the tooltips are bigger than the container element.
   *
   * Once line wrapping is enabled, you will most likely need to set some
   * additional padding and widths.
   *
   * @defaultValue `false`
   */
  lineWrap?: boolean;

  /**
   * This is the position that the tooltip should appear related to its
   * container element as well as updating the animation direction.
   *
   * @see {@link DEFAULT_TOOLTIP_POSITION}
   * @defaultValue `DEFAULT_TOOLTIP_POSITION`
   */
  position?: SimplePosition;
}

/**
 * Get a tooltip `className` string  based on different styling options.
 *
 * @param options - Any styling options to apply additional class names.
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function tooltipClasses(
  options: TooltipClassNameOptions,
  ...others: readonly Argument[]
): string {
  const {
    dense = false,
    lineWrap = false,
    position = DEFAULT_TOOLTIP_POSITION,
  } = options;
  return cn(
    tooltipStyles({
      dense,
      "line-wrap": lineWrap,
      "dense-line-wrap": dense && lineWrap,
      [position]: true,
    }),
    ...others
  );
}
