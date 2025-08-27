"use client";

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface LoadProgressionData {
  week: string;
  load: number;
}

interface LoadProgressionChartProps {
  data: LoadProgressionData[];
}

export function LoadProgressionChart({ data }: LoadProgressionChartProps) {
  return (
    <Card className="bg-gray-900 border-gray-800 w-full">
      <CardHeader>
        <CardTitle className="text-white text-sm">Load Progression</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full h-[200px] overflow-hidden">
          <ChartContainer
            config={{
              load: {
                label: "Load",
                color: "#3B82F6",
              },
            }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="load" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
