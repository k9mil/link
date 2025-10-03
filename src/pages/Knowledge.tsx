import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  FileText,
  Link as LinkIcon,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Globe,
  Clock,
  Database,
  TrendingUp,
  Activity,
} from "lucide-react";
import FactGraph from "@/components/FactGraph";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Knowledge = () => {
  const [inputText, setInputText] = useState("");
  const [showGraph, setShowGraph] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleAnalyse = () => {
    if (!inputText.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text to analyse",
        variant: "destructive",
      });
      return;
    }
    setShowGraph(true);
    toast({
      title: "Analysis complete",
      description: "Knowledge graph generated successfully",
    });
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File uploaded",
        description: `Processing ${file.name}...`,
      });
      setShowGraph(true);
    }
  };

  return (
    <div className="min-h-screen hero-gradient">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LinkIcon className="h-5 w-5" />
            <span>Link</span>
          </Link>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Knowledge Graph</h1>
          <p className="text-muted-foreground">
            Analyse text and generate interactive fact verification graphs
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-8 card-gradient">
          <CardHeader>
            <CardTitle>Analyse Text or Upload File</CardTitle>
            <CardDescription>
              Enter text about any topic for fact verification and knowledge
              graph generation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter text to analyse... (e.g., 'The Apollo 11 mission landed on the moon in 1969. Neil Armstrong was the first person to walk on the lunar surface.')"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px]"
            />
            <div className="flex gap-4">
              <Button
                onClick={handleAnalyse}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <FileText className="mr-2 h-4 w-4" />
                Analyse Text
              </Button>
              <Button variant="outline" onClick={handleFileUpload}>
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept=".txt,.pdf,.doc,.docx,.md"
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* Graph Section */}
        {showGraph && (
          <>
            <Card className="card-gradient overflow-hidden relative mb-8">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(400px 200px at 10% 20%, hsl(var(--primary)/0.08), transparent 60%),
                       radial-gradient(300px 150px at 90% 30%, hsl(var(--accent)/0.08), transparent 60%)`,
                  }}
                />
              </div>
              <CardHeader className="relative z-10">
                <CardTitle>Interactive Knowledge Graph</CardTitle>
                <CardDescription>
                  3D visualization of extracted facts and their verification
                  status. Click nodes for details.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <FactGraph />
              </CardContent>
            </Card>

            {/* Analytics Section */}
            <Card className="card-gradient mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Analysis Summary
                </CardTitle>
                <CardDescription>
                  Comprehensive breakdown of the fact verification process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">12</div>
                    <div className="text-sm text-muted-foreground">
                      Total Agents Deployed
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <CheckCircle className="h-8 w-8 text-verified" />
                    </div>
                    <div className="text-2xl font-bold text-verified">9</div>
                    <div className="text-sm text-muted-foreground">
                      Facts Verified
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <AlertTriangle className="h-8 w-8 text-ambiguous" />
                    </div>
                    <div className="text-2xl font-bold text-ambiguous">2</div>
                    <div className="text-sm text-muted-foreground">
                      Ambiguous Claims
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <XCircle className="h-8 w-8 text-unverified" />
                    </div>
                    <div className="text-2xl font-bold text-unverified">1</div>
                    <div className="text-sm text-muted-foreground">
                      Unverified Claims
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Most Cited Sources
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                        <span className="text-sm font-medium">
                          NASA Archives
                        </span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          8 citations
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                        <span className="text-sm font-medium">
                          Historical Records
                        </span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          6 citations
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                        <span className="text-sm font-medium">
                          Scientific Journals
                        </span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          4 citations
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                        <span className="text-sm font-medium">
                          Independent Research
                        </span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          3 citations
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Processing Metrics
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Total Processing Time
                        </span>
                        <span className="font-medium">2.3 seconds</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Average per Fact
                        </span>
                        <span className="font-medium">0.19s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Sources Consulted
                        </span>
                        <span className="font-medium">47</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Cross-references Found
                        </span>
                        <span className="font-medium">23</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Confidence Score
                        </span>
                        <span className="font-medium text-verified">87.4%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Confidence Heat Map Section */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Confidence Heat Map
                </CardTitle>
                <CardDescription>
                  Real-time confidence analysis showing verification strength
                  across topic categories and individual claims
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Domain Confidence Levels
                    </h4>
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">
                            Apollo Program Timeline & Events
                          </span>
                          <span className="text-xs text-verified font-medium">
                            94.2%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          Launch dates, mission durations, crew assignments -
                          well-documented official records
                        </p>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-verified h-2 rounded-full"
                            style={{ width: "94.2%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">
                            Spacecraft & Equipment Specifications
                          </span>
                          <span className="text-xs text-verified font-medium">
                            91.7%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          Saturn V dimensions, LM capabilities, CSM systems -
                          engineering documentation available
                        </p>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-verified h-2 rounded-full"
                            style={{ width: "91.7%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">
                            Lunar Surface Evidence & Samples
                          </span>
                          <span className="text-xs text-ambiguous font-medium">
                            78.3%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          Moon rocks, footprints, flag placement - some disputed
                          interpretations of evidence
                        </p>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-ambiguous h-2 rounded-full"
                            style={{ width: "78.3%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">
                            Hoax & Alternative Theories
                          </span>
                          <span className="text-xs text-unverified font-medium">
                            23.1%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          Studio filming claims, radiation arguments - lack
                          credible supporting evidence
                        </p>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-unverified h-2 rounded-full"
                            style={{ width: "23.1%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">
                      Individual Claim Heat Map
                    </h4>
                    <p className="text-xs text-muted-foreground mb-4">
                      Each square represents a specific fact or claim. Colors
                      indicate confidence level based on source reliability,
                      cross-verification, and evidence strength.
                    </p>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      <div className="aspect-square bg-verified/80 rounded flex items-center justify-center text-xs font-medium text-white">
                        Launch
                      </div>
                      <div className="aspect-square bg-verified/90 rounded flex items-center justify-center text-xs font-medium text-white">
                        Landing
                      </div>
                      <div className="aspect-square bg-verified/75 rounded flex items-center justify-center text-xs font-medium text-white">
                        Crew
                      </div>
                      <div className="aspect-square bg-verified/85 rounded flex items-center justify-center text-xs font-medium text-white">
                        Return
                      </div>
                      <div className="aspect-square bg-ambiguous/60 rounded flex items-center justify-center text-xs font-medium text-white">
                        Photos
                      </div>
                      <div className="aspect-square bg-ambiguous/70 rounded flex items-center justify-center text-xs font-medium text-white">
                        Flag
                      </div>
                      <div className="aspect-square bg-verified/80 rounded flex items-center justify-center text-xs font-medium text-white">
                        Samples
                      </div>
                      <div className="aspect-square bg-verified/85 rounded flex items-center justify-center text-xs font-medium text-white">
                        Tech
                      </div>
                      <div className="aspect-square bg-unverified/40 rounded flex items-center justify-center text-xs font-medium text-white">
                        Studio
                      </div>
                      <div className="aspect-square bg-verified/90 rounded flex items-center justify-center text-xs font-medium text-white">
                        Radio
                      </div>
                      <div className="aspect-square bg-verified/85 rounded flex items-center justify-center text-xs font-medium text-white">
                        Orbit
                      </div>
                      <div className="aspect-square bg-ambiguous/65 rounded flex items-center justify-center text-xs font-medium text-white">
                        Light
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-verified rounded"></div>
                        High Confidence
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-ambiguous rounded"></div>
                        Medium
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-unverified rounded"></div>
                        Low Confidence
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Knowledge;
