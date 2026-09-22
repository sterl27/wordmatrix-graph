# WordMatrix Graph

Interactive 3D force graph for the WordMatrix vocabulary, built with Next.js 15, React Three Fiber, and drei.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Import this repo at https://vercel.com/new — framework auto-detects as Next.js.

## Data

Edit `lib/data.ts` to swap in your real categories, words, and secrets. Nodes have `group: "theme" | "word" | "secret"`.
