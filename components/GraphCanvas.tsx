"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { nodes as rawNodes, links as rawLinks, type GraphNode } from "@/lib/data";

const TYPE_COLOR: Record<GraphNode["type"], string> = {
  theme: "#5eead4",
  word: "#a78bfa",
  secret: "#f472b6",
};

interface SimNode extends GraphNode {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

function buildInitial(): SimNode[] {
  const themes = rawNodes.filter((n) => n.type === "theme");
  const words = rawNodes.filter((n) => n.type === "word");
  const secrets = rawNodes.filter((n) => n.type === "secret");
  const out: SimNode[] = [];

  themes.forEach((t, i) => {
    const a = (i / themes.length) * Math.PI * 2;
    out.push({ ...t, x: Math.cos(a) * 9, y: 0, z: Math.sin(a) * 9, vx: 0, vy: 0, vz: 0 });
  });
  words.forEach((w, i) => {
    const a = (i / words.length) * Math.PI * 2;
    out.push({ ...w, x: Math.cos(a) * 16, y: (Math.random() - 0.5) * 6, z: Math.sin(a) * 16, vx: 0, vy: 0, vz: 0 });
  });
  secrets.forEach((s, i) => {
    const a = (i / secrets.length) * Math.PI * 2 + 0.4;
    out.push({ ...s, x: Math.cos(a) * 22, y: 4 + i * 1.5, z: Math.sin(a) * 22, vx: 0, vy: 0, vz: 0 });
  });
  return out;
}

function Graph() {
  const sim = useRef<SimNode[]>(buildInitial());
  const [focused, setFocused] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const linkGeo = useRef<THREE.BufferGeometry>(new THREE.BufferGeometry());
  const nodeGeo = useRef<THREE.BufferGeometry>(new THREE.BufferGeometry());

  const linkIndex = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const l of rawLinks) {
      (m.get(l.source) ?? m.set(l.source, []).get(l.source)!).push(l.target);
      (m.get(l.target) ?? m.set(l.target, []).get(l.target)!).push(l.source);
    }
    return m;
  }, []);

  useFrame(() => {
    const s = sim.current;
    const byId = new Map(s.map((n) => [n.id, n]));
    const focus = focused ? byId.get(focused) : null;
    const focusSet = focus ? new Set([focus.id, ...(linkIndex.get(focus.id) ?? [])]) : null;

    for (const n of s) {
      // attraction to links
      for (const lid of linkIndex.get(n.id) ?? []) {
        const t = byId.get(lid);
        if (!t) continue;
        const dx = t.x - n.x, dy = t.y - n.y, dz = t.z - n.z;
        const d = Math.hypot(dx, dy, dz) || 0.01;
        const rest = n.type === "theme" ? 5 : n.type === "word" ? 4 : 7;
        const k = (d - rest) * 0.012;
        n.vx += (dx / d) * k;
        n.vy += (dy / d) * k;
        n.vz += (dz / d) * k;
      }
      // repulsion
      for (const m of s) {
        if (m.id === n.id) continue;
        const dx = n.x - m.x, dy = n.y - m.y, dz = n.z - m.z;
        const d2 = dx * dx + dy * dy + dz * dz + 0.5;
        const f = 0.6 / d2;
        n.vx += (dx / Math.sqrt(d2)) * f;
        n.vy += (dy / Math.sqrt(d2)) * f;
        n.vz += (dz / Math.sqrt(d2)) * f;
      }
      // center pull
      n.vx -= n.x * 0.004;
      n.vy -= n.y * 0.004;
      n.vz -= n.z * 0.004;
      // damping
      n.vx *= 0.86; n.vy *= 0.86; n.vz *= 0.86;
      n.x += n.vx; n.y += n.vy; n.z += n.vz;
    }

    // link positions
    const lp: number[] = [];
    for (const l of rawLinks) {
      const a = byId.get(l.source), b = byId.get(l.target);
      if (!a || !b) continue;
      const dim = focusSet && !(focusSet.has(a.id) && focusSet.has(b.id));
      lp.push(a.x, a.y, a.z, b.x, b.y, b.z);
      // store dim flag by repeating; we'll color in shader via attribute instead
      void dim;
    }
    linkGeo.current.setAttribute("position", new THREE.Float32BufferAttribute(lp, 3));

    // node positions + colors
    const np: number[] = [];
    const nc: number[] = [];
    const ns: number[] = [];
    for (const n of s) {
      np.push(n.x, n.y, n.z);
      const c = new THREE.Color(TYPE_COLOR[n.type]);
      const active = !focusSet || focusSet.has(n.id);
      nc.push(c.r, c.g, c.b);
      ns.push(active ? (n.type === "theme" ? 0.55 : n.type === "word" ? 0.32 : 0.42) : 0.08);
    }
    nodeGeo.current.setAttribute("position", new THREE.Float32BufferAttribute(np, 3));
    nodeGeo.current.setAttribute("color", new THREE.Float32BufferAttribute(nc, 3));
    nodeGeo.current.setAttribute("size", new THREE.Float32BufferAttribute(ns, 1));
  });

  const onClick = useCallback((e: any) => {
    e.stopPropagation();
    const id = e.object?.userData?.id as string | undefined;
    if (id) setFocused((f) => (f === id ? null : id));
  }, []);

  const selected = focused ? rawNodes.find((n) => n.id === focused) : null;

  return (
    <>
      <Canvas camera={{ position: [0, 6, 34], fov: 55 }} dpr={[1, 2]}>
        <color attach="background" args={["#05060a"]} />
        <fog attach="fog" args={["#05060a", 40, 90]} />
        <ambientLight intensity={0.4} />
        <Stars radius={120} depth={60} count={1400} factor={3} saturation={0} fade speed={0.4} />

        <group ref={groupRef} onClick={onClick} onPointerMissed={() => setFocused(null)}>
          <lineSegments geometry={linkGeo.current} raycast={() => null}>
            <lineBasicMaterial color="#2a3350" transparent opacity={0.5} />
          </lineSegments>

          <points geometry={nodeGeo.current} raycast={() => null}>
            <shaderMaterial
              vertexShader={`
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                varying float vSize;
                void main(){
                  vColor = color;
                  vSize = size;
                  vec4 mv = modelViewMatrix * vec4(position, 1.0);
                  gl_PointSize = size * 260.0 / -mv.z;
                  gl_Position = projectionMatrix * mv;
                }`}
              fragmentShader={`
                varying vec3 vColor;
                varying float vSize;
                void main(){
                  vec2 c = gl_PointCoord - 0.5;
                  float d = length(c);
                  float a = smoothstep(0.5, 0.0, d);
                  float glow = smoothstep(0.5, 0.15, d);
                  gl_FragColor = vec4(vColor, a);
                  gl_FragColor.rgb += vColor * glow * 0.9;
                }`}
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>

          {sim.current.map((n) => (
            <mesh key={n.id} position={[n.x, n.y, n.z]} userData={{ id: n.id }} onClick={onClick} visible={false} />
          ))}
        </group>

        <OrbitControls enableDamping dampingFactor={0.08} minDistance={12} maxDistance={70} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      <div className="panel">
        {selected ? (
          <>
            <div className="type">{selected.type}</div>
            <h2>{selected.label}</h2>
            <p>{selected.description ?? "No description."}</p>
          </>
        ) : (
          <p className="empty">Click a glowing node to reveal its meaning. Drag to orbit, scroll to zoom.</p>
        )}
      </div>
    </>
  );
}

export default function GraphCanvas() {
  return <Graph />;
}
