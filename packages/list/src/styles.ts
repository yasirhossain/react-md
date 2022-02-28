import type { Argument } from "classnames";
import cn from "classnames";
import { bem } from "@react-md/utils";

import type {
  ListClassNameOptions,
  ListItemAddonClassNameOptions,
  ListItemClassNameOptions,
  ListItemTextClassNameOptions,
  ListSubheaderClassNameOptions,
} from "./types";

const listStyles = bem("rmd-list");
const listItemStyles = bem("rmd-list-item");
const subheaderStyles = bem("rmd-list-subheader");

/**
 * Get a list `className` string based on different styling options.
 *
 * @param options - Any styling options to apply additional class names.
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function listClassName(
  options: ListClassNameOptions,
  ...others: readonly Argument[]
): string {
  const { dense = false, horizontal = false } = options;
  return cn(listStyles({ dense, horizontal }), ...others);
}

/**
 * Get a list item `className` string based on different styling options.
 *
 * @param options - Any styling options to apply additional class names.
 * @param args - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function listItemClassName(
  options: ListItemClassNameOptions & {
    /**
     * @defaultValue `false`
     */
    link?: boolean;
  },
  ...args: readonly Argument[]
): string {
  const {
    link = false,
    height = "auto",
    threeLines = false,
    clickable = false,
    disabled = false,
    disabledOpacity = false,
  } = options;
  return cn(
    listItemStyles({
      link,
      [height]: height !== "auto" && height !== "normal",
      "three-lines": threeLines,
      clickable,
      disabled,
      "disabled-color": disabled && !disabledOpacity,
      "disabled-opacity": disabled && disabledOpacity,
    }),
    ...args
  );
}

/**
 * Get a list item text `className` string based on different styling options.
 *
 * @param options - Any styling options to apply additional class names.
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function listItemTextClassName(
  options: ListItemTextClassNameOptions,
  ...others: readonly Argument[]
): string {
  const { secondary = false } = options;
  return cn(listItemStyles("text", { secondary }), ...others);
}

/**
 * Get a list item addon `className` string based on different styling options.
 *
 * @param options - Any styling options to apply additional class names.
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function listItemAddonClassName(
  options: ListItemAddonClassNameOptions,
  ...others: readonly Argument[]
): string {
  const { type = "icon", position = "middle", addonAfter = false } = options;
  const isMedia = type === "media" || type === "large-media";
  const isAvatar = type === "avatar";

  return cn(
    listItemStyles("addon", {
      [position]: position !== "middle",
      before: !addonAfter,
      "avatar-before": !addonAfter && isAvatar,
      media: isMedia,
      "media-large": type === "large-media",
    }),
    ...others
  );
}

/**
 * Get a list subheader `className` string based on different styling options.
 *
 * @param options - Any styling options to apply additional class names.
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function listSubheaderClassName(
  options: ListSubheaderClassNameOptions,
  ...others: readonly Argument[]
): string {
  const { inset = false } = options;

  return cn(subheaderStyles({ inset }), ...others);
}
