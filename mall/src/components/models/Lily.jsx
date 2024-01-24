import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import GLTFModel from "./lily.gltf";
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
      scale={0.18}
      position={[0, -0.7, 0]}
    >
      <group
        position={[-0.019, -2.196, -2.745]}
        rotation={[-0.378, -0.09, -0.007]}
      >
        <mesh
          geometry={nodes.pPlane1_lambert3_0.geometry}
          material={materials.lambert3}
          position={[-3.15, 14.779, 10.956]}
          rotation={[1.551, 0.298, 2.846]}
          scale={[6.27, 0.586, 0.68]}
        />
        <mesh
          geometry={nodes.pPlane2_lambert3_0.geometry}
          material={materials.lambert3}
          position={[-0.71, 17.627, 11.075]}
          rotation={[-1.269, -1.446, 0.037]}
          scale={[6.27, 0.586, 0.485]}
        />
        <mesh
          geometry={nodes.pPlane3_lambert3_0.geometry}
          material={materials.lambert3}
          position={[0.947, 14.193, 10.416]}
          rotation={[-1.591, 0.55, -0.214]}
          scale={[6.27, 0.586, 0.643]}
        />
        <mesh
          geometry={nodes.pPlane4_lambert3_0.geometry}
          material={materials.lambert3}
          position={[0.814, 16.241, 10.776]}
          rotation={[-1.56, -0.435, -0.363]}
          scale={[6.27, 0.586, 0.604]}
        />
        <mesh
          geometry={nodes.pPlane5_lambert3_0.geometry}
          material={materials.lambert3}
          position={[-2.936, 16.794, 10.439]}
          rotation={[1.706, -0.715, 3.012]}
          scale={[6.27, 0.586, 0.529]}
        />
        <mesh
          geometry={nodes.pPlane6_lambert3_0.geometry}
          material={materials.lambert3}
          position={[-1.274, 13.071, 10.581]}
          rotation={[0.012, 1.446, -1.813]}
          scale={[6.27, 0.586, 0.551]}
        />
        <mesh
          geometry={nodes.pPlane8_lambert5_0.geometry}
          material={materials.lambert5}
          position={[-0.818, 12.439, 6.323]}
          rotation={[-2.54, 1.282, -0.714]}
          scale={[5.853, 0.841, 1.645]}
        />
        <mesh
          geometry={nodes.pPlane9_lambert5_0.geometry}
          material={materials.lambert5}
          position={[-3.903, 12.292, 3.356]}
          rotation={[0.051, -0.331, 2.936]}
          scale={[5.853, 0.841, 3.004]}
        />
        <mesh
          geometry={nodes.pCylinder7_things_0.geometry}
          material={materials.things}
        />
        <mesh
          geometry={nodes.pCylinder3_things_0.geometry}
          material={materials.things}
        />
        <mesh
          geometry={nodes.pCylinder8_things_0.geometry}
          material={materials.things}
        />
        <mesh
          geometry={nodes.pCylinder6_things_0.geometry}
          material={materials.things}
        />
        <mesh
          geometry={nodes.pCylinder11_things_0.geometry}
          material={materials.things}
        />
        <mesh
          geometry={nodes.pCylinder10_things_0.geometry}
          material={materials.things}
        />
        <mesh
          geometry={nodes.pCylinder2_things_0.geometry}
          material={materials.things}
        />
        <mesh
          geometry={nodes.pCylinder4_things_0.geometry}
          material={materials.things}
        />
        <mesh
          geometry={nodes.pCylinder9_things_0.geometry}
          material={materials.things}
        />
      </group>
      <mesh
        geometry={nodes.pPlane7_lambert5_0.geometry}
        material={materials.lambert5}
      />
    </group>
  );
}

useGLTF.preload(GLTFModel);
