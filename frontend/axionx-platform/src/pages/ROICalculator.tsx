import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/BackButton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import heroBackground from "@/assets/hero-background.png";

export default function ROICalculator() {
  const [revenue, setRevenue] = useState(1000);
  const [systems, setSystems] = useState(10);
  const [records, setRecords] = useState(1000);
  const [teamSize, setTeamSize] = useState(25);

  // Calculate ROI metrics
  const annualSavings = Math.round((revenue * 0.02) + (systems * 15) + (records * 0.05) + (teamSize * 8));
  const timeToROI = Math.max(3, Math.round(200 / (annualSavings / 12)));
  const productivityGain = Math.round(15 + (systems * 0.5) + (teamSize * 0.3));
  const errorReduction = Math.min(95, Math.round(75 + (systems * 1.5)));

  const comparisonData = [
    { name: "Current State", value: 500, fill: "hsl(var(--muted))" },
    { name: "With DataController", value: 200, fill: "hsl(var(--primary))" },
    { name: "Net Savings", value: annualSavings, fill: "hsl(var(--secondary))" }
  ];

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
      <div className="container mx-auto space-y-6 sm:space-y-8">
        <BackButton href="/dashboard" label="Back to Dashboard" />
        
        <div className="space-y-2 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text px-2">ROI Calculator</h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-2">Calculate your potential return on investment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Interactive Sliders */}
          <Card className="glass-card p-8 space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Company Configuration</h3>
              <p className="text-sm text-muted-foreground mb-6">Adjust the sliders to match your organization</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Company Revenue</label>
                  <Badge className="bg-primary/20 text-primary">£{revenue}M</Badge>
                </div>
                <Slider
                  value={[revenue]}
                  onValueChange={(value) => setRevenue(value[0])}
                  min={100}
                  max={5000}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>£100M</span>
                  <span>£5B</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Number of Systems</label>
                  <Badge className="bg-primary/20 text-primary">{systems}</Badge>
                </div>
                <Slider
                  value={[systems]}
                  onValueChange={(value) => setSystems(value[0])}
                  min={1}
                  max={20}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Data Records/Month (K)</label>
                  <Badge className="bg-primary/20 text-primary">{records}K</Badge>
                </div>
                <Slider
                  value={[records]}
                  onValueChange={(value) => setRecords(value[0])}
                  min={10}
                  max={10000}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>10K</span>
                  <span>10M</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Team Size</label>
                  <Badge className="bg-primary/20 text-primary">{teamSize}</Badge>
                </div>
                <Slider
                  value={[teamSize]}
                  onValueChange={(value) => setTeamSize(value[0])}
                  min={5}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5</span>
                  <span>50</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Real-Time Calculations */}
          <div className="space-y-6">
            <Card className="glass-card p-8">
              <h3 className="text-lg font-semibold mb-6">Estimated Returns</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="animate-count-up">
                  <div className="text-3xl font-bold gradient-text">£{annualSavings}K</div>
                  <div className="text-sm text-muted-foreground mt-1">Annual Savings</div>
                </div>
                <div className="animate-count-up" style={{ animationDelay: "100ms" }}>
                  <div className="text-3xl font-bold gradient-text">{timeToROI} months</div>
                  <div className="text-sm text-muted-foreground mt-1">Time to ROI</div>
                </div>
                <div className="animate-count-up" style={{ animationDelay: "200ms" }}>
                  <div className="text-3xl font-bold gradient-text">{productivityGain}%</div>
                  <div className="text-sm text-muted-foreground mt-1">Productivity Gain</div>
                </div>
                <div className="animate-count-up" style={{ animationDelay: "300ms" }}>
                  <div className="text-3xl font-bold gradient-text">{errorReduction}%</div>
                  <div className="text-sm text-muted-foreground mt-1">Error Reduction</div>
                </div>
              </div>
            </Card>

            {/* Value Visualization */}
            <Card className="glass-card p-8">
              <h3 className="text-lg font-semibold mb-6">Cost Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`£${value}K`, 'Annual Cost']}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
