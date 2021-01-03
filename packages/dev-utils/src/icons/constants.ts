import { join } from "path";

import { packagesRoot } from "../constants";

export const TEMP_MATERIAL_ICONS = "./material-icons-temp";
export const ARCHIVE_FILE_NAME = "./material-icons.zip";

export const RMD_ICON_PKG = join(packagesRoot, "material-icons");
export const RMD_ICON_SRC = join(RMD_ICON_PKG, "src");
export const RMD_ICON_DIST = join(RMD_ICON_PKG, "svgs");
