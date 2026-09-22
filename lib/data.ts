export type NodeType = "theme" | "word" | "secret";

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  group: string;
  description?: string;
}

export interface GraphLink {
  source: string;
  target: string;
}

export const nodes: GraphNode[] = [
  // Themes
  { id: "t-language", label: "Language", type: "theme", group: "Language", description: "Words, syntax, and the architecture of meaning." },
  { id: "t-matrix", label: "Matrix", type: "theme", group: "Matrix", description: "Structure, grids, and the hidden order beneath the surface." },
  { id: "t-signal", label: "Signal", type: "theme", group: "Signal", description: "Transmission, noise, and what survives the channel." },
  { id: "t-memory", label: "Memory", type: "theme", group: "Memory", description: "What persists, what fades, what gets rewritten." },
  { id: "t-code", label: "Code", type: "theme", group: "Code", description: "Logic made legible, and the gaps between instructions." },
  { id: "t-void", label: "Void", type: "theme", group: "void", description: "Silence, absence, and the space that holds everything." },

  // Words
  { id: "w-lexicon", label: "Lexicon", type: "word", group: "Language", description: "The full inventory of a language's words." },
  { id: "w-syntax", label: "Syntax", type: "word", group: "Language", description: "The rules that bind words into sentences." },
  { id: "w-semiotics", label: "Semiotics", type: "word", group: "Language", description: "The study of signs and meaning-making." },
  { id: "w-grid", label: "Grid", type: "word", group: "Matrix", description: "A lattice that organizes space and relation." },
  { id: "w-lattice", label: "Lattice", type: "word", group: "Matrix", description: "An ordered structure of intersecting lines." },
  { id: "w-vector", label: "Vector", type: "word", group: "Matrix", description: "A quantity with direction and magnitude." },
  { id: "w-noise", label: "Noise", type: "word", group: "Signal", description: "The unwanted signal that carries information about the channel." },
  { id: "w-channel", label: "Channel", type: "word", group: "Signal", description: "The medium through which a message travels." },
  { id: "w-entropy", label: "Entropy", type: "word", group: "Signal", description: "The measure of disorder and information loss." },
  { id: "w-trace", label: "Trace", type: "word", group: "Memory", description: "A mark left by something that has passed." },
  { id: "w-archive", label: "Archive", type: "word", group: "Memory", description: "A curated store of what must not be forgotten." },
  { id: "w-palimpsest", label: "Palimpsest", type: "word", group: "Memory", description: "A surface rewritten over its own erased past." },
  { id: "w-algorithm", label: "Algorithm", type: "word", group: "Code", description: "A finite sequence of steps that solves a problem." },
  { id: "w-syntax-code", label: "Syntax", type: "word", group: "Code", description: "The grammar of a programming language." },
  { id: "w-glyph", label: "Glyph", type: "word", group: "Code", description: "A carved or written mark that stands for meaning." },
  { id: "w-silence", label: "Silence", type: "word", group: "Void", description: "The absence that gives sound its shape." },
  { id: "w-abyss", label: "Abyss", type: "word", group: "Void", description: "A depth with no bottom to measure against." },

  // Secrets
  { id: "s-1", label: "The First Secret", type: "secret", group: "Secret", description: "Every word is a door. Some doors open inward." },
  { id: "s-2", label: "The Second Secret", type: "secret", group: "Secret", description: "The matrix remembers what the signal forgets." },
  { id: "s-3", label: "The Third Secret", type: "secret", group: "Secret", description: "Code is the only language that executes its own meaning." },
  { id: "s-4", label: "The Fourth Secret", type: "secret", group: "Secret", description: "The void is not empty. It is listening." },
];

export const links: GraphLink[] = [
  // Theme -> words
  { source: "t-language", target: "w-lexicon" },
  { source: "t-language", target: "w-syntax" },
  { source: "t-language", target: "w-semiotics" },
  { source: "t-matrix", target: "w-grid" },
  { source: "t-matrix", target: "w-lattice" },
  { source: "t-matrix", target: "w-vector" },
  { source: "t-signal", target: "w-noise" },
  { source: "t-signal", target: "w-channel" },
  { source: "t-signal", target: "w-entropy" },
  { source: "t-memory", target: "w-trace" },
  { source: "t-memory", target: "w-archive" },
  { source: "t-memory", target: "w-palimpsest" },
  { source: "t-code", target: "w-algorithm" },
  { source: "t-code", target: "w-syntax-code" },
  { source: "t-code", target: "w-glyph" },
  { source: "t-void", target: "w-silence" },
  { source: "t-void", target: "w-abyss" },

  // Cross-theme bridges
  { source: "w-syntax", target: "w-syntax-code" },
  { source: "w-grid", target: "w-lattice" },
  { source: "w-noise", target: "w-entropy" },
  { source: "w-trace", target: "w-palimpsest" },
  { source: "w-glyph", target: "w-semiotics" },
  { source: "w-silence", target: "w-abyss" },
  { source: "w-archive", target: "w-palimpsest" },
  { source: "w-channel", target: "w-noise" },

  // Secrets connect to themes
  { source: "s-1", target: "t-language" },
  { source: "s-2", target: "t-matrix" },
  { source: "s-2", target: "t-signal" },
  { source: "s-3", target: "t-code" },
  { source: "s-4", target: "t-void" },
  { source: "s-1", target: "s-4" },
  { source: "s-3", target: "s-2" },
];
