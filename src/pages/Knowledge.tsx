import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText } from "lucide-react";
import FactGraph from "@/components/FactGraph";
import { useToast } from "@/hooks/use-toast";

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

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File uploaded",
        description: `Processing ${file.name}...`
      });
      setShowGraph(true);
    }
  };

  return (
    <div className="min-h-screen hero-gradient">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Knowledge Graph</h1>
          <p className="text-muted-foreground">Analyse text and generate interactive fact verification graphs</p>
        </div>

        {/* Input Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Analyse Text or Upload File</CardTitle>
            <CardDescription>
              Enter text about any topic for fact verification and knowledge graph generation
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
              <Button onClick={handleAnalyse} className="bg-primary text-primary-foreground hover:bg-primary/90">
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