# WordMatrix — 3D Knowledge Graph

An interactive **3D force-directed graph** built with Next.js 15, React 19, and `three-forcegraph`.

Themes, words, and secrets render as glowing nodes with particle links. Drag to orbit, scroll to zoom, click a node to focus.

## Stack

- Next.js 15 (App Router)
- React 19
- three.js + three-forcegraph + three-spritetext
- TypeScript

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Import this repo at [vercel.com/new](https://vercel.com/new) — framework preset auto-detects as Next.js.

## Data

Edit `lib/data.ts` to swap themes, words, and secrets. Nodes have `kind`: `theme` | `word` | `secret`.
