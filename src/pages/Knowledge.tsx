import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText } from "lucide-react";
import FactGraph from "@/components/FactGraph";
import { useToast } from "@/hooks/use-toast";

const Knowledge = () => {
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
      description: "Knowledge graph generated successfully"
    });
  };

  return (
    <div className="min-h-screen hero-gradient">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Knowledge Graph</h1>
          <p className="text-muted-foreground">Analyze text and generate interactive fact verification graphs</p>
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
              <CardTitle>Interactive Knowledge Graph</CardTitle>
              <CardDescription>
                3D visualization of extracted facts and their verification status. Click nodes for details.
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

export default Knowledge;