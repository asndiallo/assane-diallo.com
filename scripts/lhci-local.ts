/**
 * Lighthouse CI for local runs (`pnpm check`). Same pages and assertions as CI (lighthouserc.cjs),
 * but the shards run side by side on this machine instead of on separate runners: each audit
 * mostly waits on Chrome, so 4 at once take about a third of the time of one after another.
 * Scores stay well above the 0.95 gate under that load; CI's median of 3 runs is still the gate.
 */
import { spawn } from "node:child_process";
import { readdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { availableParallelism } from "node:os";

const DIR = ".lighthouseci";
const SHARDS = Math.max(1, Math.min(4, Math.floor(availableParallelism() / 2)));
const { ci } = createRequire(import.meta.url)("../lighthouserc.cjs");
const expected = ci.collect.url.length * ci.collect.numberOfRuns;

const run = (args: string[], env: NodeJS.ProcessEnv = {}, quiet = false) =>
  new Promise<number>((resolve) => {
    const child = spawn("lhci", args, {
      env: { ...process.env, ...env },
      stdio: quiet ? ["ignore", "pipe", "pipe"] : "inherit",
    });
    let output = "";
    child.stdout?.on("data", (chunk) => (output += chunk));
    child.stderr?.on("data", (chunk) => (output += chunk));
    child.on("close", (code) => {
      if (code !== 0 && quiet) process.stderr.write(output);
      resolve(code ?? 1);
    });
  });

rmSync(DIR, { recursive: true, force: true });
console.log(`Lighthouse: ${expected} runs in ${SHARDS} parallel shards…`);
const shards = Array.from({ length: SHARDS }, (_, i) =>
  run(["collect", "--additive"], { LHCI_SHARD: `${i + 1}/${SHARDS}` }, true),
);
if ((await Promise.all(shards)).some((code) => code !== 0)) process.exit(1);

// Shards write lhr-<timestamp>.json into the same folder; make sure none overwrote another.
const collected = readdirSync(DIR).filter((f) => /^lhr-.*\.json$/.test(f)).length;
if (collected !== expected) {
  console.error(`Expected ${expected} Lighthouse results, found ${collected}.`);
  process.exit(1);
}

const status = await run(["assert"]);
await run(["upload"]); // reports in .lighthouseci/reports, pass or fail
process.exit(status);
