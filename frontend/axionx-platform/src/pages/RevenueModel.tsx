import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/BackButton";
import { CheckCircle2, Lock, Repeat, TrendingUp } from "lucide-react";
import heroBackground from "@/assets/hero-background.png";

const stages = [
  {
    id: 1,
    title: "Assessment",
    price: "£30K",
    duration: "4-6 weeks",
    conversion: "70%",
    description: "Comprehensive data quality audit and roadmap development",
    details: [
      "Complete data landscape mapping",
      "Quality baseline assessment",
      "Custom improvement roadmap",
      "Executive presentation"
    ]
  },
  {
    id: 2,
    title: "Implementation",
    price: "£120K",
    duration: "8-12 weeks",
    lockIn: "Creates lock-in",
    description: "Full platform deployment and team training",
    details: [
      "Platform configuration",
      "ML model training",
      "System integrations",
      "Team onboarding"
    ]
  },
  {
    id: 3,
    title: "Platform License",
    price: "£8K/mo",
    churn: "<5%",
    margin: "88%",
    description: "Recurring SaaS license with continuous updates",
    details: [
      "Unlimited users",
      "Real-time monitoring",
      "Monthly ML improvements",
      "Standard support"
    ]
  },
  {
    id: 4,
    title: "AI Advisory",
    price: "£5K/mo",
    expansion: "40%",
    description: "Ongoing optimization and strategic consulting",
    details: [
      "Quarterly business reviews",
      "Advanced analytics",
      "Custom ML models",
      "Priority support"
    ]
  }
];

const timeline = [
  { month: 0, event: "Initial Contact", revenue: 0 },
  { month: 2, event: "Assessment Complete", revenue: 30 },
  { month: 5, event: "Platform Live", revenue: 150 },
  { month: 6, event: "Recurring Revenue Starts", revenue: 158 },
  { month: 12, event: "First Year Complete", revenue: 206 },
  { month: 24, event: "Expansion & Upsell", revenue: 572 }
];

const stickinessFactors = [
  { title: "Historical Data", value: "18+ months", icon: TrendingUp },
  { title: "Switching Costs", value: "£200K", icon: Lock },
  { title: "Custom ML Models", value: "Per customer", icon: Repeat },
  { title: "Workflow Integration", value: "10+ systems", icon: CheckCircle2 },
  { title: "Retention Rate", value: "95%", icon: CheckCircle2 }
];

export default function RevenueModel() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text px-2">Revenue Model</h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-2">Predictable, scalable, high-margin business model</p>
        </div>

        {/* Interactive Flywheel */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 px-2">Revenue Flywheel</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stages.map((stage, index) => (
              <Card
                key={stage.id}
                className={`glass-card p-6 cursor-pointer transition-all duration-300 hover:scale-105 animate-slide-up ${
                  selectedStage === stage.id ? 'border-2 border-primary' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-2 bg-primary/20 text-primary">Stage {stage.id}</Badge>
                      <h3 className="text-xl font-bold">{stage.title}</h3>
                    </div>
                    <div className="text-2xl font-bold gradient-text">{stage.price}</div>
                  </div>

                  <p className="text-sm text-muted-foreground">{stage.description}</p>

                  <div className="space-y-2 text-sm">
                    {stage.duration && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">{stage.duration}</span>
                      </div>
                    )}
                    {stage.conversion && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Conversion</span>
                        <span className="font-medium text-green-400">{stage.conversion}</span>
                      </div>
                    )}
                    {stage.lockIn && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Impact</span>
                        <Badge className="bg-purple-500/20 text-purple-400">{stage.lockIn}</Badge>
                      </div>
                    )}
                    {stage.churn && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Churn</span>
                        <span className="font-medium text-green-400">{stage.churn}</span>
                      </div>
                    )}
                    {stage.margin && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Margin</span>
                        <span className="font-medium text-green-400">{stage.margin}</span>
                      </div>
                    )}
                    {stage.expansion && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expansion</span>
                        <span className="font-medium text-green-400">{stage.expansion}</span>
                      </div>
                    )}
                  </div>

                  {selectedStage === stage.id && (
                    <div className="pt-4 border-t border-border space-y-2 animate-slide-up">
                      {stage.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="text-primary mt-0.5" size={16} />
                          <span className="text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Customer Journey Timeline */}
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-6">Customer Journey Timeline</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
              {timeline.map((point, index) => (
                <div 
                  key={index}
                  className="text-center animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative z-10 mb-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold">{point.month}mo</span>
                    </div>
                  </div>
                  <div className="text-sm font-medium mb-1">{point.event}</div>
                  <div className="text-2xl font-bold gradient-text">£{point.revenue}K</div>
                  <div className="text-xs text-muted-foreground mt-1">Cumulative Revenue</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">£572K</div>
              <div className="text-lg text-muted-foreground">Customer Lifetime Value</div>
            </div>
          </div>
        </Card>

        {/* Stickiness Factors */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Why Customers Stay</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {stickinessFactors.map((factor, index) => (
              <Card
                key={factor.title}
                className="glass-card p-6 text-center hover:scale-105 transition-transform animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <factor.icon className="text-primary mx-auto mb-3" size={32} />
                <div className="text-2xl font-bold gradient-text mb-1">{factor.value}</div>
                <div className="text-sm text-muted-foreground">{factor.title}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
