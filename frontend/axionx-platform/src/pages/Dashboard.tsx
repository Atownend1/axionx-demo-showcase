import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MetricCard } from "@/components/MetricCard";
import { ProgressRing } from "@/components/ProgressRing";
import { ActivityFeed } from "@/components/ActivityFeed";
import { TrendChart } from "@/components/TrendChart";
import { BackButton } from "@/components/BackButton";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, DollarSign, AlertTriangle, Zap } from "lucide-react";
import heroBackground from "@/assets/hero-background.png";

const qualityMetrics = [
  { title: "Entity Quality", value: 92, color: "from-purple-500 to-pink-500" },
  { title: "Account Quality", value: 89, color: "from-blue-500 to-cyan-500" },
  { title: "Flow Quality", value: 84, color: "from-green-500 to-emerald-500" },
  { title: "Compliance Score", value: 96, color: "from-orange-500 to-red-500" },
  { title: "Automation Rate", value: 78, color: "from-violet-500 to-purple-500" },
  { title: "Processing Speed", value: 240, label: "2.4x faster", color: "from-cyan-500 to-blue-500" }
];

export default function Dashboard() {
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

      {/* Rest of your content */}
      <div className="min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6">
        <BackButton href="https://www.axionx.uk" label="Back to AxionX" />
        <div className="container mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text px-2">DataController Platform</h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-2">AI-Powered Data Quality & Governance</p>
            </div>
          </ScrollReveal>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <ScrollReveal delay={0.1}>
              <Card className="glass-card p-6 flex items-center justify-center h-full">
                <ProgressRing progress={87} />
              </Card>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <MetricCard
                title="Data Accuracy"
                value="99.2%"
                trend="+8%"
                icon={<TrendingUp size={20} />}
                delay={0} // Handled by ScrollReveal
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <MetricCard
                title="Monthly Savings"
                value="£20K"
                icon={<DollarSign size={20} />}
                delay={0}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <MetricCard
                title="Issues Prevented"
                value="89%"
                icon={<AlertTriangle size={20} />}
                delay={0}
              />
            </ScrollReveal>
          </div>

          {/* Quality Metrics Grid */}
          <div>
            <ScrollReveal delay={0.5}>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 px-2">Real-Time Data Quality</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {qualityMetrics.map((metric, index) => (
                <ScrollReveal key={metric.title} delay={0.1 * index}>
                  <Card
                    className="glass-card p-6 hover:scale-105 transition-transform"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
                      <Zap className="text-primary" size={18} />
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl sm:text-3xl font-bold gradient-text">
                        {metric.label || `${metric.value}%`}
                      </div>
                      {!metric.label && (
                        <Progress
                          value={metric.value}
                          className="h-2"
                        />
                      )}
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Activity Feed and Trend Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <ActivityFeed />
            <TrendChart />
          </div>
        </div>
      </div>
    </>
  );
}
