import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Upload, Eye, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            FactGraph
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            AI-powered fact verification with interactive knowledge graphs. 
            Upload documents or text to visualize and verify information instantly.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="primary-gradient text-white">
                Get Started
              </Button>
            </Link>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-gradient">
              <CardHeader>
                <Upload className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Upload & Analyze</CardTitle>
                <CardDescription>
                  Upload documents or paste text for instant fact extraction and analysis
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-gradient">
              <CardHeader>
                <Eye className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Interactive Visualization</CardTitle>
                <CardDescription>
                  Explore facts through beautiful 3D knowledge graphs with verification status
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-gradient">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>AI Verification</CardTitle>
                <CardDescription>
                  Advanced AI analysis categorizes facts as verified, ambiguous, or unverified
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;