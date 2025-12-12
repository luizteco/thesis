import { OrbitControls, Stage } from "@react-three/drei";
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
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export function Preview({
  stlPath,
  isInteractive = true,
  animate = true,
}: PreviewProps) {
  return (
    <Canvas>
      <Stage environment="city" intensity={0.5}>
        <STLModel url={stlPath} />
      </Stage>
      {isInteractive && <OrbitControls autoRotate={animate} />}
    </Canvas>
  );
}
