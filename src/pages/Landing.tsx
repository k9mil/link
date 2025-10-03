import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Upload, Eye, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-secondary/8 to-accent/20 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(1200px 600px at 15% 25%, hsl(var(--primary)/0.15), transparent 70%),
             radial-gradient(1000px 500px at 85% 30%, hsl(var(--accent)/0.15), transparent 70%),
             radial-gradient(800px 400px at 50% 80%, hsl(var(--secondary)/0.12), transparent 70%)`,
        }}
      />

      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <h1 className="text-8xl md:text-9xl font-black mb-4 text-foreground tracking-tight">
            Link
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Granular, source-aware truth verification for any content.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/knowledge">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Try Knowledge Graph
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Key Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="card-gradient">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">
                    Granular Verification
                  </CardTitle>
                </div>
                <CardDescription className="text-sm md:text-base">
                  Individual claims can be verified separately, rather than
                  treating documents as single units of truth.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="card-gradient">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Upload className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">
                    Multiple Source Compatibility
                  </CardTitle>
                </div>
                <CardDescription className="text-sm md:text-base">
                  Works with diverse content sources, including PDFs, blog URLs,
                  and other text formats.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="card-gradient">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">
                    Atomic Breakdown of Content
                  </CardTitle>
                </div>
                <CardDescription className="text-sm md:text-base">
                  Transforms each piece of content into digestible, analyzable
                  components from various text formats.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="card-gradient">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">
                    Truth Spectrum Verification System
                  </CardTitle>
                </div>
                <CardDescription className="text-sm md:text-base">
                  Color-coding to indicate reliability:{" "}
                  <span className="text-red-500 font-medium">Red</span>{" "}
                  unverified/false,{" "}
                  <span className="text-verified font-medium">Green</span>{" "}
                  verified,{" "}
                  <span className="text-ambiguous font-medium">Orange</span>{" "}
                  ambiguous.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 bg-muted/30 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Analysis Flow
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transform raw content into verified knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Input</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Provide any text source, such as a PDF or URL.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Processing</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Link breaks down the content into atomic information nodes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Verification</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Each node undergoes thorough verification analysis using the
                Truth Spectrum.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-semibold mb-2">Results</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Visual output with color-coded reliability indicators for easy
                interpretation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Link</h3>
              <p className="text-sm text-muted-foreground">
                Multi-agent research orchestrator for intelligent fact
                verification and knowledge discovery.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/knowledge" className="hover:text-foreground">
                    Knowledge Graph
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Research</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Multi-Agent Systems
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Fact Verification
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Knowledge Graphs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Research Papers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2024 Link. All rights reserved. Built for researchers, by
              researchers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
