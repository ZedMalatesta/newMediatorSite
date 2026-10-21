# Backend specification

What the site needs from a server, in the order to build it, and the rules the
server has to keep.

The site is a static export (`output: "export"`) on GitHub Pages. Everything
that needs a server was built as a *seam*: the UI is complete and the
destination is an environment variable ([docs/INTEGRATION.md](../docs/INTEGRATION.md)).
This document decides what goes behind each seam. Until it is built, the site
loses registrations: every form on it posts nowhere.

The static site stays where it is. The backend is one small API next to it, not
a move to a server-rendered site.

## 1. The rules

| # | Rule | What it rules out |
|---|------|-------------------|
| B1 | **No submission is lost.** Every form request is stored before anyone is notified, and a failed notification never fails the request. | A registration that existed only as a Telegram message that did not arrive. |
| B2 | **The server checks everything again.** Validation in the browser is a convenience; the API repeats it and rejects what fails. | Requests sent straight to the endpoint with `curl`, skipping the form. |
| B3 | **Every public endpoint is protected from bots.** The endpoint URL is in the site's public bundle, so a CORS check alone protects nothing. | An inbox full of spam a week after launch. |
| B4 | **Consent is recorded with the request.** The time, the page and the version of the privacy policy the visitor agreed to are stored with the data. | Being unable to show when and to what a person consented. |
| B5 | **Prices come from the server, never from the browser.** An order carries item ids; the API looks the prices up. | A cart edited in DevTools paying 1 BYN for a course. |
| B6 | **Payment is confirmed by the provider's webhook, not by the visitor's return.** Reaching `/thankyou` proves nothing. | Orders marked paid because someone opened the success URL. |
| B7 | **No card data touches this site or its API.** Checkout redirects to the provider's hosted page. | PCI scope for a site that has no need for it. |
| B8 | **Secrets live in the API's environment, never in `NEXT_PUBLIC_*` variables.** Anything with that prefix is published in the bundle. | A Telegram bot token or provider key readable by every visitor. |
| B9 | **The `localStorage` profile is never a permission.** Anything that needs a signed-in person is checked by the server against a session. | Paid materials unlocked by editing `mediatorok.profile`. |

## 2. What exists today

| Seam | Variable | Client code | State |
|------|----------|-------------|-------|
| Forms: registrations, popups, footer lead form, newsletter, cart order request | `NEXT_PUBLIC_FORM_ENDPOINT` | [submitForm.ts](../app/lib/submitForm.ts), [useFormSubmit.ts](../app/hooks/useFormSubmit.ts) | Not set. Forms say they are not connected and point to Telegram/e-mail. |
| Login and registration | `NEXT_PUBLIC_AUTH_ENDPOINT` | [auth.ts](../app/lib/auth.ts) | Not set. `/account` shows a notice. |
| Payment hand-off | `NEXT_PUBLIC_PAYMENT_ENDPOINT` | cart | Not set. Checkout collects an order request; the office invoices. |
| Event status (upcoming / open / past) | — | [lifecycle.ts](../app/lib/lifecycle.ts) | Computed at **build** time, so it is only as fresh as the last deploy. |

## 3. Architecture

```
visitor ──▶ GitHub Pages (static site)
   │
   └── POST JSON ──▶ API (Cloudflare Worker)
                       ├── checks: Turnstile token, server-side validation
                       ├── store ──▶ database (D1) / Google Sheet
                       ├── notify ─▶ Telegram bot, office e-mail
                       ├── newsletter ─▶ mailing service (double opt-in)
                       └── later: orders ─▶ payment provider ◀── webhook
```

**Recommended platform: Cloudflare Workers.** The free tier covers this
site's traffic. Turnstile, Cloudflare's bot check, is built in. D1 gives a
database without running one, and Telegram and e-mail are each one `fetch`.
Alternatives, if the owner prefers:

- **Supabase**: database, a table editor staff can use without a developer,
  and sign-in, if accounts are built (section 7). Choose it if accounts are
  certain.
- **A form service or automation webhook** (Formspree, Make) into Google
  Sheets and Telegram. It works within an hour but gives weaker spam control
  and no route to payments. Acceptable only as a stop-gap while section 4 is
  built.

The API sends CORS headers for the site's origins only:
`https://zedmalatesta.github.io` now, and the custom domain once there is one.

## 4. Phase 1: forms (urgent)

### 4.1 Contract

Unchanged from [docs/INTEGRATION.md](../docs/INTEGRATION.md), plus one field:

```json
{ "kind": "registration" | "lead" | "newsletter",
  "data": { "name": "…", "email": "…", "phone": "…", "comment": "…",
            "consent": "yes", "form": "…", "page": "/…", "order": "…" },
  "submittedAt": "ISO-8601",
  "turnstileToken": "…" }
```

Two client changes come with this phase, both in
[SiteForm.tsx](../app/components/ui/SiteForm.tsx) and `submitForm`:

- `turnstileToken`, a new field: the forms render the Turnstile widget and
  send its token.
- A honeypot: a hidden field people never fill in. The forms have none today.

### 4.2 What the API does, in order

1. Rejects anything not from an allowed origin, over the size limit (16 KB),
   or over a per-IP rate limit.
2. Verifies `turnstileToken` with Cloudflare (B3), and drops requests that
   fill the honeypot field.
