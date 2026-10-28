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

| Product | Lookup key | Amount |
| --- | --- | --- |
| Get Found — setup | `profile_setup_founding` / `profile_setup_standard` | $300 / $450, once |
| Get Found — monthly | `profile_monthly_founding` / `profile_monthly_standard` | $79 / $99 a month |
| Get Booked — setup | `website_setup_founding` / `website_setup_standard` | $650 / $1,000, once |
| Get Booked — monthly | `website_monthly_founding` / `website_monthly_standard` | $129 / $179 a month |

Tax code on all four products: `txcd_20060002` (Advertising Services). To confirm with an
accountant: Get Booked setup includes a website, and some states tax website design
(`txcd_10701200`) differently.

Created in test mode on 2026-10-28, then copied to live with **⋯ → Copy to live mode** on each
product. Checked in live the same day: all eight prices kept their lookup keys, the tax code
and tax-exclusive behaviour. Repeat the check after any future copy.

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
   - Automatic tax: on (once Tax is set up).
   - Footer: "Monthly part includes updates and a report. Cancel anytime."
3. Stripe emails one invoice with both lines (e.g. $300 setup + $79 first month = $379). The
   client pays on Stripe's invoice page.
4. Once it's paid, start the 1–2 week setup. Then open the subscription and change the payment
   method to **Charge the default payment method automatically** (`charge_automatically`, no
   proration). The saved card shows as the subscription's default. From then on, Stripe
   charges the monthly price automatically and emails a receipt.

Quotes (**Quotes → Create quote**, same two lines) give the client an accept step first, if the
account plan includes them. Not tested here: the Stripe MCP has no Quotes operations.

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
- [ ] **Settings → Payment methods**: cards and ACH Direct Debit (cheaper for clients paying
      by bank).
- [x] **Settings → Business → Public details** (live, 2026-10-28): support email is the pro
      address (`CONTACT_EMAIL` in `src/config.ts`), so client replies to Stripe emails reach it.
      Support phone is the business WhatsApp number. Emails are still sent from stripe.com:
      sending from our own domain needs DNS records (Cloudflare, owner's approval).
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
- [x] **Settings → Tax** (live): active, head office set, default tax code `txcd_20060002`,
      tax-exclusive. No registrations yet, so no tax is collected; threshold monitoring alerts
      before a state requires one. Add registrations only after checking with an accountant.
- [ ] Activate the account (bank details, identity) before going live.

## Sources

- Invoicing in the Dashboard: <https://docs.stripe.com/invoicing/dashboard>
- Quotes: <https://docs.stripe.com/quotes/create>
- Customer Portal (no-code): <https://docs.stripe.com/customer-management/activate-no-code-customer-portal>
- Revenue recovery: <https://docs.stripe.com/billing/revenue-recovery>
- Tax threshold monitoring: <https://docs.stripe.com/tax/monitoring>
