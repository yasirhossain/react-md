import type { Argument } from "classnames";
import cn from "classnames";
import { bem } from "@react-md/utils";

const srOnlyStyles = bem("rmd-sr-only");
const typographyStyles = bem("rmd-typography");
const textContainerStyles = bem("rmd-text-container");

/**
 * A union of all the material design provided typography styles. When used with
 * the Typography component, this will generate the correct typography className
 * to apply and determine what component to be rendered as if none was provided.
 *
 * @remarks \@since 4.0.0
 */
export type TypographyType =
  | "headline-1"
  | "headline-2"
  | "headline-3"
  | "headline-4"
  | "headline-5"
  | "headline-6"
  | "subtitle-1"
  | "subtitle-2"
  | "body-1"
  | "body-2"
  | "caption"
  | "overline"
  | "button";

/**
 * Since the typography within react-md tries to not modify base elements, the
 * default margin applied to heading tags (h1-h6) and paragraph (p) might have
 * large margin that you don't want applied when using this component. You can
 * disable:
 *
 * - only the top margin by setting this prop to `"bottom"`
 * - only the bottom margin by setting this prop to `"top"`
 * - top and bottom margin by setting this prop to `"none"`
 * - or keep the initial behavior: `"initial"`
 *
 * @remarks \@since REPLACE_VERSION
 */
export type TypographyMargin = "initial" | "none" | "top" | "bottom";

export type TextAlign = "left" | "center" | "right";
export type TextDecoration = "underline" | "overline" | "line-through";
export type TextTransform = "capitalize" | "uppercase" | "lowercase";
export type TextWeight =
  | "thin"
  | "light"
  | "regular"
  | "medium"
  | "bold"
  | "semi-bold"
  | "black";
export type TextColor =
  | "secondary"
  | "hint"
  | "theme-primary"
  | "theme-secondary"
  | "theme-warning"
  | "theme-error";
export type FontStyle = "italic" | "oblique" | "normal";

/** @remarks \@since REPLACE_VERSION */
export interface TypographyClassNameOptions {
  /**
   * One of the material design typography text styles. This is used to generate
   * a className that can be applied to any element and have the correct
   * typography.
   *
   * @defaultValue `"body-1"`
   */
  type?: TypographyType;

  /**
   * An optional text alignment to apply.
   */
  align?: TextAlign;

  /**
   * An optional text color to apply. Unline normal theme colors, these will
   * reflect the `text-secondary-on-background` and `text-hint-on-background`
   * instead of the primary or secondary theme colors.
   */
  color?: TextColor;

  /**
   * An optional text decoration to apply.
   */
  decoration?: TextDecoration;

  /**
   * An optional text transformation to apply.
   */
  transform?: TextTransform;

  /**
   * An optional font-weight to apply.
   */
  weight?: TextWeight;

  /**
   * An optional font-style to apply.
   */
  fontStyle?: FontStyle;

  /**
   * @defaultValue `"initial"`
   * @see {@link TypographyMargin}
   */
  margin?: TypographyMargin;
}

/**
 * Get a typography `className` string based on different styling options.
 *
 * @param options - Any styling options to apply additional class names.
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function typographyClassName(
  options: TypographyClassNameOptions,
  ...others: readonly Argument[]
): string {
  const {
    align,
    color,
    decoration,
    fontStyle,
    margin = "initial",
    transform,
    type = "body-1",
    weight,
  } = options;

  return cn(
    typographyStyles({
      [type]: true,
      "no-margin": margin === "none",
      "no-margin-top": margin === "bottom",
      "no-margin-bottom": margin === "top",
      [align || ""]: align,
      [decoration || ""]: decoration && decoration !== "overline",
      [color || ""]: color,
      // only because "overline" is technically one of the valid material design types :/
      "overline-decoration": decoration === "overline",
      [transform || ""]: transform,
      [weight || ""]: weight,
      [fontStyle || ""]: fontStyle,
    }),
    ...others
  );
}

/**
 * A union of the available text container sizes. One of these values must be
 * chosen to help set the max width for text.
 *
 * - `"auto"` - the `max-width` will automatically change based on media queries
 * - `"mobile"` - the `max-width` will be forced to always be the mobile size
 * - `"desktop"` - the `max-width` will be forced to always be the desktop size
 *
 * @remarks \@since REPLACE_VERSION Added additional documentation around the sizes
 */
export type TextContainerSize = "auto" | "mobile" | "desktop";

/** @remarks \@since REPLACE_VERSION */
export interface TextContainerClassNameOptions {
  /**
   * @defaultValue `"auto"`
   * @see {@link TextContainerSize}
   */
  size?: TextContainerSize;
}

/**
 * Get a text container `className` string based on different styling options.
 *
 * @param options - Any styling options to apply additional class names.
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function textContainerClassName(
  options: TextContainerClassNameOptions,
  ...others: readonly Argument[]
): string {
  const { size = "auto" } = options;
  return cn(textContainerStyles({ size }), ...others);
}

/** @remarks \@since REPLACE_VERSION */
export interface SrOnlyClassNameOptions {
  /**
   * Boolean if the text should become visible when focused. If this prop is
   * enabled and the `tabIndex` prop is `undefined`, the `tabIndex` will be
   * updated to be `0`.
   *
   * @defaultValue `false`
   */
  focusable?: boolean;
}

/**
 * Get a `className` string for screen-reader only text based on different
 * styling options.
 *
 * @param options - Any styling options to apply additional class names.
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function srOnlyClassName(
  options: SrOnlyClassNameOptions,
  ...others: readonly Argument[]
): string {
  const { focusable = false } = options;
  return cn(srOnlyStyles({ focusable }), ...others);
}
