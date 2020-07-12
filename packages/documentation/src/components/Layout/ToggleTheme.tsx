import React, { FC, useState } from "react";
import cn from "classnames";
import { AppBarAction } from "@react-md/app-bar";
import {
  BrightnessLowSVGIcon,
  BrightnessAutoSVGIcon,
  BrightnessHighSVGIcon,
  InvertColorsSVGIcon,
} from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";
import {
  useIsUserInteractionMode,
  useToggle,
  BELOW_INNER_RIGHT_ANCHOR,
} from "@react-md/utils";

import useTheme from "components/Theme/useTheme";
import useThemeActions from "components/Theme/useThemeActions";
import LightbulbSVGIcon from "icons/LightbulbSVGIcon";

import styles from "./ToggleTheme.module.scss";
import { DropdownMenu, MenuItem } from "@react-md/menu";
import { Switch } from "@react-md/form";

const ToggleTheme: FC = () => {
  const [prevTheme, setPrevTheme] = useState<"light" | "dark">("light");
  const { theme } = useTheme();
  const { setTheme } = useThemeActions();

  /* let icon = <LightbulbOutlineSVGIcon />; */
  /* if (toggled !== isLight) { */
  /*   icon = <LightbulbSVGIcon />; */
  /* } */

  return (
    <Tooltipped id="theme-toggle" tooltip="Toggle Light/Dark Theme">
      <DropdownMenu
        id="theme-toggle"
        aria-label="Theme Configuration"
        anchor={BELOW_INNER_RIGHT_ANCHOR}
        buttonType="icon"
        className="rmd-app-bar__action rmd-app-bar__action--inherit"
        disableDropdownIcon
        items={[
          <MenuItem
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <Switch
              id="sync-with-os"
              iconAfter
              checked={theme === "os"}
              label="Sync with OS"
              onClick={(event) => {
                event.stopPropagation();
              }}
              onChange={(event) => {
                setTheme(event.currentTarget.checked ? "os" : prevTheme);
              }}
            />
          </MenuItem>,
          <MenuItem
            id="use-light-theme"
            disabled={theme === "os"}
            onClick={() => setTheme("light")}
            rightAddon={<BrightnessLowSVGIcon />}
          >
            Light Theme
          </MenuItem>,
          <MenuItem
            id="use-dark-theme"
            disabled={theme === "os"}
            onClick={() => setTheme("dark")}
            rightAddon={<BrightnessHighSVGIcon />}
          >
            Dark Theme
          </MenuItem>,
        ]}
      >
        <InvertColorsSVGIcon />
      </DropdownMenu>
    </Tooltipped>
  );
};

export default ToggleTheme;
