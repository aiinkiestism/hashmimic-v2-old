import { Center, Text3D, MeshTransmissionMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useState } from "react";
import { RGBELoader } from 'three-stdlib'
import { Vector3Tuple } from "three";
import { CustomGridHelper } from '.';

interface TextProps {
  position: Vector3Tuple;
}

export const HomeCenterText: React.FC<TextProps> = (props) => {
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
        {/* <CustomGridHelper /> */}
      </group>
    </>
  );
};