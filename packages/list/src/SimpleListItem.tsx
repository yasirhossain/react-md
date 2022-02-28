/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/role-supports-aria-props */
import { forwardRef } from "react";

import { getListItemHeight } from "./getListItemHeight";
import { ListItemChildren } from "./ListItemChildren";
import { listItemClassName } from "./styles";
import type { SimpleListItemProps } from "./types";

/**
 * The `SimpleListItem` component is used to create a non-clickable item within
 * a `List`. This is really just useful since it allows for the `ListItem`
 * styling behavior of left and right icons, avatars, and media.
 *
 * Note: Even though this component exists, it is recommended to use the
 * `ListItemChildren` component instead if you want the "addon" styling/behavior
 * since screen readers read `li` items within lists differently.
 */
export const SimpleListItem = forwardRef<HTMLLIElement, SimpleListItemProps>(
  function SimpleListItem(
    {
      className,
      textClassName,
      secondaryTextClassName,
      textChildren,
      primaryText,
      secondaryText,
      leftAddon,
      leftAddonType = "icon",
      leftAddonPosition = "middle",
      rightAddon,
      rightAddonType = "icon",
      rightAddonPosition = "middle",
      forceAddonWrap,
      children,
      height: propHeight = "auto",
      threeLines = false,
      clickable = false,
      onClick,
      disabled = false,
      disabledOpacity = false,
      ...props
    },
    ref
  ) {
    const height = getListItemHeight({
      height: propHeight,
      leftAddon,
      leftAddonType,
      rightAddon,
      rightAddonType,
      secondaryText,
    });
    const { "aria-disabled": ariaDisabled } = props;
    const isDisabled =
      disabled || ariaDisabled === "true" || ariaDisabled === true;

    return (
      <li
        {...props}
        aria-disabled={isDisabled || undefined}
        ref={ref}
        className={listItemClassName(
          {
            height,
            threeLines,
            clickable,
            disabled: isDisabled,
            disabledOpacity,
          },
          className
        )}
        onClick={isDisabled ? undefined : onClick}
      >
        <ListItemChildren
          textClassName={textClassName}
          secondaryTextClassName={secondaryTextClassName}
          textChildren={textChildren}
          primaryText={primaryText}
          secondaryText={secondaryText}
          leftAddon={leftAddon}
          leftAddonType={leftAddonType}
          leftAddonPosition={leftAddonPosition}
          rightAddon={rightAddon}
          rightAddonType={rightAddonType}
          rightAddonPosition={rightAddonPosition}
          forceAddonWrap={forceAddonWrap}
        >
          {children}
        </ListItemChildren>
      </li>
    );
  }
);