3. Validates `data` again (B2): required name and contact, an e-mail that
   parses, a phone of plausible length, and `consent` equal to `"yes"` for
   every kind.
4. Stores the request with its consent record (B1, B4): the received time
   (the server's, not `submittedAt`), `page`, and the privacy-policy version.
5. Routes it by `kind`:
   - `registration` and `lead` go to the Telegram chat and the office inbox.
   - `newsletter` goes to the mailing service (Brevo or MailerLite), which
     sends its own confirmation e-mail.
6. Returns `200` once step 4 succeeds, even if a notification fails. Failed
   notifications are retried from the stored record.

### 4.3 Personal data

The forms collect names, phones and e-mails of people in Belarus, so the Law
of the Republic of Belarus No. 99-З «О защите персональных данных» applies.
The privacy policy is at `/politicaobrabotkidannyh`. Before launch, confirm
with the owner's legal adviser:

- where the stored data may physically be kept, and whether a provider outside
  Belarus is acceptable for it;
- how long submissions are kept, and who deletes them.

Retention is enforced by the API (a scheduled job deletes expired rows), not
by hand.

## 5. Phase 1b: keeping event status current

Event status is derived from dates when the site is built, so a finished event
stays marked "open" until the next deploy. That is the defect
[lifecycle.ts](../app/lib/lifecycle.ts) exists to prevent.

**Fix:** add a daily schedule to [deploy.yml](../.github/workflows/deploy.yml):

```yaml
on:
  push:
    branches: [main]
  schedule:
    - cron: "0 0 * * *"   # 03:00 Minsk
  workflow_dispatch:
```

There is no server involved. This is the cheapest item in the document and can
be done first.

## 6. Phase 2: payments

**Prerequisite: prices as data.** Today prices are text on each page, synced
from the live site (page specification, R9), and several are unresolved. Under
B5 the API needs a price list it can trust. Pages and API must read the same
source, so pages never show one price while the API charges another. That
source is either a CMS (section 8) or a price file in the repo that both the
build and the API read.

**Provider:** a Belarusian acquirer with a hosted payment page. Compare bePaid,
WebPay and Assist Belarus on fees, ЕРИП support and the contract the owner can
sign.

**Flow:**

1. Checkout sends the cart's item ids and quantities to `POST /orders`.
2. The API prices the order from its own list (B5), stores it as `pending` and
   asks the provider for a payment page.
3. The visitor is redirected to the provider (B7).
4. The provider calls `POST /payments/webhook`. The API verifies the signature,
   ignores duplicates (it is idempotent per provider transaction id), marks
   the order `paid`, and notifies the office and the buyer (B6).
5. The visitor returns to `/thankyou`, which only says the payment is being
   confirmed.

Until this phase ships, the current flow stays: the order request goes through
the form API with `kind: "registration"`, and the office invoices.

## 7. Phase 3: accounts (only if they unlock something)

Signing in today would only show a name in the header. Build accounts only for
a concrete need: purchased courses, recordings, materials or certificates
behind a sign-in. If that need is agreed:

- **Use a managed sign-in service** (Supabase Auth, Clerk). Never store
  passwords in our own code.
- **Sign in by e-mail link.** It avoids a password reset flow entirely.
- **Sessions are httpOnly cookies, set by the API on the site's own domain.**
  The site moves to a custom domain (`mediatorok.by` or a subdomain) with the
  API on `api.` of that domain. A cookie from `*.workers.dev` read by
  `github.io` is a third-party cookie, and Safari and Firefox block those.
- **The `/login` and `/register` contract in [auth.ts](../app/lib/auth.ts) is
  replaced.** It returns `{ name, email }` with no session, which cannot
  satisfy B9.

## 8. Later: content management

Pages are filled from the live Tilda site by `npm run sync:live`. While Tilda
stays the editing tool, that is enough. Once the rebuild replaces it, staff
need somewhere to edit events, dates and prices. A headless CMS (Decap CMS,
which commits to this repo, or Sanity) does that, and also provides the price
list phase 2 needs. The CMS is chosen when Tilda's retirement is decided, not
before.

## 9. Order of work

| # | Item | Server? | Size | Unblocks |
|---|------|---------|------|----------|
| 1 | Daily rebuild (section 5) | No | Minutes | Correct event status |
| 2 | Forms API (section 4) | Yes | 1–2 days | Registrations, leads, newsletter |
| 3 | Price data as one source (section 6) | No | Depends on unresolved prices | Payments |
| 4 | Payments (section 6) | Yes | 3–5 days, plus the provider contract | Online payment |
| 5 | Accounts (section 7) | Yes | Only if needed | Paid materials |
| 6 | CMS (section 8) | Partly | When Tilda is retired | Staff editing |

## 10. Open decisions

| # | Decision | Owner | Blocks |
|---|----------|-------|--------|
| D1 | The submission backend and notification inbox (Q-28): which Telegram chat and which e-mail receive requests | Owner | Phase 1 |
| D2 | Where personal data may be stored, and for how long (section 4.3) | Owner, legal adviser | Phase 1 launch |
| D3 | Mailing service for the newsletter | Owner | Newsletter routing |
| D4 | Payment provider, and the resolved price of every item | Owner | Phase 2 |
| D5 | Whether accounts are needed, and for what | Owner | Phase 3 |
| D6 | Custom domain for the site and API | Owner | Phase 3 |
