import { type Alternates, type Locale, staticRoutes } from "../i18n/index.ts";
import { entryKey, entryLocale, entryPath, getVisible } from "./content.ts";
import { lastCommitDate } from "./lastmod.ts";

/** One page: its URL in each locale, and when each version's content last changed (if known). */
export interface PageGroup {
  paths: Alternates;
  lastmod: Partial<Record<Locale, string>>;
}

/**
 * Group a collection's entries by key: one group per page. lastmod is the last commit of the
 * entry's markdown file, its main content. Static pages get none: their copy lives in shared
 * dictionaries, so no file date says when that one page changed.
 */
async function collectionGroups(collection: "work" | "verticals" | "guides"): Promise<PageGroup[]> {
  const groups = new Map<string, PageGroup>();
  for (const entry of await getVisible(collection)) {
    const group = groups.get(entryKey(entry)) ?? { paths: {}, lastmod: {} };
    const locale = entryLocale(entry);
    group.paths[locale] = entryPath(collection, entry);
    const date = entry.filePath && lastCommitDate(entry.filePath);
    if (date) group.lastmod[locale] = date;
    groups.set(entryKey(entry), group);
  }
  return [...groups.values()];
}

const staticGroup = (paths: Alternates): PageGroup => ({ paths, lastmod: {} });

/**
 * Every indexable page with its translations. Feeds the sitemap, which feeds the smoke tests.
 * noindex pages (404, thanks) are left out.
 */
export async function getPageGroups(): Promise<PageGroup[]> {
  return [
    staticGroup(staticRoutes.home),
    staticGroup(staticRoutes.verticals),
    ...(await collectionGroups("verticals")),
    ...(await collectionGroups("guides")),
    staticGroup(staticRoutes.checklist),
    staticGroup(staticRoutes.reviewLink),
    staticGroup(staticRoutes.work),
    ...(await collectionGroups("work")),
    staticGroup(staticRoutes.about),
    staticGroup(staticRoutes.engineering),
    staticGroup(staticRoutes.privacy),
    staticGroup(staticRoutes.terms),
  ];
}
