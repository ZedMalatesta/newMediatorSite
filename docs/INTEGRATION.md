# Integration guide

The site is a **static export** (`output: "export"`) deployed to GitHub Pages.
There is no server, so anything requiring one is built as a *seam*: the UI is
complete and the destination is configuration. Each seam is inert until its
environment variable is set, and says so to the visitor rather than pretending
to work.

Set these in the deploy workflow (`.github/workflows/deploy.yml`) under the
build step's `env:`.

| Variable | Enables | Until it is set |
|---|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | All enquiry forms and the cart's order request | Forms say they are not connected and point to Telegram/email |
| `NEXT_PUBLIC_AUTH_ENDPOINT` | Login and registration | `/account` shows a notice and the submit button is disabled |
| `NEXT_PUBLIC_PAYMENT_ENDPOINT` | Hand-off to a payment provider | Checkout collects an order request instead; the office invoices |

## Forms and orders

`POST` receives JSON:

```json
{ "kind": "registration" | "lead" | "newsletter",
  "data": { "name": "…", "email": "…", "phone": "…", "order": "…" },
  "submittedAt": "ISO-8601" }
```

Any endpoint that accepts a JSON POST works — a serverless function, a form
service, or an automation webhook.

## Accounts

`POST {endpoint}/login` and `POST {endpoint}/register`, returning
`{ name, email }`.

**The stored profile is not a security boundary.** It lives in `localStorage`,
entirely under the visitor's control, and exists only to show a name in the
header. Never gate anything that matters on it — that requires a server session.

## Payments

There is deliberately **no card form**. When a provider is chosen, checkout
should redirect to the provider's own hosted payment page. Card data must never
be collected by this site: doing so would pull it into PCI scope for no benefit.

Note the catalogue has **no unified price data** — figures live in per-page copy
and several are unresolved. The cart carries lines without a known price as
unpriced and marks the total partial. Populate prices as data before enabling
payment, or customers will be quoted incomplete totals.

## Opening hours

`site.openingHours` in `app/lib/site.ts` is empty because mediatorok.by
publishes none. Add entries and the header block renders automatically:

```ts
openingHours: [{ days: "Пн–Пт", hours: "9:00 – 18:00", note: "обед 13:00 – 14:00" }]
```

## Regenerating derived data

```bash
npm run build:search   # rebuilds app/lib/searchIndex.ts from page content
```
