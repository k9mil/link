import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import FactGraph from "@/components/FactGraph";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [inputText, setInputText] = useState("");
  const [showGraph, setShowGraph] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = () => {
    if (!inputText.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text to analyze",
        variant: "destructive"
      });
      return;
    }
    setShowGraph(true);
    toast({
      title: "Analysis complete",
      description: "Fact graph generated successfully"
    });
  };

  return (
    <div className="min-h-screen hero-gradient">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">FactGraph Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Facts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified</CardTitle>
              <CheckCircle className="h-4 w-4 text-verified" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-verified">892</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ambiguous</CardTitle>
              <AlertTriangle className="h-4 w-4 text-ambiguous" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ambiguous">234</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unverified</CardTitle>
              <XCircle className="h-4 w-4 text-unverified" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-unverified">121</div>
            </CardContent>
          </Card>
        </div>

        {/* Input Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Analyze Text or Upload File</CardTitle>
            <CardDescription>
              Enter text about any topic for fact verification and knowledge graph generation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter text to analyze... (e.g., 'The Apollo 11 mission landed on the moon in 1969. Neil Armstrong was the first person to walk on the lunar surface.')"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px]"
            />
            <div className="flex gap-4">
              <Button onClick={handleAnalyze} className="primary-gradient text-white">
                <FileText className="mr-2 h-4 w-4" />
                Analyze Text
              </Button>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Graph Section */}
        {showGraph && (
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Graph</CardTitle>
              <CardDescription>
                Interactive 3D visualization of extracted facts and their verification status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FactGraph />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;