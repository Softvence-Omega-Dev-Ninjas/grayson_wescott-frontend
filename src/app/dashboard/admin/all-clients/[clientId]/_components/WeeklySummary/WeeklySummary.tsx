"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";

export function WeeklySummary() {
  const [coachNotes, setCoachNotes] = useState("");

  const stats = [
    { label: "Total Sets", value: "147" },
    { label: "lbs Moved", value: "12,450" },
    { label: "New PR (Squat)", value: "225" },
    { label: "Missed Reps", value: "7" },
  ];

  return (
    <div className="bg-primary-200 p-5 border border-secondary">
      <h1 className="text-white text-xl sm:text-2xl font-semibold mb-7">
        Weekly Summary
      </h1>

      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-secondary p-4 rounded-md">
              <p className="text-2xl font-bold text-white text-center">
                {stat.value}
              </p>
              <p className="text-white text-sm text-center mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Coach Notes */}
        <div className="space-y-2">
          <label className="text-white text-base font-medium">
            Coach Notes
          </label>
          <Textarea
            value={coachNotes}
            onChange={(e) => setCoachNotes(e.target.value)}
            className="bg-secondary  text-white placeholder:text-gray-500 min-h-[100px] mt-2 rounded-none"
            placeholder="Add notes about this week's performance..."
          />
        </div>

        {/* Send Email Button */}
        <Button className="w-full bg-secondary rounded-none text-white hover:bg-gray-700 cursor-pointer">
          <Mail className="h-4 w-4 mr-2" />
          Send Weekly Review Email
        </Button>
      </div>
    </div>
  );
}
