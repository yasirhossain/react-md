import { opendir } from "node:fs/promises";
import { join } from "node:path";

import { projectRoot } from "../constants.js";

let PACKAGES: readonly string[];

export async function getPackages(): Promise<readonly string[]> {
  if (!PACKAGES) {
    const directory = await opendir(join(projectRoot, "packages"));
    const packages: string[] = [];
    for await (const { name } of directory) {
      if (name !== "documentation") {
        packages.push(name);
      }
    }

    packages.sort();
    PACKAGES = packages;
  }

  return PACKAGES;
}
