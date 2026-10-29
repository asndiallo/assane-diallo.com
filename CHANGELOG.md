# Changelog

Notable changes to assane-diallo.com: what visitors see, what the site promises, and how it's
built and shipped. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
The site deploys continuously from `develop`, so releases are dated, not versioned.

Every pull request adds a line under **Unreleased**. When it ships, the section gets the
merge date.

## [Unreleased]

### Added

- Terms of service page (`/terms/`, `/fr/conditions/`), linked in the footer: billing, cancelling
  at the end of the paid month, setup refunds, client accounts, no ranking guarantees. The billing
  runbook lists the Stripe steps that link to it (public details, invoice footer, payment links).
- Billing runbook (`STRIPE-SETUP.md`): Stripe catalog, quote-to-subscription flow, tax and
  Dashboard settings. No code or keys on the site.
- Texas sales tax section in the billing runbook: tax codes per product, registration from
  2026-11-01, filing notes.
- Business-types page (`/for/`, `/fr/pour/`) listing every business type as a card.
- Business-type pages, in English and French: home services and auto repair.
- This changelog and a pull request template.

### Changed

- CI: Lighthouse runs in its own job beside the tests, and Playwright no longer installs
  system packages from apt. A slow apt mirror had pushed a Dependabot PR past the 20-minute limit.
- Billing runbook: profile and monthly products use Website Data Processing (`txcd_10701300`)
  instead of Data Processing (same Texas tax); terms checkbox live on the payment links.
- Privacy: a "When you hire me" section (Stripe billing, manager access to the client's accounts),
  billing records kept as tax law requires, Stripe in the list of services.
- Positioning: local SEO for small businesses in the US, with a focus on African-owned businesses
  (was: African-owned businesses only). Home, About, client work, footer and share image, in
  English and French.
- Pricing: founding prices Get Found $300 setup + $79 a month, Get Booked $650 + $129 a month
  (standard $450 + $99 and $1,000 + $179). The setup is paid once; monthly updates and the report
  are part of the package, cancel anytime.
- Footer: links grouped into Services and About columns, with one "Business types" link
  instead of one link per business type.
- Home "Who this is for": links to the new business-types page instead of listing every type.

### Fixed

- Client work: every card in the first row loads eagerly (Djidiawax was lazy but above the
  fold on desktop); the main image on client work and case study pages gets
  `fetchpriority="high"`.

## 2026-10-25

### Fixed

- Djidiawax case study: who can leave a review on the store (#24).

## 2026-10-24

### Added

- Djidiawax rebuild case study, marked "In progress" (#21).

## 2026-10-23

### Changed

- Home: case study proof and the WhatsApp button placed where phone visitors decide (#22).

### Removed

- Proof line in the hero, until there are clients outside the family (#23).

## 2026-10-21

### Added

- Isa's testimonial on her case study and the home page, with the family disclosure (#20).
- Instagram and Facebook links in the footer; separate `sameAs` for the person and the
  business (#18).

### Fixed

- Link check skips Instagram and Facebook, which block bots (#19).
- Markdown lint violations (#17).

## 2026-10-19

### Added

- Privacy note in English and French (#15).
- Cloudflare Web Analytics beacon, cookieless, shipped in the build (#8, #9).
- Dependabot, actions pinned to commit SHAs, security policy, Workers Logs (#7).

### Fixed

- Theme toggle layout shift (CLS 0.139 → 0) and a French hero agreement (#14).
- Redirect test compares paths directly, fixing code scanning alert #1 (#12).
- Tests no longer list the personal phone number (#6).

### Documentation

- DNSSEC active; security hardening status (#11, #13).

## 2026-10-18

### Added

- Site rebuilt as a bilingual (English/French) local SEO offer site with Astro, deployed on
  Cloudflare Workers (#1).
- A single case study shows as one wide panel (#3).

### Changed

- Packages renamed Get Found / Get Booked; GitHub Pages dropped (#5).
- Lighthouse CI asserts on the median of 3 runs (#4).

### Fixed

- Domain check resolves relative redirect locations; go-live recorded (#2).

[Unreleased]: https://github.com/asndiallo/assane-diallo.com/compare/044f4fb...develop
