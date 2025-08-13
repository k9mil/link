import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, FileText, Users, Calendar } from "lucide-react";
import { FactsChart } from "@/components/ui/chart-demo";

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
              <CardTitle className="text-sm font-medium">Total Facts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified</CardTitle>
              <CheckCircle className="h-4 w-4 text-verified" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-verified">892</div>
              <p className="text-xs text-muted-foreground">71.5% verification rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">+5.4% from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">486</div>
              <p className="text-xs text-muted-foreground">Facts processed</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Fact Verification Trends
              </CardTitle>
              <CardDescription>
                Monthly breakdown of fact verification results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FactsChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest fact verification analyses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-verified"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Climate change analysis</p>
                  <p className="text-xs text-muted-foreground">2 hours ago • 45 facts verified</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-ambiguous"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Historical events review</p>
                  <p className="text-xs text-muted-foreground">5 hours ago • 23 facts analyzed</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-verified"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Scientific paper validation</p>
                  <p className="text-xs text-muted-foreground">1 day ago • 67 facts processed</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-unverified"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Social media claims</p>
                  <p className="text-xs text-muted-foreground">2 days ago • 12 facts flagged</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;