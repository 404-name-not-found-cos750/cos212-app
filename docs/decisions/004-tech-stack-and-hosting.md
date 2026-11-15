# 004 – Tech stack and hosting: plain HTML, CSS and JavaScript on a static host

- **Status:** Implemented; formal acceptance by the group was not recorded.
- **Date:** 2026-11-09
- **Issue:** #4

## Context
The app must run reliably during a live demo at the venue, be quick to build in under two weeks, and be easy for all five members to read and change. It needs no user accounts and no server-side data.

## Options considered
1. **React + Vite + TypeScript** (recommended in the plan) – good structure and type safety, but it needs a build step, Node tooling and some React knowledge from everyone. More things that can break before the demo.
2. **Plain HTML, CSS and JavaScript, no build step** – opens straight from `index.html`, works offline, and anyone can read and edit it. Less structure, so we keep the code split into small files by responsibility.

## Decision
**Plain HTML, CSS and JavaScript with no framework and no build step.** Progress is stored in the browser's `localStorage`. Hosting is any static host. We deploy the `app/` folder on **Vercel** (https://cos212-tree-hop.vercel.app), with an offline copy on the demo laptop as a backup.

## Rationale
- **Demo safety:** no build, no dependencies and no network needed. The app opens from a file even if the venue's Wi-Fi fails.
- **Team speed:** no setup for new contributors; any change shows up after a browser refresh.
- **Fits the requirements:** there is no backend data, so a static site is enough. `localStorage` keeps per-device progress without accounts or privacy concerns.
- **Structure without a framework:** the code is split by responsibility (`tree.js` model, `view.js` drawing, `game.js` / `random.js` / `tutorial.js` pages, `main.js` storage and routing). See `app/README.md`.

## Consequences
- **App:** no type checking, so we rely on unit tests for the tree logic (`tree.js`), run in CI.
- **Deployment:** Vercel, connected to the GitHub repo: every merge to `main` deploys to production and every PR gets a preview link. Plus an offline copy and a recorded backup video of the demo (#26).
- **SE document:** the architecture section describes this module layout and justifies the choice against the demo-risk and team-skill constraints.

## Update (2026-11-12): Vercel instead of GitHub Pages
The first plan was GitHub Pages. The repository stays private until the presentation, and GitHub Pages does not serve private repositories on a free organisation, so we deploy on Vercel instead. The app is static, so the move needed no code changes.
