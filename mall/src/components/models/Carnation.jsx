import { useRef } from "react";
import GLTFModel from "./carnation.gltf";
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
      scale={0.05}
      position={[0, 0.2, 0]}
      rotation={[0.5, 0, 0]}
    >
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials["Material_9.001"]}
        position={[1.572, 2.032, 0]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={35.05}
      />
      <mesh
        geometry={nodes.Object_6.geometry}
        material={materials["Material_9.003"]}
        position={[5.549, 21.01, 0.403]}
      />
      <mesh
        geometry={nodes.Object_8.geometry}
        material={materials["Material_9.003"]}
        position={[-0.013, 17.116, 0.403]}
        rotation={[-Math.PI, 0, -Math.PI]}
      />
      <mesh
        geometry={nodes.Object_10.geometry}
        material={materials["Material.003"]}
        position={[0.81, -34.106, 0]}
        scale={[9.069, 14.256, 9.069]}
      />
      <mesh
        geometry={nodes.Object_12.geometry}
        material={materials["petal-red03"]}
        position={[-3.982, 46.177, 0]}
        rotation={[-0.186, 0.488, 0.382]}
      />
      <mesh
        geometry={nodes.Object_14.geometry}
        material={materials["petal-red03"]}
        position={[-3.982, 46.177, 0]}
        rotation={[0.29, -0.654, 0.438]}
      />
      <mesh
        geometry={nodes.Object_16.geometry}
        material={materials["petal-red03"]}
        position={[-3.982, 46.177, 0]}
        rotation={[2.507, -1.013, 2.418]}
      />
      <mesh
        geometry={nodes.Object_18.geometry}
        material={materials["petal-red03"]}
        position={[-3.982, 46.177, 0]}
        rotation={[-3.12, 0.076, 2.782]}
      />
      <mesh
        geometry={nodes.Object_20.geometry}
        material={materials["petal-red03"]}
        position={[-3.982, 46.177, 0]}
        rotation={[-2.086, 1.183, 2.041]}
      />
      <mesh
        geometry={nodes.Object_22.geometry}
        material={materials["petal-red03"]}
        position={[-4.87, 48.559, 0]}
        rotation={[-1.166, 1.208, 1.19]}
      />
      <mesh
        geometry={nodes.Object_24.geometry}
        material={materials["petal-red03"]}
        position={[-4.856, 48.564, -0.021]}
        rotation={[-0.059, 0.196, 0.351]}
      />
      <mesh
        geometry={nodes.Object_26.geometry}
        material={materials["petal-red03"]}
        position={[-4.832, 48.573, -0.013]}
        rotation={[0.608, -0.986, 0.688]}
      />
      <mesh
        geometry={nodes.Object_28.geometry}
        material={materials["petal-red03"]}
        position={[-4.832, 48.573, 0.013]}
        rotation={[2.768, -0.762, 2.635]}
      />
      <mesh
        geometry={nodes.Object_30.geometry}
        material={materials["petal-red03"]}
        position={[-4.499, 47.851, 0.021]}
        rotation={[-2.982, 0.447, 2.759]}
      />
      <mesh
        geometry={nodes.Object_32.geometry}
        material={materials["petal-red03"]}
        position={[-6.166, 52.259, 0.009]}
        rotation={[2.606, -0.932, 2.511]}
      />
      <mesh
        geometry={nodes.Object_34.geometry}
        material={materials["petal-red03"]}
        position={[-6.187, 52.252, 0.022]}
        rotation={[-3.086, 0.187, 2.788]}
      />
      <mesh
        geometry={nodes.Object_36.geometry}
        material={materials["petal-red03"]}
        position={[-6.206, 52.245, 0.005]}
        rotation={[-1.786, 1.228, 1.771]}
      />
      <mesh
        geometry={nodes.Object_38.geometry}
        material={materials["petal-red03"]}
        position={[-6.197, 52.248, -0.019]}
        rotation={[-0.144, 0.41, 0.373]}
      />
      <mesh
        geometry={nodes.Object_40.geometry}
        material={materials["petal-red03"]}
        position={[-6.171, 52.257, -0.017]}
        rotation={[0.4, -0.796, 0.522]}
      />
      <mesh
        geometry={nodes.Object_42.geometry}
        material={materials["petal-red03"]}
        position={[-7.13, 55.295, -0.003]}
        rotation={[1.63, -1.21, 1.625]}
      />
      <mesh
        geometry={nodes.Object_44.geometry}
        material={materials["petal-red03"]}
        position={[-7.141, 55.291, 0.02]}
        rotation={[3.016, -0.299, 2.771]}
      />
      <mesh
        geometry={nodes.Object_46.geometry}
        material={materials["petal-red03"]}
        position={[-7.166, 55.282, 0.015]}
        rotation={[-2.687, 0.904, 2.575]}
      />
      <mesh
        geometry={nodes.Object_48.geometry}
        material={materials["petal-red03"]}
        position={[-7.169, 55.281, -0.01]}
        rotation={[-0.429, 0.878, 0.544]}
      />
      <mesh
        geometry={nodes.Object_50.geometry}
        material={materials["petal-red03"]}
        position={[-7.146, 55.289, -0.022]}
        rotation={[0.137, -0.327, 0.371]}
      />
      <mesh
        geometry={nodes.Object_52.geometry}
        material={materials["petal-red03"]}
        position={[-5.23, 45.82, 0.594]}
        rotation={[-1.507, 1.16, 1.628]}
      />
      <mesh
        geometry={nodes.Object_54.geometry}
        material={materials["petal-red03"]}
        position={[-5.23, 45.82, 0.594]}
        rotation={[-0.013, 0.343, 0.43]}
      />
      <mesh
        geometry={nodes.Object_56.geometry}
        material={materials["petal-red03"]}
        position={[-5.23, 45.82, 0.594]}
        rotation={[0.643, -0.82, 0.631]}
      />
      <mesh
        geometry={nodes.Object_58.geometry}
        material={materials["petal-red03"]}
        position={[-5.23, 45.82, 0.594]}
        rotation={[2.709, -0.876, 2.438]}
      />
      <mesh
        geometry={nodes.Object_60.geometry}
        material={materials["petal-red03"]}
        position={[-5.23, 45.82, 0.594]}
        rotation={[-2.883, 0.279, 2.699]}
      />
    </group>
  );
}

useGLTF.preload(GLTFModel);
