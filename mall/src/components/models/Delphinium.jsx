import { useRef } from "react";
import GLTFModel from "./delphinium.gltf";
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
      scale={5}
      position={[0, -1.8, 0]}
      rotation={[0.5, 0, 0]}
    >
      <group scale={0.01}>
        <group
          position={[10.434, 86.735, 0.941]}
          rotation={[-1.611, 0.827, 1.949]}
          scale={51.2}
        >
          <mesh
            geometry={nodes.stem025_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal026_petal_0.geometry}
            material={materials.petal}
            scale={0.8}
          />
          <mesh
            geometry={nodes.inside_petal026_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
            scale={0.8}
          />
          <mesh
            geometry={nodes.stamen026_stamen_0.geometry}
            material={materials.stamen}
            scale={0.8}
          />
          <mesh
            geometry={nodes.petal_o002_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[3.625, 79.242, 1.587]}
          rotation={[-0.973, -0.02, 2.613]}
          scale={81}
        >
          <mesh
            geometry={nodes.stem026_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal027_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal027_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen027_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o003_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[1.334, 73.378, 0.789]}
          rotation={[-2.073, 0.673, -0.943]}
          scale={100}
        >
          <mesh
            geometry={nodes.stem034_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal035_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal035_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen035_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o011_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[1.214, 72.926, 0.704]}
          rotation={[-0.306, -0.571, 2.611]}
          scale={100}
        >
          <mesh
            geometry={nodes.stem036_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal037_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal037_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen037_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o013_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[0.636, 69.24, 0.034]}
          rotation={[-0.255, 0.209, 2.896]}
          scale={90}
        >
          <mesh
            geometry={nodes.stem037_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal038_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal038_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen038_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o014_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[0.713, 69.719, 0.17]}
          rotation={[-1.596, 0.287, 0.817]}
          scale={100}
        >
          <mesh
            geometry={nodes.stem038_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal039_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal039_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen039_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o015_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[0.533, 68.343, -0.08]}
          rotation={[-1.495, 0.655, -2.147]}
          scale={100}
        >
          <mesh
            geometry={nodes.stem039_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal040_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal040_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen040_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o016_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[0.535, 67.114, -0.299]}
          rotation={[-0.405, -1.033, 2.761]}
          scale={100}
        >
          <mesh
            geometry={nodes.stem040_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal041_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal041_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen041_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o017_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[0.525, 65.585, -0.422]}
          rotation={[-2.944, 0.477, -2.901]}
          scale={100}
        >
          <mesh
            geometry={nodes.stem041_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal042_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal042_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen042_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o018_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[0.511, 63.947, -0.693]}
          rotation={[-2.877, -0.623, 0.612]}
          scale={100}
        >
          <mesh
            geometry={nodes.stem042_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal043_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal043_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen043_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o019_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[0.528, 63.226, -0.469]}
          rotation={[-1.021, 0.451, 0.37]}
          scale={110}
        >
          <mesh
            geometry={nodes.stem043_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal044_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal044_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen044_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o020_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[0.594, 59.988, -0.679]}
          rotation={[-1.468, -0.017, -1.25]}
          scale={110}
        >
          <mesh
            geometry={nodes.stem044_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal045_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal045_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen045_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o021_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[0.64, 58.841, -0.638]}
          rotation={[2.916, 1.224, 0.265]}
          scale={133.1}
        >
          <mesh
            geometry={nodes.stem045_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal046_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal046_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen046_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o022_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[0.535, 59.171, -0.754]}
          rotation={[-3.136, -0.249, -2.873]}
          scale={110}
        >
          <mesh
            geometry={nodes.stem046_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal047_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal047_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen047_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o023_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[0.388, 52.631, -0.51]}
          rotation={[-1.725, -0.952, 1.578]}
          scale={110}
        >
          <mesh
            geometry={nodes.stem047_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal048_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal048_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen048_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o024_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[0.483, 52.965, -0.459]}
          rotation={[3.034, 0.588, 0.174]}
          scale={132}
        >
          <mesh
            geometry={nodes.stem048_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal049_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal049_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen049_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o025_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[0.286, 52.03, -0.271]}
          rotation={[2.648, -0.489, 2.784]}
          scale={110}
        >
          <mesh
            geometry={nodes.stem049_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal050_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal050_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen050_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o026_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[0.141, 49.474, 0.067]}
          rotation={[-0.111, 0.052, 3.131]}
          scale={110}
        >
          <mesh
            geometry={nodes.stem050_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal051_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal051_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen051_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o027_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[-0.322, 46.157, 0.391]}
          rotation={[0.166, 0.948, 3.018]}
          scale={110}
        >
          <mesh
            geometry={nodes.stem051_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal052_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal052_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen052_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o028_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[0.02, 48.558, 0.16]}
          rotation={[0.585, -1.166, -2.709]}
          scale={110}
        >
          <mesh
            geometry={nodes.stem052_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal053_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal053_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen053_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o029_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[-0.242, 46.686, 0.313]}
          rotation={[-2.301, -0.051, -0.155]}
          scale={132}
        >
          <mesh
            geometry={nodes.stem053_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal054_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal054_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen054_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o030_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[-0.409, 45.482, 0.518]}
          rotation={[-1.252, -0.081, 2.84]}
          scale={110}
        >
          <mesh
            geometry={nodes.stem054_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal055_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal055_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen055_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o031_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[-0.712, 44.024, 0.861]}
          rotation={[2.983, -0.86, -0.181]}
          scale={110}
        >
          <mesh
            geometry={nodes.stem055_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal056_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal056_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen056_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o032_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[9.736, 86.405, 1.062]}
          rotation={[-2.991, 0.937, 0.315]}
          scale={63.36}
        >
          <mesh
            geometry={nodes.stem027_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal028_petal_0.geometry}
            material={materials.petal}
            scale={0.8}
          />
          <mesh
            geometry={nodes.inside_petal028_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
            scale={0.8}
          />
          <mesh
            geometry={nodes.stamen028_stamen_0.geometry}
            material={materials.stamen}
            scale={0.8}
          />
          <mesh
            geometry={nodes.petal_o004_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[9.236, 86.099, 1.13]}
          rotation={[-1.605, 0.039, 1.179]}
          scale={64.152}
        >
          <mesh
            geometry={nodes.stem028_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal029_petal_0.geometry}
            material={materials.petal}
            scale={0.8}
          />
          <mesh
            geometry={nodes.inside_petal029_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
            scale={0.8}
          />
          <mesh
            geometry={nodes.stamen029_stamen_0.geometry}
            material={materials.stamen}
            scale={0.8}
          />
          <mesh
            geometry={nodes.petal_o005_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[8.649, 85.761, 1.242]}
          rotation={[-0.559, 0.424, 2.674]}
          scale={71.28}
        >
          <mesh
            geometry={nodes.stem029_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal030_petal_0.geometry}
            material={materials.petal}
            scale={0.8}
          />
          <mesh
            geometry={nodes.inside_petal030_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
            scale={0.8}
          />
          <mesh
            geometry={nodes.stamen030_stamen_0.geometry}
            material={materials.stamen}
            scale={0.8}
          />
          <mesh
            geometry={nodes.petal_o006_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[8.216, 85.458, 1.313]}
          rotation={[-0.709, 0.607, 1.428]}
          scale={71.28}
        >
          <mesh
            geometry={nodes.stem030_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal031_petal_0.geometry}
            material={materials.petal}
            scale={0.8}
          />
          <mesh
            geometry={nodes.inside_petal031_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
            scale={0.8}
          />
          <mesh
            geometry={nodes.stamen031_stamen_0.geometry}
            material={materials.stamen}
            scale={0.8}
          />
          <mesh
            geometry={nodes.petal_o007_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[7.876, 85.219, 1.351]}
          rotation={[-2.879, 0.61, -0.116]}
          scale={71.28}
        >
          <mesh
            geometry={nodes.stem031_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal032_petal_0.geometry}
            material={materials.petal}
            scale={0.8}
          />
          <mesh
            geometry={nodes.inside_petal032_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
            scale={0.8}
          />
          <mesh
            geometry={nodes.stamen032_stamen_0.geometry}
            material={materials.stamen}
            scale={0.8}
          />
          <mesh
            geometry={nodes.petal_o008_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[6.741, 84.227, 1.485]}
          rotation={[0.35, 1.355, 2.263]}
          scale={71.28}
        >
          <mesh
            geometry={nodes.stem032_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal033_petal_0.geometry}
            material={materials.petal}
            scale={0.8}
          />
          <mesh
            geometry={nodes.inside_petal033_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
            scale={0.8}
          />
          <mesh
            geometry={nodes.stamen033_stamen_0.geometry}
            material={materials.stamen}
            scale={0.8}
          />
          <mesh
            geometry={nodes.petal_o009_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[6.609, 84.006, 1.588]}
          rotation={[-2.093, 0.145, 0.698]}
          scale={76.982}
        >
          <mesh
            geometry={nodes.stem033_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal034_petal_0.geometry}
            material={materials.petal}
            scale={0.8}
          />
          <mesh
            geometry={nodes.inside_petal034_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
            scale={0.8}
          />
          <mesh
            geometry={nodes.stamen034_stamen_0.geometry}
            material={materials.stamen}
            scale={0.8}
          />
          <mesh
            geometry={nodes.petal_o010_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[5.857, 83.035, 1.626]}
          rotation={[-1.069, 0.525, 2.482]}
          scale={76.982}
        >
          <mesh
            geometry={nodes.stem035_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal036_petal_0.geometry}
            material={materials.petal}
            scale={0.8}
          />
          <mesh
            geometry={nodes.inside_petal036_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
            scale={0.8}
          />
          <mesh
            geometry={nodes.stamen036_stamen_0.geometry}
            material={materials.stamen}
            scale={0.8}
          />
          <mesh
            geometry={nodes.petal_o012_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[5.481, 82.52, 1.687]}
          rotation={[-2.928, 0.566, 0.236]}
          scale={74.827}
        >
          <mesh
            geometry={nodes.stem056_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal057_petal_0.geometry}
            material={materials.petal}
            scale={0.8}
          />
          <mesh
            geometry={nodes.inside_petal057_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
            scale={0.8}
          />
          <mesh
            geometry={nodes.stamen057_stamen_0.geometry}
            material={materials.stamen}
            scale={0.8}
          />
          <mesh
            geometry={nodes.petal_o033_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[4.995, 81.78, 1.621]}
          rotation={[-1.446, -0.126, 1.386]}
          scale={74.827}
        >
          <mesh
            geometry={nodes.stem057_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal058_petal_0.geometry}
            material={materials.petal}
            scale={0.8}
          />
          <mesh
            geometry={nodes.inside_petal058_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
            scale={0.8}
          />
          <mesh
            geometry={nodes.stamen058_stamen_0.geometry}
            material={materials.stamen}
            scale={0.8}
          />
          <mesh
            geometry={nodes.petal_o034_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[4.461, 80.844, 1.673]}
          rotation={[-1.816, 1.413, -1.65]}
          scale={74.827}
        >
          <mesh
            geometry={nodes.stem058_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal059_petal_0.geometry}
            material={materials.petal}
            scale={0.8}
          />
          <mesh
            geometry={nodes.inside_petal059_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
            scale={0.8}
          />
          <mesh
            geometry={nodes.stamen059_stamen_0.geometry}
            material={materials.stamen}
            scale={0.8}
          />
          <mesh
            geometry={nodes.petal_o035_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[3.306, 78.656, 1.552]}
          rotation={[-2.197, 0.617, -0.263]}
          scale={90}
        >
          <mesh
            geometry={nodes.stem059_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal060_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal060_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen060_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o036_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[2.786, 77.413, 1.413]}
          rotation={[-1.764, 0.164, 0.946]}
          scale={99}
        >
          <mesh
            geometry={nodes.stem060_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal061_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal061_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen061_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o037_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[2.092, 75.812, 1.212]}
          rotation={[-1.673, 0.224, 1.959]}
          scale={89.1}
        >
          <mesh
            geometry={nodes.stem061_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal062_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal062_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen062_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o038_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[2.004, 75.486, 1.186]}
          rotation={[-1.655, 0.477, -1.863]}
          scale={89.1}
        >
          <mesh
            geometry={nodes.stem062_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal063_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal063_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen063_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o039_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <group
          position={[0.585, 56.142, -0.468]}
          rotation={[-1.385, -0.004, 2.454]}
          scale={100}
        >
          <mesh
            geometry={nodes.stem063_stem_0.geometry}
            material={materials.stem}
          />
          <mesh
            geometry={nodes.petal064_petal_0.geometry}
            material={materials.petal}
          />
          <mesh
            geometry={nodes.inside_petal064_petal2_0.geometry}
            material={materials.petal2}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            geometry={nodes.stamen064_stamen_0.geometry}
            material={materials.stamen}
          />
          <mesh
            geometry={nodes.petal_o040_petal_out_0.geometry}
            material={materials.petal_out}
          />
        </group>
        <mesh
          geometry={nodes.leaf009_leaf_0.geometry}
          material={materials.leaf}
          position={[0.502, 54.193, -0.479]}
          rotation={[-0.934, 0.595, 0.656]}
          scale={100}
        />
        <mesh
          geometry={nodes.leaf010_leaf_0.geometry}
          material={materials.leaf}
          position={[0.517, 53.655, -0.38]}
          rotation={[-2.431, -0.039, -2.703]}
          scale={80}
        />
        <mesh
          geometry={nodes.leaf011_leaf_0.geometry}
          material={materials.leaf}
          position={[-0.088, 47.85, 0.287]}
          rotation={[-1.694, 0.775, 1.961]}
          scale={110}
        />
        <mesh
          geometry={nodes.leaf012_leaf_0.geometry}
          material={materials.leaf}
          position={[-1.286, 39.422, 1.097]}
          rotation={[-2.504, -0.271, -2.795]}
          scale={80}
        />
        <mesh
          geometry={nodes.leaf013_leaf_0.geometry}
          material={materials.leaf}
          position={[-1.011, 41.063, 1.058]}
          rotation={[-2.533, 0.462, 2.755]}
          scale={120}
        />
        <mesh
          geometry={nodes.leaf014_leaf_0.geometry}
          material={materials.leaf}
          position={[-1.319, 38.659, 1.048]}
          rotation={[-2.017, -0.818, -1.865]}
          scale={134.4}
        />
        <mesh
          geometry={nodes.leaf015_leaf_0.geometry}
          material={materials.leaf}
          position={[-1.049, 41.453, 1.142]}
          rotation={[-0.843, 0.078, 0.309]}
          scale={121}
        />
        <mesh
          geometry={nodes.leaf016_leaf_0.geometry}
          material={materials.leaf}
          position={[-1.631, 35.023, 1.437]}
          rotation={[-0.987, 0.948, 1.074]}
          scale={123.2}
        />
        <mesh
          geometry={nodes.leaf017_leaf_0.geometry}
          material={materials.leaf}
          position={[-1.863, 34.287, 1.439]}
          rotation={[-0.599, -0.795, -0.055]}
          scale={145.2}
        />
        <mesh
          geometry={nodes.main_stem_stem_0.geometry}
          material={materials.stem}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  );
}

useGLTF.preload(GLTFModel);
