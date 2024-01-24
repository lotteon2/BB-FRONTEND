import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import GLTFModel from "./lavender.gltf";
import { useFrame } from "@react-three/fiber";

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
      scale={0.0235}
      position={[0, 1, 0]}
    >
      <group rotation={[-1.826, -0.114, -0.039]}>
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials.material_0}
        />
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials.material_0}
        />
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.material_0}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials.material_0}
        />
      </group>
    </group>
  );
}

useGLTF.preload(GLTFModel);
