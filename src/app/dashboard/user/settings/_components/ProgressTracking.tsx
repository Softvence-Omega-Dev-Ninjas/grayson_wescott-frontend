import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { TrendingUp } from 'lucide-react';

export function ProgressTracking() {
  return (
    <Card className="bg-[#151519] border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Progress Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-gray-400 text-sm">Weight Unit</label>
          <div className="flex items-center gap-4 mt-2">
            <label className="flex items-center gap-2 text-white text-sm">
              <input
                type="radio"
                name="weight"
                defaultChecked
                className="text-blue-600"
              />
              Kilograms (kg)
            </label>
            <label className="flex items-center gap-2 text-white text-sm">
              <input type="radio" name="weight" className="text-blue-600" />
              Pounds (lbs)
            </label>
          </div>
        </div>

        <div>
          <label className="text-gray-400 text-sm">Metrics View</label>
          <div className="flex items-center gap-4 mt-2">
            <label className="flex items-center gap-2 text-white text-sm">
              <input
                type="radio"
                name="metrics"
                defaultChecked
                className="text-blue-600"
              />
              Graph View
            </label>
            <label className="flex items-center gap-2 text-white text-sm">
              <input type="radio" name="metrics" className="text-blue-600" />
              Table View
            </label>
          </div>
        </div>

        <div>
          <label className="text-gray-400 text-sm">
            Comprehensive Notifications
          </label>
          <div className="flex items-center justify-between mt-2">
            <span className="text-white text-sm">
              Set alerts for missed training
            </span>
            <Switch defaultChecked className="cursor-pointer" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
