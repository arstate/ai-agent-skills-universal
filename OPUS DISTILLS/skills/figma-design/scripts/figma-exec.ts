import { callPlugin, exec } from "/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/figma-bridge/server/src/relay-client";
import * as fs from "fs";

/**
 * figma-exec CLI
 * Usage:
 *   bun figma-exec.ts "return figma.currentPage.name;"
 *   bun figma-exec.ts -f ./script_to_run.ts
 */
async function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.log("Usage: bun figma-exec.ts [code | -f <file.ts>]");
    process.exit(1);
  }

  let code = "";
  if (args[0] === "-f" && args[1]) {
    code = fs.readFileSync(args[1], "utf-8");
  } else {
    code = args.join(" ");
  }

  try {
    const res = await callPlugin("execute", { code });
    if (res?.error) {
      console.error("Figma Plugin Error:", res.error);
      process.exit(1);
    }
    console.log(JSON.stringify(res?.value ?? res, null, 2));
  } catch (err: any) {
    console.error("Execution failed:", err.message);
    process.exit(1);
  }
}

main().catch(console.error);
