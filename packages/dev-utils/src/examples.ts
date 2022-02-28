import { readFile, writeFile } from "fs-extra";
import { join, sep } from "path";
import { COPY_BANNER, documentationRoot, src } from "./constants";
import { format, glob } from "./utils";

const TITLE_REGEXP = /title: "(.+)"/g;

export async function examples(): Promise<void> {
  const cwd = join(documentationRoot, src, "examples");
  const files = await glob("*/examples.ts", { cwd });

  const lookup: Record<string, string[]> = {};

  await Promise.all(
    files.map(async (filename) => {
      const component = filename.substring(0, filename.indexOf(sep));
      const contents = await readFile(join(cwd, filename), "utf8");
      const examples = (contents.match(TITLE_REGEXP) || []).map((line) =>
        line.substring(line.indexOf('"') + 1, line.length - 1)
      );

      lookup[component] = examples;
    })
  );

  const components = Object.keys(lookup).sort();

  const contents = `${COPY_BANNER}
import { ComponentType } from "react";
import dynamic from "next/dynamic";

export type ExampleLookup = Record<string, Record<string, ComponentType>>;

export const examples: ExampleLookup = {
  ${components.map(
    (component) => `"${component}": {
  ${lookup[component].map(
    (name) =>
      `"${name}": dynamic(() => import("../examples/${component}/${name.replace(
        /\s+/g,
        ""
      )}"))`
  )}
}`
  )}
}
`;

  const formatted = format(contents, "typescript");

  const constants = join(documentationRoot, src, "constants", "examples.ts");
  await writeFile(constants, formatted);
}
