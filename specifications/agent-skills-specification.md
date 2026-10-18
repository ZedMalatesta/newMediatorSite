# Agent skills specification

How work on this project is done with Matt Pocock's agent skills, and the rules
it keeps.

The skills ([mattpocock/skills](https://github.com/mattpocock/skills), MIT) are
installed in `.claude/skills/`. A skill is a set of instructions Claude Code
loads when it is needed: you type `/grill-with-docs` and Claude follows that
skill's method instead of improvising. They come from a working engineer's
habits: agree on what to build before building it, work in small tested steps,
review against the spec, and keep the codebase easy to change.

The rules come first. Sections 2 to 7 are the guide: setup, the everyday flow,
which skill fits which situation, and keeping the set up to date.

## 1. The rules

| # | Rule | Skill | Why |
|---|------|-------|-----|
| S1 | **Agree on the change before building it.** Anything bigger than a one-line fix starts with an interview that settles every open question. | `/grill-with-docs` (`/grill-me` when there is no code involved) | Building on a misunderstanding is the most expensive mistake there is, and the one an agent makes most readily. |
| S2 | **Work that needs more than one session is written down as a spec and split into tickets** before any code. | `/to-spec`, then `/to-tickets` | Each ticket can then be built in a fresh session from what it says, without the original conversation. |
| S3 | **Code is written test-first, at seams agreed with you.** Until the repo has a test runner, the checks are `npm run lint` and `npm run build`, and the PR says so. | `/tdd`, `/implement` | Without a check that runs, nobody knows whether the change works. |
| S4 | **Every branch is reviewed against its spec and the repo's standards before its PR.** | `/pocock-code-review` | Code can follow every standard and still build the wrong thing, or the reverse. |
| S5 | **A pull request shows what changed, the evidence that it works, and how risky it is to merge.** | `/pr` | The reviewer decides from the description. |
| S6 | **The project's terms and hard-to-reverse decisions are written down and committed**: terms in `GLOSSARY.md`, decisions in `docs/adr/`. | `/grill-with-docs`, `/domain-modeling` | Each session starts from the project's own vocabulary instead of rediscovering it. |
| S7 | **Nothing confidential goes into GitHub Issues.** The repository is public: specs and tickets are readable by anyone. No client data, personal contacts or prices under negotiation. | `/to-spec`, `/to-tickets`, `/wayfinder` | Specs and tickets are published as soon as they are created, and an individual's phone number or e-mail is published only with their consent. |
| S8 | **The skills are not edited in place.** Project rules go in `CLAUDE.md`, tracker and label settings in `docs/agents/`, and a new skills version arrives through the installer as one reviewed commit. | `scripts/install-pocock-skills.sh` | The installer overwrites the skill folders; a local edit would be lost on the next update. |
| S9 | **The interview, the spec and the tickets happen in one session; each ticket is built in a fresh one.** `/retro` runs before the session is cleared. | `/implement`, `/retro` | The spec builds on the interview's reasoning, and a ticket must stand on its own. |

## 2. Before the first use

Nothing to install: the skills are part of the repository, so Claude Code picks
them up in any session opened in this folder. Type `/` in Claude Code and they
appear in the list.

The repo is already configured for them (see `CLAUDE.md` and `docs/agents/`):

| Setting | Value | Used by |
|---------|-------|---------|
| Issue tracker | GitHub Issues of `ZedMalatesta/newMediatorSite`, via `gh` | `/to-spec`, `/to-tickets`, `/triage`, `/wayfinder` |
| Triage labels | `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix` (all exist on GitHub) | `/triage` |
| Domain docs | `GLOSSARY.md` and `docs/adr/` at the root, created when first needed | `/grill-with-docs`, `/domain-modeling`, every skill that reads the project's vocabulary |

To change any of these, edit the file in `docs/agents/` directly. Run
`/setup-matt-pocock-skills` again only to switch to another tracker.

> **The repository is public.** `/to-spec`, `/to-tickets` and `/wayfinder`
> publish what you discussed as GitHub issues that anyone can read. Keep client
> data, prices under negotiation and personal contacts out of those
> conversations, or switch the tracker to local files (section 7).

## 3. Two kinds of skill

- **You call them.** `/grill-with-docs`, `/to-spec`, `/to-tickets`,
  `/implement`, `/implement-spec`, `/triage`, `/wayfinder`,
  `/improve-codebase-architecture`, `/retro`, `/handoff`, `/teach`, `/grill-me`,
  `/wait-what`, `/to-questionnaire`, `/ask-matt`, `/setup-matt-pocock-skills`.
  These only run when you type them; they orchestrate a whole piece of work.
- **Claude also reaches for them itself** when the task fits: `/tdd`,
  `/diagnosing-bugs`, `/pocock-code-review`, `/pr`, `/prototype`, `/research`,
  `/codebase-design`, `/domain-modeling`, `/grilling`, `/wizard`,
  `/writing-for-agents`. You can still type them to be sure.

Not sure which to use? Type **`/ask-matt`** and describe your situation. It
routes you to the right skill.

## 4. The everyday flow: from an idea to a merged change

Take a real task on this site: *"Registration forms should actually deliver
the enquiry somewhere."*

**Step 1: get interviewed.** Type `/grill-with-docs` and state the idea in a
sentence. Claude asks one question at a time (where do submissions go? who
reads them? what happens when the endpoint is down? which forms are in
scope?) until nothing is left open. Answer plainly, and say "you decide"
when you don't care. Along the way it writes the
project's words to `GLOSSARY.md` ("enquiry", "lead form", "popup form") and any
hard-to-reverse decision to `docs/adr/`. Those files then make every later
session shorter and more precise.

**Step 2: is it bigger than one session?**

- **No** (a fix, a single component): type `/implement` in the same session.
  It builds the change and reviews it.
- **Yes**: type `/to-spec`. It turns the interview into a spec and opens it as
  a GitHub issue; there is no new interview. Then type `/to-tickets` to split
  the spec into small tickets, each a thin slice that works end to end, each
  listing which other tickets block it. Stay in the same session from the
  interview to the tickets, so they all build on the same thinking.

**Step 3: build the tickets.** Either:

- `/implement` one ticket, then `/clear`, then the next ticket. Each ticket
  holds everything a fresh session needs; or
- `/implement-spec` to build the whole spec in one run: it starts sub-agents on
  every unblocked ticket at once and lands the work on one integration branch.

Either way the code is written test-first (`/tdd`) and finishes with
`/pocock-code-review`, which checks the diff twice in parallel: does it follow
this repo's standards, and does it do what the spec asked.

**Step 4: open the PR.** When Claude writes the pull request, `/pr` shapes the
description: the smallest picture that shows the change, before-and-after
evidence that it works, and how risky it is to merge.

**Step 5: look back.** Before clearing the session, type `/retro`. It suggests
changes to the environment, not the code (a check to add, a rule for
`CLAUDE.md`, a missing pointer), so the next build goes better.

## 5. Which skill for which situation

| Situation on this project | Type |
|---------------------------|------|
| "I have an idea for a page or a feature" | `/grill-with-docs` |
| Thinking through something that isn't code (pricing, a course launch) | `/grill-me` |
| The plan is agreed and fits in one session | `/implement` |
| The plan is agreed and is bigger | `/to-spec`, then `/to-tickets`, then `/implement` per ticket or `/implement-spec` |
| A huge, unclear effort (for example the online payments and personal account behind the live course shop) | `/wayfinder` |
| Something is broken and the cause isn't obvious ("the menu wraps at 1280 px", "images 404 on GitHub Pages") | `/diagnosing-bugs` |
| Review a branch or PR before merging | `/pocock-code-review` (Claude Code's built-in `/code-review` is still there too) |
| Bug reports and requests have piled up in GitHub Issues | `/triage` |
| "Is this component getting messy?" (spare time, every few days) | `/improve-codebase-architecture` |
| Try two layouts for a page before committing to one | `/prototype` |
| Look something up properly (Next.js static export rules, a GitHub Pages limit) | `/research` |
| A step only you can do (create a form-service account, add a GitHub secret) | `/wizard` writes a step-by-step terminal script for it |
| Claude's last answer didn't make sense | `/wait-what` |
| A decision needs the site owner's answer | `/to-questionnaire` writes the questions to send them |
| Continue the work in another folder, or hand it to a colleague | `/handoff` |
| Learn a concept properly, over several sessions | `/teach` |

## 6. Things to know on this project

- **There is no test runner yet.** `/tdd`, `/implement` and `/implement-spec`
  write tests first, and this repo has none set up. The first time, Claude will
  need one; agree to adding [Vitest](https://vitest.dev) (it fits Next.js and
  TypeScript), or tell it to use `npm run lint` and `npm run build` as the
  checks for that change.
- **Agreeing the seams.** Before writing a test, `/tdd` asks which public
  interfaces (seams) to test, and writes none at a seam you haven't confirmed.
  That question is the point: answer it.
- **Name clashes.** Upstream's `code-review` is installed as
  `/pocock-code-review` so it doesn't hide Claude Code's own `/code-review`.
  Some Claude Code versions also have built-in `/prototype` or `/research`
  commands; if typing the name runs something else, ask in words: "use the
  research skill from .claude/skills".
- **Where files land.** `/grill-with-docs` and `/domain-modeling` write
  `GLOSSARY.md` and `docs/adr/` (commit them; they are the project's memory).
  `/research` saves its findings as a Markdown file in the repo.
  `/improve-codebase-architecture` and `/handoff` write to your system's temp
  folder, so nothing extra lands in the repo.
- **Context.** Keep the interview, the spec and the tickets in one session.
  Each `/implement` starts fresh from its ticket. If a long session starts
  losing the thread, `/compact` at the end of a phase rather than in the
  middle.

## 7. Keeping the skills up to date

The skills are pinned to one upstream commit, recorded in
`.claude/skills/pocock-skills.json`.

```sh
scripts/install-pocock-skills.sh            # reinstall the pinned version
scripts/install-pocock-skills.sh <commit>   # move to another upstream commit
git diff .claude/skills                     # read what changed, then commit it
```

To move to the latest version, pass the newest commit of
<https://github.com/mattpocock/skills>, then update `PINNED` in the script so a
plain re-run stays there.

Re-running overwrites the skill folders, so **don't edit files in
`.claude/skills/` to customise behaviour**. Put project rules in `CLAUDE.md`
and tracker or label changes in `docs/agents/`; the skills read both.

- **Switch to local files for issues** (nothing published to GitHub): run
  `/setup-matt-pocock-skills` and choose *Local markdown*. Issues then live
  under `.scratch/<feature>/` in the repo.
- **Remove the skills**: delete the skill folders listed in
  `pocock-skills.json`, the `## Agent skills` block in `CLAUDE.md`, and
  `docs/agents/`.

The skills are MIT-licensed (`.claude/skills/pocock-skills.LICENSE`). Upstream
documents each one at `https://aihero.dev/skills-<skill-name>`.
