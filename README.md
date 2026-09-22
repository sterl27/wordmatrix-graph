# WordMatrix — 3D Knowledge Graph

A glowing, interactive 3D force-directed graph built with **Next.js 15**, **React Three Fiber**, and custom GLSL shaders.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Import this repo at [vercel.com/new](https://vercel.com/new). Framework auto-detects as Next.js.

## Data

Edit `lib/data.ts` to swap themes, words, and secrets. Nodes link automatically via the `links` array.

- **Themes** (6): Language, Matrix, Signal, Memory, Code, Void
- **Words** (13): Lexicon, Syntax, Semiotics, Grid, Lattice, Vector, Noise, Channel, Entropy, Trace, Archive, Palimpsest, Algorithm, Glyph, Silence, Abyss
- **Secrets** (4): hidden nodes that bridge themes

## Controls

- Drag to orbit
- Scroll to zoom
- Click a node to focus (dims unrelated nodes)
- Click empty space to reset
