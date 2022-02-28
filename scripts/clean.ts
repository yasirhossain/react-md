import glob from "glob";
import { clean } from "./src/utils/clean.js";

const pattern = "packages/!(dev-utils|documentation)/@(cjs|ejs)";

clean(glob.sync(pattern));
