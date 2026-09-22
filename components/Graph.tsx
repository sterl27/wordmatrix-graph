"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ForceGraph3D, { type ForceGraphMethods } from "three-forcegraph";
import SpriteText from "three-spritetext";
import * as THREE from "three";
import {
  GRAPH_DATA,
  type GraphLink,
  type GraphNode,
  type NodeKind,
} from "@/lib/data";

const KIND_COLOR: Record<NodeKind, string> = {
  theme: "#5eead4",
  word: "#a78bfa",
  secret: "#f472b6",
};

const KIND_LABEL: Record<NodeKind, string> = {
  theme: "Theme",
  word: "Word",
  secret: "Secret",
};

export default function Graph() {
  const fgRef = useRef<ForceGraphMethods | undefined>(undefined);
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [hover, setHover] = useState<GraphNode | null>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () =>
      setDims({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const graphData = useMemo(
    () => ({
      nodes: GRAPH_DATA.nodes.map((n) => ({ ...n })),
      links: GRAPH_DATA.links.map((l) => ({ ...l })),
    }),
    []
  );

  const focusNode = useCallback((node: GraphNode | null) => {
    setSelected(node);
    const fg = fgRef.current;
    if (!fg) return;
    if (node) {
      const dist = 140;
      const cam = fg.cameraPosition();
      fg.cameraPosition(
        { x: node.x + dist * 0.6, y: node.y + dist * 0.4, z: node.z + dist },
        node,
        900
      );
    } else {
      fg.cameraPosition({ x: 0, y: 0, z: 420 }, { x: 0, y: 0, z: 0 }, 900);
    }
  }, []);

  const nodeThreeObject = useCallback((node: GraphNode) => {
    const color = KIND_COLOR[node.kind];
    const isSecret = node.kind === "secret";
    const group = new THREE.Group();

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(isSecret ? 5.2 : 4.2, 24, 24),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 })
    );
    group.add(core);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(isSecret ? 9 : 7.5, 24, 24),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.18,
        side: THREE.BackSide,
      })
    );
    group.add(glow);

    const sprite = new SpriteText(node.name);
    sprite.color = color;
    sprite.textHeight = isSecret ? 5.5 : 4.2;
    sprite.fontFace = "ui-sans-serif, system-ui, sans-serif";
    sprite.fontWeight = "600";
    sprite.backgroundColor = "rgba(5,6,10,0.55)";
    sprite.padding = 2.2;
    sprite.borderRadius = 4;
    sprite.position.y = isSecret ? 9 : 7.5;
    group.add(sprite);

    return group;
  }, []);

  const linkColor = useCallback(
    (link: GraphLink) => {
      const src = link.source as GraphNode;
      const tgt = link.target as GraphNode;
      if (selected) {
        if (src.id === selected.id || tgt.id === selected.id) return "rgba(94,234,212,0.55)";
        return "rgba(120,130,160,0.06)";
      }
      return "rgba(120,130,160,0.16)";
    },
    [selected]
  );

  const linkWidth = useCallback(
    (link: GraphLink) => {
      const src = link.source as GraphNode;
      const tgt = link.target as GraphNode;
      if (selected && (src.id === selected.id || tgt.id === selected.id)) return 1.6;
      return 0.5;
    },
    [selected]
  );

  const linkDirectionalParticles = useCallback(
    (link: GraphLink) => {
      const src = link.source as GraphNode;
      const tgt = link.target as GraphNode;
      if (selected && (src.id === selected.id || tgt.id === selected.id)) return 3;
      return 1;
    },
    [selected]
  );

  const linkDirectionalParticleColor = useCallback(
    (link: GraphLink) => {
      const src = link.source as GraphNode;
      const tgt = link.target as GraphNode;
      if (selected && (src.id === selected.id || tgt.id === selected.id))
        return KIND_COLOR[selected.kind];
      return "rgba(167,139,250,0.5)";
    },
    [selected]
  );

  const linkDirectionalParticleWidth = useCallback(() => 1.4, []);
  const linkDirectionalParticleSpeed = useCallback(() => 0.006, []);

  return (
    <div className="wm-shell">
      <div className="wm-canvas">
        {dims.w > 0 && (
          <ForceGraph3D
            ref={fgRef}
            width={dims.w}
            height={dims.h}
            graphData={graphData}
            backgroundColor="#05060a"
            nodeThreeObject={nodeThreeObject}
            nodeThreeObjectExtend={false}
            linkColor={linkColor}
            linkWidth={linkWidth}
            linkDirectionalParticles={linkDirectionalParticles}
            linkDirectionalParticleColor={linkDirectionalParticleColor}
            linkDirectionalParticleWidth={linkDirectionalParticleWidth}
            linkDirectionalParticleSpeed={linkDirectionalParticleSpeed}
            linkOpacity={0.9}
            d3AlphaDecay={0.02}
            d3VelocityDecay={0.3}
            warmupTicks={120}
            cooldownTicks={0}
            onNodeClick={(node: GraphNode) => focusNode(node)}
            onNodeHover={(node: GraphNode | null) => setHover(node)}
            onBackgroundClick={() => focusNode(null)}
            showNavInfo={false}
          />
        )}
      </div>

      <div className="wm-hud">
        <div className="wm-title">
          <h1>WordMatrix</h1>
          <p>
            A 3D force-directed knowledge graph. Themes, words, and secrets as
            glowing nodes. Drag to orbit, scroll to zoom, click a node to focus.
          </p>
        </div>
        <div className="wm-legend">
          {(Object.keys(KIND_COLOR) as NodeKind[]).map((k) => (
            <span className="wm-chip" key={k}>
              <span className="wm-dot" style={{ color: KIND_COLOR[k] }} />
              {KIND_LABEL[k]}
            </span>
          ))}
        </div>
      </div>

      <div className={`wm-panel ${selected ? "is-open" : ""}`}>
        {selected && (
          <>
            <div className="wm-kicker">{KIND_LABEL[selected.kind]}</div>
            <h2>{selected.name}</h2>
            <p>{selected.desc}</p>
            {selected.tags && selected.tags.length > 0 && (
              <div className="wm-tags">
                {selected.tags.map((t) => (
                  <span className="wm-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="wm-hint">
        {hover && !selected ? (
          <>
            <b>{hover.name}</b> — click to focus
          </>
        ) : (
          <>
            <b>Drag</b> orbit · <b>Scroll</b> zoom · <b>Click</b> focus · <b>Bg</b> reset
          </>
        )}
      </div>
    </div>
  );
}
