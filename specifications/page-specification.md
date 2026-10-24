# Page specification

How every page of this site is built, and the rules it has to keep.

The site is a rebuild of <https://mediatorok.by>. The live site is the source
of truth for what each page says and shows; this document is the source of
truth for how that content is presented here. It was written from the review
of `/trainers`, `/psycologicalcounseling` and `/fordialogue`, where the same
defects kept appearing, and the decision to revise every page against them.

A page that breaks one of the rules below is a bug, whether or not it builds.
Most of the rules are checked by `npm run audit:pages` (see
[Verification](#8-verification)).

## 1. The rules

| # | Rule | What it ruled out |
|---|------|-------------------|
| R1 | **Every section of the live page is on the page, in the live order.** | `/psycologicalcounseling` had lost two of its six sections. |
| R2 | **A section is shown once.** A page never repeats in an imported block what a hand-built section already says, or the reverse. | `/fordialogue`, `/mediation` and a dozen other pages retold the live page by hand and then appended the import of the same page underneath. |
| R3 | **An illustration is shown whole.** It is fitted into its frame, never cut to it. | Drawings cut off at the head or feet by fixed 4:3 and 16:7 boxes. |
| R4 | **A picture stays in the section it illustrates.** | The first illustration of a page being moved into the hero, or dropped where the hero did not show it. |
| R5 | **A person's photograph is that person's.** | Four portrait files that held someone else; Екатерина Бутрим shown without her photo. |
| R6 | **A card's words and picture stay together.** Title, text and icon of one item are never split into a list of titles, a list of texts and a strip of icons. | The raw import on every course page. |
| R7 | **The hero says the title; the body does not say it again.** | The live page's opening block repeated under every hero. |
| R8 | **What the live page keeps in a popup stays behind a click.** | Eight trainers' full CVs flattened onto `/trainers` as one 80-paragraph block. |
| R9 | **Text is taken from the live page, not retyped.** Prices, dates, programme lists and the wording of a section come from the synced data, so they change when the live page does. | Typed copies of prices on `/mediation` and `/psycologicalcounseling` that no longer matched the live ones. |
| R10 | **A page fits its viewport.** Nothing in the header or body is pushed off-screen or wraps into a second line at 390, 1024, 1280 or 1440 px. | The menu wrapping and pushing the cart and account link off the right edge. |
| R11 | **Personal phone numbers and e-mail addresses of individuals are published only with that person's consent.** The institution's own contacts are used instead. | — |

Where trimming a picture is allowed (R3):

- **Gallery tiles.** Several photographs in a grid are trimmed to a common
  4:3 tile so the grid lines up - and every tile opens the whole picture on
  click.
- **Portraits** in a people grid are trimmed to a square, anchored to the top
  so the face is kept.
- **Hero backdrops**, which are a tinted background, not content.
- **A landscape slide** fills the slider frame; an upright or square slide is
  shown whole on a dark ground.
- **Blank margins.** A file that is an illustration on a much larger empty
  canvas may be trimmed to the illustration. This needs a waiver naming the
  file (see [8.2](#82-waivers)).

Nothing else is trimmed.

## 2. Where the content comes from

```
mediatorok.by ──▶ npm run sync:live ──▶ app/lib/pageBlocks.ts   content of every page
                  (scripts/sync-live.ts) app/lib/pageForms.ts    the forms each page offers
                                         app/lib/liveNav.ts      the menu
                                         app/lib/liveDates.ts    start dates announced on course pages
                                         scripts/live-assets.json  live image URL → file in public/
```

`npm run sync:live` fetches every page in the live sitemap into `.cache/live/`
and regenerates the four files; `npm run sync:live -- --offline` regenerates
them from the cache without fetching. The generated files are committed and
never edited by hand.

The live site is a Tilda build. Every page is a sequence of numbered blocks,
and every element an editor can type into carries a `field` id; the items of a
repeated block share one (`li_title__1567`, `li_descr__1567`, `li_img__1567`).
The sync reads by that id, which is what lets it keep a card's title, text and
picture together (R6).

### 2.1 The block

One live block becomes one `PageBlock`:

| Field | Meaning |
|-------|---------|
| `role` | What the block is on the live page: `cover`, `feature-image`, `band-image`, `card-grid`, `icon-row`, `person`, `gallery`. |
| `heading` | The block's heading, if it has one. |
| `body` | What it says under the heading, in written order. Each line is a paragraph or a list item, and carries an `href` when the whole line is a link. |
| `cards` | Its repeated items, in order: `title`, `body`, `image`, and `href` when the card leads to a page. |
| `images` | Every picture in the block. Pictures that belong to a card are also on that card. |
| `links` | The block's buttons. |
| `slider`, `cycle`, `arrows`, `dots`, `zoomable` | How the live block's pictures behave. |
| `videos`, `accordion`, `map` | A video embed, collapsible question-and-answer items, the office map. |
| `popupCards` | The block is a set of people whose details open in a popup (R8). |

`subheadings`, `paragraphs` and `listItems` are the older flat reading of the
same block. New code uses `body` and `cards`.

What the sync decides on the way:

- **Cover.** A page's cover picture is the background of the cover block it
  opens with, and nothing else (R4). `pageCover[page]` is set only for those
  pages. Listing cards fall back to the page's first wide photograph through
  `cardImage()`.
- **Links.** A link to another live page is kept as a path when that page
  exists here, and dropped when it does not; a link to another site is kept as
  it is. A card is better unlinked than linked to a 404.
- **Popups.** For a people block, only what is visible before a click is read.
- **Price tables.** The package total sits on the button under its column, so
  the button label is read as the package's price.
- **Chrome.** A block that appears on most pages - menu, footer, the footer
  form - is not content.

## 3. The three kinds of page

Every page is a **hero**, a **body** and usually a **form**. They differ in
who builds the body.

### 3.1 Imported page

```tsx
<EventHero page="conflictology" eyebrow="…" title="…" subtitle="…" meta={[…]} />
<PageBlocks page="conflictology" />
<EventSignup />
```

The body is the live page, rendered by `PageBlocks`. Forty-seven pages are
built this way: every course, webinar, training and past event.

`EventHero` takes the page key and uses the live cover picture as its
backdrop. `imageSrc` is only a fallback for a page with no live cover, and is
not used when the body already shows that picture (R4).

### 3.2 Hand-built hero and form, live body

The same three parts, with a hero and a form designed for the page:

| Page | Composition |
|------|-------------|
| `/fordialogue` | `FordialogueHero` → `PageBlocks` (omits the two closing blocks) → `FordialogueCta` |
| `/intervision` | `IntervisionHero` → `PageBlocks` → `IntervisionSignup` |
| `/mediation` | `MediationHero` → `PageBlocks` → `MediationContactForm` |
| `/divorceservice` | `DivorceHero` → `PageBlocks` → `DivorceSignup` |
| `/coupletherapy` | `CourseHero` → `PageBlocks` → `CourseSignup` |
| `/corporatemediatorok` | `CorporateHero` → `PageBlocks people={false}` → `CorporateTrainers` → `CorporateSignup` |
| `/negotiationleague` | `NegotiationHero` → `PageBlocks` → `NegotiationSignup` |
| `/school` | `SchoolHero` → `PageBlocks` → `SchoolSignup` |
| `/summerintensive2026` | `PastEventBanner` → `IntensiveHero` → `PageBlocks` → `IntensiveSignup` |
| `/summerschool2025` | `Summerschool2025Hero` → `PageBlocks` → `Summerschool2025Cta` |
| `/contacts` | `ContactsInfo` → `PageBlocks` (the map) → `ContactsForm` |
| `/pravo` | `PageBlocks` → `PravoList` |
| `/literature`, `/news` | own list → `PageBlocks` |
| `/dogovoroferty`, `/politicaobrabotkidannyh` | title band → `PageBlocks`: the legal text as published, with nothing summarising it |

A hand-built section in the body of one of these pages is allowed only when it
does something the import cannot - a form, a dialog, a catalogue with
favourites and a cart. It then **replaces** the live block it presents, which
is named in `omit` so it is not shown twice (R2):

```tsx
{/* The two closing blocks - the invitations and the contacts - are FordialogueCta. */}
<PageBlocks page="fordialogue" omit={["Как эксперт", "Наши контакты"]} />
<FordialogueCta />
```

A section that only rewords a live block is not allowed. That is the pattern
this revision removed, page by page. It matters most on the legal pages: the
summary that used to sit above the public offer named a different contracting
party than the offer itself.

### 3.3 Fully hand-built page

| Page | Why |
|------|-----|
| `/` | The home page: its own design and picture set. |
| `/psycologicalcounseling` | Six sections designed one by one on the live page's six. |
| `/aboutus` | History written around the mission quote; team, programmes, projects, requisites. |
| `/obuchenie` | The catalogue: tabs, favourites, cart. The live page's webinar list is placed under it with `only`. |
| `/trainers`, `/team` | People cards that open each CV in a dialog, as the live popups do (R8). |
| `/account`, `/cart`, `/favourites`, `/search`, `/thankyou` | Functional pages with no live content. |

A hand-built section still takes its wording and pictures from the synced page
wherever the live page has them (R9), through `app/lib/blockQuery.ts`:

```tsx
const formats = blockByHeading("psycologicalcounseling", "Форматы работы");
formats.cards.map((card) => /* card.title, card.image */)
```

The layout is designed here; the content stays whatever the live block says.

## 4. How `PageBlocks` renders

`app/components/ui/PageBlocks.tsx`. It renders **sections**: a heading with
everything the live page puts under it.

| Situation | What is drawn |
|-----------|---------------|
| The page's opening block (title and tagline) | Nothing - the hero carries it (R7). `lead` turns it back on. |
| A block with a heading | Starts a new section. Sections alternate white and light grey. |
| A block without a heading | Continues the section above it. |
| A heading with nothing under it | A small line above the heading of the section that follows. Dropped at the end of the page. |
| A "heading" longer than 110 characters | A paragraph - it is a sentence someone styled large. |
| A block identical to an earlier one | Nothing - Tilda keeps desktop and phone copies of some blocks. |
| Cards that are one line each | A checklist, in two columns when there are more than three. |
| Cards with an icon | Icon, title, text. A square 512 px pictogram is an icon too. |
| Cards with an illustration or photograph | The picture fitted (not cut) into a shared 3:2 or square frame, then title and text (R3). |
| Cards of a `person` block | Square portrait anchored to the top, name, description. |
| A card with `href` | The whole card is the link. |
| A single card | Title and text as a caption, with its picture beside it. |
| One picture and text | Text and picture side by side; the picture at its own proportions, narrower if it is upright. |
| One picture alone | At its own proportions, never larger than the file. |
| Several pictures | A slider if the live block is one; otherwise a grid whose tiles open full-size. |
| A line the block repeats as the opening of one of its cards | Said once. |
| Loose icons not attached to a card | Nothing - they are template decoration. |
| A whole line that is a link | A link. |
| A short line ending in a colon, or set in capitals | A sub-heading - the clause titles of the offer and the privacy policy. |
| A button to a sign-up form (`#popup:…`, Google Forms) | Nothing - the page ends in its own form. |
| Any other button (Telegram, a download, another page, the paid order page) | A button. |
| Accordion | Native `<details>` items. |
| Video | A click-to-load embed. |
| Map | The office map. |

Props:

| Prop | Use |
|------|-----|
| `page` | Key of the page in the manifest - the route segment. |
| `omit={[…]}` | Live blocks a hand-built section of the page already presents. Each is named by how its heading starts - or, for a block with no heading, its first line. |
| `only={[…]}` | Render just these blocks, to place one by hand. |
| `people={false}` | Leave out the popup people block, on a page that shows its people with its own cards and dialog. |
| `lead` | Show the opening block as well. |

Text passes through `app/lib/copyFilters.ts` on the way out: Tilda scaffolding
("Нажми на тренера…", empty price placeholders) is removed, and typos that
exist on the live site itself are corrected from the `LIVE_TYPOS` list.

## 5. Pictures

- A live image URL is mapped to a committed file in `scripts/live-assets.json`.
  An unknown URL is a new image: the sync downloads it to `public/images/live/`
  and adds it to the map. Re-running never renames what is there.
- **Portraits** live in `public/images/experts/`, one file per person, named for
  that person. Each was checked against the name the live site prints beside
  the photo (R5):

  | File | Person |
  |------|--------|
  | `shulga.jpg` | Оксана Шульга |
  | `usenko.jpg` | Алексей Усенко |
  | `boyko.jpg` | Марина Бойко |
  | `dankova.png` | Лариса Данькова |
  | `dzhanashia.jpg` | Арсен Джанашиа |
  | `endzheevsky.jpg` | Александр Енджеевский |
  | `gabryanchik.jpg` | Александра Габриянчик |
  | `ragulina.jpg` | Елена Рагулина |
  | `butrim.jpg` | Екатерина Бутрим |
  | `zhuravleva.jpg` | Анна Журавлёва |

  Replacing one of these files replaces that person everywhere. Before
  overwriting a file, check `live-assets.json` for other live images mapped to
  it - a group photo once shared a portrait's file name.
- A picture is assigned by reading the live page, never by guessing from a
  file name.

## 6. Header

`app/components/layout/Navbar/Navbar.tsx`. Two rows (R10):

1. Logo · search · Instagram and Facebook · favourites · cart · account ·
   menu button.
2. The menu, in a row of its own, shown from 1280 px where its nine items fit
   on one line. Below that the same links are in the slide-in `MobileMenu`.

On a phone the search has a row to itself and the logo is smaller, so the menu
button stays on screen. The menu items come from the live menu
(`app/lib/liveNav.ts`); an item that only opens a submenu on the live site is
a button here, not a link to nowhere.

## 7. Forms

- Every form is `SiteForm`, rendered from field definitions. Where the live
  page has its own registration form, the page asks what that form asks
  (`pageForms`).
- A page's main button opens the form in a dialog where the live page opens a
  popup, and scrolls to the form at the foot of the page otherwise
  (`SignupCta`).
- The generic lead form in the footer steps aside on any page that has a form
  of its own.
- Forms are delivered to `NEXT_PUBLIC_FORM_ENDPOINT`. Until that is set a
  submission tells the visitor the form is not connected. See
  `docs/INTEGRATION.md`.

## 8. Verification

```sh
npx tsc --noEmit                       # types
npm run lint                           # lint
BASE_PATH=/newMediatorSite npm run build
python3 scripts/check-links.py /newMediatorSite   # links, base path, images
npm run audit:pages                    # every page against its live page
```

The deploy workflow runs all of them; a failure stops the deploy.

### 8.1 The audit

`npm run audit:pages` reads the exported site in `out/` (or a running one:
`npm run audit:pages -- http://localhost:3000`). For every block of every live
page it looks for the block's own sentences and pictures in that page's
`<main>` and reports:

| Finding | Meaning | Rule |
|---------|---------|------|
| `MISSING` | More than half of the block's sentences are not on the page. | R1 |
| `DUPLICATED` | They are there more often than on the live page. | R2 |
| `NO PICTURE` | The section is there; a picture it has on the live page is not. | R4, R5 |
| `CROPPED` | An illustration is drawn with `object-cover`. | R3 |

`npm run audit:pages -- out <page>` lists every block of one page with its
result.

It already allows for what is deliberate: the opening block the hero rewords,
popup content, gallery tiles and portraits, Tilda's duplicate block variants.

What it cannot see: a section **reworded** by hand next to the import of the
same block. Two different wordings of one thing read as two things. That is
what rule 3.2 forbids, and it is caught by reading the page.

### 8.2 Waivers

Anything else a page leaves out on purpose is named in
`scripts/audit-waivers.json`, with the reason:

```json
"fordialogue": {
  "Наши контакты": "FordialogueCta names the contacts without the personal phone number and e-mail, which need the person's consent"
}
```

A key is the start of the block's heading; a key that is part of a picture's
path waives that picture; `@pictures` waives the picture checks for the whole
page. A waiver with an empty reason is ignored. The current waivers:

| Page | Waived | Reason |
|------|--------|--------|
| `/aboutus` | The history; the three team biographies | Written by hand around the mission quote; full CVs are on `/team` and `/trainers`. |
| `/fordialogue` | The two invitations; the contacts | Shown by `FordialogueCta` as cards; personal phone and e-mail withheld (R11). |
| `/` | The programme list; all pictures | Hand-designed, with its own picture set and the catalogue data. |
| `/obuchenie` | The two programme lists | Shown by the catalogue. |
| `/team`, `/trainers` | The two or three points under the title | They are the bullet line of the hero. |
| `/trening2024` | Three link captions | They are the training cards at the top of the page. |
| `/psycologicalcounseling` | `02-image.jpg` | The file is an illustration on a tall blank canvas; only the blank margins are trimmed. |

## 9. Changing things

**The live site changed.** Run `npm run sync:live`, then `npm run build:search`,
then the checks in section 8. Imported pages and every section that reads
through `blockByHeading` follow on their own. If the audit reports `MISSING`
on a hand-built page, the live page gained a section the page has to place.

**A new live page.** Add `app/<slug>/page.tsx` as in 3.1. The sync has already
put its content in the manifest.

**A page needs a designed section.** Build it as a component of that page, feed
it from the live block (3.3), and name the block in `omit` on the page's
`PageBlocks` (3.2). Run the audit: the block must come out `ok`, not
`DUPLICATED`.

**A picture looks wrong.** If it is cut, it is being drawn with `object-cover`
somewhere it should not be (R3). If it is the wrong person, fix the file or
the `live-assets.json` entry (section 5) - not the page.

**A block renders badly on an imported page.** Fix the rule in `PageBlocks` or
in the sync, so that every page with that shape of block is fixed. A
page-specific patch is the last resort.

## 10. Known gaps

- Forms are not delivered anywhere until `NEXT_PUBLIC_FORM_ENDPOINT` is set.
  The live site registers most courses through Google Forms; those links are
  in the manifest (`links`) but are not shown, because each page ends in its
  own form.
- Sign-in and payment are seams with no backend (`docs/INTEGRATION.md`).
- Opening hours are not published anywhere on the live site and are unset.
- "Контактные лица" blocks on the event pages show the phone numbers the live
  page publishes for the event's contact people. R11 has not been applied to
  them; whether each person has agreed should be confirmed with the owner.
