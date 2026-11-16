import { pricing, SITE_NAME, SITE_URL, site } from "../config.ts";
import { type Locale, locales } from "../i18n/index.ts";

const abs = (path: string) => new URL(path, SITE_URL).href;
const businessId = `${SITE_URL}/#business`;
const businessName = `${SITE_NAME}, local SEO`;

// Each entity claims only its own profiles, so Google doesn't merge the person and the business.
const { instagram, facebook, linkedin, github } = site.social;
const personSameAs = [linkedin, github];
const businessSameAs = [instagram, facebook];

/** Schema.org Person for Assane. Shared by the business and the about page. */
export const personSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: SITE_NAME,
  url: `${SITE_URL}/about/`,
  jobTitle: "Local SEO consultant and software engineer",
  knowsLanguage: ["en", "fr"],
  sameAs: personSameAs,
};

/** ProfessionalService with a service area and no street address. */
export function professionalServiceSchema(description: string): Record<string, unknown> {
  const prices = pricing.tiers.flatMap((tier) => [tier.founding.setup, tier.standard.setup]);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": businessId,
    name: businessName,
    description,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og-default.png`,
    areaServed: { "@type": "Country", name: site.areaServed },
    availableLanguage: ["English", "French"],
    priceRange: `$${Math.min(...prices)}–$${Math.max(...prices)} setup`,
    founder: personSchema,
    sameAs: businessSameAs,
  };
}

/** WebSite: tells Google the site's name for search results. Home page only. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: new URL(SITE_URL).hostname,
  url: `${SITE_URL}/`,
  inLanguage: [...locales],
  publisher: { "@id": businessId },
};

/** Service for one business type, offered by the ProfessionalService defined on the home page. */
export function serviceSchema(s: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: "Local SEO and Google Business Profile management",
    description: s.description,
    url: abs(s.path),
    inLanguage: s.locale,
    areaServed: { "@type": "Country", name: site.areaServed },
    // A reference, not the full entity: its description belongs to the home page.
    provider: {
      "@type": "ProfessionalService",
      "@id": businessId,
      name: businessName,
      url: `${SITE_URL}/`,
    },
  };
}

/** Article written by Assane (guides, case studies). Dates are YYYY-MM-DD. */
export function articleSchema(a: {
  headline: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string | undefined;
  datePublished?: Date | undefined;
  dateModified?: Date | undefined;
}): Record<string, unknown> {
  const day = (d?: Date) => d?.toISOString().slice(0, 10);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.headline,
    description: a.description,
    url: abs(a.path),
    inLanguage: a.locale,
    ...(a.image && { image: abs(a.image) }),
    ...(a.datePublished && { datePublished: day(a.datePublished) }),
    ...(a.dateModified && { dateModified: day(a.dateModified) }),
    author: personSchema,
    publisher: { "@id": businessId },
  };
}

/** BreadcrumbList from root-relative paths, home first, this page last. */
export function breadcrumbSchema(
  crumbs: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}
