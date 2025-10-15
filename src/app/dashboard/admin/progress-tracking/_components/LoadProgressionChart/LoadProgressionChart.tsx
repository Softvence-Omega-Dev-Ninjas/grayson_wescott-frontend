'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

interface LoadProgressionData {
  week: string;
  load: number;
}

interface LoadProgressionChartProps {
  data: LoadProgressionData[];
}

export function LoadProgressionChart({ data }: LoadProgressionChartProps) {
  return (
    <Card className="bg-primary-200 w-full rounded-none border border-secondary">
      <CardHeader>
        <CardTitle className="text-white text-sm">Load Progression</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full h-[200px] overflow-hidden">
          <ChartContainer
            config={{
              load: {
                label: 'Load',
                color: '#3B82F6',
              },
            }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="label" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="planned"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
