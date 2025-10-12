'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getAllCategories } from '@/services/admin/category';
import { ICategory } from '@/types/category.types';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FaBookmark } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import AssignToClientsModal from './_components/AssignToClientsModal';

interface IExercise {
  title: string;
  description: string;
  dayOfWeek: string;
  duration: string;
  sets: string;
  reps: string;
  restSeconds: string;
  tempo: string;
  videoUrl: string;
}

interface FormData {
  name: string;
  duration: string;
  description: string;
  coachNote: string;
  categories: string[];
  exercises: IExercise[];
}

const dummyClients = [
  { id: 'client1_id', name: 'Sarah Johnson', level: 'Advanced' },
  { id: 'client2_id', name: 'Alex Smith', level: 'Intermediate' },
  { id: 'client3_id', name: 'Chris Evans', level: 'Beginner' },
  { id: 'client4_id', name: 'Jane Doe', level: 'Advanced' },
];

export default function AddProgramPage() {
  const daysOfWeek = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
  ];
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      duration: '',
      description: '',
      coachNote: '',
      categories: [],
      exercises: [
        {
          title: '',
          dayOfWeek: '',
          description: '',
          duration: '',
          restSeconds: '',
          sets: '',
          reps: '',
          tempo: '',
          videoUrl: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });

  const handleAddExercise = () => {
    append({
      title: '',
      dayOfWeek: '',
      description: '',
      duration: '',
      restSeconds: '',
      sets: '',
      reps: '',
      tempo: '',
      videoUrl: '',
    });
  };

  const handleRemoveExercise = (index: number) => {
    remove(index);
  };

  const handleSaveAsTemplate = async (data: FormData) => {
    // Manually trigger validation for the entire form
    const isValid = await trigger();
    if (!isValid) {
      console.log('Validation failed. Please fill in all required fields.');
      return;
    }
    console.log(data);
    console.log(selectedClientIds);
    // try {
    //   console.log("Program saved as a template successfully!");
    //   // Here you would typically show a success message to the user
    // } catch (error) {
    //   console.error("Error saving template:", error);
    //   // Here you would handle the error, maybe show an error message
    // }
  };

  useEffect(() => {
    const getCategory = async () => {
      const res = await getAllCategories();
      setCategories(res?.data);
    };

    getCategory();
  }, []);

  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([]);
  console.log(categories);
  return (
    <div className="p-4 sm:p-8">
      {/* {userId && <p className="text-right text-gray-500 text-sm mb-4">User ID: {userId}</p>} */}
      <div className="w-full ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Program Details Section */}
          <div className="w-full lg:w-1/3 space-y-8 p-4 bg-primary-200 border border-secondary h-fit">
            <h2 className="text-2xl font-semibold">Program Details</h2>

            {/* Program Name  */}
            <div className="space-y-2">
              <Label htmlFor="programName" className="text-lg font-medium">
                Program Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., Elite Squat"
                {...register('name', {
                  required: 'Program name is required.',
                })}
                className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* duration  */}
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-lg font-medium">
                Duration
              </Label>
              <Input
                id="duration"
                type="text" // 💡 Keeps the type as "text" as requested
                placeholder="e.g., 5"
                {...register('duration', {
                  required: 'Program duration is required',
                })}
                className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
              />
              {/* Note: Corrected the error check to 'errors.duration' */}
              {errors.duration && (
                <p className="text-red-500 text-sm">
                  {errors?.duration?.message}
                </p>
              )}
            </div>

            {/* Description  */}
            <div className="space-y-2">
              <Label htmlFor="videoDescription" className="text-lg font-medium">
                Programm Description *
              </Label>
              <Textarea
                id="videoDescription"
                placeholder="Complete guide to performing the perfect barbell back squat"
                {...register('description', {
                  required: 'Programm Description is required.',
                })}
                className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6] rounded-none"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Coach Notes  */}
            <div className="space-y-2">
              <Label htmlFor="videoDescription" className="text-lg font-medium">
                Notes *
              </Label>
              <Textarea
                id="notes"
                placeholder="Complete guide to performing the perfect barbell back squat"
                {...register('coachNote', {
                  required: 'Notes is required.',
                })}
                className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6] rounded-none"
              />
              {errors.coachNote && (
                <p className="text-red-500 text-sm">
                  {errors.coachNote.message}
                </p>
              )}
            </div>

            {/* Categories  */}
            <div className="space-y-2">
              <Label className="text-lg font-medium">Exercise Categories</Label>
              <div className="space-y-2">
                {categories?.map((category) => (
                  <div
                    key={category?.id}
                    className="flex items-center space-x-2"
                  >
                    <Input
                      id={`category-${category?.id}`}
                      type="checkbox"
                      {...register('categories', {
                        validate: (value) =>
                          value.length > 0 ||
                          'At least one category is required.',
                      })}
                      value={category?.id}
                      className="form-checkbox h-4 w-4 text-black rounded-md border border-zinc-500 bg-zinc-800 cursor-pointer"
                    />
                    <label
                      htmlFor={`category-${category?.id}`}
                      className="text-sm"
                    >
                      {category?.name}
                    </label>
                  </div>
                ))}
              </div>
              {errors.categories && (
                <p className="text-red-500 text-sm">
                  {errors.categories.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={handleSubmit(handleSaveAsTemplate)}
                className="w-full font-medium py-2 px-4 transition-colors duration-200 bg-secondary hover:bg-secondary/85 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FaBookmark />
                Save As Template
              </button>
              <AssignToClientsModal
                clients={dummyClients}
                selectedClientIds={selectedClientIds}
                setSelectedClientIds={setSelectedClientIds}
              />
            </div>
          </div>

          {/* Program Structure Section */}
          <div className="w-full lg:w-2/3 space-y-8 p-4 bg-primary-200 border border-secondary h-fit">
            <div className="flex justify-between items-center gap-5 flex-wrap mb-6">
              <h2 className="text-2xl font-semibold">Program Structure</h2>
              <button
                type="button"
                onClick={handleAddExercise}
                className="cursor-pointer font-medium py-2 px-4 md:py-2.5 md:px-6 flex items-center gap-2 bg-secondary text-white hover:bg-secondary/75"
              >
                <Plus size={14} />
                Add Excercise
              </button>
            </div>

            {fields.map((exercise, index) => (
              <div
                key={exercise.id}
                className="p-6 border border-secondary shadow-inner space-y-4 relative"
              >
                {/* Delete Exercise  */}
                {index > 0 && (
                  <div className="flex justify-end items-center">
                    <MdDelete
                      onClick={() => handleRemoveExercise(index)}
                      className="text-red-500 hover:text-red-600 hover:scale-105 text-xl cursor-pointer"
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <Label
                    htmlFor={`tempo-${index}`}
                    className="text-lg font-medium"
                  >
                    Exercise title
                  </Label>
                  <Input
                    id={`name-${index}`}
                    type="text"
                    placeholder="e.g., Back Squat"
                    {...register(`exercises.${index}.title`, {
                      required: 'Exercise title is required.',
                    })}
                    className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
                  />
                  {errors.exercises?.[index]?.title && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.exercises[index].title.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <Label
                      htmlFor={`sets-${index}`}
                      className="text-lg font-medium"
                    >
                      Sets
                    </Label>
                    <Input
                      id={`sets-${index}`}
                      placeholder="e.g., 4"
                      type="text"
                      {...register(`exercises.${index}.sets`, {
                        required: 'Sets are required.',
                      })}
                      className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
                    />
                    {errors.exercises?.[index]?.sets && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.exercises[index].sets.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor={`reps-${index}`}
                      className="text-lg font-medium"
                    >
                      Reps
                    </Label>
                    <Input
                      id={`reps-${index}`}
                      placeholder="e.g., 6-8"
                      type="text"
                      {...register(`exercises.${index}.reps`, {
                        required: 'Reps are required.',
                      })}
                      className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
                    />
                    {errors.exercises?.[index]?.reps && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.exercises[index].reps.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor={`restMin-${index}`}
                      className="text-lg font-medium"
                    >
                      Rest (sec)
                    </Label>
                    <Input
                      id={`restMin-${index}`}
                      type="text"
                      placeholder="e.g., 3"
                      {...register(`exercises.${index}.restSeconds`, {
                        required: 'Rest time is required.',
                      })}
                      className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
                    />
                    {errors.exercises?.[index]?.restSeconds && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.exercises[index].restSeconds.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor={`tempo-${index}`}
                      className="text-lg font-medium"
                    >
                      Tempo
                    </Label>
                    <Input
                      id={`tempo-${index}`}
                      placeholder="e.g., 3-1-3-0"
                      type="text"
                      {...register(`exercises.${index}.tempo`, {
                        required: 'Tempo is required.',
                      })}
                      className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
                    />
                    {errors.exercises?.[index]?.tempo && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.exercises[index].tempo.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor={`videoLink-${index}`}
                    className="text-lg font-medium"
                  >
                    Video Link
                  </Label>
                  <Input
                    id={`videoLink-${index}`}
                    type="text"
                    {...register(`exercises.${index}.videoUrl`, {
                      required: 'Video link is required.',
                    })}
                    placeholder="YouTube or Vimeo URL"
                    className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
                  />
                  {errors.exercises?.[index]?.videoUrl && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.exercises[index].videoUrl.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-center gap-5 flex-col md:flex-row">
                  <div className="flex-1 space-y-1 w-full">
                    <Label
                      htmlFor={`duration-${index}`}
                      className="text-lg font-medium"
                    >
                      Excercise Duration
                    </Label>
                    <Input
                      id={`duration-${index}`}
                      type="text"
                      {...register(`exercises.${index}.duration`, {
                        required: 'Excercise Duration is required.',
                      })}
                      placeholder="Excercise Duration"
                      className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
                    />
                    {errors.exercises?.[index]?.duration && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.exercises[index].duration.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-1 space-y-1 w-full">
                    <Label
                      htmlFor={`dayOfWeek-${index}`}
                      className="text-lg font-medium"
                    >
                      Day of Week *
                    </Label>

                    <Controller
                      control={control}
                      name={`exercises.${index}.dayOfWeek`}
                      rules={{ required: 'Day of week is required.' }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value || ''}
                        >
                          <SelectTrigger
                            id={`dayOfWeek-${index}`}
                            className="bg-secondary border-none rounded-none text-white p-2.5 w-full"
                          >
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent className="bg-secondary text-white border-none">
                            {daysOfWeek.map((day) => (
                              <SelectItem
                                className="hover:bg-primary-100"
                                key={day}
                                value={day}
                              >
                                {day.charAt(0) + day.slice(1).toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />

                    {errors.exercises?.[index]?.dayOfWeek && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.exercises[index].dayOfWeek.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor={`description-${index}`}
                    className="text-lg font-medium"
                  >
                    Excercise description
                  </Label>
                  <Textarea
                    id={`description-${index}`}
                    {...register(`exercises.${index}.description`, {
                      required: 'Excercise description is required.',
                    })}
                    placeholder="Description"
                    className="bg-secondary rounded-none border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
                  />
                  {errors.exercises?.[index]?.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.exercises[index].description.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
