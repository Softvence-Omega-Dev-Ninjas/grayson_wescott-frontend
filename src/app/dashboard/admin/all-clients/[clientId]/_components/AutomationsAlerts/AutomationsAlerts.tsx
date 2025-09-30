"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export function AutomationsAlerts() {
  const [alertSettings, setAlertSettings] = useState({
    dailyWorkoutReminders: true,
    missedWorkoutAlerts: false,
    newPrNotifications: true,
    autoProgressWithClientDashboard: false,
  });

  const recentAlerts = [
    {
      type: "success",
      message: "New PR Squat 225lbs",
      time: "2 hours ago",
      icon: CheckCircle,
    },
    {
      type: "warning",
      message: "Missed workout reminder sent 2 hrs ago",
      time: "2 hrs ago",
      icon: AlertTriangle,
    },
    {
      type: "info",
      message: "Data synced with client app",
      time: "1 hour ago",
      icon: Clock,
    },
  ];

  const handleCheckboxChange = (key: keyof typeof alertSettings) => {
    setAlertSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-primary-200  p-5 border border-secondary">
      <h1 className="text-white text-xl sm:text-2xl font-semibold mb-6">Automations & Alerts</h1>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alert Settings */}
          <div className="space-y-4">
            <h3 className="text-white font-medium">Alert Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="daily-workout"
                  checked={alertSettings.dailyWorkoutReminders}
                  onCheckedChange={() => handleCheckboxChange("dailyWorkoutReminders")}
                  className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
                <label htmlFor="daily-workout" className="text-gray-300 text-sm">
                  Daily workout reminders
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="missed-workout"
                  checked={alertSettings.missedWorkoutAlerts}
                  onCheckedChange={() => handleCheckboxChange("missedWorkoutAlerts")}
                  className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
                <label htmlFor="missed-workout" className="text-gray-300 text-sm">
                  Missed workout alerts (24h)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="new-pr"
                  checked={alertSettings.newPrNotifications}
                  onCheckedChange={() => handleCheckboxChange("newPrNotifications")}
                  className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
                <label htmlFor="new-pr" className="text-gray-300 text-sm">
                  New PR notifications
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto-progress"
                  checked={alertSettings.autoProgressWithClientDashboard}
                  onCheckedChange={() => handleCheckboxChange("autoProgressWithClientDashboard")}
                  className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
                <label htmlFor="auto-progress" className="text-gray-300 text-sm">
                  Auto-progress with client dashboard
                </label>
              </div>
            </div>
          </div>

          {/* Manual Actions */}
          <div className="space-y-4">
            <h3 className="text-white font-medium">Manual Actions</h3>
            <div className="space-y-2">
              <Button size="sm" className="w-full items-center justify-center rounded-none bg-secondary text-white hover:bg-gray-600 cursor-pointer">
                <Save className="h-4 w-4 mr-2" />
                Save As Template
              </Button>
              <Button size="sm" className="w-full items-center justify-center rounded-none bg-secondary text-white hover:bg-gray-600 cursor-pointer">
                <Save className="h-4 w-4 mr-2" />
                Save As Template
              </Button>
              <Button size="sm" className="w-full items-center justify-center rounded-none bg-secondary text-white hover:bg-gray-600 cursor-pointer">
                <Save className="h-4 w-4 mr-2" />
                Save As Template
              </Button>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="space-y-4">
            <h3 className="text-white font-medium">Recent Alerts</h3>
            <div className="space-y-3">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="bg-secondary p-3">
                  <div className="flex items-start gap-2">
                    <alert.icon
                      className={`h-4 w-4 mt-0.5 ${
                        alert.type === "success" ? "text-green-500" : alert.type === "warning" ? "text-yellow-500" : "text-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-white text-sm">{alert.message}</p>
                      <p className="text-gray-400 text-xs">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
