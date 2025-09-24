# Repository Guidelines

## Project Structure & Module Organization
The Astro app lives in `src`, with routable pages under `src/pages`, shared UI in `src/components`, and data helpers in `src/utils` and `src/data`. Static assets (images, fonts, icons) belong in `public`, while generated bundles export to `dist`. Delivery automation sits in `scripts/` alongside the `delivery/` staging folder and the archived `deliveries/` output. Product specs and references are stored in `docs/`, and infrastructure code resides in `terraform/`.

## Build, Test, and Development Commands
Use `pnpm install` once to sync dependencies. Run `pnpm dev` (or `pnpm start`) for the local Astro dev server. Validate and bundle with `pnpm build`, which runs `astro check` before compiling. Preview the production build via `pnpm preview`. For release assets, execute `pnpm build:delivery` to build, stage, and zip the delivery package. Staging deployments rely on `pnpm deploy:staging`, and `pnpm clear:staging` clears the S3 bucket.

## Coding Style & Naming Conventions
Follow TypeScript + Astro defaults with two-space indentation. Components, layouts, and pages use PascalCase filenames (e.g., `ProductCarousel.astro`), while utilities and hooks stay camelCase (e.g., `useParallax.ts`). Keep Tailwind class order readable; Prettier with the Tailwind plugin enforces this—run `pnpm format` before committing or `pnpm format:check` in CI contexts. Co-locate component styles inside the component unless they are shared in `src/app.css`.

## Testing Guidelines
Static analysis currently hinges on `pnpm build` (which covers `astro check`) and manual QA in the dev server. When adding automated tests, place them adjacent to source files using the `*.test.ts` pattern and document the runner in this file. Always confirm interactive flows in the latest Chromium and Safari builds before approving UI changes.

## Commit & Pull Request Guidelines
Recent history follows Conventional Commits (`feat:`, `fix:`, `chore:`). Keep subjects under 72 characters and describe intent, not implementation details. Before opening a pull request, ensure `pnpm build` succeeds, attach relevant screenshots or recordings for visual work, link to tracked issues, and outline any delivery or Terraform impacts. Request review only after resolving TODOs and cleaning debug logs.

## Delivery & Deployment Notes
Use `scripts/prepare-delivery.js` and `scripts/create-zip.js` only on a clean build output; the scripts expect `dist/` to be fresh. When touching `terraform/`, document variable changes and verify affected AWS resources in the staging account prior to merging.
