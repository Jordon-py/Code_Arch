import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import styles from "./AmbientScene.module.css";

function OrbitMesh() {
  const ref = useRef(null);

  useFrame((state, delta) => {
    if (!ref.current) {
      return;
    }

    ref.current.rotation.x += delta * 0.16;
    ref.current.rotation.y += delta * 0.24;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.22;
  });

  return (
    <mesh ref={ref} position={[1.8, 0.2, -0.3]}>
      <icosahedronGeometry args={[1.1, 1]} />
      <meshStandardMaterial
        color="#c081ff"
        wireframe
        transparent
        opacity={0.26}
      />
    </mesh>
  );
}

export default function AmbientScene() {
  return (
    <div className={styles.sceneWrap} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.65} />
        <pointLight position={[3, 2, 4]} intensity={1.8} color="#9f7dff" />
        <pointLight position={[-4, -2, 2]} intensity={0.8} color="#4bb4ff" />
        <OrbitMesh />
      </Canvas>
    </div>
  );
}
