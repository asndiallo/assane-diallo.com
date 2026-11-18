import { execFileSync } from "node:child_process";

const git = (...args: string[]): string | undefined => {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return undefined;
  }
};

// A shallow clone dates every file to its one commit, which would make every lastmod wrong.
// No git, or a shallow clone: no dates at all (a missing lastmod is fine, a wrong one is not).
const usable = git("rev-parse", "--is-shallow-repository") === "false";

/** YYYY-MM-DD of the last commit that changed `file`, or undefined if unknown. */
export function lastCommitDate(file: string): string | undefined {
  if (!usable) return undefined;
  return git("log", "-1", "--format=%cs", "--", file) || undefined;
}
