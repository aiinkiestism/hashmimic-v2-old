import { Canvas } from '@react-three/fiber';
import { RGBELoader } from 'three-stdlib'
import {
  Environment,
  Lightformer,
  RandomizedLight,
  AccumulativeShadows,
} from '@react-three/drei'
import { CustomGridHelper, HomeCenterText } from '.';

export const HomeWebGL: React.FC = () => {
  return (
    <Canvas shadows orthographic camera={{ position: [-4, 40, 40], zoom: 34 }} gl={{ preserveDrawingBuffer: true }} style={{ width: '100%' }}>
      <color attach="background" args={['#000']} />
      <HomeCenterText position={[0, 0, 0]} />
      <Environment resolution={32}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer intensity={20} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
          <Lightformer type="ring" intensity={2} rotation-y={Math.PI / 2} position={[-0.1, -1, -5]} scale={10} />
        </group>
      </Environment>
      <AccumulativeShadows
        temporal
        frames={100}
        color='#750d57'
        colorBlend={5}
        toneMapped={true}
        alphaTest={0.9}
        opacity={1}
        scale={30}
        position={[0, -1.01, 0]}>
        <RandomizedLight amount={4} radius={10} ambient={0.5} intensity={1} position={[0, 10, -10]} size={15} mapSize={1024} bias={0.0001} />
      </AccumulativeShadows>
    </Canvas>
  )
}
