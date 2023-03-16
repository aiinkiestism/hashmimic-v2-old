import { useState, ReactNode } from 'react';
import { Canvas, useLoader, Vector3 } from '@react-three/fiber';
import { RGBELoader } from 'three-stdlib'
import {
  Center,
  Text3D,
  Instance,
  Instances,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial
} from '@react-three/drei'

export const HomeWebGL: React.FC = () => {
  return (
    <Canvas shadows orthographic camera={{ position: [-2.5, 0, 10], zoom: 40 }} gl={{ preserveDrawingBuffer: true }} style={{ width: '1300px', height: '100vh' }}>
      <color attach="background" args={['#000']} />
      <Text position={[0, 0, 0]} />
    </Canvas>
  )
}

interface TextProps {
  position: Vector3 | undefined;
}

const Text: React.FC<TextProps> = (props) => {
  const [text, setText] = useState<string>('Hashmimic');
  const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr');
  const font = '/Inter_Medium_Regular.json';
  const materialConfig = {
    backside: false,
    samples: 16,
    resolution: 512,
    transmission: 0.6,
    clearcoat: 0,
    clearcoatRoughness: 0.0,
    thickness: 0.55,
    chromaticAberration: 5,
    anisotropy: 0.3,
    roughness: 0.0,
    distortion: 1,
    distortionScale: 1,
    temporalDistortion: 0.4,
    ior: 0.83,
    color: '#ff9cf5',
    gColor: '#ff7eb3',
  };

  return (
    <>
      <group>
        <Center scale={[0.8, 1, 1]} front top {...props}>
          <Text3D
            castShadow
            bevelEnabled
            font={font}
            scale={5}
            letterSpacing={-0.03}
            height={0.25}
            bevelSize={0.01}
            bevelSegments={10}
            curveSegments={128}
            bevelThickness={0.01}>
            {text}
            <MeshTransmissionMaterial reflectivity={0.5} {...materialConfig} background={texture} />
          </Text3D>
        </Center>
        <Grid />
      </group>
    </>
  );
};

interface GridProps {
  number?: number;
  lineWidth?: number;
  height?: number;
}

const Grid: React.FC<GridProps> = ({ number = 23, lineWidth = 0.026, height = 0.5 }) => (
  <Instances position={[0, -1.02, 0]}>
    <planeGeometry args={[lineWidth, height]} />
    <meshBasicMaterial color="#999" />
    {Array.from({ length: number }, (_, y) =>
      Array.from({ length: number }, (_, x) => (
        <group key={x + ':' + y} position={[x * 2 - Math.floor(number / 2) * 2, -0.01, y * 2 - Math.floor(number / 2) * 2]}>
          <Instance rotation={[-Math.PI / 2, 0, 0]} />
          <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
        </group>
      ))
    )}
    <gridHelper args={[100, 100, '#bbb', '#bbb']} position={[0, -0.01, 0]} />
  </Instances>
)