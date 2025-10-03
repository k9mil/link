import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import ReactMarkdown from "react-markdown";
import * as THREE from "three";

interface GraphNode {
  id: number;
  title: string;
  position: [number, number, number];
  status: "verified" | "ambiguous" | "unverified";
  info: string;
  sources: { name: string; url: string }[];
  isDiscover?: boolean;
  isRelated?: boolean;
}

const mockNodes: GraphNode[] = [
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
      {
        name: "NASA Archives",
        url: "https://www.nasa.gov/mission_pages/apollo/apollo11.html",
      },
      {
        name: "Historical Records",
        url: "https://history.nasa.gov/ap11ann/introduction.htm",
      },
      {
        name: "Kennedy Space Centre Logs",
        url: "https://www.kennedyspacecenter.com/apollo-11",
      },
    ],
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
      {
        name: "NASA Transcripts",
        url: "https://www.nasa.gov/history/alsj/a11/a11.step.html",
      },
      { name: "Video Evidence", url: "https://apolloinrealtime.org/11/" },
      {
        name: "Mission Audio Logs",
        url: "https://www.nasa.gov/connect/sounds/apollo_sounds.html",
      },
      {
        name: "TV Broadcast Records",
        url: "https://www.nasa.gov/multimedia/apollo11_neil.html",
      },
    ],
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
      {
        name: "Mission Control Logs",
        url: "https://www.nasa.gov/mission_pages/apollo/missions/apollo11.html",
      },
      {
        name: "Lunar Landing Telemetry",
        url: "https://apolloinrealtime.org/11/?t=102:45:17",
      },
      {
        name: "Post-Mission Reports",
        url: "https://www.nasa.gov/centers/dryden/pdf/87793main_H-2465.pdf",
      },
    ],
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
      {
        name: "Photo Analysis Studies",
        url: "https://www.badastronomy.com/bad/tv/foxapollo.html",
      },
      {
        name: "Lunar Photography Research",
        url: "https://www.hq.nasa.gov/alsj/a11/images11.html",
      },
      { name: "Optics Experts", url: "https://www.clavius.org/light.html" },
    ],
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
      {
        name: "NASA Technical Reports",
        url: "https://www.nasa.gov/audience/forstudents/5-8/features/nasa-knows/what-is-apollo-program-58.html",
      },
      {
        name: "Physics Analysis",
        url: "https://www.physicscentral.com/explore/action/apollo.cfm",
      },
      {
        name: "Video Frame Analysis",
        url: "https://apolloinrealtime.org/11/?t=109:24:15",
      },
    ],
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
      {
        name: "Conspiracy Theory Websites",
        url: "https://www.conspiracytheories.com/moon-landing",
      },
      { name: "Debunking Studies", url: "https://www.clavius.org/" },
      {
        name: "Independent Research",
        url: "https://www.snopes.com/fact-check/moon-landing-conspiracy-theory/",
      },
    ],
  },
  {
    id: 7,
    title: "Command Module Re-entry",
    position: [4, -2, 2] as [number, number, number],
    status: "verified",
    info: `Apollo 11's command module splashed down in the Pacific Ocean on July 24, 1969.

### Key Details
- Recovery ship: USS Hornet
- Splashdown time: 16:50 UTC
- Quarantine: 21 days for crew and samples`,
    sources: [
      {
        name: "NASA Mission Summary",
        url: "https://www.nasa.gov/mission/apollo-11/",
      },
      { name: "USS Hornet Museum", url: "https://uss-hornet.org/apollo/" },
    ],
  },
  {
    id: 8,
    title: "Saturn V Specifications",
    position: [-5, 0, 2] as [number, number, number],
    status: "verified",
    info: `Saturn V was a three-stage liquid-fuel launch vehicle used by NASA.

### Specs
- Height: 110.6 m
- Mass: 2,970,000 kg
- Payload to LEO: 140,000 kg`,
    sources: [
      { name: "NASA Facts", url: "https://www.nasa.gov/saturnv/" },
      { name: "Smithsonian", url: "https://airandspace.si.edu/saturn-v" },
    ],
  },
  {
    id: 9,
    title: "Lunar Surface Experiments",
    position: [1, 4, -3] as [number, number, number],
    status: "verified",
    info: `Astronauts deployed multiple experiments on the lunar surface.

### Experiments
- Passive Seismic Experiment
- Laser Ranging Retroreflector
- Solar Wind Composition Experiment`,
    sources: [
      { name: "ALSJ", url: "https://www.hq.nasa.gov/alsj/" },
      { name: "LPI", url: "https://www.lpi.usra.edu/" },
    ],
  },
  {
    id: 100,
    title: "+ Discover",
    position: [0, -4, 0] as [number, number, number],
    status: "ambiguous",
    info: `Discover related topics. Click to generate suggestions.`,
    sources: [{ name: "About", url: "https://example.com" }],
    isDiscover: true,
  },
  {
    id: 101,
    title: "+ Discover",
    position: [-4, -3, -2] as [number, number, number],
    status: "ambiguous",
    info: `Discover related topics. Click to generate suggestions.`,
    sources: [{ name: "About", url: "https://example.com" }],
    isDiscover: true,
  },
];

