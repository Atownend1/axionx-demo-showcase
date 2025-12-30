import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", score: 94 },
  { month: "Feb", score: 95.2 },
  { month: "Mar", score: 96.5 },
  { month: "Apr", score: 97.8 },
  { month: "May", score: 98.5 },
  { month: "Jun", score: 99.2 }
];

export const TrendChart = () => {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Data Quality Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            domain={[92, 100]}
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--gradient-purple))" />
              <stop offset="100%" stopColor="hsl(var(--gradient-cyan))" />
            </linearGradient>
          </defs>
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--primary))', r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
