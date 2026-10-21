# MediatorOK site

Next.js static rebuild of https://mediatorok.by, deployed to GitHub Pages from `main`.

Matt Pocock's agent skills are installed in `.claude/skills/` (`scripts/install-pocock-skills.sh`).
How to use them on this project, and the rules for doing so: `specifications/agent-skills-specification.md`.

## Agent skills

### Issue tracker

Issues and specs live in this repo's GitHub Issues (ZedMalatesta/newMediatorSite), handled with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five default roles, each label named after its role: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root, created when a term or decision is first settled. See `docs/agents/domain.md`.
