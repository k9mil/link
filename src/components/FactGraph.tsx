import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import ReactMarkdown from 'react-markdown';
import * as THREE from 'three';

// Mock moon landing data with connections
const mockNodes = [
  { 
    id: 1, 
    title: "Apollo 11 Launch Date", 
    position: [0, 0, 0] as [number, number, number], 
    status: "verified", 
    info: `**Apollo 11 launched on July 16, 1969** from Kennedy Space Centre at 13:32 UTC. 

The mission was the culmination of the Apollo programme and represented humanity's first attempt to land on the Moon. The launch vehicle was a **Saturn V rocket**, standing 363 feet tall and weighing 6.2 million pounds when fully fuelled.

### Key Details:
- **Launch time**: 13:32:00 UTC
- **Mission duration**: 8 days, 3 hours, 18 minutes
- **Crew**: Neil Armstrong, Buzz Aldrin, Michael Collins`, 
    sources: [
      { name: "NASA Archives", url: "https://www.nasa.gov/mission_pages/apollo/apollo11.html" },
      { name: "Historical Records", url: "https://history.nasa.gov/ap11ann/introduction.htm" },
      { name: "Kennedy Space Centre Logs", url: "https://www.kennedyspacecenter.com/apollo-11" }
    ]
  },
  { 
    id: 2, 
    title: "Neil Armstrong First Steps", 
    position: [-3, 2, 1] as [number, number, number], 
    status: "verified", 
    info: `**Neil Armstrong was the first human to step onto the lunar surface** on July 20, 1969 at 20:17 UTC.

His famous words *"That's one small step for man, one giant leap for mankind"* were transmitted to Earth and heard by an estimated 650 million people worldwide. The moment was captured on video and transmitted via the lunar module's camera.

### Technical Details:
- **EVA duration**: 2 hours, 31 minutes
- **Surface time**: 21 hours, 36 minutes
- **Samples collected**: 21.5 kg of lunar material`, 
    sources: [
      { name: "NASA Transcripts", url: "https://www.nasa.gov/history/alsj/a11/a11.step.html" },
      { name: "Video Evidence", url: "https://apolloinrealtime.org/11/" },
      { name: "Mission Audio Logs", url: "https://www.nasa.gov/connect/sounds/apollo_sounds.html" },
      { name: "TV Broadcast Records", url: "https://www.nasa.gov/multimedia/apollo11_neil.html" }
    ]
  },
  { 
    id: 3, 
    title: "Lunar Module Landing", 
    position: [2, -1, -2] as [number, number, number], 
    status: "verified", 
    info: `**The Eagle lunar module successfully landed** in the Sea of Tranquillity at coordinates 0°40'27"N 23°28'23"E on July 20, 1969.

The landing was manually piloted by Neil Armstrong after the automatic guidance system was taking them towards a boulder field. They had only **17 seconds of fuel remaining** when they touched down.

### Landing Sequence:
1. **Powered descent**: 12 minutes, 36 seconds
2. **Manual control**: Final 25 seconds  
3. **Touchdown**: "The Eagle has landed"`, 
    sources: [
      { name: "Mission Control Logs", url: "https://www.nasa.gov/mission_pages/apollo/missions/apollo11.html" },
      { name: "Lunar Landing Telemetry", url: "https://apolloinrealtime.org/11/?t=102:45:17" },
      { name: "Post-Mission Reports", url: "https://www.nasa.gov/centers/dryden/pdf/87793main_H-2465.pdf" }
    ]
  },
  { 
    id: 4, 
    title: "Shadows Direction", 
    position: [-2, -2, 3] as [number, number, number], 
    status: "ambiguous", 
    info: `Some photographs from the lunar surface show **shadows that appear to point in different directions**, leading to debates about lighting sources.

While conspiracy theorists claim this proves studio lighting, scientists explain this is due to:
- The **uneven lunar surface** creating complex shadow patterns
- **Multiple light sources** (Earth reflection, lunar module)
- The **lack of atmospheric scattering** on the Moon

### Scientific Analysis:
> *"The varying shadow directions are entirely consistent with the lunar environment and multiple light sources."* - Dr. Phil Plait, Astronomer`, 
    sources: [
      { name: "Photo Analysis Studies", url: "https://www.badastronomy.com/bad/tv/foxapollo.html" },
      { name: "Lunar Photography Research", url: "https://www.hq.nasa.gov/alsj/a11/images11.html" },
      { name: "Optics Experts", url: "https://www.clavius.org/light.html" }
    ]
  },
  { 
    id: 5, 
    title: "Flag Movement", 
    position: [3, 3, -1] as [number, number, number], 
    status: "ambiguous", 
    info: `The **American flag planted on the lunar surface** appears to wave in some footage, despite the Moon's lack of atmosphere.

**NASA's explanation:**
- Movement caused by astronauts' manipulation of the flagpole
- The flag's horizontal support rod creating tension
- **No air resistance** to dampen movement once started

The flag's apparent movement stops when the astronauts stop touching the pole, which is **consistent with physics** in a vacuum environment.`, 
    sources: [
      { name: "NASA Technical Reports", url: "https://www.nasa.gov/audience/forstudents/5-8/features/nasa-knows/what-is-apollo-program-58.html" },
      { name: "Physics Analysis", url: "https://www.physicscentral.com/explore/action/apollo.cfm" },
      { name: "Video Frame Analysis", url: "https://apolloinrealtime.org/11/?t=109:24:15" }
    ]
  },
  { 
    id: 6, 
    title: "Studio Recording Theory", 
    position: [-4, 1, -3] as [number, number, number], 
    status: "unverified", 
    info: `**Claims that the moon landing was filmed in a studio**, possibly directed by Stanley Kubrick.

These theories cite various "anomalies" in the footage and photographs. However, extensive analysis by independent researchers shows:

### Evidence Against:
- **Retroreflectors** placed on the Moon (still used today)
- **Sheer complexity** of faking evidence in 1969
- **Independent verification** by multiple countries
- **Technological impossibility** of creating such footage in 1969

> *"The technology to fake the moon landings didn't exist in 1969."* - Film experts`, 
    sources: [
      { name: "Conspiracy Theory Websites", url: "https://www.conspiracytheories.com/moon-landing" },
      { name: "Debunking Studies", url: "https://www.clavius.org/" },
      { name: "Independent Research", url: "https://www.snopes.com/fact-check/moon-landing-conspiracy-theory/" }
    ]
  },
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
      case 'ambiguous': return '#FF8C00';
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

// Connection line component using drei's Line
const ConnectionLine = ({ from, to }: { from: [number, number, number], to: [number, number, number] }) => {
  return (
    <Line
      points={[from, to]}
      color="#6b7280"
      lineWidth={1}
      opacity={0.3}
      transparent
    />
  );
};

const FactGraph = () => {
  const [selectedNode, setSelectedNode] = useState<typeof mockNodes[0] | null>(null);

  return (
    <div className="relative w-full h-[600px] bg-background rounded-lg border overflow-hidden">
      {/* Visible hero pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 100%, rgba(236, 72, 153, 0.06) 0%, transparent 70%)`
        }}></div>
      </div>
      
      <Canvas camera={{ position: [6, 6, 6], fov: 50 }}>
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
        <div className="absolute top-6 left-6 w-96 bg-card/95 backdrop-blur-sm border rounded-xl shadow-xl max-h-[500px] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div 
                className={`w-4 h-4 rounded-full ${
                  selectedNode.status === 'verified' ? 'bg-verified' :
                  selectedNode.status === 'ambiguous' ? 'bg-ambiguous' : 'bg-unverified'
                }`}
              />
              <span className="font-semibold capitalize text-lg">{selectedNode.status}</span>
            </div>
            
            <h3 className="font-bold text-xl mb-6">{selectedNode.title}</h3>
            
            <div className="prose prose-sm max-w-none mb-8 leading-relaxed space-y-4">
              <ReactMarkdown>{selectedNode.info}</ReactMarkdown>
            </div>
            
            <div className="border-t pt-6">
              <h4 className="font-semibold text-base mb-4">Sources:</h4>
              <ul className="space-y-3">
                {selectedNode.sources.map((source, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-muted-foreground mr-3 mt-1">•</span>
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm leading-relaxed flex-1"
                    >
                      {source.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <button
            onClick={() => setSelectedNode(null)}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default FactGraph;