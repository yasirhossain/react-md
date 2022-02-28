import fs from "node:fs/promises";

export async function clean(
  pathOrPaths: readonly string[] | string
): Promise<void> {
  const paths = typeof pathOrPaths === "string" ? [pathOrPaths] : pathOrPaths;
  await Promise.all(
    paths.map((path) =>
      fs.rm(path, {
        recursive: true,
      })
    )
  );
}
