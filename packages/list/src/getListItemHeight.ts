import type { ListItemHeight, SimpleListItemProps } from "./types";

/**
 * Gets the expected height for the `ListItem` or `SimpleListItem` based on the
 * addons and `secondaryText` props.
 *
 * Conversions:
 *
 * - height !== "auto" -&gt; height
 * - secondaryText or left/right addon is media/media-large  -&gt; "extra-large"
 * - left/right addon is avatar -&gt; "large"
 * - left/right addon is icon -&gt; "medium"
 * - no addons and no secondary text -&gt; "normal"
 *
 * @internal
 */
export function getListItemHeight({
  height = "auto",
  leftAddon,
  leftAddonType = "icon",
  rightAddon,
  rightAddonType = "icon",
  secondaryText,
}: SimpleListItemProps): ListItemHeight {
  if (height !== "auto") {
    return height;
  }

  const isIcon =
    (leftAddon && leftAddonType === "icon") ||
    (rightAddon && rightAddonType === "icon");
  const isAvatar =
    (leftAddon && leftAddonType === "avatar") ||
    (rightAddon && rightAddonType === "avatar");
  const isGraphic =
    (leftAddon &&
      (leftAddonType === "media" || leftAddonType === "large-media")) ||
    (rightAddon &&
      (rightAddonType === "media" || rightAddonType === "large-media"));

  // secondary text will always be extra large due to the default `line-height`
  if (isGraphic || secondaryText) {
    return "extra-large";
  }

  if (isAvatar) {
    return "large";
  }

  if (isIcon) {
    return "medium";
  }

  return "normal";
}
