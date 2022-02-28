import type { Argument } from "classnames";
import cn from "classnames";
import { bem } from "@react-md/utils";

const iconStyles = bem("rmd-icon");
const iconRotatorStyles = bem("rmd-icon-rotator");

/** @remarks \@since REPLACE_VERSION */
export interface SVGIconClassNameOptions {
  /**
   * Boolean if the icon should use the dense spec.
   *
   * @defaultValue `false`
   */
  dense?: boolean;
}

/** @remarks \@since REPLACE_VERSION */
export interface FontIconClassNameOptions extends SVGIconClassNameOptions {
  /**
   * Either a boolean that will enforce the 24x24 size of the font icon or a
   * number of the size to enforce. This is useful when using other font icon
   * libraries that do not have a consistent size.
   *
   * @defaultValue `false`
   */
  forceSize?: boolean;

  /**
   * Boolean if the `forceSize` prop should also force the `font-size` instead
   * of only `width` and `height`.
   *
   * @defaultValue `false`
   */
  forceFontSize?: boolean;
}

/**
 * Get a `className` string for an icon based on different styling options.
 *
 * @param options - Any styling options to apply additional class names.
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function iconClasses(
  options: FontIconClassNameOptions & { type: "font" },
  ...others: readonly Argument[]
): string;
export function iconClasses(
  options: SVGIconClassNameOptions & { type: "svg" },
  ...others: readonly Argument[]
): string;
export function iconClasses(
  options: SVGIconClassNameOptions &
    FontIconClassNameOptions & { type: "svg" | "font" },
  ...others: readonly Argument[]
): string {
  const {
    type,
    dense = false,
    forceSize = false,
    forceFontSize = false,
  } = options;

  return cn(
    iconStyles({
      [type]: true,
      dense,
      "forced-font": forceFontSize,
      "forced-size": forceSize,
    }),
    ...others
  );
}

/** @remarks \@since REPLACE_VERSION */
export interface IconRotatorClassNameOptions {
  /**
   * Boolean if the rotation should be animated instead of static.
   *
   * @defaultValue `true`
   */
  animate?: boolean;

  /**
   * Boolean if the icon is currently rotated.
   */
  rotated: boolean;
}

/**
 *
 * @param options - An object of the different states that are possible for
 * an icon
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function iconRotatorClasses(
  options: IconRotatorClassNameOptions,
  ...others: readonly Argument[]
): string {
  const { animate = true, rotated } = options;
  return cn(
    iconRotatorStyles({
      animate,
      rotated,
    }),
    ...others
  );
}

/** @remarks \@since REPLACE_VERSION */
export interface TextIconSpacingClassNameOptions {
  /**
   * Boolean if the icon should appear after the text instead of before.
   *
   * @defaultValue `false`
   */
  iconAfter?: boolean;

  /**
   * The class name to use for an icon that is placed before text.
   *
   * @defaultValue `"rmd-icon--before"`
   */
  beforeClassName?: string;

  /**
   * The class name to use for an icon that is placed after text.
   *
   * @defaultValue `"rmd-icon--after"`
   */
  afterClassName?: string;

  /**
   * The class name to use for an icon that is placed before above the text.
   * This is used when the `stacked` prop is enabled and the `iconAfter` prop is
   * disabled or omitted.
   *
   * @defaultValue `"rmd-icon--above"`
   */
  aboveClassName?: string;

  /**
   * The class name to use for an icon that is placed before above the text.
   * This is used when the `stacked` prop is enabled and the `iconAfter` prop is
   * enabled.
   *
   * @defaultValue `"rmd-icon--below"`
   */
  belowClassName?: string;

  /**
   * Boolean if the icon and text should be stacked instead of inline. Note:
   * You'll normally want to update the container element to have
   * `display: flex` and `flex-direction: column` for this to work.
   *
   * @defaultValue `false`
   */
  stacked?: boolean;

  /**
   * Boolean if the icon and content are in a `column-reverse` or `row-reverse`
   * `flex-direction`. This will swap the different classnames as needed.
   *
   * @defaultValue `false`
   * @remarks \@since 2.5.0
   */
  flexReverse?: boolean;
}

/**
 * Get a `className` string for an icon that be offset from another element
 * (usually text) on different styling options.
 *
 * @param options - Any styling options to apply additional class names.
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function textIconSpacingClasses(
  options: TextIconSpacingClassNameOptions,
  ...others: readonly Argument[]
): string {
  const {
    stacked = false,
    iconAfter = false,
    flexReverse = false,
    beforeClassName = "rmd-icon--before",
    afterClassName = "rmd-icon--after",
    aboveClassName = "rmd-icon--above",
    belowClassName = "rmd-icon--below",
  } = options;

  const isAfter = flexReverse ? !iconAfter : iconAfter;
  return cn(
    {
      [beforeClassName]: !stacked && !isAfter,
      [afterClassName]: !stacked && isAfter,
      [aboveClassName]: stacked && !isAfter,
      [belowClassName]: stacked && isAfter,
    },
    ...others
  );
}
