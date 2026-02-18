# Repository Guidelines

## Project Structure & Module Organization
This repository is a Docusaurus-based knowledge base.

- `docs/` — main documentation content (device guides, setup, troubleshooting).
- `static-pages/` — standalone pages (e.g., homepage/about).
- `static/` — assets served as-is (`static/img/...`, `static/uploads/...`, admin config).
- `src/` — theme overrides and custom UI/CSS (`src/css/custom.css`, `src/theme/...`).
- Root config: `docusaurus.config.ts`, `sidebars.ts`, `tsconfig.json`, `eslint.config.mjs`.

Prefer editing source files in `docs/` and `src/`; do not edit generated output in `build/` or `.docusaurus/`.

## Build, Test, and Development Commands
- `npm ci` — install exact dependencies from lockfile.
- `npm start` — run local dev server (default: `http://localhost:3000`).
- `npm run build` — production build into `build/`.
- `npm run serve` — serve built site locally.
- `npm run lint` — TypeScript check + MDX lint.
- `npm run check` — full CI-equivalent check (`lint` + `build`).

Run `npm run check` before opening a PR.

## Coding Style & Naming Conventions
- Content language is Russian; keep tone clear and instructional.
- Use meaningful front matter (`title`, `description`, `sidebar_label`, `sidebar_position`).
- Keep slugs stable unless a URL change is intentional.
- File naming: kebab-case for docs pages (e.g., `ready-made/portable.md`).
- Keep custom styles in `src/css/custom.css`; avoid ad-hoc inline complexity unless page-specific behavior requires it.
- For Markdown links/code: `[text](url)`, inline code with backticks.

## Testing Guidelines
There is no unit-test suite in this repo; validation is build/lint based.

- Required: `npm run check`.
- For UI/content changes, manually verify target pages in local dev server.
- For image updates, confirm files exist under `static/img/...` and references resolve.

## Commit & Pull Request Guidelines
- Use concise, imperative commit messages (examples from history: `Refine ...`, `Fix ...`, `Clean up ...`).
- Keep commits scoped to one logical change.
- PR should include:
  - short summary of changes,
  - affected paths/pages,
  - screenshots for visual changes,
  - linked issue (if applicable).

Also follow `.github/pull_request_template.md`.
