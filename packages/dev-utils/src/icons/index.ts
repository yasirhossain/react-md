import { clean, git } from "../utils";
import { ARCHIVE_FILE_NAME, TEMP_MATERIAL_ICONS } from "./constants";
import { createIconComponents, createIndexFiles } from "./create";
import { downloadArchive } from "./downloadArchive";
import { copySvgsAndGetIconMetadata } from "./svgs";

interface Options {
  clean: boolean;
  commit: boolean;
  download: boolean;
}

/**
 * Updates the `@react-md/material-icons` package to re-generate all the icon
 * components as well as copying the `svgs` into the `svgs` directory.
 */
export async function icons({
  download,
  commit,
  clean: cleanup,
}: Options): Promise<void> {
  await downloadArchive(download);

  const metadata = await copySvgsAndGetIconMetadata();
  const components = await createIconComponents(metadata);
  await createIndexFiles(components);

  if (cleanup) {
    await clean([ARCHIVE_FILE_NAME, TEMP_MATERIAL_ICONS]);
  }

  if (commit) {
    git("add packages/material-icons");
    git(
      'commit -m "feat(material-icons): Updated to include the latest icons" --no-verify'
    );
  }
}
