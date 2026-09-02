# Content parity with mediatorok.by

Checked against the live site on the date of the last commit touching this file.
The rebuild was seeded from an export taken months earlier, and the live Tilda
site kept moving, so parity has to be re-checked rather than assumed.

## Page inventory

Live sitemap: 76 URLs. Rebuild: 69 content routes (plus the functional pages
below, which have no Tilda counterpart by design).

### On the live site, no route here

| Slug | Assessment |
|---|---|
| `conflictconsulting` | Real content — no route here. Needs building. |
| `summerschool2026` | Real content — no route here. Needs building. |
| `teenschool` | Overlaps `school` / `schoolofyoungmediator`. Which slug is canonical is an open question. |
| `new_technologies` | Duplicate slug of `newtechnologies`, which exists here. Redirect. |
| `jajdajizni` | Duplicate slug of `zhazhdazhizni`, which exists here. Redirect. |
| `error`, `page1463…html` ×2 | Tilda system pages. Ignore. |

### Here, not on the live site

`conflictdiagnostics` and `mediationdocuments` — declared in the navigation but
with no Tilda counterpart, so there was nothing to migrate. Content needed.

Added by this rebuild, deliberately without a counterpart: `/search`,
`/account`, `/cart`, `/favourites`, `/audience/*`.

## Date drift

Fixed in the hand-written pages, verified against the live listings:

| Programme | Was | Now |
|---|---|---|
| Семейная медиация | 1 июня | с 1 сентября |
| Обучение медиации (дистанционно) | 1 июня | 31 августа |
| Обучение медиации (очно, Минск) | 13 июня | 22 августа |

**Практическая конфликтология** has no start date shown. Ours was stale, and the
live page's replacement is the stray «С 1-го апреля» fragment previously
identified as a copy error. It needs a date from the client.

## Known remaining drift

`app/lib/pageBlocks.ts` is generated from the original scrape, so body copy on
migrated pages can still quote old dates and prices. The hand-written pages are
current; the manifest needs a re-scrape to match. Until then, treat page body
copy as of-its-time and the page metadata and cards as current.

This is the structural reason to move dates and prices into the content model
(`app/types/content.ts`) rather than leaving them in prose: prose cannot be
checked for staleness automatically.
