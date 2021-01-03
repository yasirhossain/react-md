import { ensureDir } from "fs-extra";
import { clean } from "./clean";

/**
 * Cleans the provided folder(s) and then re-creates them.
 */
export async function cleanEnsureDir(
  pathOrPaths: string | readonly string[]
): Promise<void> {
  const paths = typeof pathOrPaths === "string" ? [pathOrPaths] : pathOrPaths;

  await clean(paths);
  await Promise.all(paths.map((path) => ensureDir(path)));
}
