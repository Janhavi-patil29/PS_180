import { Archive, AlertTriangle, AlertCircle, CheckCircle, Clock, FileWarning } from "lucide-react";
import { Link } from "react-router-dom";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from "recharts";
import dashboardBg from "@/assets/dashboard-bg.jpg";

const pieData = [
  { name: 'High Risk', value: 12, color: 'hsl(var(--destructive))' },
  { name: 'Medium Risk', value: 33, color: 'hsl(var(--warning))' },
  { name: 'Low Risk', value: 255, color: 'hsl(var(--success))' },
];

const comboData = [
  { month: 'Jan', submissions: 45, avgRisk: 35 },
  { month: 'Feb', submissions: 52, avgRisk: 28 },
  { month: 'Mar', submissions: 61, avgRisk: 42 },
  { month: 'Apr', submissions: 48, avgRisk: 31 },
  { month: 'May', submissions: 55, avgRisk: 38 },
  { month: 'Jun', submissions: 58, avgRisk: 33 },
];

const priorityProjects = [
  { id: 1, name: 'National Highway Extension Project', date: '2025-10-28', risk: 'Budget Mismatch Detected' },
  { id: 2, name: 'Metro Rail Phase 3', date: '2025-10-27', risk: 'Missing EPC Clause' },
  { id: 3, name: 'Water Treatment Plant Upgrade', date: '2025-10-26', risk: 'Timeline Inconsistency' },
  { id: 4, name: 'Smart City Infrastructure', date: '2025-10-25', risk: 'Environmental Clearance Gap' },
];

const activityFeed = [
  { id: 1, text: '[Bridge Construction Project] analysis complete. Status: Medium Risk', time: '2 hours ago' },
  { id: 2, text: '[Airport Terminal Expansion] was uploaded and is processing', time: '4 hours ago' },
  { id: 3, text: '[Solar Power Plant] analysis complete. Status: Low Risk', time: '6 hours ago' },
  { id: 4, text: '[Port Modernization] flagged as High Risk - Immediate review needed', time: '8 hours ago' },
  { id: 5, text: '[Railway Electrification] was uploaded and is processing', time: '1 day ago' },
];

const Dashboard = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${dashboardBg})` }}
    >
      <div className="min-h-screen bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-sm">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">DASHBOARD</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="TOTAL PROJECTS"
              value={300}
              icon={<Archive className="w-6 h-6" />}
              trend="+5% than last month"
              variant="primary"
            />
            <MetricCard
              title="HIGH RISK"
              value={12}
              icon={<AlertCircle className="w-6 h-6" />}
              trend="-2% than last month"
              variant="danger"
            />
            <MetricCard
              title="AWAITING REVIEW"
              value={18}
              icon={<AlertTriangle className="w-6 h-6" />}
              trend="Your primary to-do list"
              variant="warning"
            />
            <MetricCard
              title="COMPLIANCE GAPS (THIS WEEK)"
              value={7}
              icon={<CheckCircle className="w-6 h-6" />}
              trend="Identified by AI system"
              variant="success"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card/60 backdrop-blur-md border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Project Risk Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-md border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Submissions vs. Risk Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={comboData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="submissions" fill="hsl(var(--primary))" name="New DPRs Submitted" />
                    <Line yAxisId="right" type="monotone" dataKey="avgRisk" stroke="hsl(var(--destructive))" strokeWidth={2} name="Avg Risk Score" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/60 backdrop-blur-md border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  Priority Queue (Needs Immediate Attention)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {priorityProjects.map((project) => (
                    <Link
                      key={project.id}
                      to="/projects"
                      className="block p-4 rounded-lg bg-destructive/10 border border-destructive/20 hover:bg-destructive/20 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">{project.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">Submitted: {project.date}</p>
                          <Badge variant="destructive" className="text-xs">
                            <FileWarning className="w-3 h-3 mr-1" />
                            {project.risk}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-md border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Activity Feed (Recent Submissions)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activityFeed.map((activity) => (
                    <div
                      key={activity.id}
                      className="p-3 rounded-lg bg-muted/50 border border-border/50"
                    >
                      <p className="text-sm text-foreground mb-1">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
