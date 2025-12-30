import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { ArrowRight, TrendingUp, TrendingDown, Minus, Database, Cloud, FileSpreadsheet } from "lucide-react";
import heroBackground from "@/assets/hero-background.png";

const qualityMatrix = [
  { dimension: "Completeness", score: 98, trend: "up", issues: 2, status: "auto-fixing" },
  { dimension: "Accuracy", score: 99.2, trend: "up", issues: 0, status: "monitored" },
  { dimension: "Timeliness", score: 96, trend: "neutral", issues: 5, status: "review-needed" },
  { dimension: "Consistency", score: 94, trend: "up", issues: 8, status: "ai-analyzing" }
];

const sourceSystems = [
  { name: "SAP", icon: Database, status: "connected" },
  { name: "Hyperion", icon: Cloud, status: "connected" },
  { name: "Excel", icon: FileSpreadsheet, status: "connected" },
  { name: "Salesforce", icon: Database, status: "connected" }
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up": return <TrendingUp className="text-green-400" size={16} />;
    case "down": return <TrendingDown className="text-red-400" size={16} />;
    default: return <Minus className="text-yellow-400" size={16} />;
  }
};

const getStatusBadge = (status: string) => {
  const variants: Record<string, { label: string; className: string }> = {
    "auto-fixing": { label: "Auto-fixing", className: "bg-blue-500/20 text-blue-400" },
    "monitored": { label: "Monitored", className: "bg-green-500/20 text-green-400" },
    "review-needed": { label: "Review Needed", className: "bg-yellow-500/20 text-yellow-400" },
    "ai-analyzing": { label: "AI Analyzing", className: "bg-purple-500/20 text-purple-400" }
  };
  const variant = variants[status];
  return <Badge className={variant.className}>{variant.label}</Badge>;
};

export default function DataQuality() {
  return (
    <>
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <div className="min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6">
      <BackButton href="/dashboard" label="Back to Dashboard" />
      <div className="container mx-auto space-y-6 sm:space-y-8">
        
        <div className="space-y-2 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text px-2">Data Quality Deep Dive</h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-2">Complete visibility into your data health</p>
        </div>

        {/* Data Lineage */}
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-6">Data Lineage Flow</h2>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Source Systems */}
            <div className="space-y-3">
              {sourceSystems.map((system, index) => (
                <Card 
                  key={system.name}
                  className="glass-card p-4 hover:scale-105 transition-transform cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <system.icon className="text-primary" size={24} />
                    <div>
                      <div className="font-medium">{system.name}</div>
                      <div className="text-xs text-green-400">● Connected</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Flow Arrow */}
            <div className="flex items-center gap-2">
              <ArrowRight className="text-primary" size={32} />
            </div>

            {/* DataController */}
            <Card className="glass-card p-6 border-2 border-primary/50 hover:scale-105 transition-transform cursor-pointer">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text mb-2">DataController</div>
                <div className="text-sm text-muted-foreground">AI Processing Layer</div>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-glow"></div>
                  <span className="text-xs text-green-400">Processing</span>
                </div>
              </div>
            </Card>

            {/* Flow Arrow */}
            <div className="flex items-center gap-2">
              <ArrowRight className="text-primary" size={32} />
            </div>

            {/* Output */}
            <Card className="glass-card p-6 hover:scale-105 transition-transform cursor-pointer">
              <div className="text-center">
                <div className="text-xl font-bold">Reporting Systems</div>
                <div className="text-sm text-muted-foreground mt-1">Power BI, Tableau</div>
              </div>
            </Card>
          </div>
        </Card>

        {/* Quality Assessment Matrix */}
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-6">Quality Assessment Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Dimension</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Score</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Trend</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Issues</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {qualityMatrix.map((row, index) => (
                  <tr 
                    key={row.dimension}
                    className="border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="py-4 px-4 font-medium">{row.dimension}</td>
                    <td className="py-4 px-4">
                      <span className="text-xl font-bold gradient-text">{row.score}%</span>
                    </td>
                    <td className="py-4 px-4">{getTrendIcon(row.trend)}</td>
                    <td className="py-4 px-4">
                      <Badge variant={row.issues === 0 ? "secondary" : "outline"}>
                        {row.issues} issues
                      </Badge>
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(row.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end">
            <Button className="bg-gradient-to-r from-primary to-secondary">
              View Detailed Report
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
    </>
  );
}
