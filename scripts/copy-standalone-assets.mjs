import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";

const standaloneDir = ".next/standalone";
const standaloneNextDir = `${standaloneDir}/.next`;

await mkdir(standaloneNextDir, { recursive: true });

const copies = [
  [".next/static", `${standaloneNextDir}/static`],
  ["public", `${standaloneDir}/public`],
];

for (const [source, destination] of copies) {
  if (!existsSync(source)) {
    continue;
  }

  await rm(destination, { recursive: true, force: true });
  await cp(source, destination, { recursive: true });
}
