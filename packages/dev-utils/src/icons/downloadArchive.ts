import { createWriteStream, unlink } from "fs";
import https from "https";
import log from "loglevel";
import prompts from "prompts";

import { clean } from "../utils";
import { ARCHIVE_FILE_NAME, TEMP_MATERIAL_ICONS } from "./constants";

const MATERIAL_VERSION = "4.0.0"; // this could be master one day, but feels safer to specify version
const MATERIAL_GITHUB_URL = `https://codeload.github.com/google/material-design-icons/zip/${MATERIAL_VERSION}`;

async function download(): Promise<void> {
  log.info("Downloading the `material-design-icons` archive from GitHub...");
  return new Promise((resolve) => {
    const file = createWriteStream(ARCHIVE_FILE_NAME)
      .on("error", (error) => {
        file.close();
        log.error(error);
        process.exit(1);
      })
      .on("finish", () => {
        file.close();
        resolve();
      });

    https
      .get(MATERIAL_GITHUB_URL, (response) => {
        response.pipe(file);
      })
      .on("error", (error) =>
        unlink(ARCHIVE_FILE_NAME, () => {
          log.error(error);
          process.exit(1);
        })
      );
  });
}

/**
 * Downloads the current version listed above of the material-design-icons repo
 * as a .zip file.
 */
export async function downloadArchive(enabled: boolean): Promise<void> {
  if (!enabled) {
    log.info("Skipping the `material-design-icons` archive download...");
    return;
  }

  await clean([ARCHIVE_FILE_NAME, TEMP_MATERIAL_ICONS]);
  await download();

  log.info(
    `Manually extract the "${ARCHIVE_FILE_NAME}" and then continue this script. ` +
      "The archive is too big and throws a memory error if done through `adm-zip`. " +
      `Make sure the extracted icons are at:\n - ${TEMP_MATERIAL_ICONS}`
  );
  const { complete } = await prompts({
    type: "confirm",
    name: "complete",
    message: "Continue? (y/n)",
    initial: false,
  });

  if (!complete) {
    log.error("Cancelled icon generation.");
    process.exit(1);
  }
}
