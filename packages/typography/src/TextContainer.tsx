import type {
  ElementType,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import { Children, cloneElement, forwardRef, isValidElement } from "react";
import cn from "classnames";
import type { ClassNameCloneableChild } from "@react-md/utils";

import type { TextContainerClassNameOptions } from "./styles";
import { textContainerClassName } from "./styles";

/**
 * A type describing the text container's children render function. It provides
 * an object containing the correct (and merged) className and exects a
 * renderable element to be returned.
 */
export type TextContainerRenderFunction = (props: {
  className: string;
}) => ReactElement;

/**
 * The base props for rendering the text component.
 *
 * @remarks \@since REPLACE_VERSION Extends the {@link TextContainerClassNameOptions}
 * interface and added missing default value annotations.
 */
export interface TextContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    TextContainerClassNameOptions {
  /**
   * An optional className to merge with typography text container styles.
   */
  className?: string;

  /**
   * The component to render as. By default this will just be a div, but
   * anything can be provided.
   *
   * @defaultValue `"div"`
   */
  component?: ElementType;

  /**
   * Either a child render function or a react node. If this is not the child
   * render function, a different wrapper component can be provided using the
   * `component` prop.
   */
  children?: ReactNode | ClassNameCloneableChild | TextContainerRenderFunction;

  /**
   * Boolean if the `className` should be cloned into the `children` for this
   * component.
   *
   * Note: This will only work if the child component passed the `className`
   * down to to the DOM element.
   *
   * @defaultValue `false`
   */
  clone?: boolean;
}

/**
 * The `TextContainer` component should be used as a container for text within a
 * page to optimize legibility of content by applying a `max-width` based on
 * screen size.
 *
 * @example
 * Simple Example
 * ```tsx
 * import type { ReactElement } from "react";
 * import { TextContainer, Typography } from "@react-md/typography";
 *
 * function Example(): ReactElement {
 *   return (
 *     <TextContainer>
 *       <Typography type="headline-2">Some Article Header</Typography>
 *       <Typography>
 *         Pretend multiple paragraphs of text.
 *       </Typography>
 *     </TextContainer>
 *   );
 * }
 * ```
 *
 * @remarks \@since 5.0.0 Added documentation.
 */
export const TextContainer = forwardRef<
  HTMLDivElement | ElementType,
  TextContainerProps
>(function TextContainer(
  {
    className: propClassName,
    component: Component = "div",
    size,
    children,
    clone,
    ...props
  },
  ref
) {
  const className = textContainerClassName({ size }, propClassName);
  if (clone && isValidElement(children)) {
    const child = Children.only(children);
    return cloneElement(child, {
      className: cn(child.props.className, className),
    });
  }

  if (typeof children === "function") {
    return (children as TextContainerRenderFunction)({ className });
  }

  return (
    <Component {...props} className={className} ref={ref}>
      {children}
    </Component>
  );
});
