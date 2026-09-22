export type NodeKind = "theme" | "word" | "secret";

export interface GraphNode {
  id: string;
  name: string;
  kind: NodeKind;
  desc: string;
  tags?: string[];
  // force-graph mutates these at runtime
  x?: number;
  y?: number;
  z?: number;
  vx?: number;
  vy?: number;
  vz?: number;
  fx?: number;
  fy?: number;
  fz?: number;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
}

export const GRAPH_DATA: { nodes: GraphNode[]; links: GraphLink[] } = {
  nodes: [
    // ---- Themes ----
    {
      id: "t-rhythm",
      name: "Rhythm",
      kind: "theme",
      desc: "Pulse, swing, and the pocket. Where timing becomes feeling.",
      tags: ["tempo", "swing", "groove"],
    },
    {
      id: "t-harmony",
      name: "Harmony",
      kind: "theme",
      desc: "Chords, voicings, and the colors between the notes.",
      tags: ["chords", "voicings", "color"],
    },
    {
      id: "t-melody",
      name: "Melody",
      kind: "theme",
      desc: "The line that carries the song. Contour, motif, hook.",
      tags: ["motif", "hook", "contour"],
    },
    {
      id: "t-texture",
      name: "Texture",
      kind: "theme",
      desc: "Timbre, space, and the air around the sound.",
      tags: ["timbre", "space", "reverb"],
    },
    {
      id: "t-form",
      name: "Form",
      kind: "theme",
      desc: "Structure, arrangement, and how sections breathe.",
      tags: ["structure", "arrangement", "sections"],
    },
    {
      id: "t-signal",
      name: "Signal",
      kind: "theme",
      desc: "The electrical path from source to speaker. Gain, noise, fidelity.",
      tags: ["gain", "noise", "fidelity"],
    },

    // ---- Words ----
    {
      id: "w-swing",
      name: "Swing",
      kind: "word",
      desc: "The micro-delay that makes a grid feel human.",
      tags: ["rhythm"],
    },
    {
      id: "w-pocket",
      name: "Pocket",
      kind: "word",
      desc: "The exact place a drum lands where the body agrees.",
      tags: ["rhythm", "feel"],
    },
    {
      id: "w-voicing",
      name: "Voicing",
      kind: "word",
      desc: "How the notes of a chord are stacked and spaced.",
      tags: ["harmony"],
    },
    {
      id: "w-tension",
      name: "Tension",
      kind: "word",
      desc: "Dissonance held just long enough to want release.",
      tags: ["harmony", "emotion"],
    },
    {
      id: "w-motif",
      name: "Motif",
      kind: "word",
      desc: "A short idea that returns, transformed.",
      tags: ["melody"],
    },
    {
      id: "w-hook",
      name: "Hook",
      kind: "word",
      desc: "The part you hum on the way home.",
      tags: ["melody", "form"],
    },
    {
      id: "w-timbre",
      name: "Timbre",
      kind: "word",
      desc: "The color of a sound, independent of pitch.",
      tags: ["texture"],
    },
    {
      id: "w-space",
      name: "Space",
      kind: "word",
      desc: "Silence and distance as instruments.",
      tags: ["texture", "form"],
    },
    {
      id: "w-gain",
      name: "Gain",
      kind: "word",
      desc: "How loud a signal is, stage by stage.",
      tags: ["signal"],
    },
    {
      id: "w-noise",
      name: "Noise",
      kind: "word",
      desc: "The unwanted signal that becomes character.",
      tags: ["signal", "texture"],
    },
    {
      id: "w-fidelity",
      name: "Fidelity",
      kind: "word",
      desc: "How faithfully a signal survives the chain.",
      tags: ["signal"],
    },
    {
      id: "w-arrangement",
      name: "Arrangement",
      kind: "word",
      desc: "Who plays what, when, and how loud.",
      tags: ["form"],
    },
    {
      id: "w-dynamics",
      name: "Dynamics",
      kind: "word",
      desc: "The loud-and-soft story of a piece.",
      tags: ["form", "texture"],
    },

    // ---- Secrets ----
    {
      id: "s-ghost",
      name: "Ghost Note",
      kind: "secret",
      desc: "A note you almost don't play. The pocket lives here.",
      tags: ["rhythm", "secret"],
    },
    {
      id: "s-negative",
      name: "Negative Space",
      kind: "secret",
      desc: "What you leave out is the arrangement.",
      tags: ["form", "secret"],
    },
    {
      id: "s-micro",
      name: "Micro-timing",
      kind: "secret",
      desc: "Milliseconds decide whether a loop feels alive.",
      tags: ["rhythm", "secret"],
    },
    {
      id: "s-air",
      name: "Air",
      kind: "secret",
      desc: "The top end that makes a mix feel open, not loud.",
      tags: ["texture", "signal", "secret"],
    },
  ],
  links: [
    // theme -> words
    { source: "t-rhythm", target: "w-swing" },
    { source: "t-rhythm", target: "w-pocket" },
    { source: "t-harmony", target: "w-voicing" },
    { source: "t-harmony", target: "w-tension" },
    { source: "t-melody", target: "w-motif" },
    { source: "t-melody", target: "w-hook" },
    { source: "t-texture", target: "w-timbre" },
    { source: "t-texture", target: "w-space" },
    { source: "t-signal", target: "w-gain" },
    { source: "t-signal", target: "w-noise" },
    { source: "t-signal", target: "w-fidelity" },
    { source: "t-form", target: "w-arrangement" },
    { source: "t-form", target: "w-dynamics" },
    // word -> secret
    { source: "w-swing", target: "s-ghost" },
    { source: "w-pocket", target: "s-micro" },
    { source: "w-space", target: "s-negative" },
    { source: "w-timbre", target: "s-air" },
    { source: "w-gain", target: "s-air" },
    // cross-theme bridges
    { source: "t-rhythm", target: "t-form" },
    { source: "t-harmony", target: "t-melody" },
    { source: "t-texture", target: "t-signal" },
    { source: "t-form", target: "t-melody" },
    { source: "w-hook", target: "w-motif" },
    { source: "w-dynamics", target: "w-space" },
  ],
};
