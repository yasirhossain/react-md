import type { HTMLAttributes, ReactNode } from "react";

/**
 * The height to apply to the list item.
 *
 * Conversions:
 *
 * - height !== "auto" -&gt; height
 * - secondaryText or left/right addon is media/media-large  -&gt; "extra-large"
 * - left/right addon is avatar -&gt; "large"
 * - left/right addon is icon -&gt; "medium"
 * - no addons and no secondary text -&gt; "normal"
 *
 * @remarks \@since REPLACE_VERSION Moved documentation to this type.
 * @defaultValue `"auto"`
 */
export type ListItemHeight =
  | "auto"
  | "normal"
  | "medium"
  | "large"
  | "extra-large";

/**
 * The addon type that is used to adjust the spacing styles.
 *
 * @remarks \@since REPLACE_VERSION Added documentation.
 */
export type ListItemAddonType = "icon" | "avatar" | "media" | "large-media";

/**
 * The vertical position for an addon.
 *
 * @remarks \@since REPLACE_VERSION Added documentation.
 */
export type ListItemAddonPosition = "top" | "middle" | "bottom";

/** @remarks \@since REPLACE_VERSION */
export interface ListClassNameOptions {
  /**
   * Boolean if the dense spec should be applied to the list.
   *
   * @defaultValue `false`
   */
  dense?: boolean;

  /**
   * Boolean if the list should appear horizontally instead of vertically.
   *
   * @defaultValue `false`
   */
  horizontal?: boolean;
}

/** @remarks \@since REPLACE_VERSION */
export interface ListItemTextClassNameOptions {
  /**
   * Boolean if this is secondary text content which will decrease the font size
   * and make the text less prominent.
   *
   * @defaultValue `false`
   */
  secondary?: boolean;
}

/** @remarks \@since REPLACE_VERSION */
export interface ListItemAddonClassNameOptions {
  /**
   * @see {@link ListItemAddonType}
   * @defaultValue `"icon"`
   */
  type?: ListItemAddonType;

  /**
   * @see {@link ListItemAddonPosition}
   * @defaultValue `"middle"`
   */
  position?: ListItemAddonPosition;

  /**
   * Boolean if the addon should appear after the `children`.
   *
   * @defaultValue `false`
   */
  addonAfter?: boolean;
}

/** @remarks \@since REPLACE_VERSION */
export interface ListSubheaderClassNameOptions {
  /**
   * Boolean if the subheader should be inset to match the `ListItem` text
   * keyline.
   *
   * @defaultValue `false`
   */
  inset?: boolean;
}

/** @remarks \@since REPLACE_VERSION */
export interface ListItemClassNameOptions {
  /**
   * @see {@link ListItemHeight}
   * @defaultValue `"auto"`
   */
  height?: ListItemHeight;

  /**
   * This prop shouldn't really be used other than a pass-down value from the
   * ListItem component.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * Boolean if the list item should apply an opacity value while disabled
   * instead of overriding the primary and secondary text colors. Enabling this
   * will allow for the list item addons to also be dimmed.
   *
   * This is configured by the `$rmd-list-item-disabled-opacity` variable.
   *
   * Note: This does nothing if the `disabled` prop is not enabled.
   *
   * @defaultValue `false`
   * @remarks \@since 2.4.3
   */
  disabledOpacity?: boolean;

  /**
   * Boolean if the list item should be updated to use the clickable styles to
   * the item. This is really just a pass-down value for the main `ListItem`
   * component and shouldn't really be used unless you are implementing your own
   * clickable `ListItem` component.
   *
   * @defaultValue `false`
   */
  clickable?: boolean;

  /**
   * Boolean if the list item should be considered "three-lines" in height. This
   * will update the `secondaryText` to span 2 lines instead of one, but it will
   * not correctly applied the trailing ellipsis overflow due to browser
   * compatibility of `line-clamp`. If you would still like the ellipsis to
   * show, it is recommended to use javascript to add them yourself.
   *
   * @defaultValue `false`
   */
  threeLines?: boolean;
}

/**
 * @remarks \@since REPLACE_VERSION Added missing default value annotations.
 */
export interface ListItemChildrenProps {
  /**
   * The main content to display. When the `textChildren` prop is enabled and
   * there is child content, it will be treated as primary text and update the
   * styles automatically.
   */
  children?: ReactNode;

  /**
   * An optional className to apply to the `<span>` that surrounds the
   * `primaryText` and optionally `secondaryText` within the list item.
   */
  textClassName?: string;

  /**
   * An optional className to apply to the `<span>` that surrounds the
   * `secondaryText` within the list item.
   */
  secondaryTextClassName?: string;

  /**
   * Boolean if the children should be treated as the `primaryText` prop. This
   * will wrap them in an additional class so that they have ellipsis for text
   * overflow.
   *
   * If you want to have more "freedom" within the `ListItem`, you can disable
   * this prop so that the height will grow depending on content.
   *
   * NOTE: If the `secondaryText` prop is provided, this will always be
   * considered `true`.
   *
   * NOTE: This will default to `true` for the `ListItem` component.
   *
   * @defaultValue `false`
   */
  textChildren?: boolean;

  /**
   * An optional element that should be rendered as the `primaryText` within the
   * list item. It is most likely easier to use the `children` prop instead, but
   * this allows you to create more complex components with the `ListItem` since
   * you can provided `children` and have the styles for the `primaryText` still
   * applied. By default, this will only allow one line of text and add ellipsis
   * for any text overflow.
   */
  primaryText?: ReactNode;

  /**
   * An optional element that should be rendered as the `secondaryText` within
   * the list item. By default, this will only span one line and add ellipsis
   * for overflow.
   */
  secondaryText?: ReactNode;

  /**
   * An optional addon to display to the left of the `primaryText` or
   * `children` and should be used with the `leftAddonType` prop to adjust
   * spacing.
   */
  leftAddon?: ReactNode;

  /**
   * The type of the addon that appears to the left of the `primaryText` or
   * `children`.
   *
   * @defaultValue `"icon"`
   */
  leftAddonType?: ListItemAddonType;

  /**
   * The vertical position the left icon, avatar, media, or large media
   * should be placed.
   *
   * @defaultValue `"middle"`
   */
  leftAddonPosition?: ListItemAddonPosition;

  /**
   * An optional addon to display to the right of the `primaryText` or
   * `children` and should be used with the `rightAddonType` prop to adjust
   * spacing.
   */
  rightAddon?: ReactNode;

  /**
   * The type of the addon that appears to the right of the `primaryText` or
   * `children`.
   *
   * @defaultValue `"icon"`
   */
  rightAddonType?: ListItemAddonType;

  /**
   * The vertical position the right icon, avatar, media, or large media
   * should be placed.
   *
   * @defaultValue `"middle"`
   */
  rightAddonPosition?: ListItemAddonPosition;

  /**
   * Boolean if the left and/or right addons should be "forcefully" wrapped in a
   * `<span>` with the spacing class names applied instead of attempting to
   * clone it into the provided icon element.
   */
  forceAddonWrap?: boolean;
}

/**
 * @remarks \@since REPLACE_VERSION Extends the {@link ListItemClassNameOptions} interface
 * and added missing default value annotations.
 */
export interface SimpleListItemProps
  extends ListItemChildrenProps,
    ListItemClassNameOptions,
    HTMLAttributes<HTMLLIElement> {}
