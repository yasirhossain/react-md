import type {
  ElementType,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import { forwardRef } from "react";
import type { ClassNameCloneableChild } from "@react-md/utils";

import type { TypographyClassNameOptions, TypographyType } from "./styles";
import { typographyClassName } from "./styles";

/**
 * A union of the default supported elements that the `Typography` component can
 * be rendered as. This is mostly used for adding the correct `HTMLAttributes`
 * and enabling the forward ref.
 *
 * @remarks \@since 4.0.0
 */
export type TypographyHTMLElement =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLDivElement
  | HTMLButtonElement
  | HTMLAnchorElement
  | HTMLBodyElement
  | HTMLHtmlElement;

/** @remarks \@since 4.0.0 */
export type TypographyRenderFunction = (props: {
  className: string;
}) => ReactElement;

/**
 * @remarks \@since REPLACE_VERSION Extends the {@link TypographyClassNameOptions}
 * interface and added missing default value annotations.
 */
export interface TypographyProps
  extends Omit<HTMLAttributes<TypographyHTMLElement>, "color">,
    TypographyClassNameOptions {
  /**
   * An optional className to merge into typography styles.
   */
  className?: string;

  /**
   * The component to render as when the children are not a render function. If
   * this prop is omitted, the component will be determined by the `type` prop
   * where:
   *
   * - `"headline-1" -> <h1>`
   * - `"headline-2" -> <h2>`
   * - `"headline-3" -> <h3>`
   * - `"headline-4" -> <h4>`
   * - `"headline-5" -> <h5>`
   * - `"headline-6" -> <h6>`
   * - `"subtitle-1" -> <h5>`
   * - `"subtitle-2" -> <h6>`
   * - `"body-1"     -> <p>`
   * - `"body-2"     -> <p>`
   * - `"caption"    -> <caption>`
   * - `"overline"   -> <span>`
   * - `"button"     -> <button>`
   *
   * @defaultValue `null`
   */
  component?: ElementType | null;

  /**
   * Either a child render function or a react node. If this is not the child
   * render function, a different wrapper component can be provided using the
   * `component` prop.
   */
  children?: ReactNode | ClassNameCloneableChild | TypographyRenderFunction;
}

function getComponent(
  component: ElementType | null,
  type: TypographyType
): ElementType {
  if (component) {
    return component;
  }

  switch (type) {
    case "headline-1":
      return "h1";
    case "headline-2":
      return "h2";
    case "headline-3":
      return "h3";
    case "headline-4":
      return "h4";
    case "headline-5":
      return "h5";
    case "headline-6":
    case "subtitle-1":
    case "subtitle-2":
      return "h6";
    case "body-1":
    case "body-2":
      return "p";
    case "caption":
      return "caption";
    case "button":
      return "button";
    default:
      return "span";
  }
}

/**
 * The `Typography` component is used to render text with the material design
 * typography styles applied.  By default, everything will be rendered in a
 * `<p>` tag with the normal paragraph styles.
 *
 * When the `type` prop is changed to another typography style, this component
 * will determine the "best" element to render the text in *unless* the
 * `component` prop is provided. The default mapping is:
 *
 * - `"headline-1" -> <h1>`
 * - `"headline-2" -> <h2>`
 * - `"headline-3" -> <h3>`
 * - `"headline-4" -> <h4>`
 * - `"headline-5" -> <h5>`
 * - `"headline-6" -> <h6>`
 * - `"subtitle-1" -> <h5>`
 * - `"subtitle-2" -> <h6>`
 * - `"body-1"     -> <p>`
 * - `"body-2"     -> <p>`
 * - `"caption"    -> <caption>`
 * - `"overline"   -> <span>`
 * - `"button"     -> <button>`
 *
 * NOTE: if the `component` prop is not `null`, this logic will be ignored and
 * the provided `component` will be used instead.
 *
 * @example
 * Simple Example
 * ```tsx
 * import type { ReactElement } from "react";
 * import { Typography } from "@react-md/typography";
 *
 * function Example(): ReactElement {
 *   return (
 *     <>
 *       <Typography type="headline-1">Headline 1</Typography>
 *       <Typography type="headline-2">Headline 2</Typography>
 *       <Typography type="headline-3">Headline 3</Typography>
 *       <Typography type="headline-4">Headline 4</Typography>
 *       <Typography type="headline-5">Headline 5</Typography>
 *       <Typography type="headline-6">Headline 6</Typography>
 *       <Typography type="subtitle-1">Subtitle 1</Typography>
 *       <Typography type="subtitle-2">Subtitle 2</Typography>
 *       <Typography type="body-1">Body 1</Typography>
 *       <Typography type="body-2">Body 2</Typography>
 *       <Typography type="caption" component="h5">
 *         Caption text
 *       </Typography>
 *       <Typography type="overline" component="h5">
 *         Overline text
 *       </Typography>
 *       <Typography type="button" component="h5">
 *         Button text
 *       </Typography>
 *     </>
 *   );
 * }
 * ```
 *
 * @remarks \@since REPLACE_VERSION Added an example to the documentation.
 */
export const Typography = forwardRef<TypographyHTMLElement, TypographyProps>(
  function Typography(
    {
      className: propClassName,
      children,
      component = null,
      align,
      color,
      decoration,
      fontStyle,
      margin,
      transform,
      type = "body-1",
      weight,
      ...props
    },
    ref
  ) {
    const className = typographyClassName(
      {
        align,
        color,
        decoration,
        fontStyle,
        margin,
        transform,
        type,
        weight,
      },
      propClassName
    );
    if (typeof children === "function") {
      return (children as TypographyRenderFunction)({ className });
    }

    const Component = getComponent(component, type);
    return (
      <Component {...props} ref={ref} className={className}>
        {children}
      </Component>
    );
  }
);
