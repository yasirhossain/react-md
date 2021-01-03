import { ensureDir, readFile, writeFile } from "fs-extra";
import { cloneDeep, flatMap } from "lodash";
import log from "loglevel";
import { join } from "path";

import { COPY_BANNER } from "../constants";
import { format } from "../utils";
import { RMD_ICON_SRC } from "./constants";
import { IconMetadata } from "./svgs";
import { IconType } from "./utils";

const END_SVG = "</svg>";
const ICON_TYPES: readonly IconType[] = [
  "filled",
  "outlined",
  "rounded",
  "sharp",
  "twotone",
];

interface Options {
  category: string;
  iconType: IconType;
  componentName: string;
}

interface CreateOptions extends Options {
  isSvg: boolean;
  children: string;
}

/**
 * Creates the icon component file for either a `FontIcon` or `SVGIcon` and
 * returns the full component name once copied.
 *
 * @return The full component name with either the `SVGIcon` or `FontIcon` suffix
 */
async function create({
  category,
  iconType,
  componentName,
  isSvg,
  children,
}: CreateOptions): Promise<string> {
  const folder = join(RMD_ICON_SRC, category, iconType);
  await ensureDir(folder);

  const Icon = isSvg ? "SVGIcon" : "FontIcon";
  const IconProps = `${Icon}Props`;
  const Component = `${componentName}${Icon}`;
  const HTMLElement = isSvg ? "SVGSVGElement" : "HTMLElement";

  const contents = format(
    `${COPY_BANNER}
import React, { forwardRef } from "react";
import { ${Icon}, ${IconProps} } from "@react-md/icon";

export const ${Component} = forwardRef<${HTMLElement}, ${IconProps}>(
  function ${Component}(props, ref) {
    return <${Icon} {...props} ref={ref}>${children}</${Icon}>;
  }
);
`,
    "typescript"
  );

  await writeFile(join(folder, `${Component}.tsx`), contents);
  return Component;
}

interface FontIconOptions extends Options {
  snakeCaseName: string;
}

/**
 * Creates the FontIcon component for the current icon.
 */
async function createFontIcon({
  snakeCaseName,
  ...options
}: FontIconOptions): Promise<string> {
  return create({
    ...options,
    isSvg: false,
    children: snakeCaseName,
  });
}

interface SvgIconOptions extends Options {
  sourceFilePath: string;
}

/**
 * Creates the SVGIcon component for the current icon.
 */
async function createSvgIcon({
  sourceFilePath,
  ...options
}: SvgIconOptions): Promise<string> {
  const buffer = await readFile(sourceFilePath);
  const contents = buffer.toString();

  // this is a bit hacky and I should look into a better way of doing this at
  // some point... since this is rendered in the `SVGIcon` component, want to
  // remove the `<svg (...attributes)>` and `</svg>` so that it only includes
  // the `<path>`, `<circle>`, or other children
  const startIndex = contents.indexOf(">") + 1;
  const endIndex = contents.length - END_SVG.length;

  return create({
    ...options,
    isSvg: true,
    children: contents.substring(startIndex, endIndex),
  });
}

type Components = Record<IconType, string[]>;
type IconCollection = Record<string, Components>;

const EMPTY_COMPONENTS: Components = {
  filled: [],
  outlined: [],
  rounded: [],
  twotone: [],
  sharp: [],
};

/**
 * This should be called after the svgs have been copied into the "dist"
 * directory and all the icon metadata has been resolved. This creates both the
 * `FontIcon` and `SVGIcon` component files for each of the found icon svg.
 *
 * Once complete, it will return a collection of all the components grouped by
 * category and then grouped by the material icon type.
 */
export async function createIconComponents(
  metadata: IconMetadata
): Promise<IconCollection> {
  log.info("Creating the FontIcon and SVGIcon components...");

  // need to create a "collection" of the different categorie so that all the
  // `index.ts` files can be generated to do `export * from "./folder"`
  const collection = metadata.reduce<IconCollection>(
    (collection, { category }) => {
      if (!collection[category]) {
        collection[category] = cloneDeep(EMPTY_COMPONENTS);
      }

      return collection;
    },
    {}
  );

  await Promise.all(
    flatMap(metadata, async (meta) => {
      const components = await Promise.all([
        createFontIcon(meta),
        createSvgIcon(meta),
      ]);

      const { category, iconType } = meta;
      collection[category][iconType].push(...components);
    })
  );

  return collection;
}

async function createIndexFile(
  folder: string,
  exports: readonly string[]
): Promise<void> {
  const sorted = exports.slice().sort();
  const contents = format(`${COPY_BANNER}
${sorted.map((name) => `export * from "./${name}"`).join("\n")}
`);

  const fileName = join(folder, "index.ts");
  return writeFile(fileName, contents);
}

/**
 * Creates all the `index.ts` files based on the generated icon component files
 * so that all the icons can be imported without needing to specify a folder and
 * can just be:
 *
 * ```ts
 * import { Rotation3DFilledSVGIcon } from "@react-md/material-icons";
 * ```
 */
export async function createIndexFiles(
  collection: IconCollection
): Promise<void> {
  log.info("Creating the index files...");
  await Promise.all(
    Object.entries(collection).map(async ([category, iconTypeComponents]) => {
      const iconTypes: IconType[] = [];
      const categoryFolder = join(RMD_ICON_SRC, category);

      await Promise.all(
        ICON_TYPES.map((iconType) => {
          const components = iconTypeComponents[iconType];
          if (!components.length) {
            return;
          }

          iconTypes.push(iconType);
          return createIndexFile(join(categoryFolder, iconType), components);
        })
      );

      return createIndexFile(categoryFolder, iconTypes);
    })
  );

  return createIndexFile(RMD_ICON_SRC, Object.keys(collection));
}
