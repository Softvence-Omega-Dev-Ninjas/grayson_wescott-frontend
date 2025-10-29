/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleExcerciseStatusUpdate } from '@/services/user/assigned-program';
import { Check, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { IoPlayForward } from 'react-icons/io5';
import { toast } from 'sonner';
const WorkoutBlock = ({ workout }: { workout: any }) => {
  const [weight, setWeight] = useState('');
  const [note, setNote] = useState('');
  const handleStatus = async (status: string) => {
    try {
      const res = await handleExcerciseStatusUpdate(workout?.id, {
        note: note,
        equipmentUsed: weight,
        status: status,
      });
      if (res?.success) {
        toast.success('Excercise status updated successfully!');
      } else {
        toast.error(res?.message || 'Failed to update excercise status.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again in a moment.');
    }
  };
  return (
    <div className="mb-4 bg-primary-200 p-5">
      <h1 className="text-lg font-semibold mb-4">
        {workout?.programExercise?.title}
      </h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4 text-sm font-semibold text-gray-300">
          <div>
            Sets:{' '}
            <span className="text-gray-50">
              {workout?.programExercise?.sets}
            </span>
          </div>
          <div>
            Reps:{' '}
            <span className="text-gray-50">
              {workout?.programExercise?.reps}
            </span>
          </div>

          <div>
            Rest:{' '}
            <span className="text-gray-50">
              {workout?.programExercise?.rest}
            </span>
          </div>
          <div>
            Tempo:{' '}
            <span className="text-gray-50">
              {workout?.programExercise?.tempo}
            </span>
          </div>
        </div>
        {/* <span className="cursor-pointer">
        <Play />
      </span> */}
      </div>
      <div className="flex space-x-4 mb-4">
        <Input
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight used (kg)"
          className="w-1/2 bg-secondary"
        />
        <Input
          onChange={(e) => setNote(e.target.value)}
          placeholder="Notes"
          className="w-1/2 bg-secondary"
        />
      </div>
      <div className="flex space-x-2 flex-wrap">
        <Button
          onClick={() => handleStatus('COMPLETED')}
          className={`bg-secondary cursor-pointer ${workout?.status === 'COMPLETED' ? 'opacity-50 pointer-events-none' : ''}`}
          disabled={workout?.status === 'COMPLETED'}
        >
          <Check className="h-4 w-4 mr-2" />
          {workout?.status === 'COMPLETED' ? 'Completed' : 'Mark as Completed'}
        </Button>
        <Button
          onClick={() => handleStatus('SKIPPED')}
          className="bg-transparent border border-secondary cursor-pointer"
        >
          <IoPlayForward className="h-4 w-4 mr-2" />
          Skip
        </Button>
        <Button
          onClick={() => handleStatus('RETRY')}
          className="bg-transparent border border-secondary cursor-pointer"
        >
          <RefreshCcw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    </div>
  );
};
export default WorkoutBlock;
