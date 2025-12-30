import { Card } from "@/components/ui/card";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, TrendingUp, Shield, ArrowRight } from "lucide-react";
import heroBackground from "@/assets/hero-background.png";

const opportunities = [
  {
    title: "Automate Data Enrichment",
    roi: "240%",
    savings: "£180K",
    timeline: "8 weeks",
    description: "Implement ML-powered data enrichment to automatically fill missing fields and standardize formats across all entities."
  },
  {
    title: "Predictive Anomaly Detection",
    prevented: "89%",
    timeSaved: "120 hours/month",
    accuracyGain: "+5.2%",
    description: "Deploy advanced anomaly detection models to catch data quality issues before they impact financial reporting."
  },
  {
    title: "System Consolidation",
    systemsToMerge: "3",
    costReduction: "£50K/year",
    risk: "Low",
    description: "Consolidate redundant data sources into a unified pipeline, reducing maintenance costs and improving data consistency."
  }
];

const learningMetrics = [
  { label: "Training Data Points", value: "2.3M" },
  { label: "Model Accuracy", value: "94%" },
  { label: "Patterns Identified", value: "1,847" },
  { label: "Monthly Improvement", value: "+2.1%" }
];

export default function AIInsights() {
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text px-2">AI Insights & Recommendations</h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-2">Data-driven opportunities to optimize your operations</p>
        </div>

        {/* Opportunity Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {opportunities.map((opp, index) => (
            <Card 
              key={opp.title}
              className="glass-card p-6 space-y-4 hover:scale-105 transition-transform animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{opp.title}</h3>
                <Sparkles className="text-primary" size={24} />
              </div>

              <p className="text-sm text-muted-foreground">{opp.description}</p>

              <div className="space-y-3">
                {opp.roi && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Potential ROI</span>
                    <Badge className="bg-green-500/20 text-green-400">{opp.roi}</Badge>
                  </div>
                )}
                {opp.savings && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Annual Savings</span>
                    <span className="font-semibold gradient-text">{opp.savings}</span>
                  </div>
                )}
                {opp.timeline && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Implementation</span>
                    <span className="font-semibold">{opp.timeline}</span>
                  </div>
                )}
                {opp.prevented && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Issues Prevented</span>
                    <Badge className="bg-primary/20 text-primary">{opp.prevented}</Badge>
                  </div>
                )}
                {opp.timeSaved && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Time Saved</span>
                    <span className="font-semibold">{opp.timeSaved}</span>
                  </div>
                )}
                {opp.accuracyGain && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Accuracy Gain</span>
                    <span className="font-semibold text-green-400">{opp.accuracyGain}</span>
                  </div>
                )}
                {opp.systemsToMerge && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Systems to Merge</span>
                    <span className="font-semibold">{opp.systemsToMerge}</span>
                  </div>
                )}
                {opp.costReduction && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Cost Reduction</span>
                    <span className="font-semibold gradient-text">{opp.costReduction}</span>
                  </div>
                )}
                {opp.risk && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Risk Level</span>
                    <Badge className="bg-green-500/20 text-green-400">
                      <Shield size={12} className="mr-1" />
                      {opp.risk}
                    </Badge>
                  </div>
                )}
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                {index === 0 ? "Start Implementation" : index === 1 ? "View Details" : "Generate Plan"}
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Card>
          ))}
        </div>

        {/* AI Learning Progress */}
        <Card className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="text-primary" size={32} />
            <h2 className="text-2xl font-semibold">AI Learning Progress</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {learningMetrics.map((metric, index) => (
              <div 
                key={metric.label}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl font-bold gradient-text mb-2">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Model Training Progress</span>
              <span className="font-semibold">94%</span>
            </div>
            <Progress value={94} className="h-3" />
            <p className="text-sm text-muted-foreground">
              The AI models are continuously learning from your data patterns. Expected to reach 96% accuracy by next month.
            </p>
          </div>
        </Card>
      </div>
    </div>
    </>
  );
}
