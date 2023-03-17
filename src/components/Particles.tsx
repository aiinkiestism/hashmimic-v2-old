import { useRef, useEffect, MutableRefObject } from 'react';
import * as THREE from 'three';
import { GrannyKnot } from 'three/examples/jsm/curves/CurveExtras'
import { MeshTransmissionMaterial } from "@react-three/drei";
import { HOME_TRANSMISSION_MATERIAL_CONFIG } from './config';
import { useLoader } from '@react-three/fiber';
import { RGBELoader } from 'three-stdlib';

let guid = 1;

function randomData(
  count: number,
  track: THREE.TubeGeometry,
  radius: number,
  size: number,
  scale: () => number,
) {
  return new Array(count).fill({}).map(() => {
    const t = Math.random()
    const pos = track.parameters.path.getPointAt(t)
    pos.multiplyScalar(1)
    const offset = pos
      .clone()
      .add(new THREE.Vector3(-radius + Math.random() * radius * 2, -radius + Math.random() * radius * 2, -radius + Math.random() * radius * 2))
    const speed = 0.1 + Math.random()
    return { guid: guid++, scale: typeof scale === 'function' ? scale() : scale, size, offset, pos, speed, radius, t, hit: new THREE.Vector3(), distance: 100 }
  });
}

export const Particles: React.FC = () => {
  const instancedMesh = useRef() as MutableRefObject<THREE.InstancedMesh>;
  const spline = new GrannyKnot();
  const track = new THREE.TubeGeometry(spline, 250, 0.2, 10, true);
  const particles = randomData(1100, track, 100, 10, () => 0.5 + Math.random() * 0.1);
  const dummy = new THREE.Object3D();
  const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr');

  useEffect(() => {
    if (instancedMesh.current) {
      particles.forEach((particle, i) => {
        const { offset, scale } = particle
        dummy.position.copy(offset)
        dummy.scale.set(scale, scale, scale)
        dummy.rotation.set(Math.sin(Math.random()) * Math.PI, Math.sin(Math.random()) * Math.PI, Math.cos(Math.random()) * Math.PI)
        dummy.updateMatrix()
        if (instancedMesh.current) instancedMesh.current.setMatrixAt(i, dummy.matrix);
      })
      instancedMesh.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  return (
    <instancedMesh ref={instancedMesh} args={[undefined, undefined, particles.length]} frustumCulled={false}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <MeshTransmissionMaterial reflectivity={0.05} {...HOME_TRANSMISSION_MATERIAL_CONFIG} background={texture} transmission={2} roughness={0} thickness={1.2} envMapIntensity={1} />
    </instancedMesh>
  )
};
