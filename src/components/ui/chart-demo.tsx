import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { month: "Jan", verified: 45, ambiguous: 12, unverified: 8 },
  { month: "Feb", verified: 52, ambiguous: 15, unverified: 6 },
  { month: "Mar", verified: 67, ambiguous: 18, unverified: 9 },
  { month: "Apr", verified: 73, ambiguous: 14, unverified: 7 },
  { month: "May", verified: 84, ambiguous: 20, unverified: 11 },
  { month: "Jun", verified: 92, ambiguous: 16, unverified: 5 },
];

const chartConfig = {
  verified: {
    label: "Verified",
    color: "hsl(var(--verified))",
  },
  ambiguous: {
    label: "Ambiguous", 
    color: "hsl(var(--ambiguous))",
  },
  unverified: {
    label: "Unverified",
    color: "hsl(var(--unverified))",
  },
};

export function FactsChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="verified"
            stackId="1"
            stroke={chartConfig.verified.color}
            fill={chartConfig.verified.color}
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="ambiguous"
            stackId="1"
            stroke={chartConfig.ambiguous.color}
            fill={chartConfig.ambiguous.color}
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="unverified"
            stackId="1"
            stroke={chartConfig.unverified.color}
            fill={chartConfig.unverified.color}
            fillOpacity={0.8}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}