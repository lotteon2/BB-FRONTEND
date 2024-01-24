import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import GLTFModel from "./sunflower.gltf";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF(GLTFModel);

  useFrame(() => {
    group.current.rotation.z -= 0.01;
  }, []);

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={0.004}
      rotation={[-45.55, -15.7, -14.4]}
      position={[0, -1.4, 0]}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials.OJITAS}
          position={[155.143, 907.101, 9.036]}
          rotation={[-1.216, Math.PI / 2, 0]}
          scale={44.285}
        />
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials.GIRASOLITO}
          position={[156.941, 901.146, 5.974]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[35.999, 124.44, 124.44]}
        />
        <mesh
          geometry={nodes.Object_14.geometry}
          material={materials.HOJA_1}
          position={[136.492, 911.07, -52.807]}
          rotation={[-2.958, Math.PI / 2, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_17.geometry}
          material={materials.HOJA_1}
          position={[144.302, 1016.036, 7.846]}
          rotation={[-2.594, Math.PI / 2, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_20.geometry}
          material={materials.HOJA_1}
          position={[141.137, 1010.194, 51.16]}
          rotation={[-2.226, 1.571, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_23.geometry}
          material={materials.HOJA_1}
          position={[143.986, 982.948, 90.501]}
          rotation={[-1.862, 1.571, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_26.geometry}
          material={materials.HOJA_1}
          position={[134.713, 960.715, 12.94]}
          rotation={[-1.479, 1.571, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_29.geometry}
          material={materials.HOJA_1}
          position={[144.302, 910.007, 123.055]}
          rotation={[-1.116, 1.571, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_32.geometry}
          material={materials.HOJA_1}
          position={[141.137, 866.339, 121.236]}
          rotation={[-0.748, 1.571, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_35.geometry}
          material={materials.HOJA_1}
          position={[143.986, 824.651, 97.736]}
          rotation={[-0.384, Math.PI / 2, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_38.geometry}
          material={materials.HOJA_1}
          position={[137.624, 879.747, 60.667]}
          rotation={[0.352, Math.PI / 2, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_41.geometry}
          material={materials.HOJA_1}
          position={[145.435, 786.394, -16.675]}
          rotation={[0.715, 1.571, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_44.geometry}
          material={materials.HOJA_1}
          position={[142.27, 799.392, -58.404]}
          rotation={[1.084, Math.PI / 2, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_47.geometry}
          material={materials.HOJA_1}
          position={[145.118, 832.83, -92.638]}
          rotation={[1.447, Math.PI / 2, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_50.geometry}
          material={materials.HOJA_1}
          position={[135.845, 841.788, -12.452]}
          rotation={[1.83, 1.571, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_53.geometry}
          material={materials.HOJA_1}
          position={[145.435, 910.185, -112.545]}
          rotation={[2.194, 1.571, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_56.geometry}
          material={materials.HOJA_1}
          position={[142.27, 952.935, -103.453]}
          rotation={[2.562, Math.PI / 2, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_59.geometry}
          material={materials.HOJA_1}
          position={[145.118, 990.109, -73.317]}
          rotation={[2.926, 1.571, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_62.geometry}
          material={materials.HOJA_1}
          position={[146.481, 796.166, 71.909]}
          rotation={[-0.045, 1.571, 0]}
          scale={[12.542, 13.822, 12.542]}
        />
        <mesh
          geometry={nodes.Object_65.geometry}
          material={materials.HOJA_1}
          position={[125.812, 909.564, -45.772]}
          rotation={[-2.958, 1.571, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_68.geometry}
          material={materials.HOJA_1}
          position={[132.7, 1002.131, 7.717]}
          rotation={[-2.594, 1.571, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_71.geometry}
          material={materials.HOJA_1}
          position={[129.909, 996.979, 45.914]}
          rotation={[-2.226, Math.PI / 2, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_74.geometry}
          material={materials.HOJA_1}
          position={[132.421, 972.951, 80.608]}
          rotation={[-1.862, Math.PI / 2, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_77.geometry}
          material={materials.HOJA_1}
          position={[124.244, 953.345, 12.209]}
          rotation={[-1.479, 1.571, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_80.geometry}
          material={materials.HOJA_1}
          position={[132.7, 908.627, 109.317]}
          rotation={[-1.116, Math.PI / 2, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_83.geometry}
          material={materials.HOJA_1}
          position={[129.909, 870.117, 107.712]}
          rotation={[-0.748, Math.PI / 2, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_86.geometry}
          material={materials.HOJA_1}
          position={[132.421, 833.354, 86.988]}
          rotation={[-0.384, 1.571, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_89.geometry}
          material={materials.HOJA_1}
          position={[126.811, 881.942, 54.298]}
          rotation={[0.352, 1.571, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_92.geometry}
          material={materials.HOJA_1}
          position={[133.699, 799.616, -13.908]}
          rotation={[0.715, 1.571, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_95.geometry}
          material={materials.HOJA_1}
          position={[130.908, 811.078, -50.707]}
          rotation={[1.084, Math.PI / 2, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_98.geometry}
          material={materials.HOJA_1}
          position={[133.42, 840.566, -80.897]}
          rotation={[1.447, 1.571, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_101.geometry}
          material={materials.HOJA_1}
          position={[125.242, 848.466, -10.184]}
          rotation={[1.83, Math.PI / 2, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_104.geometry}
          material={materials.HOJA_1}
          position={[133.699, 908.784, -98.453]}
          rotation={[2.194, 1.571, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_107.geometry}
          material={materials.HOJA_1}
          position={[130.908, 946.484, -90.435]}
          rotation={[2.562, Math.PI / 2, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_110.geometry}
          material={materials.HOJA_1}
          position={[133.42, 979.267, -63.859]}
          rotation={[2.926, Math.PI / 2, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_113.geometry}
          material={materials.HOJA_1}
          position={[134.622, 808.234, 64.212]}
          rotation={[-0.045, 1.571, 0]}
          scale={[11.06, 12.189, 11.06]}
        />
        <mesh
          geometry={nodes.Object_116.geometry}
          material={materials.HOJA_1}
          position={[117.423, 906.662, -32.213]}
          rotation={[-2.958, Math.PI / 2, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_119.geometry}
          material={materials.HOJA_1}
          position={[122.533, 975.332, 7.467]}
          rotation={[-2.594, Math.PI / 2, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_122.geometry}
          material={materials.HOJA_1}
          position={[120.462, 971.51, 35.804]}
          rotation={[-2.226, Math.PI / 2, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_125.geometry}
          material={materials.HOJA_1}
          position={[122.326, 953.685, 61.541]}
          rotation={[-1.862, Math.PI / 2, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_128.geometry}
          material={materials.HOJA_1}
          position={[116.259, 939.141, 10.8]}
          rotation={[-1.479, 1.571, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_131.geometry}
          material={materials.HOJA_1}
          position={[122.533, 905.967, 82.838]}
          rotation={[-1.116, 1.571, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_134.geometry}
          material={materials.HOJA_1}
          position={[120.462, 877.399, 81.648]}
          rotation={[-0.748, 1.571, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_137.geometry}
          material={materials.HOJA_1}
          position={[122.326, 850.127, 66.274]}
          rotation={[-0.384, Math.PI / 2, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_140.geometry}
          material={materials.HOJA_1}
          position={[118.164, 886.171, 42.023]}
          rotation={[0.352, Math.PI / 2, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_143.geometry}
          material={materials.HOJA_1}
          position={[123.274, 825.098, -8.575]}
          rotation={[0.715, Math.PI / 2, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_146.geometry}
          material={materials.HOJA_1}
          position={[121.203, 833.602, -35.874]}
          rotation={[1.084, 1.571, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_149.geometry}
          material={materials.HOJA_1}
          position={[123.067, 855.477, -58.27]}
          rotation={[1.447, Math.PI / 2, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_152.geometry}
          material={materials.HOJA_1}
          position={[117, 861.337, -5.812]}
          rotation={[1.83, Math.PI / 2, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_155.geometry}
          material={materials.HOJA_1}
          position={[123.274, 906.084, -71.293]}
          rotation={[2.194, Math.PI / 2, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_158.geometry}
          material={materials.HOJA_1}
          position={[121.203, 934.051, -65.345]}
          rotation={[2.562, Math.PI / 2, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_161.geometry}
          material={materials.HOJA_1}
          position={[123.067, 958.37, -45.63]}
          rotation={[2.926, 1.571, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_164.geometry}
          material={materials.HOJA_1}
          position={[123.959, 831.491, 49.378]}
          rotation={[-0.045, Math.PI / 2, 0]}
          scale={[8.205, 9.043, 8.205]}
        />
        <mesh
          geometry={nodes.Object_167.geometry}
          material={materials["Material.001"]}
          position={[156.941, 901.146, 5.974]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[35.999, 124.44, 124.44]}
        />
        <mesh
          geometry={nodes.Object_170.geometry}
          material={materials["Material.001"]}
          position={[48.364, 790.988, -8.556]}
          rotation={[-2.566, 0, 0]}
          scale={[4.094, 3.83, 4.619]}
        />
        <mesh
          geometry={nodes.Object_173.geometry}
          material={materials.ojita}
          position={[46.548, 861.987, -84.525]}
          rotation={[-Math.PI / 2, 0, -3.112]}
          scale={[36.563, 39.357, 1.266]}
        />
        <mesh
          geometry={nodes.Object_176.geometry}
          material={materials["Material.001"]}
          position={[47.841, 616.419, 14.772]}
          rotation={[-0.586, -0.182, 3.022]}
          scale={[4.094, 3.83, 4.619]}
        />
        <mesh
          geometry={nodes.Object_179.geometry}
          material={materials.ojita}
          position={[33.199, 689.903, 89.339]}
          rotation={[-Math.PI / 2, 0.436, -0.188]}
          scale={[36.563, 39.357, 1.266]}
        />
      </group>
    </group>
  );
}

useGLTF.preload(GLTFModel);
