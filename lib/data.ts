export type Node = {
  id: string;
  label: string;
  group: "theme" | "word" | "secret";
  x: number;
  y: number;
  z: number;
};

export type Link = { source: string; target: string };

// Swap these for your real WordMatrix categories.
export const data: { nodes: Node[]; links: Link[] } = {
  nodes: [
    { id: "t1", label: "Identity", group: "theme", x: 0, y: 2, z: 0 },
    { id: "t2", label: "Desire", group: "theme", x: 3, y: 0, z: 1 },
    { id: "t3", label: "Power", group: "theme", x: -3, y: 0, z: 1 },
    { id: "t4", label: "Memory", group: "theme", x: 0, y: -2, z: 1 },
    { id: "w1", label: "mirror", group: "word", x: 0.6, y: 2.4, z: 0.4 },
    { id: "w2", label: "echo", group: "word", x: 1.2, y: 1.6, z: -0.3 },
    { id: "w3", label: "hunger", group: "word", x: 3.4, y: 0.4, z: 1.2 },
    { id: "w4", label: "crown", group: "word", x: -3.4, y: 0.4, z: 1.2 },
    { id: "w5", label: "throne", group: "word", x: -2.6, y: -0.4, z: 0.6 },
    { id: "w6", label: "ghost", group: "word", x: 0.4, y: -2.4, z: 1.4 },
    { id: "w7", label: "residue", group: "word", x: -0.6, y: -1.6, z: 0.2 },
    { id: "s1", label: "the unsaid", group: "secret", x: 1.5, y: -1.5, z: -1.5 },
    { id: "s2", label: "the witness", group: "secret", x: -1.5, y: 1.5, z: -1.5 },
  ],
  links: [
    { source: "t1", target: "w1" },
    { source: "t1", target: "w2" },
    { source: "t2", target: "w3" },
    { source: "t3", target: "w4" },
    { source: "t3", target: "w5" },
    { source: "t4", target: "w6" },
    { source: "t4", target: "w7" },
    { source: "w1", target: "s2" },
    { source: "w6", target: "s1" },
    { source: "w3", target: "s1" },
    { source: "s1", target: "s2" },
  ],
};
