"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import * as THREE from "three";
import { graphData as DATA, NodeDatum, LinkDatum } from "@/lib/data";

const THEME_COLOR = "#7c5cff";
const WORD_COLOR = "#22d3ee";
const SECRET_COLOR = "#ff5c8a";

function nodeColor(n: NodeDatum) {
  if (n.group === "theme") return THEME_COLOR;
  if (n.group === "secret") return SECRET_COLOR;
  return WORD_COLOR;
}

function nodeSize(n: NodeDatum) {
  if (n.group === "theme") return 9;
  if (n.group === "secret") return 7;
  return 4.5;
}

export default function Graph() {
  const fgRef = useRef<ForceGraphMethods | undefined>(undefined);
  const [spin, setSpin] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [hover, setHover] = useState<NodeDatum | null>(null);

  // gentle auto-rotation
  useEffect(() => {
    let angle = 0;
    let raf = 0;
    const tick = () => {
      if (spin && fgRef.current) {
        angle += 0.0022;
        fgRef.current.cameraPosition({
          x: 180 * Math.sin(angle),
          z: 180 * Math.cos(angle),
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [spin]);

  const handleClick = useCallback((node: NodeDatum) => {
    setSpin(false);
    const dist = 90;
    const nodePos = node as NodeDatum & { x?: number; y?: number; z?: number };
    const x = nodePos.x ?? 0;
    const y = nodePos.y ?? 0;
    const z = nodePos.z ?? 0;
    const length = Math.hypot(x, y, z) || 1;
    fgRef.current?.cameraPosition(
      { x: (x / length) * dist, y: (y / length) * dist, z: (z / length) * dist },
      node as object,
      900
    );
    // pin the focused node
    node.fx = x;
    node.fy = y;
    node.fz = z;
  }, []);

  const handleBgClick = useCallback(() => {
    DATA.nodes.forEach((n) => {
      n.fx = undefined;
      n.fy = undefined;
      n.fz = undefined;
    });
    setSpin(true);
  }, []);

  const nodeThreeObject = useCallback(
    (node: NodeDatum) => {
      const group = new THREE.Group();
      const geo = new THREE.SphereGeometry(nodeSize(node), 16, 16);
      const mat = new THREE.MeshStandardMaterial({
        color: nodeColor(node),
        emissive: nodeColor(node),
        emissiveIntensity: node.group === "theme" ? 0.9 : 0.45,
        transparent: true,
        opacity: 0.95,
      });
      group.add(new THREE.Mesh(geo, mat));

      // glow halo
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(nodeSize(node) * 2.2, 16, 16),
        new THREE.MeshBasicMaterial({
          color: nodeColor(node),
          transparent: true,
          opacity: 0.12,
        })
      );
      group.add(halo);

      if (showLabels) {
        const sprite = makeLabelSprite(node.name, nodeColor(node));
        sprite.position.y = nodeSize(node) + 6;
        group.add(sprite);
      }
      return group;
    },
    [showLabels]
  );

  const linkColor = useCallback(() => "rgba(124,92,255,0.22)", []);
  const linkWidth = useCallback((l: LinkDatum) => (l.kind === "theme" ? 1.4 : 0.6), []);

  return (
    <ForceGraph3D
      ref={fgRef}
      graphData={DATA}
      backgroundColor="rgba(0,0,0,0)"
      nodeThreeObject={nodeThreeObject}
      nodeThreeObjectExtend={false}
      linkColor={linkColor}
      linkWidth={linkWidth}
      linkDirectionalParticles={2}
      linkDirectionalParticleWidth={1.2}
      linkDirectionalParticleColor={() => "#22d3ee"}
      linkDirectionalParticleSpeed={0.004}
      onNodeClick={handleClick}
      onBackgroundClick={handleBgClick}
      onNodeHover={(n) => setHover((n as NodeDatum) ?? null)}
      showNavInfo={false}
      enableNodeDrag
      d3AlphaDecay={0.04}
      d3VelocityDecay={0.25}
      warmupTicks={80}
      cooldownTicks={120}
    />
  );
}

function makeLabelSprite(text: string, color: string) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const fontSize = 48;
  ctx.font = `600 ${fontSize}px ui-sans-serif, system-ui, sans-serif`;
  const metrics = ctx.measureText(text);
  const pad = 16;
  canvas.width = Math.ceil(metrics.width) + pad * 2;
  canvas.height = fontSize + pad * 2;
  ctx.font = `600 ${fontSize}px ui-sans-serif, system-ui, sans-serif`;
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.92;
  ctx.fillText(text, pad, canvas.height / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  const scale = 0.32;
  sprite.scale.set((canvas.width / canvas.height) * fontSize * scale, fontSize * scale, 1);
  return sprite;
}
