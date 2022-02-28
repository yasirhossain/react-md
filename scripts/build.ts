import { spawn } from "node:child_process";
import { join } from "node:path";
import { projectRoot } from "./src/constants.js";
import { getPackages } from "./src/utils/packages.js";

const spawnPromise = (args: readonly string[], name: string): Promise<void> =>
  new Promise((resolve, reject) => {
    console.log(`[${name}] npx ${args.join(" ")}`);
    const cwd = join(projectRoot, "packages", name);
    const process = spawn("npx", args, { cwd, stdio: "inherit" });
    process.on("close", () => resolve());
    process.on("error", reject);
  });

async function build(): Promise<void> {
  const packages = await getPackages();
  for (const name of packages) {
    const ejsArgs = [
      "swc",
      "--config-file",
      "../../.swcrc",
      "src",
      "-d",
      "ejs",
    ];
    const cjsArgs = [
      "swc",
      "--config-file",
      "../../.swcrc.cjs",
      "-C",
      'env.targets="maintained node versions"',
      "src",
      "-d",
      "cjs",
    ];

    await Promise.all([
      spawnPromise(ejsArgs, name),
      spawnPromise(cjsArgs, name),
    ]);
  }

  const args = [
    "swc",
    "--config-file",
    "../../.swcrc.umd",
    "src/index.ts",
    "-o",
    "umd/react-md.development.js",
  ];

  spawn("npx", args, {
    stdio: "inherit",
    cwd: join(projectRoot, "packages", "react-md"),
  });
}

build();
