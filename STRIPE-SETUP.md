# Billing with Stripe: assane-diallo.com

The runbook for how clients are billed. Everything runs from the Stripe Dashboard: the site has no
checkout, no Stripe key and no Stripe script. A client says yes in WhatsApp after the free
check-up, then gets a quote or an invoice by email from Stripe.

Plan from Stripe's implementation planner, accepted on **2026-10-28**: Dashboard invoicing, Quotes
for sales-led deals, Hosted Invoice Page, flat-rate prices paid up front, Customer Portal,
Smart Retries, Stripe Tax threshold monitoring.

## Rules

- No secret key in this repo, in CI or in chat. The site never needs one. If code ever does
  (it shouldn't), the owner sets it with `gh secret set`, and the key is a restricted key.
- Prices in Stripe mirror `pricing` in `src/config.ts`. Change both together.
- Prices are tax-exclusive: tax, when due, is added on top.

## Catalog

Each package is two products: a one-time setup and a monthly part. Each has a founding price
(first 3 clients) and a standard price. Find prices by lookup key, not by ID (IDs differ between
test mode and live mode).

| Product              | Lookup key                                              | Amount              |
| -------------------- | ------------------------------------------------------- | ------------------- |
| Get Found — setup    | `profile_setup_founding` / `profile_setup_standard`     | $300 / $450, once   |
| Get Found — monthly  | `profile_monthly_founding` / `profile_monthly_standard` | $79 / $99 a month   |
| Get Booked — setup   | `website_setup_founding` / `website_setup_standard`     | $650 / $1,000, once |
| Get Booked — monthly | `website_monthly_founding` / `website_monthly_standard` | $129 / $179 a month |

Tax codes (live and test mode, set 2026-10-29):

| Product                               | Tax code                                  | Texas tax per $100 |
| ------------------------------------- | ----------------------------------------- | ------------------ |
| Get Booked — setup                    | `txcd_10701200` (Website Design)          | $6.60              |
| Get Found — setup, both monthly parts | `txcd_10701300` (Website Data Processing) | $6.60              |

Website Data Processing, not Data Processing (`txcd_20060009`): Stripe defines the latter as
work "not performed online" and points online work to Website Data Processing. The work here is
done online and delivered electronically. Switched on 2026-10-29; a test-mode calculation that day
gave the same Texas tax for both ($6.60 per $100), so no client amount changed.

Texas taxes data processing and website design on 80% of the price (8.25% × 80% = 6.6%).
For comparison (test mode, 2026-10-28), General ESS (`txcd_10000000`) gave $8.25 and
Advertising Services (`txcd_20060002`) gave $0. Data processing is the cautious choice: if an
accountant or a Comptroller ruling says advertising, switch the three products to
`txcd_20060002` and stop collecting. Never leave a product on General ESS: it over-collects in
Texas.

Created in test mode on 2026-10-28, then copied to live with **⋯ → Copy to live mode** on each
product. Checked in live the same day: all eight prices kept their lookup keys and
tax-exclusive behaviour. Later that day the live tax codes turned out to be General ESS and were
fixed by hand (cause unknown). Check the tax codes after any future copy or edit.

## Sales tax

- **Texas**: Stripe registration `state_sales_tax`, scheduled to start **2026-11-01 00:00
  Central** (the first taxable sales date on the Comptroller application). The head office is in
  Texas, so Texas clients pay the head office's local rate (origin-based). Clients in other
  states pay $0 until Stripe's threshold monitoring says to register there.
- The Texas taxpayer number and permit are in the owner's records, not in this repo.
- Texas returns are due even when no tax was collected. The Comptroller sets the filing
  frequency when it issues the permit. File on the Comptroller's Webfile using the
  **Tax → Locations → Texas** report (automated filing needs Tax Complete).
- Test mode has a Texas registration (active now), so tax shows up on test invoices.

## Billing a new client

The quote is the "final quote after a free check-up". Its amounts can differ from the catalog.
Override the price on the quote line rather than editing the catalog.

The client pays **once** to start (setup + month one, one invoice), and later months are charged
to the same card automatically. Tested end to end in test mode on 2026-10-28.
1. **Customers → Add customer**: business name, billing email, and the billing address (Stripe
   Tax needs it). No personal notes in Stripe.
2. **Subscriptions → Create subscription** for that customer:
   - Product: the monthly price (e.g. `profile_monthly_founding`).
   - **Add one-time item to the first invoice**: the setup price (e.g. `profile_setup_founding`).
   - Payment: **Email invoice to the customer to pay manually** (`send_invoice`), due in 7 days.
   - **Save the payment method to the subscription** when the invoice is paid
     (`payment_settings.save_default_payment_method = on_subscription`). Without this, the
     client has to pay a new emailed invoice every month.
   - Payment methods: card and US bank account (ACH).
   - Automatic tax: on. The customer needs a billing address.
   - Footer: "Monthly part includes updates and a report. Cancel anytime." followed by the
     terms and privacy links (the account's default invoice footer, see One-time settings).
3. Stripe emails one invoice with both lines (e.g. $300 setup + $79 first month = $379). The
   client pays on Stripe's invoice page.
4. Once it's paid, start the 1–2 week setup. Then open the subscription and change the payment
   method to **Charge the default payment method automatically** (`charge_automatically`, no
   proration). The saved card shows as the subscription's default. From then on, Stripe
   charges the monthly price automatically and emails a receipt.

Quotes (**Quotes → Create quote**, same two lines) give the client an accept step first, if the
account plan includes them. Not tested here: the Stripe MCP has no Quotes operations.

### Payment links (catalog price, no custom quote)

When the check-up confirms the catalog price, send the package's link in WhatsApp instead of
steps 1–4. The client enters business name, their name, phone and billing address (for tax),
then pays setup + month one. Stripe creates the customer and a subscription that charges the
same card every month. Nothing to switch afterwards. Use an invoice (above) whenever the price
differs from the catalog.

| Package    | Founding                                         | Standard                                         |
| ---------- | ------------------------------------------------ | ------------------------------------------------ |
| Get Found  | <https://buy.stripe.com/bJe9AT2wx92H9sSf5e9oc04> | <https://buy.stripe.com/5kQ8wP9YZ3IndJ8bT29oc01> |
| Get Booked | <https://buy.stripe.com/4gM9ATc770wbeNc3mw9oc02> | <https://buy.stripe.com/00w00j8UV7YDbB02is9oc03> |

All four (live, 2026-10-28): automatic tax, billing address and phone required, business name,
subscription description "Monthly part includes updates and a report. Cancel anytime.",
metadata `tier` and `pricing`. Never put these links on the site (no checkout on the site).
After the 3rd founding client, deactivate both founding links (**Payment links → ⋯ →
Deactivate**). The first Dashboard-made Get Found link (`…oc00`) is deactivated: it lacked
these settings.

## Changes and cancelling

- **Cancel anytime**: in the Customer Portal, the client can cancel (at period end) and update
  their card. Send them the portal link, or cancel for them in the Dashboard
  (**Cancel at period end**). No refund of the current month unless agreed.
- Moving from founding to standard prices: never for an existing client. Founding prices stay.

## One-time Dashboard settings

- [x] **Settings → Business → Branding** (live, 2026-10-28): icon from `public/favicon.svg`
  (512 px PNG), brand `#0b6b4c`, accent `#07503a`, the site's `brand` and `brand-strong`
  tokens. No wide logo yet.
- [x] Roll the test secret key that was pasted in a chat (done 2026-10-28).
- [x] **Settings → Payment methods** (live, 2026-10-28): cards and ACH Direct Debit (cheaper
  for clients paying by bank), plus Stripe's defaults (Apple Pay, Google Pay, Link…).
- [x] **Settings → Business → Public details** (live, 2026-10-28): support email is the pro
  address (`CONTACT_EMAIL` in `src/config.ts`), so client replies to Stripe emails reach it.
  Support phone is the business WhatsApp number. Emails are still sent from stripe.com:
  sending from our own domain needs DNS records (Cloudflare, owner's approval).
- [x] **Terms and privacy links** (live, 2026-10-29). Public details and the invoice footer are
  Dashboard only (the API can't edit the account's own settings):
  - **Settings → Business → Public details**: terms of service URL
    `https://assane-diallo.com/terms/`, privacy policy URL `https://assane-diallo.com/privacy/`.
    Stripe's checkout pages link to both.
  - **Settings → Billing → Invoices → Default footer**: "Terms:
    https://assane-diallo.com/terms/ · Privacy: https://assane-diallo.com/privacy/".
  - The four payment links: `consent_collection.terms_of_service = required`, a checkbox the
    client must tick ("I agree to … Terms of Service and Privacy Policy", both linked).
    Stripe refuses it until the terms URL is set in Public details. A payment link's invoice
    footer can't be changed after creation; the default footer covers its invoices.
  - When the terms change: update the "Last updated" date and email current clients before
    the change applies (the terms promise it).
- [x] **Settings → Business → Customer emails**: receipts on for successful payments and
  refunds.
- [x] **Settings → Billing → Customer portal** (live): cancel at period end with a reason,
  card and billing info updates, invoice history. No plan switching. Login link:
  <https://billing.stripe.com/p/login/6oUfZh8UVdiXbB07CM9oc00> (the client enters their
  email to sign in).
- [x] **Settings → Billing → Subscriptions and emails**: emails for expiring cards and failed
  card or bank payments, linking to Stripe's hosted page (switch confirmed, irreversible).
  Emails include a link to the customer portal.
- [x] **Revenue recovery → Retries**: Smart Retries on (up to 8 times within 2 weeks), then
  cancel the subscription.
- [x] **Settings → Tax** (live): active, head office set, default tax code `txcd_10701300`,
  tax-exclusive. Texas registration scheduled from 2026-11-01 (see Sales tax); threshold
  monitoring watches the other states.
- [x] **Settings → Tax → Integrations**: "Use automatic tax" on (live), so new Dashboard
  invoices, subscriptions, quotes and payment links calculate tax by default.
- [x] **Plan**: Tax Basic, pay as you go: 0.5% of each transaction in a state where we're
  registered (Texas only). No monthly fee. Tax Complete (from $90/month, 1-year contract,
  filing included) isn't worth it at this volume: file Texas returns ourselves from the
  Stripe location report.
- [ ] When the Texas permit arrives: check that its start date matches 2026-11-01 (update the
  Stripe registration if not) and note the filing frequency here.
- [ ] Ask an accountant: data processing or advertising for profile and SEO work (see Catalog).
- [x] Account activated (bank details, identity), 2026-10-28.

## Sources

- Invoicing in the Dashboard: <https://docs.stripe.com/invoicing/dashboard>
- Quotes: <https://docs.stripe.com/quotes/create>
- Customer Portal (no-code): <https://docs.stripe.com/customer-management/activate-no-code-customer-portal>
- Revenue recovery: <https://docs.stripe.com/billing/revenue-recovery>
- Tax threshold monitoring: <https://docs.stripe.com/tax/monitoring>
