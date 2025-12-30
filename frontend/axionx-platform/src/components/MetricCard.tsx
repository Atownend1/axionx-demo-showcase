import { ReactNode, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon?: ReactNode;
  delay?: number;
}

export const MetricCard = ({ title, value, trend, icon, delay = 0 }: MetricCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Card 
      className={`glass-card p-6 transition-all duration-500 hover:scale-105 ${
        isVisible ? 'animate-slide-up opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="text-sm text-muted-foreground">{title}</div>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold gradient-text">{value}</div>
        {trend && (
          <div className={`text-sm ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {trend}
          </div>
        )}
      </div>
    </Card>
  );
};
