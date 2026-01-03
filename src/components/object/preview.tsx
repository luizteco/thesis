import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

export type PreviewProps = {
  stlPath: string;
  isInteractive?: boolean;
  animate?: boolean;
};

function STLModel({ url }: { url: string }) {
  const geometry = useLoader(STLLoader, url);
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial 
        color="#8b5cf6"
        metalness={0.3}
        roughness={0.4}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

export function Preview({
  stlPath,
  isInteractive = true,
  animate = true,
}: PreviewProps) {
  return (
    <div className="h-full bg-gradient-to-br from-purple-50 to-blue-50">
      <Canvas
        camera={{ position: [0, 0, 200], fov: 25 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        {/* Ambient light for overall brightness */}
        <ambientLight intensity={0.4} />
        
        {/* Key light - main light source */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        {/* Fill light - softens shadows */}
        <directionalLight
          position={[-3, 2, -3]}
          intensity={0.5}
        />
        
        {/* Rim light - adds edge definition */}
        <directionalLight
          position={[0, -3, -5]}
          intensity={0.3}
          color="#a78bfa"
        />
        
        {/* Studio environment for reflections */}
        <Environment preset="studio" />
        
        <STLModel url={stlPath} />
        
        {/* Contact shadows for grounding */}
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />
        
        {isInteractive && (
          <OrbitControls
            autoRotate={animate}
            autoRotateSpeed={2}
            enableDamping
            dampingFactor={0.05}
            minDistance={300}
            maxDistance={900}
          />
        )}
      </Canvas>
    </div>
  );
}
