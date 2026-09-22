export type NodeGroup = "theme" | "word" | "secret";

export interface NodeDatum {
  id: string;
  name: string;
  group: NodeGroup;
  // d3-force mutable fields
  x?: number;
  y?: number;
  z?: number;
  fx?: number;
  fy?: number;
  fz?: number;
}

export interface LinkDatum {
  source: string;
  target: string;
  kind: "theme" | "assoc";
}

export const graphData: { nodes: NodeDatum[]; links: LinkDatum[] } = {
  nodes: [
    // themes
    { id: "t-ocean", name: "Ocean", group: "theme" },
    { id: "t-forest", name: "Forest", group: "theme" },
    { id: "t-sky", name: "Sky", group: "theme" },
    { id: "t-fire", name: "Fire", group: "theme" },
    { id: "t-metal", name: "Metal", group: "theme" },
    { id: "t-time", name: "Time", group: "theme" },
    // words
    { id: "w-tide", name: "tide", group: "word" },
    { id: "w-wave", name: "wave", group: "word" },
    { id: "w-current", name: "current", group: "word" },
    { id: "w-salt", name: "salt", group: "word" },
    { id: "w-pine", name: "pine", group: "word" },
    { id: "w-moss", name: "moss", group: "word" },
    { id: "w-canopy", name: "canopy", group: "word" },
    { id: "w-root", name: "root", group: "word" },
    { id: "w-cloud", name: "cloud", group: "word" },
    { id: "w-storm", name: "storm", group: "word" },
    { id: "w-horizon", name: "horizon", group: "word" },
    { id: "w-ember", name: "ember", group: "word" },
    { id: "w-ash", name: "ash", group: "word" },
    { id: "w-flame", name: "flame", group: "word" },
    { id: "w-spark", name: "spark", group: "word" },
    { id: "w-steel", name: "steel", group: "word" },
    { id: "w-rust", name: "rust", group: "word" },
    { id: "w-anvil", name: "anvil", group: "word" },
    { id: "w-echo", name: "echo", group: "word" },
    { id: "w-drift", name: "drift", group: "word" },
    { id: "w-pause", name: "pause", group: "word" },
    // secrets
    { id: "s-abyss", name: "abyss", group: "secret" },
    { id: "s-aurora", name: "aurora", group: "secret" },
    { id: "s-forge", name: "forge", group: "secret" },
    { id: "s-stillness", name: "stillness", group: "secret" },
  ],
  links: [
    // ocean
    { source: "t-ocean", target: "w-tide", kind: "theme" },
    { source: "t-ocean", target: "w-wave", kind: "theme" },
    { source: "t-ocean", target: "w-current", kind: "theme" },
    { source: "t-ocean", target: "w-salt", kind: "theme" },
    { source: "w-tide", target: "w-wave", kind: "assoc" },
    { source: "w-wave", target: "w-current", kind: "assoc" },
    { source: "w-salt", target: "w-tide", kind: "assoc" },
    // forest
    { source: "t-forest", target: "w-pine", kind: "theme" },
    { source: "t-forest", target: "w-moss", kind: "theme" },
    { source: "t-forest", target: "w-canopy", kind: "theme" },
    { source: "t-forest", target: "w-root", kind: "theme" },
    { source: "w-pine", target: "w-canopy", kind: "assoc" },
    { source: "w-moss", target: "w-root", kind: "assoc" },
    { source: "w-canopy", target: "w-pine", kind: "assoc" },
    // sky
    { source: "t-sky", target: "w-cloud", kind: "theme" },
    { source: "t-sky", target: "w-storm", kind: "theme" },
    { source: "t-sky", target: "w-horizon", kind: "theme" },
    { source: "w-cloud", target: "w-storm", kind: "assoc" },
    { source: "w-horizon", target: "w-cloud", kind: "assoc" },
    // fire
    { source: "t-fire", target: "w-ember", kind: "theme" },
    { source: "t-fire", target: "w-ash", kind: "theme" },
    { source: "t-fire", target: "w-flame", kind: "theme" },
    { source: "t-fire", target: "w-spark", kind: "theme" },
    { source: "w-ember", target: "w-ash", kind: "assoc" },
    { source: "w-flame", target: "w-spark", kind: "assoc" },
    { source: "w-spark", target: "w-ember", kind: "assoc" },
    // metal
    { source: "t-metal", target: "w-steel", kind: "theme" },
    { source: "t-metal", target: "w-rust", kind: "theme" },
    { source: "t-metal", target: "w-anvil", kind: "theme" },
    { source: "w-steel", target: "w-rust", kind: "assoc" },
    { source: "w-anvil", target: "w-steel", kind: "assoc" },
    // time
    { source: "t-time", target: "w-echo", kind: "theme" },
    { source: "t-time", target: "w-drift", kind: "theme" },
    { source: "t-time", target: "w-pause", kind: "theme" },
    { source: "w-echo", target: "w-drift", kind: "assoc" },
    { source: "w-pause", target: "w-drift", kind: "assoc" },
    // secrets
    { source: "w-current", target: "s-abyss", kind: "assoc" },
    { source: "w-horizon", target: "s-aurora", kind: "assoc" },
    { source: "w-anvil", target: "s-forge", kind: "assoc" },
    { source: "w-pause", target: "s-stillness", kind: "assoc" },
    { source: "s-abyss", target: "s-aurora", kind: "assoc" },
    { source: "s-forge", target: "s-stillness", kind: "assoc" },
  ],
};
