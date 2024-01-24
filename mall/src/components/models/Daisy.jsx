import { useRef } from "react";
import GLTFModel from "./daisy.gltf";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

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
      scale={2.6}
      position={[0, 0.5, 0]}
      rotation={[1, 0, 0]}
    >
      <group scale={0.01}>
        <mesh
          geometry={nodes.Tree_0_Tree_0Mat_0.geometry}
          material={materials.Tree_0Mat}
        />
        <mesh
          geometry={nodes.Tree_1_Tree_1Mat_0.geometry}
          material={materials.Tree_1Mat}
        />
        <mesh
          geometry={nodes.Tree_2_Tree_2Mat_0.geometry}
          material={materials.Tree_2Mat}
        />
      </group>
    </group>
  );
}

useGLTF.preload(GLTFModel);
