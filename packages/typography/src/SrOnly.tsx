import { forwardRef } from "react";

import type { SrOnlyClassNameOptions } from "./styles";
import { srOnlyClassName } from "./styles";
import type { TypographyHTMLElement, TypographyProps } from "./Typography";
import { Typography } from "./Typography";

/**
 * @remarks \@since REPLACE_VERSION Extends the {@link SrOnlyClassNameOptions} interface
 * and added missing default value annotations.
 */
export interface SrOnlyProps extends TypographyProps, SrOnlyClassNameOptions {
  /**
   * @defaultValue `"span"`
   * @see {@link TypographyProps.component}
   */
  component?: TypographyProps["component"];
}

/**
 * This component is used to create text that is only visible to screen readers.
 * If you enable the `focusable` prop, the text will become visible to all users
 * while focused.
 *
 * @example
 * Simple Example
 * ```tsx
 * import type { ReactElement } from "react";
 * import { SrOnly } from "@react-md/typography";
 *
 * function Example(): ReactElement {
 *   return (
 *     <label>
 *       <SrOnly>Upload</SrOnly>
 *       <UploadSVGIcon />
 *       <input type="file" />
 *     </label>
 *   );
 * }
 * ```
 *
 * @remarks \@since REPLACE_VERSION Added an example to the documentation.
 */
export const SrOnly = forwardRef<TypographyHTMLElement, SrOnlyProps>(
  function SrOnly(
    {
      className,
      children,
      focusable = false,
      tabIndex: propTabIndex,
      component = "span",
      ...props
    },
    ref
  ) {
    let tabIndex = propTabIndex;
    if (focusable && typeof tabIndex === "undefined") {
      tabIndex = 0;
    }

    return (
      <Typography
        {...props}
        ref={ref}
        tabIndex={tabIndex}
        component={component}
        className={srOnlyClassName({ focusable }, className)}
      >
        {children}
      </Typography>
    );
  }
);
