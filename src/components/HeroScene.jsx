import { useFrame } from '@react-three/fiber';
import { Float, Sparkles, Line } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const groupRef = useRef();
  const ringRef = useRef();
  const lineRef = useRef();

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 120; i += 1) {
      const theta = (i / 120) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * 1.2, Math.sin(theta) * 0.8, Math.sin(theta * 2) * 0.35));
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.18;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.18;
    if (ringRef.current) {
      ringRef.current.rotation.z = Math.sin(t * 0.5) * 0.15;
      ringRef.current.rotation.y = t * 0.2;
    }
    if (lineRef.current) {
      lineRef.current.rotation.z = Math.sin(t * 0.4) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2.8} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.15, 2]} />
          <meshPhysicalMaterial color="#8b5cf6" emissive="#4c1d95" roughness={0.1} metalness={0.7} transmission={0.8} transparent opacity={0.95} />
        </mesh>
      </Float>
      <mesh position={[0, 0, 0]} scale={1.35}>
        <sphereGeometry args={[1.05, 64, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.08} />
      </mesh>
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.45, 0.012, 16, 120]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.55} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.25, 0.01, 16, 120]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.7} />
        </mesh>
      </group>
      <mesh position={[0.8, -0.7, -0.4]} rotation={[0.6, 0.2, 0.3]}>
        <boxGeometry args={[0.24, 0.24, 0.24]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0f172a" roughness={0.2} metalness={0.5} />
      </mesh>
      <Line ref={lineRef} points={points} color="#ffffff" lineWidth={1} transparent opacity={0.45} />
      <Sparkles count={90} scale={3.5} size={2} position={[0, 0, 0]} speed={0.18} noise={0.3} color="#ffffff" />
    </group>
  );
}
