import GraphCanvas from "@/components/GraphCanvas";

export default function Home() {
  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <h1>WordMatrix</h1>
          <p>3D Knowledge Graph</p>
        </div>
        <div className="legend">
          <span><i className="dot theme" />Theme</span>
          <span><i className="dot word" />Word</span>
          <span><i className="dot secret" />Secret</span>
        </div>
      </header>

      <main className="stage">
        <GraphCanvas />
        <div className="hint">
          <b>Drag</b> to orbit · <b>Scroll</b> to zoom · <b>Click</b> a node to focus
        </div>
      </main>
    </div>
  );
}
