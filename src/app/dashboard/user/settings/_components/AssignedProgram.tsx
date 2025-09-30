import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export function AssignedProgram() {
  return (
    <Card className="bg-[#151519] border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Assigned Program
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col justify-between">
        <div>
          <h3 className="text-white font-medium">Elite Strength Builder</h3>
          <p className="text-gray-400 text-sm">
            A most progressive strength training program
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Start Date</span>
            <p className="text-white">Jan 15, 2024</p>
          </div>
          <div>
            <span className="text-gray-400">End Date</span>
            <p className="text-white">Apr 15, 2024</p>
          </div>
        </div>

        <div>
          <span className="text-gray-400 text-sm">Coach Notes</span>
          <p className="text-white text-sm">
            Focus on compound movements. Progressive overload each week.
          </p>
        </div>

        <Button className="w-full bg-[#2A2D33] hover:bg-gray-600 text-white cursor-pointer">
          View Full Program
        </Button>
      </CardContent>
    </Card>
  );
}
