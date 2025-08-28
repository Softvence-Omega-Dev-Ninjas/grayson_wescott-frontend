"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface ConsistencyData {
  week: string;
  workouts: number;
}

interface ConsistencyChartProps {
  data: ConsistencyData[];
}

export function ConsistencyChart({ data }: ConsistencyChartProps) {
  return (
    <Card className="bg-primary-200 w-full rounded-none border border-secondary">
      <CardHeader>
        <CardTitle className="text-white text-sm">Consistency</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full h-[200px] overflow-hidden">
          <ChartContainer
            config={{
              workouts: {
                label: "Workouts",
                color: "#8B5CF6",
              },
            }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="workouts" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
