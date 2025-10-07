# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Summary
- This is an Astro single-page landing site that uses React (via @astrojs/react) and Tailwind CSS.
- Purpose: marketing/lead-collection landing page for a construction-industry personal product.
- Important: there is no test runner, no tailwind.config.* and no CLAUDE.md prior to this file.

Quick commands
- Install dependencies: npm install
- Local development: npm run dev (runs `astro dev` from package.json)
- Build production: npm run build (runs `astro build`)
- Preview production build locally: npm run preview (runs `astro preview`)
- Run astro CLI: npm run astro -- <args>

Tests and linting
- There is currently no test framework or lint script configured in package.json.
- If you need to run a single test, add a test runner (suggestion: Vitest or Jest + Testing Library) and a script, for example:
  - Install: npm install -D vitest @testing-library/react @testing-library/jest-dom
  - Script example in package.json: "test": "vitest"
  - Run a single test file: npx vitest run path/to/test-file.test.ts --run
- Do not add tests or test-runner configuration without the user's request.

High-level architecture
- Astro entrypoints
  - src/pages/*.astro — route files (index.astro is the main landing page; demo.astro is a component demo page)
  - src/layouts/Layout.astro — site shell (loads global.css and provides HTML structure and slot)
- Components
  - src/components/*.astro — Astro components (Welcome.astro is used on index)
  - src/components/react/*.tsx — React components that are hydrated on the client (InteractiveCard.tsx, SimpleButton.tsx)
    - These components are being hydrated with client directives such as client:load in pages/demo.astro.
    - They rely on lucide-react icons and Tailwind utility classes.
- Assets & styles
  - src/assets/ — images and SVGs used by the site (astro.svg, background.svg)
  - src/styles/global.css — imports Tailwind (currently contains `@import "tailwindcss";`)
  - There is no tailwind.config.* in the repository; Tailwind is present in package.json dependencies and integrated into Vite via @tailwindcss/vite in astro.config.mjs.
- Config
  - astro.config.mjs — defines integrations: @astrojs/react and Vite plugin @tailwindcss/vite
  - package.json — lists scripts and dependencies (astro, @astrojs/react, react, react-dom, tailwindcss, lucide-react)
- Types
  - src/types/react.d.ts — small ambient module declarations for .astro and @astrojs/react

Notes for future Claude Code workers
- Typical tasks you will be asked to do:
  - Add or edit a landing page section (edit src/pages/index.astro and components/Welcome.astro)
  - Add a new React widget (place TSX under src/components/react and hydrate from a page)
  - Wire up lead capture (backend or third-party form integration) — create a new integration and document env vars. Do not commit secrets.
- When running locally use npm run dev. When modifying Tailwind styles remember there is no existing tailwind.config — if custom colors or utilities are required, create tailwind.config.cjs/mjs in project root and update global.css accordingly.
- Hydration notes: client directives (client:load, client:idle, etc.) are used to control when React components mount. Demo page uses client:load for the interactive examples.

Files and places to check first
- package.json — review scripts and dependencies before running commands
- astro.config.mjs — confirms React integration and Tailwind Vite plugin
- src/pages/index.astro and src/components/Welcome.astro — main landing markup
- src/components/react/* — React components and client-side behavior
- src/styles/global.css — Tailwind import and global styles

When something is missing or ambiguous
- If tests, linting, or Tailwind config are requested, open an issue or ask the user which tooling they prefer before adding files.
- If adding lead-capture (forms, API endpoints), request the backend/third-party provider details (endpoint, field names, auth) and preferred storage (CRM, Google Sheets, webhook) before implementing.

Change suggestions (optional)
- Add a tailwind.config.* to define the color palette and enable JIT options.
- Add a minimal test setup (Vitest + Testing Library) and a lint config (ESLint + Prettier) if CI is required.

End of file
