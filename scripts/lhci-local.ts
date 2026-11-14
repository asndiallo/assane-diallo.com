/**
 * Lighthouse CI for local runs (`pnpm check`). Same pages and assertions as CI (lighthouserc.cjs),
 * but the shards run side by side on this machine instead of on separate runners: each audit
 * mostly waits on Chrome, so 4 at once take about a third of the time of one after another.
 * Scores stay well above the 0.95 gate under that load; CI's median of 3 runs is still the gate.
 *
 * Each shard collects in its own folder, and the results are merged into .lighthouseci/ before
 * `lhci assert`. LHCI 0.15 named results lhr-<Date.now()>.json (shards finishing in the same
 * millisecond would overwrite each other); 0.16 adds a random suffix, lhr-<Date.now()>-<n>.json.
 * The merge accepts both and adds the shard number, so names stay unique either way.
 */
import { spawn } from "node:child_process";
import { copyFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { availableParallelism } from "node:os";
import { join, resolve } from "node:path";

const DIR = ".lighthouseci";
const SHARD_ROOT = ".lighthouseci-shards";
const CONFIG = resolve("lighthouserc.cjs");
const SHARDS = Math.max(1, Math.min(4, Math.floor(availableParallelism() / 2)));
const { ci } = createRequire(import.meta.url)("../lighthouserc.cjs");
const expected = ci.collect.url.length * ci.collect.numberOfRuns;

const run = (args: string[], env: NodeJS.ProcessEnv = {}, quiet = false, cwd = process.cwd()) =>
  new Promise<number>((resolve) => {
    const child = spawn("lhci", args, {
      cwd,
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
rmSync(SHARD_ROOT, { recursive: true, force: true });
console.log(`Lighthouse: ${expected} runs in ${SHARDS} parallel shards…`);
const shardDirs = Array.from({ length: SHARDS }, (_, i) => join(SHARD_ROOT, String(i + 1)));
const shards = shardDirs.map((cwd, i) => {
  mkdirSync(cwd, { recursive: true });
  return run(["collect", `--config=${CONFIG}`], { LHCI_SHARD: `${i + 1}/${SHARDS}` }, true, cwd);
});
if ((await Promise.all(shards)).some((code) => code !== 0)) process.exit(1);

// Merge: lhr-<id>.json becomes lhr-<id><shard>.json, unique across shards and still a name LHCI
// reads back (the .html report beside it keeps the same name).
mkdirSync(DIR, { recursive: true });
shardDirs.forEach((cwd, i) => {
  const from = join(cwd, DIR);
  for (const file of readdirSync(from)) {
    const match = /^lhr-(\d+(?:-\d+)?)\.(json|html)$/.exec(file);
    if (match) copyFileSync(join(from, file), join(DIR, `lhr-${match[1]}${i + 1}.${match[2]}`));
  }
});
rmSync(SHARD_ROOT, { recursive: true, force: true });

const collected = readdirSync(DIR).filter((f) => /^lhr-[\d-]+\.json$/.test(f)).length;
if (collected !== expected) {
  console.error(`Expected ${expected} Lighthouse results, found ${collected}.`);
  process.exit(1);
}

const status = await run(["assert"]);
await run(["upload"]); // reports in .lighthouseci/reports, pass or fail
process.exit(status);
