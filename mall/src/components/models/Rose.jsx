import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import GLTFModel from "./rose.gltf";
import { useFrame } from "@react-three/fiber";

export default function Model({ ...props }) {
  const group = useRef();

  const { nodes, materials } = useGLTF(GLTFModel);

  useFrame(() => {
    group.current.rotation.y += 0.01;
  }, []);

  return (
    <group ref={group} {...props} dispose={null} rotation={[0.8, 0, 0]}>
      <group scale={0.014} position={[0, -1, 0]}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={250}>
          <mesh
            geometry={nodes["ru��a_m_petal_0"].geometry}
            material={materials.m_petal}
          />
          <mesh
            geometry={nodes["ru��a_m_stem_0"].geometry}
            material={materials.m_stem}
          />
          <mesh
            geometry={nodes["ru��a_m_leafs_0"].geometry}
            material={materials.m_leafs}
          />
          <mesh
            geometry={nodes["ru��a_m_thorns_0"].geometry}
            material={materials.m_thorns}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(GLTFModel);
