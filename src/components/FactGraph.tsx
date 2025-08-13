import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// Mock moon landing data with connections
const mockNodes = [
  { id: 1, title: "Apollo 11 Launch Date", position: [0, 0, 0] as [number, number, number], status: "verified", info: "Apollo 11 launched on July 16, 1969 from Kennedy Space Center at 13:32 UTC. The mission was the culmination of the Apollo program and represented humanity's first attempt to land on the Moon. The launch vehicle was a Saturn V rocket, standing 363 feet tall and weighing 6.2 million pounds when fully fueled.", sources: ["NASA Archives", "Historical Records", "Kennedy Space Center Logs"] },
  { id: 2, title: "Neil Armstrong First Steps", position: [-3, 2, 1] as [number, number, number], status: "verified", info: "Neil Armstrong was the first human to step onto the lunar surface on July 20, 1969 at 20:17 UTC. His famous words 'That's one small step for man, one giant leap for mankind' were transmitted to Earth and heard by an estimated 650 million people worldwide. The moment was captured on video and transmitted via the lunar module's camera.", sources: ["NASA Transcripts", "Video Evidence", "Mission Audio Logs", "TV Broadcast Records"] },
  { id: 3, title: "Lunar Module Landing", position: [2, -1, -2] as [number, number, number], status: "verified", info: "The Eagle lunar module successfully landed in the Sea of Tranquility at coordinates 0°40′27″N 23°28′23″E on July 20, 1969. The landing was manually piloted by Neil Armstrong after the automatic guidance system was taking them toward a boulder field. They had only 17 seconds of fuel remaining when they touched down.", sources: ["Mission Control Logs", "Lunar Landing Telemetry", "Post-Mission Reports"] },
  { id: 4, title: "Shadows Direction", position: [-2, -2, 3] as [number, number, number], status: "ambiguous", info: "Some photographs from the lunar surface show shadows that appear to point in different directions, leading to debates about lighting sources. While conspiracy theorists claim this proves studio lighting, scientists explain this is due to the uneven lunar surface, multiple light sources (Earth reflection, lunar module), and the lack of atmospheric scattering on the Moon.", sources: ["Photo Analysis Studies", "Lunar Photography Research", "Optics Experts"] },
  { id: 5, title: "Flag Movement", position: [3, 3, -1] as [number, number, number], status: "ambiguous", info: "The American flag planted on the lunar surface appears to wave in some footage, despite the Moon's lack of atmosphere. NASA explains this movement was caused by the astronauts' manipulation of the flagpole and the flag's horizontal support rod. The flag's apparent movement stops when the astronauts stop touching the pole.", sources: ["NASA Technical Reports", "Physics Analysis", "Video Frame Analysis"] },
  { id: 6, title: "Studio Recording Theory", position: [-4, 1, -3] as [number, number, number], status: "unverified", info: "Claims that the moon landing was filmed in a studio, possibly directed by Stanley Kubrick. These theories cite various 'anomalies' in the footage and photographs. However, extensive analysis by independent researchers, the existence of retroreflectors placed on the Moon, and the sheer complexity of faking the evidence in 1969 make this highly implausible.", sources: ["Conspiracy Theory Websites", "Debunking Studies", "Independent Research"] },
];

// Connections between related nodes
const connections = [
  { from: 1, to: 2 }, // Launch to First Steps
  { from: 1, to: 3 }, // Launch to Landing
  { from: 2, to: 3 }, // First Steps to Landing
  { from: 3, to: 4 }, // Landing to Shadows
  { from: 3, to: 5 }, // Landing to Flag
  { from: 4, to: 6 }, // Shadows to Studio Theory
  { from: 5, to: 6 }, // Flag to Studio Theory
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
      case 'ambiguous': return '#ff8c00';
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

// Connection line component
const ConnectionLine = ({ from, to }: { from: [number, number, number], to: [number, number, number] }) => {
  const points = [new THREE.Vector3(...from), new THREE.Vector3(...to)];
  
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#6b7280" opacity={0.3} transparent />
    </line>
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
        
        {/* Render connections */}
        {connections.map((connection, index) => {
          const fromNode = mockNodes.find(n => n.id === connection.from);
          const toNode = mockNodes.find(n => n.id === connection.to);
          if (fromNode && toNode) {
            return (
              <ConnectionLine 
                key={index} 
                from={fromNode.position} 
                to={toNode.position} 
              />
            );
          }
          return null;
        })}
        
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