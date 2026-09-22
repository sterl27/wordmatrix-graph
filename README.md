# WordMatrix — 3D Knowledge Graph

An interactive **3D force-directed graph** of word associations, themes, and hidden meanings — built with Next.js 15, React 19, and `react-force-graph-3d` (Three.js).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Stack

- Next.js 15 (App Router) + TypeScript
- `react-force-graph-3d` + `three`
- Custom glowing nodes, particle links, auto-rotation, click-to-focus

## Deploy

Pushes to `main` auto-deploy on Vercel.

## Data

Edit `lib/data.ts` to add themes, words, and secret nodes. Each node has a `group`: `theme`, `word`, or `secret`.
