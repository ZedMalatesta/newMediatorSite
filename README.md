# МедиаторОк Проф

The rebuild of [mediatorok.by](https://mediatorok.by), the site of the
training and practice institution «МедиаторОк Проф»: mediator training,
mediation and psychological counselling, in Minsk.

It is a Next.js static export, staged on GitHub Pages at
<https://zedmalatesta.github.io/newMediatorSite/>. The live Tilda site is the
source of the content; this repository is the source of how it is presented.

## Commands

```sh
pnpm install
pnpm dev                 # http://localhost:3000
pnpm test                # unit and component tests
pnpm test:coverage       # the same, with the 90% coverage gate the deploy uses
pnpm lint
pnpm build               # static export into out/
pnpm sync:live           # refresh page content from the live site
pnpm audit:pages         # check every page against its live page
pnpm build:search        # regenerate the search index
```

## Documentation

| Document | What it covers |
|----------|----------------|
| [specifications/page-specification.md](specifications/page-specification.md) | How every page is built, and the rules R1–R11 it keeps |
| [specifications/backend-specification.md](specifications/backend-specification.md) | Forms, payments and accounts: what the server side needs, in build order |
| [specifications/launch-specification.md](specifications/launch-specification.md) | Moving from staging to the site's own domain |
| [specifications/agent-skills-specification.md](specifications/agent-skills-specification.md) | Working on this project with Claude Code's agent skills |
| [docs/INTEGRATION.md](docs/INTEGRATION.md) | The environment variables that connect forms, sign-in and payment |
| [docs/CONTENT-PARITY.md](docs/CONTENT-PARITY.md) | Content parity with the live site |

## Deploy

Every push to `main`, and a nightly schedule, runs
[.github/workflows/deploy.yml](.github/workflows/deploy.yml): lint, tests with
coverage, build, link check and page audit. Any failure stops the deploy.
