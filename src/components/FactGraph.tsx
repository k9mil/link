import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// Mock moon landing data
const mockNodes = [
  { id: 1, title: "Apollo 11 Launch Date", position: [0, 0, 0] as [number, number, number], status: "verified", info: "Apollo 11 launched on July 16, 1969", sources: ["NASA Archives", "Historical Records"] },
  { id: 2, title: "Neil Armstrong First Steps", position: [-3, 2, 1] as [number, number, number], status: "verified", info: "Neil Armstrong was first human on moon", sources: ["NASA Transcripts", "Video Evidence"] },
  { id: 3, title: "Lunar Module Landing", position: [2, -1, -2] as [number, number, number], status: "verified", info: "Eagle landed in Sea of Tranquility", sources: ["Mission Control Logs"] },
  { id: 4, title: "Shadows Direction", position: [-2, -2, 3] as [number, number, number], status: "ambiguous", info: "Debate about shadow directions in photos", sources: ["Photo Analysis"] },
  { id: 5, title: "Flag Movement", position: [3, 3, -1] as [number, number, number], status: "ambiguous", info: "Flag appears to wave in no atmosphere", sources: ["Conspiracy Theories", "Physics Analysis"] },
  { id: 6, title: "Studio Recording Theory", position: [-4, 1, -3] as [number, number, number], status: "unverified", info: "Claims of staged moon landing", sources: ["Conspiracy Websites"] },
];

interface NodeProps {
  node: typeof mockNodes[0];
  onClick: (node: typeof mockNodes[0]) => void;
}

const Node = ({ node, onClick }: NodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      if (hovered) {
        meshRef.current.scale.setScalar(1.2);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const getColor = () => {
    switch (node.status) {
      case 'verified': return '#22c55e';
      case 'ambiguous': return '#f59e0b';
      case 'unverified': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onClick={() => onClick(node)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={getColor()} />
      </mesh>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.2}
        color="#374151"
        anchorX="center"
        anchorY="middle"
      >
        {node.title}
      </Text>
    </group>
  );
};

const FactGraph = () => {
  const [selectedNode, setSelectedNode] = useState<typeof mockNodes[0] | null>(null);

  return (
    <div className="relative w-full h-[600px] bg-background rounded-lg border">
      <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        
        {mockNodes.map((node) => (
          <Node key={node.id} node={node} onClick={setSelectedNode} />
        ))}
      </Canvas>

      {/* Details Panel */}
      {selectedNode && (
        <div className="absolute top-4 left-4 w-80 bg-card border rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <div 
              className={`w-3 h-3 rounded-full ${
                selectedNode.status === 'verified' ? 'bg-verified' :
                selectedNode.status === 'ambiguous' ? 'bg-ambiguous' : 'bg-unverified'
              }`}
            />
            <span className="font-semibold capitalize">{selectedNode.status}</span>
          </div>
          <h3 className="font-bold text-lg mb-2">{selectedNode.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{selectedNode.info}</p>
          <div>
            <h4 className="font-medium mb-1">Sources:</h4>
            <ul className="text-sm text-muted-foreground">
              {selectedNode.sources.map((source, i) => (
                <li key={i}>• {source}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => setSelectedNode(null)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default FactGraph;