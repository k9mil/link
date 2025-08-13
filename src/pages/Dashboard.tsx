import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, FileText, Users, Calendar, Network } from "lucide-react";
import { FactsChart } from "@/components/ui/chart-demo";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen hero-gradient">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Link Dashboard</h1>
          <p className="text-muted-foreground">Monitor your fact verification analytics and system performance</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">+3 this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Facts Verified</CardTitle>
              <CheckCircle className="h-4 w-4 text-verified" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-verified">156</div>
              <p className="text-xs text-muted-foreground">87% accuracy rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Research Hours</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47.2</div>
              <p className="text-xs text-muted-foreground">AI agents working for you</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">New analyses completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Fact Verification Trends
              </CardTitle>
              <CardDescription>
                Monthly breakdown of your fact verification results
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6">
                <FactsChart />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Recent Activity</CardTitle>
              <CardDescription>Latest analyses and research activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-verified"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Apollo 11 moon landing research</p>
                  <p className="text-xs text-muted-foreground">2 hours ago • 6 facts verified, 2 ambiguous</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-ambiguous"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Climate change data analysis</p>
                  <p className="text-xs text-muted-foreground">5 hours ago • 12 facts analysed, 3 flagged</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-verified"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Historical events verification</p>
                  <p className="text-xs text-muted-foreground">1 day ago • 8 facts verified</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-unverified"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Social media claims review</p>
                  <p className="text-xs text-muted-foreground">1 day ago • 4 facts flagged as unverified</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-verified"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Scientific paper validation</p>
                  <p className="text-xs text-muted-foreground">2 days ago • 15 facts cross-referenced</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-ambiguous"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">News article fact-checking</p>
                  <p className="text-xs text-muted-foreground">3 days ago • 9 facts analysed</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-verified"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Research paper bibliography check</p>
                  <p className="text-xs text-muted-foreground">4 days ago • 23 sources verified</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-unverified"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Conspiracy theory debunking</p>
                  <p className="text-xs text-muted-foreground">5 days ago • 7 claims investigated</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Start analyzing content and explore your research network</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/knowledge">
                <Network className="mr-2 h-4 w-4" />
                Create Knowledge Graph
              </Link>
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;