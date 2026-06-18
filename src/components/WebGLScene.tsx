import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

function DataCore() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate random data points for the 3D network
  const dataPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 40; i++) {
      const radius = 2 + Math.random() * 2;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      points.push(new THREE.Vector3(x, y, z));
    }
    return points;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        {/* Central Core */}
        <Sphere args={[1.2, 16, 16]}>
          <meshStandardMaterial 
            color="#06B6D4" 
            wireframe 
            emissive="#06B6D4"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </Sphere>

        <Sphere args={[1, 16, 16]}>
          <meshStandardMaterial 
            color="#0A0A0A" 
            metalness={0.9}
            roughness={0.1}
          />
        </Sphere>

        {/* Orbiting Data Points */}
        {dataPoints.map((pos, i) => (
          <group key={i}>
            <Sphere position={pos} args={[0.05, 8, 8]}>
              <meshBasicMaterial color={i % 2 === 0 ? "#06B6D4" : "#8B5CF6"} />
            </Sphere>
            {/* Connection lines back to core */}
            <Line
              points={[[0, 0, 0], pos.toArray()]}
              color="#06B6D4"
              lineWidth={0.5}
              transparent
              opacity={0.15}
            />
          </group>
        ))}

        {/* Floating Text Labels */}
        <Text
          position={[0, -2, 2]}
          fontSize={0.3}
          color="#8B5CF6"
          anchorX="center"
          anchorY="middle"
        >
          DATA ANALYTICS
        </Text>
      </Float>
    </group>
  );
}

export default function WebGLScene() {
  return (
    <div className="w-full h-[500px] absolute inset-0 pointer-events-none -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#06B6D4" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#8B5CF6" />
        <DataCore />
      </Canvas>
    </div>
  );
}
