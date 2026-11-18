/**
 * Link check on dist/. Skips links that can't be checked offline: mailto, WhatsApp, and our own
 * absolute URLs (canonical, OG, JSON-LD), which only resolve once the site is deployed. Also skips
 * Instagram and Facebook: they rate-limit CI runners (429) whether or not the profile exists.
 * And ftc.gov: its bot protection answers automated requests with 403 or 404 even for live pages
 * (the guides cite its review rule; checked by hand on 2026-11-12).
 * Any other 429 (Too Many Requests) is a warning, not a failure: it means "slow down", never
 * "broken link". LinkedIn does this to CI runners because its link sits on every page.
 */
import { spawnSync } from "node:child_process";
import { SITE_URL } from "../src/config.ts";

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const skip = `^(mailto:|https://wa\\.me|https://www\\.(instagram|facebook)\\.com/|https://www\\.ftc\\.gov/|${escapeRegExp(SITE_URL)})`;
const { status } = spawnSync(
  "linkinator",
  ["dist", "--recurse", "--skip", skip, "--status-code", "429:warn"],
  {
    stdio: "inherit",
  },
);
process.exit(status ?? 1);
