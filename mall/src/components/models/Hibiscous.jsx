import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import GLTFModel from "./hibiscous.gltf";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF(GLTFModel);

  useFrame(() => {
    group.current.rotation.y += 0.01;
  }, []);

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={0.28}
      position={[0, -0.5, 0]}
      rotation={[0.5, 0, 0]}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials.lambert3SG}
        />
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials.lambert2SG}
        />
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.lambert2SG}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials.lambert2SG}
        />
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials.lambert2SG}
        />
      </group>
    </group>
  );
}

useGLTF.preload(GLTFModel);
