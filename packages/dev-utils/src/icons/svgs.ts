import { copy, ensureDir } from "fs-extra";
import log from "loglevel";
import { join } from "path";
import { projectRoot } from "../constants";
import { cleanEnsureDir, glob } from "../utils";

import { RMD_ICON_DIST, TEMP_MATERIAL_ICONS } from "./constants";
import { getComponentName, getIconName, getIconType, IconType } from "./utils";

interface SvgFileOptions {
  category: string;
  iconType: IconType;
  snakeCaseName: string;
  sourceFilePath: string;
}

async function copySvg({
  category,
  iconType,
  snakeCaseName,
  sourceFilePath,
}: SvgFileOptions): Promise<void> {
  const destFolder = join(RMD_ICON_DIST, category, iconType);
  const destFilePath = join(destFolder, `${snakeCaseName}.svg`);

  await ensureDir(destFolder);
  return copy(sourceFilePath, destFilePath);
}

export interface IconMetadatum extends SvgFileOptions {
  componentName: string;
}

export type IconMetadata = IconMetadatum[];

/**
 * Finds all the `*.svg` files in the temp material icons folder, copies them
 * into the "dist" folder (`/svgs`), and returns a list of all the required icon
 * metadata so that the components can be generated afterwards.
 *
 * Note: This will fail if the archive has not been downloaded and extracted to
 * the project root dir.
 */
export async function copySvgsAndGetIconMetadata(): Promise<IconMetadata> {
  const cwd = `${TEMP_MATERIAL_ICONS}/src`;
  const svgs = await glob("**/24px.svg", { cwd });
  log.info(
    `Copying ${svgs.length} svgs to the material-icons dist directory...`
  );

  await cleanEnsureDir(RMD_ICON_DIST);
  const icons = await Promise.all(
    svgs.map<Promise<IconMetadatum>>(async (iconPath) => {
      const sourceFilePath = join(projectRoot, cwd, iconPath);

      // the current structure of the material-icons repo is:
      // src/
      //   [category]/
      //     [snake_case_name]/
      //       materialicons[type?]/
      //         24px.svg
      const [category, snakeCaseName, materialIconType] = iconPath.split("/");
      const iconType = getIconType(materialIconType);
      const iconName = getIconName(snakeCaseName);
      const componentName = getComponentName(iconName, iconType);

      await copySvg({
        category,
        iconType,
        snakeCaseName,
        sourceFilePath,
      });

      return {
        category,
        iconType,
        componentName,
        snakeCaseName,
        sourceFilePath,
      };
    })
  );

  log.info("");
  return icons;
}
