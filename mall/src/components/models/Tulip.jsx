import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import GLTFModel from "./tulip.gltf";
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
      scale={0.13}
      position={[0, -1, 0]}
      rotation={[0.5, 0, 0]}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.glassIn} />
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials.glassOut}
        />
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.material}
        />
        <mesh geometry={nodes.Object_5.geometry} material={materials.water} />
      </group>
    </group>
  );
}

useGLTF.preload(GLTFModel);
