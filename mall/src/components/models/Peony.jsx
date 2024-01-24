import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import GLTFModel from "./peony.gltf";
import { useFrame } from "@react-three/fiber";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF(GLTFModel);

  useFrame(() => {
    group.current.rotation.y += 0.01;
  }, []);

  return (
    <group ref={group} {...props} dispose={null} scale={0.4}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <lineSegments
          geometry={nodes.Object_2.geometry}
          material={materials.Solid}
        />
        <mesh geometry={nodes.Object_3.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_8.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_9.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_10.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_11.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_12.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_13.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_14.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_15.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_16.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_17.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_18.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_19.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_20.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_21.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_22.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_23.geometry} material={materials.Solid} />
        <mesh geometry={nodes.Object_24.geometry} material={materials.Solid} />
      </group>
    </group>
  );
}

useGLTF.preload(GLTFModel);
