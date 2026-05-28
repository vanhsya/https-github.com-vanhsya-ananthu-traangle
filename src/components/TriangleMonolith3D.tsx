import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export default function TriangleMonolith3D() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Group>(null);
  const ringRef2 = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  // Create an elegant 3D triangle profile geometry manually
  const triangleShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Equilateral triangle around the center
    const size = 1.3;
    const h = size * Math.sqrt(3) / 2;
    shape.moveTo(0, h * 2 / 3);
    shape.lineTo(-size / 2, -h / 3);
    shape.lineTo(size / 2, -h / 3);
    shape.closePath();
    return shape;
  }, []);

  const extrudeSettings = useMemo(() => ({
    steps: 1,
    depth: 0.22,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.03,
    bevelOffset: 0,
    bevelSegments: 5,
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Idle rotate combined with cursor-reactive tilt
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        time * 0.45 + mouse.x * 0.8,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        Math.sin(time * 0.2) * 0.15 + -mouse.y * 0.5,
        0.05
      );
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.z = -time * 0.15;
      ringRef1.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.z = time * 0.25;
      ringRef2.current.rotation.x = Math.cos(time * 0.4) * 0.3;
    }
  });

  // Material settings for ultra-premium glassy obsidian chrome finish
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -5, -10]} intensity={1} color="#6d28d9" />
      <pointLight position={[5, -5, 5]} intensity={1.2} color="#f59e0b" />
      <pointLight position={[0, 5, 0]} intensity={1.8} color="#06b6d4" />
      
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* Central Triangle Monolith */}
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <extrudeGeometry args={[triangleShape, extrudeSettings]} />
          <meshPhysicalMaterial
            color="#111115"
            metalness={0.92}
            roughness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={1.0}
            transmission={0.3} // Semi-translucent obsidian
            thickness={0.5}
            ior={2.4}
            sheen={1.0}
            sheenColor="#6d28d9"
            emissive="#1e1b4b"
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Orbit Ring 1 - Outer Gold Dust */}
        <group ref={ringRef1}>
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const radius = 2.0;
            return (
              <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
                <sphereGeometry args={[0.035, 8, 8]} />
                <meshStandardMaterial 
                  color="#f59e0b" 
                  emissive="#f59e0b" 
                  emissiveIntensity={1.8} 
                />
              </mesh>
            );
          })}
        </group>

        {/* Orbit Ring 2 - Cyan Pulse */}
        <group ref={ringRef2} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 1.4;
            return (
              <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
                <sphereGeometry args={[0.025, 8, 8]} />
                <meshStandardMaterial 
                  color="#06b6d4" 
                  emissive="#06b6d4" 
                  emissiveIntensity={2.5} 
                />
              </mesh>
            );
          })}
        </group>

        {/* Ambient sparkling cinematic dust */}
        <Sparkles 
          count={60} 
          scale={5.0} 
          size={5} 
          speed={0.4} 
          color="#a78bfa" 
          opacity={0.4} 
        />
      </Float>
    </>
  );
}