type NodeType = GraphNode;
type Connection = { from: number; to: number; reason: string };

const connections: Connection[] = [
  { from: 1, to: 2, reason: "Mission timeline: launch precedes first steps" },
  { from: 1, to: 3, reason: "Launch enabled lunar landing" },
  { from: 2, to: 3, reason: "Crew and events are shared" },
  { from: 3, to: 4, reason: "Landing imagery relates to shadow debates" },
  { from: 3, to: 5, reason: "Footage from landing shows flag motion" },
  { from: 4, to: 6, reason: "Shadow claims feed studio-theory narratives" },
  { from: 5, to: 6, reason: "Flag motion cited by conspiracy claims" },
  { from: 1, to: 8, reason: "Launch vehicle details: Saturn V" },
  { from: 3, to: 9, reason: "Experiments deployed after landing" },
  { from: 2, to: 7, reason: "Crew return completes mission arc" },
  { from: 100, to: 1, reason: "Discover related topics" },
  { from: 101, to: 3, reason: "Discover related topics" },
];

const discoverAnchors: Record<number, number> = { 100: 1, 101: 3 };

interface NodeProps {
  node: NodeType;
  onClick: (node: NodeType) => void;
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
    if (node.isDiscover) {
      return "#8b5cf6"; // Purple for discover nodes
    }
    switch (node.status) {
      case "verified":
        return "#4ade80";
      case "ambiguous":
        return "#ffb347";
      case "unverified":
        return "#fb7185";
      default:
        return "#a3a3a3";
    }
  };

  const isRelated = node.isRelated === true || /^Related:/i.test(node.title);

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onClick={() => onClick(node)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.35, 48, 48]} />
        <meshStandardMaterial
          color={getColor()}
          emissive={getColor()}
          emissiveIntensity={0.4}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      {isRelated ? (
        <group>
          <Text
            position={[0, -0.72, 0]}
            fontSize={0.22}
            color="#1f2937"
            anchorX="center"
            anchorY="middle"
            fontWeight={700}
          >
            Related
          </Text>
          <Text
            position={[0, -0.98, 0]}
            fontSize={0.18}
            color="#374151"
            anchorX="center"
            anchorY="middle"
          >
            {node.title.replace(/^Related:\s*/i, "")}
          </Text>
        </group>
      ) : (
        <Text
          position={[0, -0.85, 0]}
          fontSize={0.2}
          color="#374151"
          anchorX="center"
          anchorY="middle"
        >
          {node.title}
        </Text>
      )}
    </group>
  );
};

