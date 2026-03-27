# AGENTS.md

Instructions for coding agents working in this repository.
Goal: ship small, safe, verifiable changes without regressing the public docs site.

## Project snapshot

- MeshWorks Wiki is a Russian-language Docusaurus 3.9.2 site deployed at `https://wiki.meshworks.ru`.
- Docs are served from `/` via `routeBasePath: '/'`.
- Search uses `@easyops-cn/docusaurus-search-local`.
- Navbar search is intentionally page-based on both desktop and mobile: it should open `/search`, not render an inline autocomplete widget in the navbar.
- CI has two layers:
  - fast gate: lint + unit tests + build
  - browser regression gate: Playwright against the built site

## Core principles

1. Correctness and safety first.
2. Prefer config and supported Docusaurus extension points over hacks.
3. Keep diffs minimal and scoped.
4. Verify every behavior change.

## Read-before-write checklist

Before editing, inspect:

- `README.md`
- `.github/workflows/ci.yml`
- `docusaurus.config.ts`
- nearby tests for the feature you are touching

## Project commands

### Setup

- Install deps: `npm ci`
- Dev server: `npm start`
- Production build: `npm run build`
- Serve built site: `npm run serve`

### Quality

- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Full fast CI-equivalent gate: `npm run check`

### Tests

- Unit/integration tests: `npm test`
- Browser regression tests: `npm run test:browser`
- Single Vitest file: `npm test -- path/to/file.test.tsx`

### Diagnostics

- Bundle analysis: `npm run build:analyze`
- Local Lighthouse should run against `npm run serve`, not the dev server.

### Runtime / versions

- Node.js: `>=20`
- Docker required: `no`
- Primary browser test target: Chromium via Playwright

## Repo-specific guardrails

- Do not reintroduce viewport-dependent SSR/CSR tree switching for navbar search or other shared layout elements unless explicitly requested.
- Keep search regressions covered:
  - unit tests in `src/theme/SearchBar/index.test.tsx`
  - browser smoke in `e2e/navbar-search.spec.ts`
- Keep homepage hydration/order regressions covered:
  - unit test in `src/components/homepage/ecosystem-stats.test.tsx`
  - browser smoke in `e2e/homepage-regression.spec.ts`
- Docs sidebar icons/highlights are metadata-driven via `sidebars.ts` (`customProps.icon`, optional `customProps.variant`) and rendered through swizzled `src/theme/DocSidebarItem/*`.
- Keep build perf guards passing:
  - `scripts/verify-build-indexes.mjs`
  - `scripts/verify-build-perf.mjs`
- Do not reintroduce route-prefix CSS mappings such as `href^='/...']::before` for sidebar icons; `verify-build-perf.mjs` now fails the build if they come back.
- `@easyops-cn/docusaurus-search-local` is currently trimmed intentionally:
  - `indexPages: false`
  - `language: ['ru']`
- Google Fonts are intentionally self-hosted from `static/fonts/`; do not reintroduce `fonts.googleapis.com` or `fonts.gstatic.com` into the critical path without a strong reason.
- `@docusaurus/plugin-rsdoctor` is opt-in only through `RSDOCTOR=true` and should not be enabled by default in normal builds.

## Perf notes

- The heaviest shared client costs currently come from:
  - `react-dom`
  - Docusaurus runtime/theme code
  - `prism-react-renderer` / `prismjs`
- Prism is not inflated by custom language config right now:
  - `themeConfig.prism.additionalLanguages` is empty
  - real fenced-code usage in repo content is small and mostly `text`, `json`, `bash`, `cpp`, `javascript`
- Do not claim “Prism can be safely trimmed by removing extra languages” unless you have verified an actual config change in this repo.

## Generated artifacts

- Do not edit generated output unless the task explicitly requires it:
  - `build/`
  - `coverage/`
  - `output/`
  - `test-results/`

## Expected final report

End work with:

- `What changed`
- `Where`
- `How to verify`
- `Risks/limitations`
- `Optional next steps`
