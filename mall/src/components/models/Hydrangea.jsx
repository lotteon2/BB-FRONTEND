import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import GLTFModel from "./hydrangea.gltf";
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
      scale={7.5}
      position={[0, -0.8, 0]}
    >
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.018}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[0.246, 21.556, 0.663]}
            rotation={[Math.PI, -0.895, Math.PI]}
          >
            <mesh
              geometry={nodes.Object_643.geometry}
              material={materials.Material_177}
            />
            <mesh
              geometry={nodes.Object_644.geometry}
              material={materials.Material_177}
            />
          </group>
          <mesh
            geometry={nodes.Object_4.geometry}
            material={materials.Material_107}
            position={[1.197, 24.431, 0.285]}
            rotation={[1.113, -1.067, 1.339]}
          />
          <mesh
            geometry={nodes.Object_6.geometry}
            material={materials.Material_65}
            position={[1.212, 24.439, 0.29]}
            rotation={[1.113, -1.067, 1.339]}
          />
          <mesh
            geometry={nodes.Object_9.geometry}
            material={materials.Material_173}
            position={[1.71, 23.396, 1.74]}
            rotation={[0.1, -0.645, -0.627]}
          />
          <mesh
            geometry={nodes.Object_11.geometry}
            material={materials.Material_107}
            position={[1.71, 23.396, 1.74]}
            rotation={[0.1, -0.645, -0.627]}
          />
          <mesh
            geometry={nodes.Object_14.geometry}
            material={materials.Material_174}
            position={[0.197, 24.068, 2.018]}
            rotation={[0.107, -0.024, 0.512]}
          />
          <mesh
            geometry={nodes.Object_16.geometry}
            material={materials.Material_107}
            position={[0.129, 24.077, 1.998]}
            rotation={[0.107, -0.024, 0.512]}
          />
          <mesh
            geometry={nodes.Object_19.geometry}
            material={materials.Material_175}
            position={[1.51, 22.915, 3.921]}
            rotation={[0.292, 0.46, 0.263]}
          />
          <mesh
            geometry={nodes.Object_21.geometry}
            material={materials.Material_107}
            position={[1.523, 22.909, 3.94]}
            rotation={[0.292, 0.46, 0.263]}
          />
          <mesh
            geometry={nodes.Object_24.geometry}
            material={materials.Material_176}
            position={[-0.932, 23.71, 0.413]}
            rotation={[0.557, -0.963, 1.288]}
          />
          <mesh
            geometry={nodes.Object_26.geometry}
            material={materials.Material_107}
            position={[-0.981, 23.682, 0.369]}
            rotation={[0.557, -0.963, 1.288]}
          />
          <mesh
            geometry={nodes.Object_29.geometry}
            material={materials.Material_65}
            position={[3.725, 22.557, 0.496]}
          />
          <mesh
            geometry={nodes.Object_31.geometry}
            material={materials.Material_107}
            position={[3.725, 22.557, 0.496]}
          />
          <mesh
            geometry={nodes.Object_34.geometry}
            material={materials.Material_173}
            position={[-0.839, 23.043, 2.931]}
            rotation={[0.312, 0.607, 0.429]}
            scale={0.769}
          />
          <mesh
            geometry={nodes.Object_36.geometry}
            material={materials.Material_107}
            position={[-0.842, 23.064, 2.955]}
            rotation={[0.312, 0.607, 0.429]}
            scale={0.769}
          />
          <mesh
            geometry={nodes.Object_39.geometry}
            material={materials.Material_174}
            position={[0.064, 24.298, -1.583]}
            rotation={[-0.185, -0.034, 0.564]}
            scale={0.743}
          />
          <mesh
            geometry={nodes.Object_41.geometry}
            material={materials.Material_107}
            position={[0.013, 24.298, -1.599]}
            rotation={[-0.185, -0.034, 0.564]}
            scale={0.743}
          />
          <mesh
            geometry={nodes.Object_44.geometry}
            material={materials.Material_175}
            position={[-1.381, 24.298, -0.196]}
            rotation={[2.181, -0.302, 2.959]}
            scale={0.831}
          />
          <mesh
            geometry={nodes.Object_46.geometry}
            material={materials.Material_107}
            position={[-1.347, 24.289, -0.244]}
            rotation={[2.181, -0.302, 2.959]}
            scale={0.831}
          />
          <mesh
            geometry={nodes.Object_49.geometry}
            material={materials.Material_176}
            position={[2.971, 24.063, 0.495]}
            rotation={[-0.389, -0.598, -1.142]}
            scale={0.725}
          />
          <mesh
            geometry={nodes.Object_51.geometry}
            material={materials.Material_107}
            position={[2.971, 24.063, 0.495]}
            rotation={[-0.389, -0.598, -1.142]}
            scale={0.725}
          />
          <mesh
            geometry={nodes.Object_54.geometry}
            material={materials.Material_107}
            position={[-2.417, 23.993, 1.735]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.835}
          />
          <mesh
            geometry={nodes.Object_56.geometry}
            material={materials.Material_65}
            position={[-2.429, 23.997, 1.72]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.835}
          />
          <mesh
            geometry={nodes.Object_59.geometry}
            material={materials.Material_173}
            position={[-1.38, 23.515, 4.314]}
            rotation={[0.44, 0.124, 0.256]}
            scale={0.786}
          />
          <mesh
            geometry={nodes.Object_61.geometry}
            material={materials.Material_107}
            position={[-1.38, 23.515, 4.314]}
            rotation={[0.44, 0.124, 0.256]}
            scale={0.786}
          />
          <mesh
            geometry={nodes.Object_64.geometry}
            material={materials.Material_174}
            position={[0.481, 23.149, 5.568]}
            rotation={[1.727, -1.124, 1.358]}
            scale={0.999}
          />
          <mesh
            geometry={nodes.Object_66.geometry}
            material={materials.Material_107}
            position={[0.466, 23.147, 5.558]}
            rotation={[1.727, -1.124, 1.358]}
            scale={0.999}
          />
          <mesh
            geometry={nodes.Object_69.geometry}
            material={materials.Material_175}
            position={[3.037, 22.37, 3.457]}
            rotation={[0.895, 0.519, -0.439]}
            scale={0.766}
          />
          <mesh
            geometry={nodes.Object_71.geometry}
            material={materials.Material_107}
            position={[3.038, 22.371, 3.457]}
            rotation={[0.895, 0.519, -0.439]}
            scale={0.766}
          />
          <mesh
            geometry={nodes.Object_74.geometry}
            material={materials.Material_176}
            position={[3.664, 22.23, 5.341]}
            rotation={[-0.546, -1.33, -0.981]}
            scale={0.894}
          />
          <mesh
            geometry={nodes.Object_76.geometry}
            material={materials.Material_107}
            position={[3.638, 22.28, 5.31]}
            rotation={[-0.546, -1.33, -0.981]}
            scale={0.894}
          />
          <mesh
            geometry={nodes.Object_79.geometry}
            material={materials.Material_107}
            position={[4.325, 23.38, 2.366]}
            rotation={[0.107, -0.024, 0.512]}
            scale={0.907}
          />
          <mesh
            geometry={nodes.Object_81.geometry}
            material={materials.Material_65}
            position={[4.358, 23.326, 2.38]}
            rotation={[0.107, -0.024, 0.512]}
            scale={0.907}
          />
          <mesh
            geometry={nodes.Object_84.geometry}
            material={materials.Material_173}
            position={[5.354, 21.963, 3.789]}
            rotation={[0.85, -0.475, -0.496]}
            scale={0.741}
          />
          <mesh
            geometry={nodes.Object_86.geometry}
            material={materials.Material_107}
            position={[5.344, 21.96, 3.797]}
            rotation={[0.85, -0.475, -0.496]}
            scale={0.741}
          />
          <mesh
            geometry={nodes.Object_89.geometry}
            material={materials.Material_174}
            position={[6.122, 22.062, 2]}
            rotation={[-2.999, 0.218, -2.157]}
            scale={0.705}
          />
          <mesh
            geometry={nodes.Object_91.geometry}
            material={materials.Material_107}
            position={[6.122, 22.062, 2]}
            rotation={[-2.999, 0.218, -2.157]}
            scale={0.705}
          />
          <mesh
            geometry={nodes.Object_94.geometry}
            material={materials.Material_175}
            position={[5.283, 23.011, 0.712]}
            rotation={[0.474, -0.062, -0.577]}
            scale={0.727}
          />
          <mesh
            geometry={nodes.Object_96.geometry}
            material={materials.Material_107}
            position={[5.278, 23.011, 0.724]}
            rotation={[0.474, -0.062, -0.577]}
            scale={0.727}
          />
          <mesh
            geometry={nodes.Object_99.geometry}
            material={materials.Material_176}
            position={[5.334, 20.95, -0.482]}
            rotation={[1.896, 0.659, -1.977]}
            scale={0.98}
          />
          <mesh
            geometry={nodes.Object_101.geometry}
            material={materials.Material_107}
            position={[5.334, 20.951, -0.483]}
            rotation={[1.896, 0.659, -1.977]}
            scale={0.98}
          />
          <mesh
            geometry={nodes.Object_104.geometry}
            material={materials.Material_65}
            position={[4.241, 23.335, -1.106]}
            rotation={[0.312, 0.607, 0.429]}
            scale={0.634}
          />
          <mesh
            geometry={nodes.Object_106.geometry}
            material={materials.Material_107}
            position={[4.25, 23.353, -1.09]}
            rotation={[0.312, 0.607, 0.429]}
            scale={0.634}
          />
          <mesh
            geometry={nodes.Object_109.geometry}
            material={materials.Material_107}
            position={[5.326, 22.318, -2.079]}
            rotation={[-0.294, 0.281, -0.945]}
            scale={0.999}
          />
          <mesh
            geometry={nodes.Object_111.geometry}
            material={materials.Material_173}
            position={[5.326, 22.318, -2.079]}
            rotation={[-0.294, 0.281, -0.945]}
            scale={0.999}
          />
          <mesh
            geometry={nodes.Object_114.geometry}
            material={materials.Material_174}
            position={[2.638, 23.812, -1.532]}
            rotation={[0.164, 0.388, -0.186]}
            scale={0.733}
          />
          <mesh
            geometry={nodes.Object_116.geometry}
            material={materials.Material_107}
            position={[2.645, 23.809, -1.517]}
            rotation={[0.164, 0.388, -0.186]}
            scale={0.733}
          />
          <mesh
            geometry={nodes.Object_119.geometry}
            material={materials.Material_175}
            position={[3.122, 23.044, -3.019]}
            rotation={[-2.082, -0.964, -2.389]}
            scale={0.79}
          />
          <mesh
            geometry={nodes.Object_121.geometry}
            material={materials.Material_107}
            position={[3.122, 23.044, -3.018]}
            rotation={[-2.082, -0.964, -2.389]}
            scale={0.79}
          />
          <mesh
            geometry={nodes.Object_124.geometry}
            material={materials.Material_176}
            position={[4.435, 22.12, -4.143]}
            rotation={[-2.801, -0.912, -1.869]}
            scale={0.706}
          />
          <mesh
            geometry={nodes.Object_126.geometry}
            material={materials.Material_107}
            position={[4.435, 22.12, -4.143]}
            rotation={[-2.801, -0.912, -1.869]}
            scale={0.706}
          />
          <mesh
            geometry={nodes.Object_129.geometry}
            material={materials.Material_65}
            position={[2.569, 22.957, -3.944]}
            scale={0.787}
          />
          <mesh
            geometry={nodes.Object_131.geometry}
            material={materials.Material_107}
            position={[2.569, 22.957, -3.944]}
            scale={0.787}
          />
          <mesh
            geometry={nodes.Object_134.geometry}
            material={materials.Material_173}
            position={[1.228, 23.469, -2.941]}
            rotation={[-0.582, -0.074, -0.11]}
            scale={0.802}
          />
          <mesh
            geometry={nodes.Object_136.geometry}
            material={materials.Material_107}
            position={[1.228, 23.469, -2.941]}
            rotation={[-0.582, -0.074, -0.11]}
            scale={0.802}
          />
          <mesh
            geometry={nodes.Object_139.geometry}
            material={materials.Material_174}
            position={[4.286, 24.392, -0.125]}
            rotation={[0.158, 0.463, -0.985]}
            scale={0.685}
          />
          <mesh
            geometry={nodes.Object_141.geometry}
            material={materials.Material_107}
            position={[4.311, 24.407, -0.122]}
            rotation={[0.158, 0.463, -0.985]}
            scale={0.685}
          />
          <mesh
            geometry={nodes.Object_144.geometry}
            material={materials.Material_175}
            position={[-1.643, 23.72, -1.973]}
            rotation={[-0.186, -0.083, 0.808]}
            scale={0.957}
          />
          <mesh
            geometry={nodes.Object_146.geometry}
            material={materials.Material_107}
            position={[-1.706, 23.71, -1.998]}
            rotation={[-0.186, -0.083, 0.808]}
            scale={0.957}
          />
          <mesh
            geometry={nodes.Object_149.geometry}
            material={materials.Material_176}
            position={[-3.355, 23.883, -0.691]}
            rotation={[-0.183, -0.083, 0.546]}
            scale={0.85}
          />
          <mesh
            geometry={nodes.Object_151.geometry}
            material={materials.Material_107}
            position={[-3.355, 23.883, -0.691]}
            rotation={[-0.183, -0.083, 0.546]}
            scale={0.85}
          />
          <mesh
            geometry={nodes.Object_154.geometry}
            material={materials.Material_107}
            position={[-3.676, 23.091, 1.073]}
            rotation={[1.113, -1.067, 1.339]}
            scale={0.771}
          />
          <mesh
            geometry={nodes.Object_156.geometry}
            material={materials.Material_65}
            position={[-3.671, 23.095, 1.086]}
            rotation={[1.113, -1.067, 1.339]}
            scale={0.771}
          />
          <mesh
            geometry={nodes.Object_159.geometry}
            material={materials.Material_173}
            position={[-2.847, 23.95, 3.02]}
            rotation={[0.362, 0.159, 0.397]}
            scale={0.703}
          />
          <mesh
            geometry={nodes.Object_161.geometry}
            material={materials.Material_107}
            position={[-2.847, 23.95, 3.02]}
            rotation={[0.362, 0.159, 0.397]}
            scale={0.703}
          />
          <mesh
            geometry={nodes.Object_164.geometry}
            material={materials.Material_174}
            position={[-6.961, 19.836, 1.702]}
            rotation={[1.443, -0.474, 1.49]}
            scale={0.701}
          />
          <mesh
            geometry={nodes.Object_166.geometry}
            material={materials.Material_107}
            position={[-6.967, 19.826, 1.697]}
            rotation={[1.443, -0.474, 1.49]}
            scale={0.701}
          />
          <mesh
            geometry={nodes.Object_169.geometry}
            material={materials.Material_175}
            position={[-3.366, 22.158, 3.297]}
            rotation={[-0.125, -0.086, 0.425]}
            scale={0.96}
          />
          <mesh
            geometry={nodes.Object_171.geometry}
            material={materials.Material_107}
            position={[-3.366, 22.158, 3.297]}
            rotation={[-0.125, -0.086, 0.425]}
            scale={0.96}
          />
          <mesh
            geometry={nodes.Object_174.geometry}
            material={materials.Material_176}
            position={[-3.16, 22.536, 5.296]}
            rotation={[0.799, -0.05, 0.421]}
            scale={0.816}
          />
          <mesh
            geometry={nodes.Object_176.geometry}
            material={materials.Material_107}
            position={[-3.16, 22.536, 5.296]}
            rotation={[0.799, -0.05, 0.421]}
            scale={0.816}
          />
          <mesh
            geometry={nodes.Object_179.geometry}
            material={materials.Material_107}
            position={[-0.928, 21.887, 6.181]}
            rotation={[0.107, -0.024, 0.512]}
            scale={0.875}
          />
          <mesh
            geometry={nodes.Object_181.geometry}
            material={materials.Material_65}
            position={[-0.943, 21.836, 6.212]}
            rotation={[0.107, -0.024, 0.512]}
            scale={0.875}
          />
          <mesh
            geometry={nodes.Object_184.geometry}
            material={materials.Material_173}
            position={[1.572, 21.833, 5.664]}
            rotation={[-1.588, -1.104, -2.669]}
            scale={0.701}
          />
          <mesh
            geometry={nodes.Object_186.geometry}
            material={materials.Material_107}
            position={[1.572, 21.833, 5.664]}
            rotation={[-1.588, -1.104, -2.669]}
            scale={0.701}
          />
          <mesh
            geometry={nodes.Object_189.geometry}
            material={materials.Material_174}
            position={[5.491, 20.535, 4.272]}
            rotation={[2.069, 0.122, -0.597]}
            scale={0.869}
          />
          <mesh
            geometry={nodes.Object_191.geometry}
            material={materials.Material_107}
            position={[5.494, 20.517, 4.261]}
            rotation={[2.069, 0.122, -0.597]}
            scale={0.869}
          />
          <mesh
            geometry={nodes.Object_194.geometry}
            material={materials.Material_175}
            position={[6.125, 20.357, 2.574]}
            rotation={[0.338, -0.493, -0.92]}
            scale={0.957}
          />
          <mesh
            geometry={nodes.Object_196.geometry}
            material={materials.Material_107}
            position={[6.114, 20.36, 2.586]}
            rotation={[0.338, -0.493, -0.92]}
            scale={0.957}
          />
          <mesh
            geometry={nodes.Object_199.geometry}
            material={materials.Material_176}
            position={[6.845, 21.517, -0.124]}
            rotation={[1.965, 0.26, -1.587]}
            scale={0.885}
          />
          <mesh
            geometry={nodes.Object_201.geometry}
            material={materials.Material_107}
            position={[6.875, 21.546, -0.077]}
            rotation={[1.965, 0.26, -1.587]}
            scale={0.885}
          />
          <mesh
            geometry={nodes.Object_204.geometry}
            material={materials.Material_65}
            position={[5.446, 20.133, -3.44]}
            scale={0.848}
          />
          <mesh
            geometry={nodes.Object_206.geometry}
            material={materials.Material_107}
            position={[5.446, 20.133, -3.44]}
            scale={0.848}
          />
          <mesh
            geometry={nodes.Object_209.geometry}
            material={materials.Material_173}
            position={[2.706, 21.368, -5.203]}
            rotation={[-2.625, -1.18, -Math.PI / 2]}
            scale={0.787}
          />
          <mesh
            geometry={nodes.Object_211.geometry}
            material={materials.Material_107}
            position={[2.706, 21.368, -5.203]}
            rotation={[-2.625, -1.18, -Math.PI / 2]}
            scale={0.787}
          />
          <mesh
            geometry={nodes.Object_214.geometry}
            material={materials.Material_174}
            position={[0.992, 22.535, -4.872]}
            rotation={[-2.381, -1.455, -Math.PI / 2]}
            scale={0.794}
          />
          <mesh
            geometry={nodes.Object_216.geometry}
            material={materials.Material_107}
            position={[0.992, 22.535, -4.872]}
            rotation={[-2.381, -1.455, -Math.PI / 2]}
            scale={0.794}
          />
          <mesh
            geometry={nodes.Object_219.geometry}
            material={materials.Material_175}
            position={[-0.53, 22.64, -3.482]}
            rotation={[-0.655, -0.1, -0.239]}
            scale={0.759}
          />
          <mesh
            geometry={nodes.Object_221.geometry}
            material={materials.Material_107}
            position={[-0.53, 22.64, -3.482]}
            rotation={[-0.655, -0.1, -0.239]}
            scale={0.759}
          />
          <mesh
            geometry={nodes.Object_224.geometry}
            material={materials.Material_176}
            position={[1.439, 20.579, -5.699]}
            rotation={[-0.939, -1.011, 0.995]}
            scale={0.799}
          />
          <mesh
            geometry={nodes.Object_226.geometry}
            material={materials.Material_107}
            position={[1.425, 20.525, -5.712]}
            rotation={[-0.939, -1.011, 0.995]}
            scale={0.799}
          />
          <mesh
            geometry={nodes.Object_229.geometry}
            material={materials.Material_107}
            position={[-0.273, 21.332, -5.281]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.875}
          />
          <mesh
            geometry={nodes.Object_231.geometry}
            material={materials.Material_65}
            position={[-0.256, 21.326, -5.292]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.875}
          />
          <mesh
            geometry={nodes.Object_234.geometry}
            material={materials.Material_173}
            position={[-1.716, 20.487, -5.206]}
            rotation={[-1.749, 0.214, 0.375]}
            scale={0.59}
          />
          <mesh
            geometry={nodes.Object_236.geometry}
            material={materials.Material_107}
            position={[-1.722, 20.494, -5.228]}
            rotation={[-1.749, 0.214, 0.375]}
            scale={0.59}
          />
          <mesh
            geometry={nodes.Object_239.geometry}
            material={materials.Material_174}
            position={[-1.709, 21.157, -3.451]}
            rotation={[1.325, -0.832, 2.218]}
            scale={0.956}
          />
          <mesh
            geometry={nodes.Object_241.geometry}
            material={materials.Material_107}
            position={[-1.709, 21.157, -3.451]}
            rotation={[1.325, -0.832, 2.218]}
            scale={0.956}
          />
          <mesh
            geometry={nodes.Object_244.geometry}
            material={materials.Material_107}
            position={[-2.453, 23.18, -3.556]}
            rotation={[-0.445, -0.2, 0.395]}
            scale={0.818}
          />
          <mesh
            geometry={nodes.Object_246.geometry}
            material={materials.Material_175}
            position={[-2.453, 23.18, -3.556]}
            rotation={[-0.445, -0.2, 0.395]}
            scale={0.818}
          />
          <mesh
            geometry={nodes.Object_249.geometry}
            material={materials.Material_176}
            position={[-3.158, 21.04, -4.355]}
            rotation={[1.54, -1, 2.403]}
            scale={0.917}
          />
          <mesh
            geometry={nodes.Object_251.geometry}
            material={materials.Material_107}
            position={[-3.159, 21.041, -4.355]}
            rotation={[1.54, -1, 2.403]}
            scale={0.917}
          />
          <mesh
            geometry={nodes.Object_254.geometry}
            material={materials.Material_65}
            position={[-4.483, 20.365, -3.851]}
            rotation={[0.312, 0.607, 0.429]}
            scale={0.656}
          />
          <mesh
            geometry={nodes.Object_256.geometry}
            material={materials.Material_107}
            position={[-4.479, 20.376, -3.876]}
            rotation={[0.312, 0.607, 0.429]}
            scale={0.656}
          />
          <mesh
            geometry={nodes.Object_259.geometry}
            material={materials.Material_173}
            position={[-4.375, 22.072, -3.074]}
            rotation={[0.872, -0.66, 2.243]}
            scale={0.859}
          />
          <mesh
            geometry={nodes.Object_261.geometry}
            material={materials.Material_107}
            position={[-4.381, 22.017, -3.101]}
            rotation={[0.872, -0.66, 2.243]}
            scale={0.859}
          />
          <mesh
            geometry={nodes.Object_264.geometry}
            material={materials.Material_174}
            position={[-3.901, 22.596, -2.211]}
            rotation={[0.193, -0.752, 0.199]}
            scale={0.752}
          />
          <mesh
            geometry={nodes.Object_266.geometry}
            material={materials.Material_107}
            position={[-3.901, 22.596, -2.21]}
            rotation={[0.193, -0.752, 0.199]}
            scale={0.752}
          />
          <mesh
            geometry={nodes.Object_269.geometry}
            material={materials.Material_175}
            position={[-4.635, 22.168, -1.488]}
            rotation={[2.961, 0.89, 2.808]}
            scale={0.739}
          />
          <mesh
            geometry={nodes.Object_271.geometry}
            material={materials.Material_107}
            position={[-4.623, 22.17, -1.491]}
            rotation={[2.961, 0.89, 2.808]}
            scale={0.739}
          />
          <mesh
            geometry={nodes.Object_274.geometry}
            material={materials.Material_176}
            position={[-4.961, 20.169, -2.776]}
            rotation={[2.61, 0.091, 2.493]}
            scale={0.722}
          />
          <mesh
            geometry={nodes.Object_276.geometry}
            material={materials.Material_107}
            position={[-4.955, 20.168, -2.787]}
            rotation={[2.61, 0.091, 2.493]}
            scale={0.722}
          />
          <mesh
            geometry={nodes.Object_279.geometry}
            material={materials.Material_107}
            position={[-4.625, 22.802, 0.315]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.922}
          />
          <mesh
            geometry={nodes.Object_281.geometry}
            material={materials.Material_65}
            position={[-4.609, 22.815, 0.323]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.922}
          />
          <mesh
            geometry={nodes.Object_284.geometry}
            material={materials.Material_173}
            position={[-5.373, 20.481, -0.116]}
            rotation={[3.136, 0.191, 2.011]}
            scale={0.949}
          />
          <mesh
            geometry={nodes.Object_286.geometry}
            material={materials.Material_107}
            position={[-5.388, 20.546, -0.101]}
            rotation={[3.136, 0.191, 2.011]}
            scale={0.949}
          />
          <mesh
            geometry={nodes.Object_289.geometry}
            material={materials.Material_174}
            position={[-6.225, 20.46, -1.158]}
            rotation={[1.664, -0.297, 1.879]}
            scale={0.998}
          />
          <mesh
            geometry={nodes.Object_291.geometry}
            material={materials.Material_107}
            position={[-6.225, 20.46, -1.158]}
            rotation={[1.664, -0.297, 1.879]}
            scale={0.998}
          />
          <mesh
            geometry={nodes.Object_294.geometry}
            material={materials.Material_175}
            position={[-4.658, 21.733, 1.589]}
            rotation={[1.514, -0.668, 1.96]}
            scale={0.713}
          />
          <mesh
            geometry={nodes.Object_296.geometry}
            material={materials.Material_107}
            position={[-4.659, 21.747, 1.54]}
            rotation={[1.514, -0.668, 1.96]}
            scale={0.713}
          />
          <mesh
            geometry={nodes.Object_299.geometry}
            material={materials.Material_176}
            position={[-5.95, 21.202, 1.38]}
            rotation={[1.575, -0.21, 1.988]}
            scale={0.923}
          />
          <mesh
            geometry={nodes.Object_301.geometry}
            material={materials.Material_107}
            position={[-5.958, 21.222, 1.318]}
            rotation={[1.575, -0.21, 1.988]}
            scale={0.923}
          />
          <mesh
            geometry={nodes.Object_304.geometry}
            material={materials.Material_65}
            position={[-5.242, 22.021, 3.387]}
            scale={0.952}
          />
          <mesh
            geometry={nodes.Object_306.geometry}
            material={materials.Material_107}
            position={[-5.242, 22.021, 3.387]}
            scale={0.952}
          />
          <mesh
            geometry={nodes.Object_309.geometry}
            material={materials.Material_65}
            position={[-4.98, 20.403, 4.169]}
            rotation={[1.026, -1.011, 0.69]}
            scale={0.915}
          />
          <mesh
            geometry={nodes.Object_311.geometry}
            material={materials.Material_107}
            position={[-5.033, 20.428, 4.139]}
            rotation={[1.026, -1.011, 0.69]}
            scale={0.915}
          />
          <mesh
            geometry={nodes.Object_314.geometry}
            material={materials.Material_174}
            position={[-4.25, 20.83, 5.504]}
            rotation={[-2.49, -0.2, -3.13]}
            scale={0.804}
          />
          <mesh
            geometry={nodes.Object_316.geometry}
            material={materials.Material_107}
            position={[-4.208, 20.868, 5.494]}
            rotation={[-2.49, -0.2, -3.13]}
            scale={0.804}
          />
          <mesh
            geometry={nodes.Object_319.geometry}
            material={materials.Material_175}
            position={[-1.919, 20.577, 5.182]}
            rotation={[-2.473, -0.667, 2.468]}
            scale={0.906}
          />
          <mesh
            geometry={nodes.Object_321.geometry}
            material={materials.Material_107}
            position={[-1.887, 20.614, 5.224]}
            rotation={[-2.473, -0.667, 2.468]}
            scale={0.906}
          />
          <mesh
            geometry={nodes.Object_324.geometry}
            material={materials.Material_176}
            position={[-0.172, 20.779, 5.924]}
            rotation={[1.347, -0.818, 0.163]}
            scale={0.784}
          />
          <mesh
            geometry={nodes.Object_326.geometry}
            material={materials.Material_107}
            position={[-0.18, 20.763, 5.927]}
            rotation={[1.347, -0.818, 0.163]}
            scale={0.784}
          />
          <mesh
            geometry={nodes.Object_329.geometry}
            material={materials.Material_65}
            position={[3.613, 21.168, 5.023]}
            rotation={[0.312, 0.607, 0.429]}
            scale={0.566}
          />
          <mesh
            geometry={nodes.Object_331.geometry}
            material={materials.Material_107}
            position={[3.605, 21.177, 5.044]}
            rotation={[0.312, 0.607, 0.429]}
            scale={0.566}
          />
          <mesh
            geometry={nodes.Object_334.geometry}
            material={materials.Material_173}
            position={[1.981, 19.842, 5.683]}
            rotation={[-0.704, -1.403, -1.203]}
            scale={0.938}
          />
          <mesh
            geometry={nodes.Object_336.geometry}
            material={materials.Material_107}
            position={[2.002, 19.898, 5.652]}
            rotation={[-0.704, -1.403, -1.203]}
            scale={0.938}
          />
          <mesh
            geometry={nodes.Object_339.geometry}
            material={materials.Material_107}
            position={[3.771, 19.841, 3.968]}
            rotation={[-2.212, -0.101, -2.848]}
            scale={0.966}
          />
          <mesh
            geometry={nodes.Object_341.geometry}
            material={materials.Material_174}
            position={[3.763, 19.829, 3.978]}
            rotation={[-2.212, -0.101, -2.848]}
            scale={0.966}
          />
          <mesh
            geometry={nodes.Object_344.geometry}
            material={materials.Material_175}
            position={[5.337, 19.146, 0.643]}
            rotation={[-0.199, -0.348, -1.296]}
            scale={0.828}
          />
          <mesh
            geometry={nodes.Object_346.geometry}
            material={materials.Material_107}
            position={[5.331, 19.156, 0.653]}
            rotation={[-0.199, -0.348, -1.296]}
            scale={0.828}
          />
          <mesh
            geometry={nodes.Object_349.geometry}
            material={materials.Material_176}
            position={[6.581, 19.086, -0.804]}
            rotation={[0.326, -0.133, -1.127]}
            scale={0.938}
          />
          <mesh
            geometry={nodes.Object_351.geometry}
            material={materials.Material_107}
            position={[6.577, 19.09, -0.788]}
            rotation={[0.326, -0.133, -1.127]}
            scale={0.938}
          />
          <mesh
            geometry={nodes.Object_354.geometry}
            material={materials.Material_107}
            position={[4.962, 18.321, -2.2]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.919}
          />
          <mesh
            geometry={nodes.Object_356.geometry}
            material={materials.Material_65}
            position={[4.974, 18.333, -2.186]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.919}
          />
          <mesh
            geometry={nodes.Object_359.geometry}
            material={materials.Material_173}
            position={[3.536, 19.317, -3.741]}
            rotation={[2.481, -0.633, -2.607]}
            scale={0.922}
          />
          <mesh
            geometry={nodes.Object_361.geometry}
            material={materials.Material_107}
            position={[3.536, 19.318, -3.741]}
            rotation={[2.481, -0.633, -2.607]}
            scale={0.922}
          />
          <mesh
            geometry={nodes.Object_364.geometry}
            material={materials.Material_174}
            position={[4.566, 17.985, -4.564]}
            rotation={[3.017, -0.904, -Math.PI / 2]}
            scale={0.736}
          />
          <mesh
            geometry={nodes.Object_366.geometry}
            material={materials.Material_107}
            position={[4.566, 17.985, -4.564]}
            rotation={[3.017, -0.904, -Math.PI / 2]}
            scale={0.736}
          />
          <mesh
            geometry={nodes.Object_369.geometry}
            material={materials.Material_107}
            position={[2.977, 19.547, -5.738]}
            rotation={[1.387, -0.495, -2.759]}
            scale={0.918}
          />
          <mesh
            geometry={nodes.Object_371.geometry}
            material={materials.Material_175}
            position={[2.977, 19.562, -5.743]}
            rotation={[1.387, -0.495, -2.759]}
            scale={0.918}
          />
          <mesh
            geometry={nodes.Object_374.geometry}
            material={materials.Material_176}
            position={[0.505, 18.942, -5.31]}
            rotation={[1.138, 0.132, -2.807]}
            scale={0.856}
          />
          <mesh
            geometry={nodes.Object_376.geometry}
            material={materials.Material_107}
            position={[0.514, 18.932, -5.304]}
            rotation={[1.138, 0.132, -2.807]}
            scale={0.856}
          />
          <mesh
            geometry={nodes.Object_379.geometry}
            material={materials.Material_65}
            position={[2.395, 17.722, -4.986]}
            scale={0.81}
          />
          <mesh
            geometry={nodes.Object_381.geometry}
            material={materials.Material_107}
            position={[2.395, 17.722, -4.986]}
            scale={0.81}
          />
          <mesh
            geometry={nodes.Object_384.geometry}
            material={materials.Material_173}
            position={[-0.745, 19.354, -4.189]}
            rotation={[0.897, -0.729, 2.503]}
            scale={0.733}
          />
          <mesh
            geometry={nodes.Object_386.geometry}
            material={materials.Material_107}
            position={[-0.758, 19.344, -4.18]}
            rotation={[0.897, -0.729, 2.503]}
            scale={0.733}
          />
          <mesh
            geometry={nodes.Object_389.geometry}
            material={materials.Material_174}
            position={[3.468, 22.583, -1.485]}
            rotation={[-2.745, -1.084, -1.791]}
            scale={0.68}
          />
          <mesh
            geometry={nodes.Object_391.geometry}
            material={materials.Material_107}
            position={[3.471, 22.599, -1.508]}
            rotation={[-2.745, -1.084, -1.791]}
            scale={0.68}
          />
          <mesh
            geometry={nodes.Object_394.geometry}
            material={materials.Material_107}
            position={[-2.419, 19.197, -3.082]}
            rotation={[1.433, -0.061, 2.856]}
            scale={0.977}
          />
          <mesh
            geometry={nodes.Object_396.geometry}
            material={materials.Material_175}
            position={[-2.427, 19.213, -3.08]}
            rotation={[1.433, -0.061, 2.856]}
            scale={0.977}
          />
          <mesh
            geometry={nodes.Object_399.geometry}
            material={materials.Material_176}
            position={[-1.867, 17.602, -3.916]}
            rotation={[0.738, -0.042, 2.986]}
            scale={0.847}
          />
          <mesh
            geometry={nodes.Object_401.geometry}
            material={materials.Material_107}
            position={[-1.86, 17.591, -3.908]}
            rotation={[0.738, -0.042, 2.986]}
            scale={0.847}
          />
          <mesh
            geometry={nodes.Object_404.geometry}
            material={materials.Material_107}
            position={[-4.592, 18.37, -3.02]}
            rotation={[0.107, -0.024, 0.512]}
            scale={0.922}
          />
          <mesh
            geometry={nodes.Object_406.geometry}
            material={materials.Material_65}
            position={[-4.626, 18.381, -2.964]}
            rotation={[0.107, -0.024, 0.512]}
            scale={0.922}
          />
          <mesh
            geometry={nodes.Object_409.geometry}
            material={materials.Material_173}
            position={[-3.263, 17.344, -4.159]}
            rotation={[1.265, 0.318, 2.675]}
            scale={0.863}
          />
          <mesh
            geometry={nodes.Object_411.geometry}
            material={materials.Material_107}
            position={[-3.263, 17.344, -4.159]}
            rotation={[1.265, 0.318, 2.675]}
            scale={0.863}
          />
          <mesh
            geometry={nodes.Object_414.geometry}
            material={materials.Material_174}
            position={[-4.553, 18.842, -1.492]}
            rotation={[2.122, 0.462, 1.514]}
            scale={0.868}
          />
          <mesh
            geometry={nodes.Object_416.geometry}
            material={materials.Material_107}
            position={[-4.553, 18.842, -1.492]}
            rotation={[2.122, 0.462, 1.514]}
            scale={0.868}
          />
          <mesh
            geometry={nodes.Object_419.geometry}
            material={materials.Material_175}
            position={[-5.463, 17.586, -0.996]}
            rotation={[1.454, 0.484, 2.179]}
            scale={0.707}
          />
          <mesh
            geometry={nodes.Object_421.geometry}
            material={materials.Material_107}
            position={[-5.486, 17.592, -1.041]}
            rotation={[1.454, 0.484, 2.179]}
            scale={0.707}
          />
          <mesh
            geometry={nodes.Object_424.geometry}
            material={materials.Material_176}
            position={[-5.889, 18.937, 0.555]}
            rotation={[2.645, 0.303, 2.179]}
            scale={0.739}
          />
          <mesh
            geometry={nodes.Object_426.geometry}
            material={materials.Material_107}
            position={[-5.877, 18.971, 0.516]}
            rotation={[2.645, 0.303, 2.179]}
            scale={0.739}
          />
          <mesh
            geometry={nodes.Object_429.geometry}
            material={materials.Material_107}
            position={[-5.369, 17.465, 0.917]}
            rotation={[1.113, -1.067, 1.339]}
            scale={0.714}
          />
          <mesh
            geometry={nodes.Object_431.geometry}
            material={materials.Material_65}
            position={[-5.368, 17.459, 0.928]}
            rotation={[1.113, -1.067, 1.339]}
            scale={0.714}
          />
          <mesh
            geometry={nodes.Object_434.geometry}
            material={materials.Material_173}
            position={[-5.388, 19.651, 2.506]}
            rotation={[2.919, -0.444, 1.808]}
            scale={0.68}
          />
          <mesh
            geometry={nodes.Object_436.geometry}
            material={materials.Material_107}
            position={[-5.415, 19.658, 2.506]}
            rotation={[2.919, -0.444, 1.808]}
            scale={0.68}
          />
          <mesh
            geometry={nodes.Object_439.geometry}
            material={materials.Material_174}
            position={[-5.346, 18.06, 2.564]}
            rotation={[1.706, 0.331, 1.753]}
            scale={0.712}
          />
          <mesh
            geometry={nodes.Object_441.geometry}
            material={materials.Material_107}
            position={[-5.37, 18.072, 2.521]}
            rotation={[1.706, 0.331, 1.753]}
            scale={0.712}
          />
          <mesh
            geometry={nodes.Object_444.geometry}
            material={materials.Material_175}
            position={[-4.115, 20.003, 3.118]}
            rotation={[2.441, -0.48, 1.624]}
            scale={0.725}
          />
          <mesh
            geometry={nodes.Object_446.geometry}
            material={materials.Material_107}
            position={[-4.142, 20.031, 3.083]}
            rotation={[2.441, -0.48, 1.624]}
            scale={0.725}
          />
          <mesh
            geometry={nodes.Object_449.geometry}
            material={materials.Material_176}
            position={[-3.928, 18.044, 3.047]}
            rotation={[2.285, -0.208, 0.726]}
            scale={0.924}
          />
          <mesh
            geometry={nodes.Object_451.geometry}
            material={materials.Material_107}
            position={[-3.927, 18.044, 3.047]}
            rotation={[2.285, -0.208, 0.726]}
            scale={0.924}
          />
          <mesh
            geometry={nodes.Object_454.geometry}
            material={materials.Material_107}
            position={[-3.782, 19.249, 5.216]}
            rotation={[1.113, -1.067, 1.339]}
            scale={0.919}
          />
          <mesh
            geometry={nodes.Object_456.geometry}
            material={materials.Material_65}
            position={[-3.791, 19.235, 5.219]}
            rotation={[1.113, -1.067, 1.339]}
            scale={0.919}
          />
          <mesh
            geometry={nodes.Object_459.geometry}
            material={materials.Material_173}
            position={[-3.958, 17.142, 5.096]}
            rotation={[1.809, -0.456, 0.942]}
            scale={0.784}
          />
          <mesh
            geometry={nodes.Object_461.geometry}
            material={materials.Material_107}
            position={[-3.958, 17.142, 5.096]}
            rotation={[1.809, -0.456, 0.942]}
            scale={0.784}
          />
          <mesh
            geometry={nodes.Object_464.geometry}
            material={materials.Material_174}
            position={[-2.1, 18.774, 6.368]}
            rotation={[-2.206, -0.29, -2.982]}
            scale={0.951}
          />
          <mesh
            geometry={nodes.Object_466.geometry}
            material={materials.Material_107}
            position={[-2.05, 18.82, 6.359]}
            rotation={[-2.206, -0.29, -2.982]}
            scale={0.951}
          />
          <mesh
            geometry={nodes.Object_469.geometry}
            material={materials.Material_175}
            position={[-2.074, 17.245, 5.968]}
            rotation={[-1.599, -0.392, -2.789]}
            scale={0.834}
          />
          <mesh
            geometry={nodes.Object_471.geometry}
            material={materials.Material_107}
            position={[-2.046, 17.287, 5.999]}
            rotation={[-1.599, -0.392, -2.789]}
            scale={0.834}
          />
          <mesh
            geometry={nodes.Object_474.geometry}
            material={materials.Material_176}
            position={[0.347, 19.043, 6.243]}
            rotation={[-3.07, -1.432, 2.271]}
            scale={0.752}
          />
          <mesh
            geometry={nodes.Object_476.geometry}
            material={materials.Material_107}
            position={[0.343, 19.062, 6.268]}
            rotation={[-3.07, -1.432, 2.271]}
            scale={0.752}
          />
          <mesh
            geometry={nodes.Object_479.geometry}
            material={materials.Material_107}
            position={[0.24, 17.854, 6.181]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.763}
          />
          <mesh
            geometry={nodes.Object_481.geometry}
            material={materials.Material_65}
            position={[0.253, 17.864, 6.187]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.763}
          />
          <mesh
            geometry={nodes.Object_484.geometry}
            material={materials.Material_173}
            position={[4.247, 19.399, -1.577]}
            rotation={[-2.697, -0.565, -2.013]}
            scale={0.719}
          />
          <mesh
            geometry={nodes.Object_486.geometry}
            material={materials.Material_107}
            position={[4.269, 19.389, -1.622]}
            rotation={[-2.697, -0.565, -2.013]}
            scale={0.719}
          />
          <mesh
            geometry={nodes.Object_489.geometry}
            material={materials.Material_107}
            position={[1.613, 17.948, 6.154]}
            rotation={[1.546, 0.106, -0.91]}
            scale={0.993}
          />
          <mesh
            geometry={nodes.Object_491.geometry}
            material={materials.Material_174}
            position={[1.613, 17.947, 6.154]}
            rotation={[1.546, 0.106, -0.91]}
            scale={0.993}
          />
          <mesh
            geometry={nodes.Object_494.geometry}
            material={materials.Material_175}
            position={[3.32, 18.534, 5.604]}
            rotation={[1.101, -1.073, -0.161]}
            scale={0.722}
          />
          <mesh
            geometry={nodes.Object_496.geometry}
            material={materials.Material_107}
            position={[3.305, 18.526, 5.608]}
            rotation={[1.101, -1.073, -0.161]}
            scale={0.722}
          />
          <mesh
            geometry={nodes.Object_499.geometry}
            material={materials.Material_176}
            position={[3.355, 17.629, 3.756]}
            rotation={[-0.595, -0.414, -2.066]}
            scale={0.83}
          />
          <mesh
            geometry={nodes.Object_501.geometry}
            material={materials.Material_107}
            position={[3.408, 17.654, 3.747]}
            rotation={[-0.595, -0.414, -2.066]}
            scale={0.83}
          />
          <mesh
            geometry={nodes.Object_504.geometry}
            material={materials.Material_107}
            position={[4.97, 18.282, 3.928]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.984}
          />
          <mesh
            geometry={nodes.Object_506.geometry}
            material={materials.Material_65}
            position={[4.973, 18.3, 3.944]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.984}
          />
          <mesh
            geometry={nodes.Object_509.geometry}
            material={materials.Material_173}
            position={[5.65, 18.543, 1.973]}
            rotation={[1.676, -0.056, -0.77]}
            scale={0.983}
          />
          <mesh
            geometry={nodes.Object_511.geometry}
            material={materials.Material_107}
            position={[5.638, 18.555, 2.042]}
            rotation={[1.676, -0.056, -0.77]}
            scale={0.983}
          />
          <mesh
            geometry={nodes.Object_514.geometry}
            material={materials.Material_176}
            position={[1.17, 23.27, -1.499]}
            rotation={[-0.183, -0.083, 0.546]}
            scale={0.85}
          />
          <mesh
            geometry={nodes.Object_516.geometry}
            material={materials.Material_107}
            position={[1.17, 23.27, -1.499]}
            rotation={[-0.183, -0.083, 0.546]}
            scale={0.85}
          />
          <mesh
            geometry={nodes.Object_519.geometry}
            material={materials.Material_65}
            position={[-1.817, 22.592, -0.1]}
            rotation={[1.113, -1.067, 1.339]}
            scale={0.828}
          />
          <mesh
            geometry={nodes.Object_521.geometry}
            material={materials.Material_107}
            position={[-1.804, 22.595, -0.106]}
            rotation={[1.113, -1.067, 1.339]}
            scale={0.828}
          />
          <mesh
            geometry={nodes.Object_524.geometry}
            material={materials.Material_173}
            position={[-1.743, 21.754, 1.691]}
            rotation={[0.1, -0.645, -0.627]}
            scale={0.828}
          />
          <mesh
            geometry={nodes.Object_526.geometry}
            material={materials.Material_107}
            position={[-1.744, 21.754, 1.691]}
            rotation={[0.1, -0.645, -0.627]}
            scale={0.828}
          />
          <mesh
            geometry={nodes.Object_529.geometry}
            material={materials.Material_174}
            position={[-2.846, 20.492, -1.523]}
            rotation={[0.107, -0.024, 0.512]}
            scale={0.828}
          />
          <mesh
            geometry={nodes.Object_531.geometry}
            material={materials.Material_107}
            position={[-2.85, 20.501, -1.581]}
            rotation={[0.107, -0.024, 0.512]}
            scale={0.828}
          />
          <mesh
            geometry={nodes.Object_534.geometry}
            material={materials.Material_175}
            position={[-2.769, 21.356, 0.948]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.828}
          />
          <mesh
            geometry={nodes.Object_536.geometry}
            material={materials.Material_107}
            position={[-2.787, 21.351, 0.955]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.828}
          />
          <mesh
            geometry={nodes.Object_539.geometry}
            material={materials.Material_176}
            position={[2.032, 20.164, -3.315]}
            rotation={[0.557, -0.963, 1.288]}
            scale={0.828}
          />
          <mesh
            geometry={nodes.Object_541.geometry}
            material={materials.Material_107}
            position={[2.075, 20.136, -3.345]}
            rotation={[0.557, -0.963, 1.288]}
            scale={0.828}
          />
          <mesh
            geometry={nodes.Object_544.geometry}
            material={materials.Material_65}
            position={[-0.244, 19.321, 5.026]}
            scale={0.828}
          />
          <mesh
            geometry={nodes.Object_546.geometry}
            material={materials.Material_107}
            position={[-0.244, 19.321, 5.026]}
            scale={0.828}
          />
          <mesh
            geometry={nodes.Object_549.geometry}
            material={materials.Material_174}
            position={[1.93, 22.5, 0.628]}
            rotation={[-0.185, -0.034, 0.564]}
            scale={0.615}
          />
          <mesh
            geometry={nodes.Object_551.geometry}
            material={materials.Material_107}
            position={[1.951, 22.5, 0.59]}
            rotation={[-0.185, -0.034, 0.564]}
            scale={0.615}
          />
          <mesh
            geometry={nodes.Object_554.geometry}
            material={materials.Material_175}
            position={[1.027, 22.5, -0.762]}
            rotation={[2.181, -0.302, 2.959]}
            scale={0.687}
          />
          <mesh
            geometry={nodes.Object_556.geometry}
            material={materials.Material_107}
            position={[1.061, 22.493, -0.727]}
            rotation={[2.181, -0.302, 2.959]}
            scale={0.687}
          />
          <mesh
            geometry={nodes.Object_559.geometry}
            material={materials.Material_176}
            position={[-1.723, 22.181, 4.545]}
            rotation={[-0.389, -0.598, -1.142]}
            scale={0.6}
          />
          <mesh
            geometry={nodes.Object_561.geometry}
            material={materials.Material_107}
            position={[-1.723, 22.18, 4.545]}
            rotation={[-0.389, -0.598, -1.142]}
            scale={0.6}
          />
          <mesh
            geometry={nodes.Object_564.geometry}
            material={materials.Material_65}
            position={[-0.367, 22.251, -1.911]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.691}
          />
          <mesh
            geometry={nodes.Object_566.geometry}
            material={materials.Material_107}
            position={[-0.382, 22.248, -1.904]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.691}
          />
          <mesh
            geometry={nodes.Object_569.geometry}
            material={materials.Material_173}
            position={[-2.639, 21.852, -1.463]}
            rotation={[0.44, 0.124, 0.256]}
            scale={0.651}
          />
          <mesh
            geometry={nodes.Object_571.geometry}
            material={materials.Material_107}
            position={[-2.639, 21.852, -1.463]}
            rotation={[0.44, 0.124, 0.256]}
            scale={0.651}
          />
          <mesh
            geometry={nodes.Object_574.geometry}
            material={materials.Material_65}
            position={[-1.962, 21.622, 3.509]}
            rotation={[0.107, -0.024, 0.512]}
            scale={0.751}
          />
          <mesh
            geometry={nodes.Object_576.geometry}
            material={materials.Material_107}
            position={[-1.942, 21.659, 3.475]}
            rotation={[0.107, -0.024, 0.512]}
            scale={0.751}
          />
          <mesh
            geometry={nodes.Object_579.geometry}
            material={materials.Material_65}
            position={[0.892, 21.703, 3.949]}
            rotation={[0.312, 0.607, 0.429]}
            scale={0.524}
          />
          <mesh
            geometry={nodes.Object_581.geometry}
            material={materials.Material_107}
            position={[0.878, 21.718, 3.954]}
            rotation={[0.312, 0.607, 0.429]}
            scale={0.524}
          />
          <mesh
            geometry={nodes.Object_584.geometry}
            material={materials.Material_174}
            position={[1.488, 22.098, 2.712]}
            rotation={[0.164, 0.388, -0.186]}
            scale={0.607}
          />
          <mesh
            geometry={nodes.Object_586.geometry}
            material={materials.Material_107}
            position={[1.474, 22.096, 2.716]}
            rotation={[0.164, 0.388, -0.186]}
            scale={0.607}
          />
          <mesh
            geometry={nodes.Object_589.geometry}
            material={materials.Material_175}
            position={[2.621, 21.462, 3.337]}
            rotation={[-2.082, -0.964, -2.389]}
            scale={0.654}
          />
          <mesh
            geometry={nodes.Object_591.geometry}
            material={materials.Material_107}
            position={[2.621, 21.462, 3.337]}
            rotation={[-2.082, -0.964, -2.389]}
            scale={0.654}
          />
          <mesh
            geometry={nodes.Object_594.geometry}
            material={materials.Material_65}
            position={[4.788, 21.271, 2.107]}
            scale={0.652}
          />
          <mesh
            geometry={nodes.Object_596.geometry}
            material={materials.Material_107}
            position={[4.788, 21.271, 2.107]}
            scale={0.652}
          />
          <mesh
            geometry={nodes.Object_599.geometry}
            material={materials.Material_173}
            position={[2.852, 21.814, 1.785]}
            rotation={[-0.582, -0.074, -0.11]}
            scale={0.664}
          />
          <mesh
            geometry={nodes.Object_601.geometry}
            material={materials.Material_107}
            position={[2.852, 21.814, 1.785]}
            rotation={[-0.582, -0.074, -0.11]}
            scale={0.664}
          />
          <mesh
            geometry={nodes.Object_604.geometry}
            material={materials.Material_174}
            position={[0.087, 22.578, 3.833]}
            rotation={[0.158, 0.463, -0.985]}
            scale={0.567}
          />
          <mesh
            geometry={nodes.Object_606.geometry}
            material={materials.Material_107}
            position={[0.082, 22.59, 3.853]}
            rotation={[0.158, 0.463, -0.985]}
            scale={0.567}
          />
          <mesh
            geometry={nodes.Object_609.geometry}
            material={materials.Material_175}
            position={[2.542, 22.129, -0.812]}
            rotation={[-0.186, -0.083, 0.808]}
            scale={0.792}
          />
          <mesh
            geometry={nodes.Object_611.geometry}
            material={materials.Material_107}
            position={[2.569, 22.115, -0.86]}
            rotation={[-0.186, -0.083, 0.808]}
            scale={0.792}
          />
          <mesh
            geometry={nodes.Object_614.geometry}
            material={materials.Material_176}
            position={[1.736, 22.157, -2.289]}
            rotation={[-0.183, -0.083, 0.546]}
            scale={0.704}
          />
          <mesh
            geometry={nodes.Object_616.geometry}
            material={materials.Material_107}
            position={[1.736, 22.157, -2.289]}
            rotation={[-0.183, -0.083, 0.546]}
            scale={0.704}
          />
          <mesh
            geometry={nodes.Object_619.geometry}
            material={materials.Material_173}
            position={[-1.359, 22.212, -2.454]}
            rotation={[0.362, 0.159, 0.397]}
            scale={0.582}
          />
          <mesh
            geometry={nodes.Object_621.geometry}
            material={materials.Material_107}
            position={[-1.359, 22.212, -2.454]}
            rotation={[0.362, 0.159, 0.397]}
            scale={0.582}
          />
          <mesh
            geometry={nodes.Object_624.geometry}
            material={materials.Material_175}
            position={[3.925, 21.575, -1.111]}
            rotation={[-0.445, -0.2, 0.395]}
            scale={0.677}
          />
          <mesh
            geometry={nodes.Object_626.geometry}
            material={materials.Material_107}
            position={[3.925, 21.575, -1.111]}
            rotation={[-0.445, -0.2, 0.395]}
            scale={0.677}
          />
          <mesh
            geometry={nodes.Object_629.geometry}
            material={materials.Material_65}
            position={[1.107, 21.273, -3.467]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.763}
          />
          <mesh
            geometry={nodes.Object_631.geometry}
            material={materials.Material_107}
            position={[1.116, 21.262, -3.478]}
            rotation={[0.292, 0.46, 0.263]}
            scale={0.763}
          />
          <mesh
            geometry={nodes.Object_634.geometry}
            material={materials.Material_176}
            position={[4.015, 19.174, 0.239]}
            rotation={[-0.183, -0.083, 0.546]}
            scale={0.704}
          />
          <mesh
            geometry={nodes.Object_636.geometry}
            material={materials.Material_107}
            position={[4.015, 19.174, 0.239]}
            rotation={[-0.183, -0.083, 0.546]}
            scale={0.704}
          />
          <mesh
            geometry={nodes.Object_639.geometry}
            material={materials.Material_178}
            position={[-0.768, 18.397, 0.573]}
            rotation={[0, 0.356, 0.261]}
          />
          <mesh
            geometry={nodes.Object_641.geometry}
            material={materials.Material_178}
            position={[-1.511, 24.216, -0.506]}
            rotation={[-0.951, 1.271, 0.973]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(GLTFModel);
