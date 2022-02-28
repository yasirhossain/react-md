import type { ReactElement, ReactNode } from "react";
import type { TextIconSpacingProps } from "@react-md/icon";
import { TextIconSpacing } from "@react-md/icon";

import { listItemAddonClassName } from "./styles";
import type { ListItemAddonClassNameOptions } from "./types";

/**
 * @remarks \@since REPLACE_VERSION Extends the {@link ListItemAddonClassNameOptions}
 * interface and added missing default value annotations.
 */
export interface ListItemAddonProps
  extends Omit<TextIconSpacingProps, "icon" | "iconAfter" | "forceIconWrap">,
    ListItemAddonClassNameOptions {
  /**
   * The addon that should be rendered.
   */
  addon: ReactNode | ReactElement;

  /**
   * Boolean if the addon should be forced into a `<span>` with the class names
   * applied instead of attempting to clone into the provided icon. If the
   * `type` is set to `"media"` or `"large-media"`, this will default to `true`.
   *
   * @defaultValue `type === "media" || type === "large-media"`
   */
  forceAddonWrap?: boolean;
}

/**
 * The `ListItemAddon` is used to create an addon to the left or right of the
 * text/children of a `ListItem`.
 */
export function ListItemAddon({
  className,
  children,
  addon,
  addonAfter = false,
  type = "icon",
  position = "middle",
  forceAddonWrap = type === "media" || type === "large-media",
  ...props
}: ListItemAddonProps): ReactElement {
  return (
    <TextIconSpacing
      {...props}
      icon={addon}
      forceIconWrap={forceAddonWrap}
      className={listItemAddonClassName(
        {
          type,
          position,
          addonAfter,
        },
        className
      )}
      iconAfter={addonAfter}
    >
      {children}
    </TextIconSpacing>
  );
}
