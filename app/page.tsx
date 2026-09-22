import Graph from "@/components/Graph";

export default function Home() {
  return (
    <main className="relative h-screen w-screen">
      <div id="graph-root">
        <Graph />
      </div>
      <header className="pointer-events-none absolute left-0 top-0 z-10 p-6">
        <h1 className="text-2xl font-semibold tracking-tight text-white/90">
          WordMatrix
        </h1>
        <p className="mt-1 max-w-md text-sm text-white/50">
          Drag to orbit. Scroll to zoom. Click a node to focus its cluster.
        </p>
      </header>
    </main>
  );
}
