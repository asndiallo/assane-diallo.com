/** Lighthouse CI: every built page, mobile (the default form factor), 100 in all four categories. */
const min = (score) => ["error", { minScore: score }];
// Pages that are noindex on purpose (404 and the form thank-you pages in each language).
const NOINDEX = "(404\\.html|thanks/|fr/merci/)";

// Every page scores 100 today; any drop is a regression, so the gate is a perfect score.
const PERFECT = 1;

const categories = {
  "categories:performance": min(PERFECT),
  "categories:accessibility": min(PERFECT),
  "categories:best-practices": min(PERFECT),
};

module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      maxAutodiscoverUrls: 0, // 0 = audit every HTML page, not just the first five
      staticDirFileDiscoveryDepth: 4, // default 2 misses /fr/pour/<vertical>/ and /fr/realisations/<case>/
      // Median of 3 runs per page: a single run on a shared CI machine is too noisy to gate on.
      numberOfRuns: 3,
      // The analytics beacon is a third-party request; keep scores about the site itself.
      settings: { blockedUrlPatterns: ["*cloudflareinsights.com*"] },
    },
    assert: {
      assertMatrix: [
        // Lighthouse scores noindex as an SEO failure, so those pages skip the SEO assertion.
        { matchingUrlPattern: `/${NOINDEX}`, assertions: categories },
        {
          matchingUrlPattern: `^(?!.*/${NOINDEX}).*$`,
          assertions: { ...categories, "categories:seo": min(PERFECT) },
        },
      ],
    },
    upload: { target: "filesystem", outputDir: "./.lighthouseci/reports" },
  },
};
