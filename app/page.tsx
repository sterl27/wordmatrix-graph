import dynamic from "next/dynamic";

const Graph = dynamic(() => import("@/components/Graph"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        color: "#8a93a8",
        fontSize: 13,
      }}
    >
      Loading the matrix…
    </div>
  ),
});

export default function Home() {
  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <h1>WordMatrix</h1>
          <p>3D knowledge graph of word associations</p>
        </div>
        <div className="controls">
          <button className="btn" data-action="spin">Spin</button>
          <button className="btn" data-action="reset">Reset</button>
          <button className="btn active" data-action="labels">Labels</button>
        </div>
      </header>

      <div className="graph-wrap">
        <Graph />
      </div>

      <div className="legend">
        <span><i className="dot" style={{ background: "#7c5cff" }} /> Theme</span>
        <span><i className="dot" style={{ background: "#22d3ee" }} /> Word</span>
        <span><i className="dot" style={{ background: "#ff5c8a" }} /> Secret</span>
      </div>
      <div className="hint">drag to rotate · scroll to zoom · click a node to focus</div>
    </main>
  );
}