// Connection line component using drei's Line
const ConnectionLine = ({
  from,
  to,
  label,
  onClick,
}: {
  from: [number, number, number];
  to: [number, number, number];
  label: string;
  onClick: () => void;
}) => {
  return (
    <group onClick={onClick}>
      <Line
        points={[from, to]}
        color="#6b7280"
        lineWidth={1}
        opacity={0.35}
        transparent
      />
      <mesh
        position={[
          (from[0] + to[0]) / 2,
          (from[1] + to[1]) / 2,
          (from[2] + to[2]) / 2,
        ]}
      >
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#6b7280" opacity={0.001} transparent />
      </mesh>
      <Text
        position={[
          (from[0] + to[0]) / 2,
          (from[1] + to[1]) / 2 + 0.15,
          (from[2] + to[2]) / 2,
        ]}
        fontSize={0.12}
        color="#6b7280"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

const FactGraph = () => {
  const [selectedNode, setSelectedNode] = useState<
    (typeof mockNodes)[0] | null
  >(null);
  const [edgeInfo, setEdgeInfo] = useState<string | null>(null);
  const [dynamicNodes, setDynamicNodes] = useState<NodeType[]>([]);
  const [dynamicConnections, setDynamicConnections] = useState<Connection[]>(
    []
  );
  const [usedDiscoverIds, setUsedDiscoverIds] = useState<number[]>([]);

  return (
    <div className="relative w-full h-[600px] bg-background rounded-lg border overflow-hidden">
      {/* Visible hero pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 100%, rgba(236, 72, 153, 0.06) 0%, transparent 70%)`,
          }}
        ></div>
      </div>

      <Canvas camera={{ position: [6, 6, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />

        {[...connections, ...dynamicConnections].map((connection, index) => {
          const fromNodeStatic = mockNodes.find(
            (n) => n.id === connection.from
          );
          const fromNodeDynamic = dynamicNodes.find(
            (n) => n.id === connection.from
          );
          const fromNode = fromNodeStatic || fromNodeDynamic;
          const toNodeStatic = mockNodes.find((n) => n.id === connection.to);
          const toNodeDynamic = dynamicNodes.find(
            (n) => n.id === connection.to
          );
          const toNode = toNodeStatic || toNodeDynamic;
          if (fromNode && toNode) {
            return (
              <ConnectionLine
                key={index}
                from={fromNode.position}
                to={toNode.position}
                label={connection.reason}
                onClick={() => setEdgeInfo(connection.reason)}
              />
            );
          }
          return null;
        })}

        {[...mockNodes, ...dynamicNodes]
          .filter((n) => !(n.isDiscover && usedDiscoverIds.includes(n.id)))
          .map((node) => (
            <Node
              key={node.id}
              node={node}
              onClick={(n) => {
                if (n.isDiscover) {
                  if (dynamicNodes.length >= 6) return;
                  const baseId = Date.now();
                  const anchorId = discoverAnchors[n.id] ?? 1;
                  const seeds: NodeType[] =
                    n.id === 100
                      ? [
                          {
                            id: baseId,
                            title: "Related: Apollo Guidance Computer",
                            position: [
                              n.position[0] + 1.5,
                              n.position[1] + 0.8,
                              n.position[2] - 0.5,
                            ],
                            status: "verified",
                            info: `The Apollo Guidance Computer (AGC) provided real-time guidance and navigation.\n\n- Built by MIT Instrumentation Lab\n- Used in both CSM and LM\n- Pioneering integrated circuits use`,
                            sources: [
                              {
                                name: "MIT AGC",
                                url: "https://www.ics-history.com/AGC",
                              },
                            ],
                            isRelated: true,
                          },
                          {
                            id: baseId + 1,
                            title: "Related: Lunar Orbit Rendezvous",
                            position: [
                              n.position[0] - 1.2,
                              n.position[1] + 1.1,
                              n.position[2] + 0.9,
                            ],
                            status: "ambiguous",
                            info: `Mission architecture where the LM ascends to rendezvous in lunar orbit.\n\n- Proposed by John C. Houbolt\n- Reduced mass requirements\n- Critical to Apollo success`,
                            sources: [
                              {
                                name: "NASA History",
                                url: "https://history.nasa.gov/",
                              },
                            ],
                            isRelated: true,
                          },
                          {
                            id: baseId + 2,
                            title: "Related: Heat Shield Technology",
                            position: [
                              n.position[0] + 0.5,
                              n.position[1] - 1.2,
                              n.position[2] + 1.2,
                            ],
                            status: "verified",
                            info: `Apollo command module heat shield protected against re-entry.\n\n- Honeycomb ablative design\n- Temperatures up to 2760°C\n- Critical for crew safety`,
                            sources: [
                              {
                                name: "NASA Engineering",
                                url: "https://www.nasa.gov/heatshield",
                              },
                            ],
                            isRelated: true,
                          },
                        ]
                      : [
                          {
                            id: baseId,
                            title: "Related: Lunar Geology",
                            position: [
                              n.position[0] + 1.8,
                              n.position[1] + 0.5,
                              n.position[2] - 0.8,
                            ],
                            status: "verified",
                            info: `Moon rock samples revealed lunar formation history.\n\n- 4.5 billion years old\n- Anorthosite highlands\n- Mare basalt plains`,
                            sources: [
                              {
                                name: "Lunar Sample Lab",
                                url: "https://curator.jsc.nasa.gov/lunar/",
                              },
                            ],
                            isRelated: true,
                          },
                          {
                            id: baseId + 1,
                            title: "Related: EVA Suit Design",
                            position: [
                              n.position[0] - 0.8,
                              n.position[1] + 1.3,
                              n.position[2] + 0.7,
                            ],
                            status: "ambiguous",
                            info: `A7L spacesuits enabled lunar surface operations.\n\n- 21-layer construction\n- Life support backpack\n- Pressure suit technology`,
                            sources: [
                              {
                                name: "Smithsonian",
                                url: "https://airandspace.si.edu/spacesuit",
                              },
                            ],
                            isRelated: true,
                          },
                          {
                            id: baseId + 2,
                            title: "Related: Mission Control",
                            position: [
                              n.position[0] + 0.3,
                              n.position[1] - 1.5,
                              n.position[2] + 1.1,
                            ],
                            status: "unverified",
                            info: `Houston Mission Control coordinated all operations.\n\n- Flight controllers\n- Real-time telemetry\n- Go/No-Go decisions`,
                            sources: [
                              {
                                name: "NASA JSC",
                                url: "https://www.nasa.gov/centers/johnson/",
                              },
                            ],
                            isRelated: true,
                          },
                        ];
                  const newConnections: Connection[] = seeds.map((s) => ({
                    from: anchorId,
                    to: s.id,
                    reason:
                      n.id === 100
                        ? "Launch technology relations"
                        : "Landing operations relations",
                  }));
                  setDynamicNodes((prev) => [...prev, ...seeds]);
                  setDynamicConnections((prev) => [...prev, ...newConnections]);
                  setUsedDiscoverIds((prev) => [...prev, n.id]);
                } else {
                  setSelectedNode(n);
                }
              }}
            />
          ))}
      </Canvas>

      {/* Details Panel */}
      {selectedNode && (
        <div className="absolute top-6 left-6 w-96 bg-card/95 backdrop-blur-sm border rounded-xl shadow-xl max-h-[500px] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-4 h-4 rounded-full ${
                  selectedNode.status === "verified"
                    ? "bg-verified"
                    : selectedNode.status === "ambiguous"
                    ? "bg-ambiguous"
                    : "bg-unverified"
                }`}
              />
              <span className="font-semibold capitalize text-base text-muted-foreground">
                {selectedNode.status}
              </span>
            </div>

            <h3 className="font-bold text-lg mb-3 tracking-tight">
              {selectedNode.title}
            </h3>

            <div className="prose max-w-none mb-6 leading-relaxed text-sm prose-headings:mt-4 prose-headings:mb-2 prose-p:my-3 prose-li:my-1">
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

      {edgeInfo && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[30rem] bg-card/95 backdrop-blur-sm border rounded-xl shadow-lg">
          <div className="p-4 flex items-start gap-3">
            <span className="text-sm font-medium">Connection</span>
            <p className="text-sm text-muted-foreground flex-1">{edgeInfo}</p>
            <button
              onClick={() => setEdgeInfo(null)}
              className="ml-2 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FactGraph;
