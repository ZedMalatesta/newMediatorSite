# Parity with mediatorok.by

The rebuild follows the live site through a sync, not by hand. This records how
that works, what is derived from it, and where the rebuild deliberately differs.

## Keeping in step

```bash
npm run sync:live              # fetch the live site and regenerate
npm run sync:live -- --offline # regenerate from the cached fetch
npm run build:search           # rebuild the search index afterwards
npm run audit:pages            # after a build: every page against its live page
```

How a page is built from the synced content, the rules it has to keep and what
the audit checks are in [specifications/page-specification.md](../specifications/page-specification.md).

The live site is a Tilda build, so every page is a sequence of typed records.
`scripts/sync-live.ts` reads them and writes:

| File | What it holds |
|---|---|
| `app/lib/pageBlocks.ts` | Per page, in live order: each block's text, images, videos, accordion items, slider/zoom behaviour |
| `app/lib/pageForms.ts` | The form each page offers - fields, popup or inline, button label - plus the footer lead form |
| `app/lib/liveNav.ts` | The site menu |
| `app/lib/liveDates.ts` | Start dates as each programme page announces them |

`scripts/live-assets.json` maps each live image URL to the committed file, so a
re-run never renames or duplicates images; a URL it has not seen is downloaded
to `public/images/live/`.

Run it when the live site changes. Dates in particular: the live site moves its
course dates every few weeks, and they were stale here twice while they were
typed by hand. They are now quoted from `liveDates.ts`.

## What follows the live site

- **Content** of every migrated page, block for block.
- **Menu** - `navLinks` is derived from `liveNav`. Items that only open a
  submenu on the live site («Об учреждении», «Услуги», «Наши проекты»,
  «Методическая помощь») are buttons here too, not links.
- **Videos** - 8 across 5 pages, in the block the live page has them.
- **Accordions** - 7 pages.
- **Forms** - the fields each live form asks for; popup where the live page
  opens a popup (18 pages), inline otherwise; the lead form at the foot of pages
  with no form of their own.
- **Pages** - all 71 content pages. `/new_technologies`, `/jajdajizni` and
  `/summerschool2026` forward to the pages they duplicate (`app/lib/aliases.ts`).

## Where the rebuild deliberately differs

| Live site | Here | Why |
|---|---|---|
| Map shows New York | Map of the published Minsk address | The live map block was never configured - its coordinates are Tilda's default |
| Newsletter popup opens itself 10s after load, up to 3 times | Sign-up in the footer | Same offer, without interrupting |
| «Документы для медиации», «Диагностика конфликтов» link to `/error` | Link to real pages | The live site has no content there; this one does |
| Typos («местоположениев», «Заполнить заяку») | Corrected | `app/lib/copyFilters.ts` |
| Tilda commerce artefacts in trainer cards | Removed | Same file |
| Players load with the page | Load on play | No third-party requests until someone watches |
| - | Search, audiences, favourites, cart, account | Added by the change request; not on the live site |
| «Супружеская терапия» absent from the menu | Also absent; page still reachable | Follows the live menu |

## Not from the live site

These cannot be synced and still need the client:

- **Opening hours** - published nowhere on the live site (`site.openingHours`).
- **Form delivery** - forms validate and submit, but go nowhere until
  `NEXT_PUBLIC_FORM_ENDPOINT` is set. See `docs/INTEGRATION.md`.
- **Programme cards on the homepage** other than the three dated ones still
  carry typed dates («Июль 2026», «4–6 июля, Гродно»), mirroring a homepage
  block that is itself out of date on the live site.
- **Answer lists the live forms load at runtime** are not in its markup. Two are
  ported by hand in `app/lib/formFields.ts`; the rest fall back to free text.

## Checks

`python3 scripts/check-links.py /newMediatorSite` runs in the deploy workflow
after the build. It fails on a link to a page that was not exported, on a link
or image missing the base path, and on `href="#"`. The last two are invisible to
the build and to lint - they only 404 once deployed.
