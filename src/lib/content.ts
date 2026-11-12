import { type CollectionEntry, getCollection } from "astro:content";
import { SHOW_DRAFTS } from "astro:env/server";
import { type Alternates, collectionBase, type Locale } from "../i18n/index.ts";

type Localized = "work" | "verticals" | "guides";

/** Appended after the slug: a guide lives under its business type, e.g. /for/restaurants/guide/. */
const pathSuffix: Record<Localized, string> = { work: "", verticals: "", guides: "guide/" };

/**
 * Content lives in src/content/<collection>/<locale>/<key>.md. The same <key> in two locales is
 * the same page translated; frontmatter `urlSlug` overrides the URL segment (e.g. a French slug).
 */
const split = (id: string) => {
  const [locale, ...rest] = id.split("/");
  return { locale: locale as Locale, key: rest.join("/") };
};

/**
 * Entries marked `draft: true` (case studies, guides) stay out of production builds: no page, no listing, no sitemap
 * entry, no link. PR previews set SHOW_DRAFTS=true so drafts can be reviewed.
 */
const isVisible = (entry: CollectionEntry<Localized>): boolean =>
  SHOW_DRAFTS || !("draft" in entry.data && entry.data.draft);

/** Every visible entry of a collection matching `filter`. All content lookups go through here. */
export async function getVisible<C extends Localized>(
  collection: C,
  filter: (entry: CollectionEntry<C>) => boolean = () => true,
): Promise<CollectionEntry<C>[]> {
  return getCollection(collection, (e) => isVisible(e) && filter(e));
}

export const entryLocale = (entry: CollectionEntry<Localized>): Locale => split(entry.id).locale;
export const entryKey = (entry: CollectionEntry<Localized>): string => split(entry.id).key;
export const entrySlug = (entry: CollectionEntry<Localized>): string =>
  entry.data.urlSlug ?? entryKey(entry);

export function entryPath(collection: Localized, entry: CollectionEntry<Localized>): string {
  return `${collectionBase[collection][entryLocale(entry)]}${entrySlug(entry)}/${pathSuffix[collection]}`;
}

/** Entries for one locale, in display order. */
export async function getLocalized<C extends Localized>(
  collection: C,
  locale: Locale,
): Promise<CollectionEntry<C>[]> {
  const entries = await getVisible(collection, (e) => split(e.id).locale === locale);
  // Guides have no display order: one per business type.
  const order = (e: CollectionEntry<Localized>) => ("order" in e.data ? e.data.order : 0);
  return entries.sort((a, b) => order(a) - order(b));
}

/** URLs of every translation of an entry (including itself). */
export async function entryAlternates(
  collection: Localized,
  entry: CollectionEntry<Localized>,
): Promise<Alternates> {
  const key = entryKey(entry);
  const all = await getVisible(collection, (e) => split(e.id).key === key);
  return Object.fromEntries(all.map((e) => [entryLocale(e), entryPath(collection, e)]));
}

/** getStaticPaths body for a localized collection route with a [slug] param. */
export async function staticPathsFor<C extends Localized>(collection: C, locale: Locale) {
  return (await getLocalized(collection, locale)).map((entry) => ({
    params: { slug: entrySlug(entry) },
    props: { entry },
  }));
}

/** The entry with the same key in another collection and the same locale (a vertical's guide). */
export async function sibling<C extends Localized>(
  collection: C,
  entry: CollectionEntry<Localized>,
): Promise<CollectionEntry<C> | undefined> {
  const [match] = await getVisible(collection, (e) => e.id === entry.id);
  return match;
}
