"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import { data, type Node, type Link } from "@/lib/data";

function NodeMesh({
  node,
  focused,
  onClick,
}: {
  node: Node;
  focused: boolean;
  onClick: (id: string) => void;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const base = node.group === "secret" ? 0.22 : 0.16;
  const color =
    node.group === "secret"
      ? "#f472b6"
      : node.group === "theme"
      ? "#22d3ee"
      : "#7c5cff";

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.x = node.x + Math.sin(t * 0.4 + node.x) * 0.05;
    ref.current.position.y = node.y + Math.cos(t * 0.5 + node.y) * 0.05;
    ref.current.position.z = node.z;
    const s = base * (focused ? 1.6 : 1);
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} onClick={(e) => { e.stopPropagation(); onClick(node.id); }}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={focused ? 1.4 : 0.6}
        roughness={0.3}
        metalness={0.4}
      />
      <Html distanceFactor={12} style={{ pointerEvents: "none" }}>
        <div
          className="select-none whitespace-nowrap rounded-md px-1.5 py-0.5 text-[10px] font-medium"
          style={{
            background: "rgba(8,10,30,0.55)",
            border: `1px solid ${color}55`,
            color: "#e8eaff",
            backdropFilter: "blur(2px)",
          }}
        >
          {node.label}
        </div>
      </Html>
    </mesh>
  );
}

function Links({ links, nodes }: { links: Link[]; nodes: Node[] }) {
  const geo = useMemo(() => {
    const positions: number[] = [];
    const map = new Map(nodes.map((n) => [n.id, n]));
    for (const l of links) {
      const a = map.get(l.source);
      const b = map.get(l.target);
      if (!a || !b) continue;
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [links, nodes]);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#3b3f6b" transparent opacity={0.5} />
    </lineSegments>
  );
}

function Scene() {
  const [focused, setFocused] = useState<string | null>(null);
  const nodes = data.nodes;
  const links = data.links;

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#7c5cff" />
      <pointLight position={[-10, -5, 5]} intensity={0.8} color="#22d3ee" />
      <Stars radius={80} depth={40} count={1500} factor={3} fade speed={0.5} />
      <Links links={links} nodes={nodes} />
      {nodes.map((n) => (
        <NodeMesh
          key={n.id}
          node={n}
          focused={focused === n.id}
          onClick={setFocused}
        />
      ))}
      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        autoRotate
        autoRotateSpeed={0.4}
        minDistance={6}
        maxDistance={40}
      />
    </>
  );
}

export default function Graph() {
  return (
    <Canvas camera={{ position: [0, 0, 16], fov: 55 }} dpr={[1, 2]}>
      <Scene />
    </Canvas>
  );
}
