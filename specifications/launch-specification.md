# Launch specification

How the site moves from its staging address to its own domain, what has to be
true before it does, and the order of the switch.

Today the rebuild is served from GitHub Pages at
`https://zedmalatesta.github.io/newMediatorSite/`, a staging copy, while the
live site is still the Tilda build at `https://mediatorok.by`. Launch means
pointing a domain (normally `mediatorok.by` itself) at this site.

## 1. The rules

| # | Rule | What it rules out |
|---|------|-------------------|
| L1 | **The staging copy is never indexed.** Until the site is built for its real domain, every page carries `noindex` and `robots.txt` lists no sitemap. Crawling stays allowed: a crawler blocked by `robots.txt` never reads the `noindex`, and a page indexed earlier stays indexed. | Search engines treating the GitHub copy as a duplicate of mediatorok.by. |
| L2 | **DNS is switched only after every form delivers** (backend specification, phase 1). | Registrations Tilda receives today going nowhere from the moment of the switch. |
| L3 | **Every address of the live site still answers after the switch**, as a page or a forwarding page. | Old links, bookmarks and search results ending in a 404. |
| L4 | **Visitor statistics continue in the same Yandex.Metrika counter** (`105878977`). | A break in the owner's analytics on launch day. |
| L5 | **The switch can be undone the same day.** Tilda stays paid for and published until the new site has run for four weeks. | Having no way back if something is found after launch. |
| L6 | **Existing DNS records are kept.** Only the records for the website change. | Mail or a domain verification breaking because its record was deleted. |

## 2. What a new domain changes

Nothing in the code: the address comes from build settings.

| Setting | Staging (today) | Own domain | Used by |
|---------|-----------------|------------|---------|
| `BASE_PATH` | `/newMediatorSite` | empty | Every link and image ([next.config.ts](../next.config.ts)) |
| `NEXT_PUBLIC_SITE_URL` | unset (defaults to `https://zedmalatesta.github.io`) | `https://mediatorok.by` | Canonical URLs, sitemap, `robots.txt`, Open Graph, and L1: a `github.io` address is never indexed ([site.ts](../app/lib/site.ts)) |
| `check-links.py` argument | `/newMediatorSite` | `""` | The deploy's link check |

All three are in [deploy.yml](../.github/workflows/deploy.yml).

### 2.1 On GitHub Pages

1. Settings → Pages → Custom domain: enter the domain. The deploy uses
   Actions, so no `CNAME` file is needed.
2. Account Settings → Pages: verify the domain, so no other repository can
   claim it.
3. DNS:

   | Name | Type | Value |
   |------|------|-------|
   | `@` | `A` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
   | `@` | `AAAA` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
   | `www` | `CNAME` | `zedmalatesta.github.io` |

4. Once the certificate is issued, turn on **Enforce HTTPS**.

GitHub then redirects the staging address to the domain.

### 2.2 On another host

`out/` is plain static files; Cloudflare Pages, Netlify and Vercel all serve
it. Use the same settings, and keep lint, tests, the link check and the page
audit as steps that must pass before publishing. Cloudflare Pages is the
natural choice if the API is a Cloudflare Worker (backend specification,
section 3): site, API, bot check and DNS in one account.

## 3. Before the switch

### 3.1 Code

- [ ] The staging copy is kept out of search engines (L1).
- [ ] Yandex.Metrika is on the site, loaded only on the real domain (L4).
- [ ] A Russian 404 page.
- [ ] The site rebuilds daily, so event status stays current (backend
      specification, section 5).
- [ ] No `create-next-app` leftovers in `public/` or the README.

### 3.2 Backend

- [ ] The forms API is live and every form kind has been tested end to end
      against the staging copy (L2).
- [ ] The privacy policy (`/politicaobrabotkidannyh`) names where form data
      now goes: the API host, Telegram, the mailing service.

### 3.3 Content

- [ ] `npm run sync:live` run within the last day, and `npm run audit:pages`
      passes.
- [ ] Every address in the live sitemap opens a page or forwards to one (L3).
- [ ] Unresolved prices settled with the owner.
- [ ] Consent confirmed for every individual's phone number on event pages
      (page specification, R11).
- [ ] Link previews checked in Telegram and VK: title, description, image.

### 3.4 Testing on the staging copy

- [ ] Phone and desktop at 390, 1024, 1280 and 1440 px (page specification,
      R10), in Safari, Chrome and Firefox.
- [ ] Lighthouse: performance and accessibility on the home page and one
      course page.

### 3.5 Access and DNS

- [ ] Access confirmed to the domain's DNS panel, Google Search Console and
      Yandex Webmaster.
- [ ] Every current DNS record written down (L6).
- [ ] DNS TTL lowered to 300 seconds a day before the switch.

## 4. The day of the switch

1. Change the three settings in section 2 and merge to `main`; wait for the
   deploy to pass.
2. Set the custom domain in GitHub and change the website's DNS records only.
3. When the certificate is issued, enable **Enforce HTTPS**.
4. Check: the home page, three course pages, one old alias URL, a test form
   submission, that pages no longer carry `noindex`, and that `robots.txt`
   points to a `sitemap.xml` on the real domain.
5. Submit `sitemap.xml` in Google Search Console and Yandex Webmaster.

**To undo:** point the records back to Tilda (L5). With the TTL at 300 seconds,
visitors are back on Tilda within minutes.

## 5. After the switch

- Watch Metrika and the form inbox daily for the first week.
- Raise the DNS TTL back after a week without problems.
- Retire the Tilda site after four weeks (L5).
