/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import tickIcon from '@/assets/dashboard/all-clients/tickICon.svg';
import Image from 'next/image';

export function DailyWorkoutLog({ exercises }: { exercises: any }) {
  // const [selectedDate, setSelectedDate] = useState('');
  console.log('++++++++++', exercises);

  return (
    <div className="bg-primary-200  p-5 border border-secondary">
      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="text-white text-xl sm:text-2xl font-semibold">
          Daily Workout Log
        </h1>
        {/* <Input
          type="text"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-32 bg-transparent border border-secondary text-white placeholder:text-slate-400"
          placeholder="mm/dd/yyyy"
        /> */}
      </div>
      <div className="space-y-4">
        {exercises?.length === 0 && (
          <div className="py-20 text-center text-gray-300">
            No workouts logged yet. Your daily workout log will update soon—stay
            tuned!
          </div>
        )}
        {/* Exercise List */}
        <div className="space-y-3">
          {exercises?.map((exercise: any, index: number) => (
            <div
              key={index}
              className="space-y-2 border border-secondary py-4 px-2.5  mt-2"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-white font-medium">
                  {exercise?.title}
                </span>
                <Image src={tickIcon} width={16} height={16} alt="tick icon" />
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm ">
                <div>
                  <span className="text-sm text-white">Sets</span>
                  <p className="text-white bg-secondary p-2 mt-1.5">
                    {exercise?.sets}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-white">Reps</span>
                  <p className="text-white bg-secondary p-2 mt-1.5">
                    {exercise?.reps}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-white">Tempo</span>
                  <p className="text-white bg-secondary p-2 mt-1.5">
                    {exercise?.tempo}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-white">Rest</span>
                  <p className="text-white bg-secondary p-2 mt-1.5">
                    {exercise?.rest}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-5 flex-wrap mt-5">
                <span className="text-sm text-white">
                  Duration: {exercise?.duration}
                </span>
                {/* <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <BsChatFill size={14} />
                    <span className="text-sm text-white font-medium">
                      Notes
                    </span>
                  </div>
                  <MdDelete className="text-red-700 cursor-pointer text-lg" />
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        {/* <div className="flex flex-wrap gap-2 pt-4">
          <Button
            size="sm"
            className="bg-secondary cursor-pointer text-white hover:bg-gray-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Exercise
          </Button>
          <Button
            size="sm"
            className="bg-transparent cursor-pointer border border-secondary text-white hover:bg-gray-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Exercise
          </Button>
          <Button
            size="sm"
            className="bg-transparent cursor-pointer border border-secondary text-white hover:bg-gray-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Video
          </Button>
        </div> */}
      </div>
    </div>
  );
}
