'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// --- CONFIGURATION ---
const PIPE_COUNT = 8;
const PIPE_RADIUS = 2.5; // Larger, more imposing pipes
const PIPE_GAP = 0.2; // Very tight gap for "wall" effect
const PIPE_LENGTH = 60; // Spans entire screen width easily

// --- LONG PERFECT PIPE ---
const LongPipe = ({ position }: { position: [number, number, number] }) => {
  return (
    <mesh position={position} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
      <cylinderGeometry args={[PIPE_RADIUS, PIPE_RADIUS, PIPE_LENGTH, 32]} />
      <meshStandardMaterial
        color="#050505" // Almost pure black
        metalness={0.95} // Slightly reduced from 1.0 to allow more diffuse interaction
        roughness={0.15} // Increased roughness for better light "wrapping" and sheen
        envMapIntensity={2.5} // Boosted reflections for the "faint sheen" in dark
      />
    </mesh>
  );
};

// --- PIPE STACK ---
const PipeStack = () => {
  const pipes = useMemo(() => {
    const temp = [];
    const totalHeight = PIPE_COUNT * (PIPE_RADIUS * 2 + PIPE_GAP);
    const startY = totalHeight / 2 - PIPE_RADIUS;

    for (let i = 0; i < PIPE_COUNT; i++) {
      temp.push({
        position: [0, startY - i * (PIPE_RADIUS * 2 + PIPE_GAP), 0] as [number, number, number],
      });
    }
    return temp;
  }, []);

  return (
    <>
      {pipes.map((pipe: { position: [number, number, number] }, i: number) => (
        <LongPipe key={i} position={pipe.position} />
      ))}
    </>
  );
};

// --- THE LASER SCANNER ---
const LaserScanner = () => {
  const lightRef = useRef<THREE.SpotLight>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    // Adjusted speed: 0.25 multiplier = ~25 second cycle
    // Faster than before, but still maintains a smooth, heavy industrial feel
    const yPos = Math.sin(time * 0.25) * 18;

    if (lightRef.current) {
      // Light moves with the beam
      lightRef.current.position.set(0, yPos, 15);
      lightRef.current.target.position.set(0, yPos, 0);
      lightRef.current.target.updateMatrixWorld();
    }

    if (beamRef.current) {
      beamRef.current.position.y = yPos;
    }
  });

  return (
    <>
      {/* The Physical Light Source - Tuned for "Wrapping" Glow */}
      <spotLight
        ref={lightRef}
        color="#D32F2F" // MPS Red
        intensity={500} // Slightly reduced intensity to balance with higher roughness
        distance={45}
        angle={0.8} // Even wider to wrap fully around the large pipes
        penumbra={1} // Maximum softness
        castShadow={false}
      />

      {/* Visual "Laser Line" Mesh - Thinner and sharper */}
      <mesh ref={beamRef} position={[0, 0, 8]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 60, 8]} />
        <meshBasicMaterial color="#FF1744" transparent opacity={0.9} toneMapped={false} />
      </mesh>
    </>
  );
};
const CameraRig = () => {
  useFrame(({ camera, clock }) => {
    const time = clock.getElapsedTime();
    // Extremely subtle movement
    camera.position.x = Math.sin(time * 0.05) * 0.2;
    camera.position.y = Math.cos(time * 0.05) * 0.2;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

// --- MAIN SCENE COMPONENT ---
const SceneContent = () => {
  return (
    <>
      {/* --- LIGHTING --- */}
      {/* Minimal ambient to keep pipes dark until lit */}
      <ambientLight intensity={0.05} />
      {/* Subtle rim lighting */}
      <directionalLight position={[10, 0, 5]} intensity={0.2} color="#ffffff" />
      <directionalLight position={[-10, 0, 5]} intensity={0.2} color="#1976D2" />

      {/* --- OBJECTS --- */}
      <group position={[0, 0, -10]}>
        <PipeStack />
      </group>
      <LaserScanner />
      <CameraRig />

      {/* --- POST PROCESSING --- */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15} // Catch the subtle reflections
          mipmapBlur
          intensity={2.0} // Balanced glow
          radius={0.5}
          levels={8}
        />
        <Noise opacity={0.02} />
      </EffectComposer>
    </>
  );
};

export default function PipeBackground() {
  return (
    <div className="absolute inset-0 h-full w-full bg-[#050505]">
      <Canvas
        dpr={[1, 2]} // Cap pixel ratio for performance on mobile/retina
        shadows
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{
          antialias: false, // Disable AA since we have post-processing
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
