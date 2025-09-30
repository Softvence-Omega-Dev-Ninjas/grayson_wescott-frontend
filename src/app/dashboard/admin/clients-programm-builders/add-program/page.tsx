"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaBookmark } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import AssignToClientsModal from "./_components/AssignToClientsModal";

interface IExercise {
  exerciseName: string;
  sets: string;
  reps: string;
  rpe: string;
  restMin: string;
  tempo: string;
  videoLink: string;
}

interface FormData {
  programName: string;
  categories: string[];
  exercises: IExercise[];
}

const dummyClients = [
  { id: "client1_id", name: "Sarah Johnson", level: "Advanced" },
  { id: "client2_id", name: "Alex Smith", level: "Intermediate" },
  { id: "client3_id", name: "Chris Evans", level: "Beginner" },
  { id: "client4_id", name: "Jane Doe", level: "Advanced" },
];

export default function App() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      programName: "",
      categories: [],
      exercises: [
        {
          exerciseName: "",
          sets: "",
          reps: "",
          rpe: "",
          restMin: "",
          tempo: "",
          videoLink: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  const handleAddExercise = () => {
    append({
      exerciseName: "",
      sets: "",
      reps: "",
      rpe: "",
      restMin: "",
      tempo: "",
      videoLink: "",
    });
  };

  const handleRemoveExercise = (index: number) => {
    remove(index);
  };

  const handleSaveAsTemplate = async (data: FormData) => {
    // Manually trigger validation for the entire form
    const isValid = await trigger();
    if (!isValid) {
      console.log("Validation failed. Please fill in all required fields.");
      return;
    }
    console.log(data);
    // try {
    //   console.log("Program saved as a template successfully!");
    //   // Here you would typically show a success message to the user
    // } catch (error) {
    //   console.error("Error saving template:", error);
    //   // Here you would handle the error, maybe show an error message
    // }
  };

  const exerciseCategories = ["Upper Body", "Lower Body", "Core", "Cardio"];
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([]);

  return (
    <div className="p-4 sm:p-8">
      {/* {userId && <p className="text-right text-gray-500 text-sm mb-4">User ID: {userId}</p>} */}
      <div className="w-full ">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Program Details Section */}
          <div className="w-full md:w-1/3 space-y-8 p-4 bg-primary-200 border border-secondary h-fit">
            <h2 className="text-2xl font-semibold">Program Details</h2>

            {/* Program Name  */}
            <div className="space-y-2">
              <Label htmlFor="programName" className="text-lg font-medium">
                Program Name
              </Label>
              <Input
                id="programName"
                type="text"
                placeholder="e.g., Elite Squat"
                {...register("programName", {
                  required: "Program name is required.",
                })}
                className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
              />
              {errors.programName && (
                <p className="text-red-500 text-sm">
                  {errors.programName.message}
                </p>
              )}
            </div>

            {/* Categories  */}
            <div className="space-y-2">
              <Label className="text-lg font-medium">Exercise Categories</Label>
              <div className="space-y-2">
                {exerciseCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Input
                      id={`category-${category}`}
                      type="checkbox"
                      {...register("categories", {
                        validate: (value) =>
                          value.length > 0 ||
                          "At least one category is required.",
                      })}
                      value={category}
                      className="form-checkbox h-4 w-4 text-black rounded-md border border-zinc-500 bg-zinc-800 cursor-pointer"
                    />
                    <label htmlFor={`category-${category}`} className="text-sm">
                      {category}
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
          <div className="w-full md:w-2/3 space-y-8 p-4 bg-primary-200 border border-secondary">
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
                    {...register(`exercises.${index}.exerciseName`, {
                      required: "Exercise title is required.",
                    })}
                    className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
                  />
                  {errors.exercises?.[index]?.exerciseName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.exercises[index].exerciseName.message}
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
                        required: "Sets are required.",
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
                        required: "Reps are required.",
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
                      htmlFor={`rpe-${index}`}
                      className="text-lg font-medium"
                    >
                      RPE
                    </Label>
                    <Input
                      id={`rpe-${index}`}
                      placeholder="e.g., 8"
                      type="text"
                      {...register(`exercises.${index}.rpe`, {
                        required: "RPE is required.",
                      })}
                      className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
                    />
                    {errors.exercises?.[index]?.rpe && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.exercises[index].rpe.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor={`restMin-${index}`}
                      className="text-lg font-medium"
                    >
                      Rest (min)
                    </Label>
                    <Input
                      id={`restMin-${index}`}
                      type="text"
                      placeholder="e.g., 3"
                      {...register(`exercises.${index}.restMin`, {
                        required: "Rest time is required.",
                      })}
                      className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
                    />
                    {errors.exercises?.[index]?.restMin && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.exercises[index].restMin.message}
                      </p>
                    )}
                  </div>
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
                      required: "Tempo is required.",
                    })}
                    className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
                  />
                  {errors.exercises?.[index]?.tempo && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.exercises[index].tempo.message}
                    </p>
                  )}
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
                    {...register(`exercises.${index}.videoLink`, {
                      required: "Video link is required.",
                    })}
                    placeholder="YouTube or Vimeo URL"
                    className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
                  />
                  {errors.exercises?.[index]?.videoLink && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.exercises[index].videoLink.message}
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
