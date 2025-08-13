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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Link
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Multi-agent research orchestrator powered by AI. Each fact node gets its own LLM instance 
            to thoroughly research, verify, and cross-reference information from multiple sources.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/knowledge">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Try Knowledge Graph
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg">View Dashboard</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Multi-Agent Research Architecture</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each information node is powered by its own specialized AI agent, creating a distributed 
              research network that ensures comprehensive fact verification.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-gradient">
              <CardHeader>
                <Upload className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Intelligent Data Ingestion</CardTitle>
                <CardDescription>
                  Upload documents, articles, or research papers. Our system automatically extracts 
                  and structures factual claims for multi-agent analysis.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-gradient">
              <CardHeader>
                <Eye className="h-12 w-12 text-primary mb-4" />
                <CardTitle>3D Knowledge Networks</CardTitle>
                <CardDescription>
                  Visualize complex information relationships through interactive 3D graphs. 
                  Each node represents a fact verified by specialized research agents.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-gradient">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Distributed Verification</CardTitle>
                <CardDescription>
                  Multiple AI agents independently research each claim, cross-referencing sources 
                  and providing confidence scores for every piece of information.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Multi-Agent Research Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our distributed AI system assigns dedicated research agents to each factual claim, 
              ensuring thorough verification and source validation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Content Analysis</h3>
              <p className="text-sm text-muted-foreground">AI extracts individual claims and facts from your content</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Agent Assignment</h3>
              <p className="text-sm text-muted-foreground">Each fact gets assigned to a specialized research agent</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Independent Research</h3>
              <p className="text-sm text-muted-foreground">Agents research and verify claims across multiple sources</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-semibold mb-2">Knowledge Graph</h3>
              <p className="text-sm text-muted-foreground">Results are visualized in an interactive 3D network</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Link</h3>
              <p className="text-sm text-muted-foreground">
                Multi-agent research orchestrator for intelligent fact verification and knowledge discovery.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/knowledge" className="hover:text-foreground">Knowledge Graph</Link></li>
                <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
                <li><a href="#" className="hover:text-foreground">API</a></li>
                <li><a href="#" className="hover:text-foreground">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Research</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Multi-Agent Systems</a></li>
                <li><a href="#" className="hover:text-foreground">Fact Verification</a></li>
                <li><a href="#" className="hover:text-foreground">Knowledge Graphs</a></li>
                <li><a href="#" className="hover:text-foreground">Research Papers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Link. All rights reserved. Built for researchers, by researchers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;