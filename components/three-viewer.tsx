"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Grid, Center } from "@react-three/drei"
import type * as THREE from "three"

function RotatingModel({ autoRotate }: { autoRotate: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <Center>
      <mesh ref={meshRef} castShadow receiveShadow>
        <group>
          {/* Base */}
          <mesh position={[0, -0.8, 0]}>
            <cylinderGeometry args={[0.4, 0.5, 0.2, 32]} />
            <meshStandardMaterial color="#64748b" metalness={0.3} roughness={0.7} />
          </mesh>
          {/* Body */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.3, 1.5, 32]} />
            <meshStandardMaterial color="#0ea5e9" metalness={0.2} roughness={0.6} />
          </mesh>
          {/* Neck */}
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.25, 0.4, 0.4, 32]} />
            <meshStandardMaterial color="#0ea5e9" metalness={0.2} roughness={0.6} />
          </mesh>
          {/* Rim */}
          <mesh position={[0, 0.85, 0]}>
            <torusGeometry args={[0.25, 0.05, 16, 32]} />
            <meshStandardMaterial color="#0ea5e9" metalness={0.3} roughness={0.5} />
          </mesh>
        </group>
      </mesh>
    </Center>
  )
}

function Scene({ autoRotate }: { autoRotate: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />

      <Suspense fallback={null}>
        <RotatingModel autoRotate={autoRotate} />
        <Environment preset="studio" />
      </Suspense>

      <Grid
        args={[10, 10]}
        position={[0, -1, 0]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#1e293b"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#334155"
        fadeDistance={10}
        fadeStrength={1}
      />

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
      />
    </>
  )
}

export default function ThreeViewer({ autoRotate }: { autoRotate: boolean }) {
  return (
    <Canvas
      shadows
      camera={{ position: [3, 2, 5], fov: 50 }}
      style={{ background: "linear-gradient(to bottom, #0a0a0a, #171717)" }}
    >
      <Scene autoRotate={autoRotate} />
    </Canvas>
  )
}
