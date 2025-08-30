import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Play, RefreshCcw } from "lucide-react";
import { TWorkout } from "../../page";
import { IoPlayForward } from "react-icons/io5";
const WorkoutBlock = ({ workout }: { workout: TWorkout }) => (
  <div className="mb-4 bg-primary-200 p-5">
    <h1 className="text-lg font-semibold mb-4">Back Squat</h1>
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-4 text-sm font-semibold text-gray-300">
        <div>
          Sets: <span className="text-gray-50">{workout.sets}</span>
        </div>
        <div>
          Reps: <span className="text-gray-50">{workout.reps}</span>
        </div>
        <div>
          RPE: <span className="text-gray-50">{workout.rpe}</span>
        </div>
        <div>
          Rest: <span className="text-gray-50">{workout.rest}</span>
        </div>
      </div>
      <span className="cursor-pointer">
        <Play />
      </span>
    </div>
    <div className="flex space-x-4 mb-4">
      <Input placeholder="Weight used (kg)" className="w-1/2 bg-secondary" />
      <Input placeholder="Notes" className="w-1/2 bg-secondary" />
    </div>
    <div className="flex space-x-2 flex-wrap">
      <Button className="bg-secondary cursor-pointer">
        <Check className="h-4 w-4 mr-2" />
        Complete
      </Button>
      <Button className="bg-transparent border border-secondary cursor-pointer">
        <IoPlayForward className="h-4 w-4 mr-2" />
        Skip
      </Button>
      <Button className="bg-transparent border border-secondary cursor-pointer">
        <RefreshCcw className="h-4 w-4 mr-2" />
        Retry
      </Button>
    </div>
  </div>
);
export default WorkoutBlock;
