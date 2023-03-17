import { Center, Text3D, MeshTransmissionMaterial } from "@react-three/drei";
import { useState, useEffect } from "react";
import { Vector3Tuple } from "three";
import { CustomGridHelper } from '.';
import { HOME_TRANSMISSION_MATERIAL_CONFIG } from "./config";
import { useLoader } from "@react-three/fiber";
import { RGBELoader } from "three-stdlib";

interface TextProps {
  position: Vector3Tuple;
}

export const HomeCenterText: React.FC<TextProps> = (props) => {
  const [text, setText] = useState<string>('Hashmimic');
  const font = '/Inter_Medium_Regular.json';
  const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr');

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
            <MeshTransmissionMaterial reflectivity={0.05} {...HOME_TRANSMISSION_MATERIAL_CONFIG} background={texture} transmission={0.1} roughness={0} thickness={0.8} envMapIntensity={1} />
          </Text3D>
        </Center>
        {/* <CustomGridHelper /> */}
      </group>
    </>
  );
};