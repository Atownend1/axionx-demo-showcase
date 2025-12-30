import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Sparkles, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
  {
    icon: AlertCircle,
    text: "Anomaly detected in German subsidiary data",
    time: "2 min ago",
    color: "text-yellow-400"
  },
  {
    icon: CheckCircle2,
    text: "Auto-reconciliation completed: 12,847 records",
    time: "5 min ago",
    color: "text-green-400"
  },
  {
    icon: Sparkles,
    text: "AI recommendation accepted: FX adjustment",
    time: "8 min ago",
    color: "text-primary"
  },
  {
    icon: FileText,
    text: "Compliance report generated for Q3",
    time: "15 min ago",
    color: "text-secondary"
  },
  {
    icon: CheckCircle2,
    text: "Data validation passed: Entity master data",
    time: "22 min ago",
    color: "text-green-400"
  },
  {
    icon: Sparkles,
    text: "ML model updated with 2,450 new patterns",
    time: "28 min ago",
    color: "text-primary"
  }
];

export const ActivityFeed = () => {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Live Activity Feed</h3>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`${activity.color} mt-1`}>
                <activity.icon size={18} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-foreground">{activity.text}</div>
                <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
