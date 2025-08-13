import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { month: "Jan", verified: 8, ambiguous: 3, unverified: 1 },
  { month: "Feb", verified: 12, ambiguous: 4, unverified: 2 },
  { month: "Mar", verified: 15, ambiguous: 5, unverified: 3 },
  { month: "Apr", verified: 18, ambiguous: 3, unverified: 1 },
  { month: "May", verified: 22, ambiguous: 6, unverified: 2 },
  { month: "Jun", verified: 25, ambiguous: 4, unverified: 1 },
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