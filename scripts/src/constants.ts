import { execSync } from "node:child_process";

export const projectRoot = execSync("git rev-parse --show-toplevel")
  .toString()
  .trim();
