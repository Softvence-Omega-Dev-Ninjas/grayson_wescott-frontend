/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import { Controller, useFieldArray } from 'react-hook-form';
import folderIcon from '@/assets/dashboard/add-excercise/folderIcon.png';
import bodyIcon from '@/assets/dashboard/add-excercise/avatarIcon.png';
import equipmentIcon from '@/assets/dashboard/add-excercise/dumbellIcon.png';
import starIcon from '@/assets/dashboard/add-excercise/starICon.png';
import warningIcon from '@/assets/dashboard/add-excercise/warningIcon.png';
import plusIcon from '@/assets/dashboard/add-excercise/plusIcon.png';
import labelIcon from '@/assets/dashboard/add-excercise/plusIcon.png';
import beginerIcon from '@/assets/dashboard/add-excercise/beginerIcon.png';
import intermediateIcon from '@/assets/dashboard/add-excercise/IntermediateIcon.png';
import advanceIcon from '@/assets/dashboard/add-excercise/advanceIcon.png';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';

const Step2 = ({
  onBack,
  register,
  control,
  errors,
  handleSubmit,
  onSubmit,
}: any) => {
  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: 'stepByStepGuide',
  });

  const {
    fields: benefitFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control,
    name: 'keyBenefits',
  });

  const {
    fields: mistakeFields,
    append: appendMistake,
    remove: removeMistake,
  } = useFieldArray({
    control,
    name: 'commonMistakes',
  });

  const bodyPartTags = [
    'Legs',
    'Chest',
    'Core',
    'Back',
    'Glutes',
    'Shoulders',
    'Arms',
  ];
  const equipmentTags = [
    'Dumbbell',
    'Barbell',
    'Resistance Band',
    'Bodyweight',
    'Kettlebell',
    'Cable Machine',
  ];
  const difficultyLevels = [
    { label: 'Beginner', icon: beginerIcon },
    { label: 'Intermediate', icon: intermediateIcon },
    { label: 'Advanced', icon: advanceIcon },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Category Selection */}
      <div className="flex items-center gap-2 mb-3">
        <Image src={folderIcon} width={18} height={18} alt="Upload Icon" />
        <span className="text-2xl">Category Selection</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category  */}
        <div className="space-y-2">
          <Label htmlFor="primaryCategory" className="text-lg font-medium">
            Select the primary categories for this exercise video *
          </Label>
          <Controller
            name="primaryCategory"
            control={control}
            rules={{ required: 'Primary Category is required.' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-secondary w-full border-none text-white p-2.5 flex-1 placeholder:text-[#F4F5F7]">
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
                <SelectContent className="text-white bg-primary-200 ">
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.primaryCategory && (
            <p className="text-red-500 text-sm">
              {errors.primaryCategory.message}
            </p>
          )}
        </div>
        {/* Status  */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-lg font-medium">
            Status *
          </Label>
          <Controller
            name="status"
            control={control}
            rules={{ required: 'Status is required.' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-secondary w-full border-none text-white p-2.5 flex-1 placeholder:text-[#F4F5F7]">
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
                <SelectContent className="text-white bg-primary-200 ">
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>
      </div>

      {/* Body Part Tags */}
      <div className="flex items-center gap-2 mb-3">
        <Image src={bodyIcon} width={18} height={18} alt="Upload Icon" />
        <span className="text-2xl">Body Part Tags</span>
      </div>
      <div className="space-y-4">
        <Label className="text-lg font-medium">
          Select all body parts targeted in this exercise *
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {bodyPartTags.map((tag) => (
            <div
              key={tag}
              className="flex items-center space-x-2 border border-secondary px-4 py-6"
            >
              <Controller
                name="bodyPartTags"
                control={control}
                rules={{
                  validate: (value) =>
                    value.length > 0 ||
                    'At least one body part tag is required.',
                }}
                render={({ field }) => (
                  <Input
                    id={`body-part-${tag}`}
                    type="checkbox"
                    checked={field.value?.includes(tag)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        field.onChange([...(field.value || []), tag]);
                      } else {
                        field.onChange(
                          field.value?.filter((v: any) => v !== tag) || [],
                        );
                      }
                    }}
                    className="form-checkbox bg-transparent h-4 w-4 text-black rounded-md border border-zinc-500 cursor-pointer before:bg-transparent"
                  />
                )}
              />
              <label
                htmlFor={`body-part-${tag}`}
                className="text-sm cursor-pointer text-[#F4F5F7]"
              >
                {tag}
              </label>
            </div>
          ))}
        </div>
        {errors.bodyPartTags && (
          <p className="text-red-500 text-sm mt-2">
            {errors.bodyPartTags.message}
          </p>
        )}
      </div>

      {/* Equipment Tags */}
      <div className="flex items-center gap-2 mb-3">
        <Image src={equipmentIcon} width={18} height={18} alt="Upload Icon" />
        <span className="text-2xl">Equipment Tags</span>
      </div>
      <div className="space-y-4">
        <Label className="text-lg font-medium">
          Select equipment required for this exercise *
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {equipmentTags.map((tag) => (
            <div
              key={tag}
              className="flex items-center space-x-2 border border-secondary px-4 py-6"
            >
              <Controller
                name="equipmentTags"
                control={control}
                rules={{
                  validate: (value) =>
                    value.length > 0 ||
                    'At least one equipment tag is required.',
                }}
                render={({ field }) => (
                  <input
                    id={`equipment-${tag}`}
                    type="checkbox"
                    checked={field.value?.includes(tag)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        field.onChange([...(field.value || []), tag]);
                      } else {
                        field.onChange(
                          field.value?.filter((v: any) => v !== tag) || [],
                        );
                      }
                    }}
                    className="form-checkbox h-4 w-4 text-black rounded-md border border-zinc-500 bg-zinc-800 cursor-pointer"
                  />
                )}
              />
              <label
                htmlFor={`equipment-${tag}`}
                className="text-sm cursor-pointer"
              >
                {tag}
              </label>
            </div>
          ))}
        </div>
        {errors.equipmentTags && (
          <p className="text-red-500 text-sm mt-2">
            {errors.equipmentTags.message}
          </p>
        )}
      </div>

      {/* Step-by-Step Guide */}
      <div className="space-y-2 border border-secondary p-4">
        <Label className="text-lg font-medium">Step-by-Step Guide *</Label>
        {stepFields.map((item, index) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Input
              type="text"
              {...register(`stepByStepGuide.${index}.value`, {
                required: 'This field is required.',
              })}
              placeholder="Enter you Step by Step Guide name..."
              className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
            />

            {index > 0 && (
              <Button
                type="button"
                onClick={() => removeStep(index)}
                className="font-medium py-3 px-4 flex items-center gap-1.5 transition-colors bg-secondary duration-200 text-white hover:bg-secondary/80 cursor-pointer"
              >
                <X />
              </Button>
            )}
          </div>
        ))}
        {errors.stepByStepGuide?.[0]?.value && (
          <p className="text-red-500 text-sm mt-2">
            {errors.stepByStepGuide?.[0]?.value.message}
          </p>
        )}
        <div className="flex items-center justify-end">
          <Button
            type="button"
            onClick={() => appendStep({ value: '' })}
            className="font-medium py-2 px-4 flex items-center gap-1.5 transition-colors bg-secondary duration-200 text-white hover:bg-secondary/80 cursor-pointer"
          >
            <Image src={plusIcon} width={12} height={12} alt="Upload Icon" />
            Add
          </Button>
        </div>
      </div>

      {/* Key Benefits and Common Mistakes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-2 border border-secondary p-4">
          <Label className="text-lg font-medium flex items-center gap-2">
            <Image src={starIcon} width={14} height={14} alt="Upload Icon" />
            <span>Key Benefits *</span>
          </Label>
          {benefitFields.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Input
                type="text"
                {...register(`keyBenefits.${index}.value`, {
                  required: 'This field is required.',
                })}
                placeholder="Enter Client's Key Benefits..."
                className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
              />
              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => removeBenefit(index)}
                  className="font-medium py-3 px-4 flex items-center gap-1.5 transition-colors bg-secondary duration-200 text-white hover:bg-secondary/80 cursor-pointer"
                >
                  <X />
                </Button>
              )}
            </div>
          ))}
          {errors.keyBenefits?.[0]?.value && (
            <p className="text-red-500 text-sm mt-2">
              {errors.keyBenefits?.[0]?.value.message}
            </p>
          )}
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => appendBenefit({ value: '' })}
              className="font-medium py-2 px-4 flex items-center gap-1.5 transition-colors bg-secondary duration-200 text-white hover:bg-secondary/80 cursor-pointer"
            >
              <Image src={plusIcon} width={12} height={12} alt="Upload Icon" />
              Add
            </Button>
          </div>
        </div>
        <div className="space-y-2 border border-secondary p-4">
          <Label className="text-lg font-medium flex items-center gap-2">
            <Image src={warningIcon} width={14} height={14} alt="Upload Icon" />
            <span>Common Mistakes *</span>
          </Label>
          {mistakeFields.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Input
                type="text"
                {...register(`commonMistakes.${index}.value`, {
                  required: 'This field is required.',
                })}
                placeholder="Enter Client's Common Mistakes..."
                className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
              />
              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => removeMistake(index)}
                  className="font-medium py-3 px-4 flex items-center gap-1.5 transition-colors bg-secondary duration-200 text-white hover:bg-secondary/80 cursor-pointer"
                >
                  <X />
                </Button>
              )}
            </div>
          ))}
          {errors.commonMistakes?.[0]?.value && (
            <p className="text-red-500 text-sm mt-2">
              {errors.commonMistakes?.[0]?.value.message}
            </p>
          )}
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => appendMistake({ value: '' })}
              className="font-medium py-2 px-4 flex items-center gap-1.5 transition-colors bg-secondary duration-200 text-white hover:bg-secondary/80 cursor-pointer"
            >
              <Image src={plusIcon} width={12} height={12} alt="Upload Icon" />
              Add
            </Button>
          </div>
        </div>
      </div>

      {/* Exercise Details */}
      <div className="border border-secondary p-4">
        <h3 className="text-xl font-medium mb-4">Exercise Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="equipment" className="text-lg font-medium">
              Equipment *
            </Label>
            <Input
              type="text"
              {...register('exerciseDetails.equipment', {
                required: 'Equipment is required.',
              })}
              placeholder="Barbell, Rack"
              className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6] w-full"
            />
            {errors.exerciseDetails?.equipment && (
              <p className="text-red-500 text-sm">
                {errors.exerciseDetails.equipment.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="type" className="text-lg font-medium">
              Type *
            </Label>
            <Input
              type="text"
              {...register('exerciseDetails.type', {
                required: 'Type is required.',
              })}
              placeholder="Compound"
              className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6] w-full"
            />
            {errors.exerciseDetails?.type && (
              <p className="text-red-500 text-sm">
                {errors.exerciseDetails.type.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="primaryMuscles" className="text-lg font-medium">
              Primary Muscles *
            </Label>
            <Input
              type="text"
              {...register('exerciseDetails.primaryMuscles', {
                required: 'Primary Muscles is required.',
              })}
              placeholder="Quads, Glutes, Hamstrings"
              className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6] w-full"
            />
            {errors.exerciseDetails?.primaryMuscles && (
              <p className="text-red-500 text-sm">
                {errors.exerciseDetails.primaryMuscles.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondaryMuscles" className="text-lg font-medium">
              Secondary Muscles *
            </Label>
            <Input
              type="text"
              {...register('exerciseDetails.secondaryMuscles', {
                required: 'Secondary Muscles is required.',
              })}
              placeholder="Core, Lower Back"
              className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6] w-full"
            />
            {errors.exerciseDetails?.secondaryMuscles && (
              <p className="text-red-500 text-sm">
                {errors.exerciseDetails.secondaryMuscles.message}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2 mt-5">
          <Label htmlFor="caloriesBurn" className="text-lg font-medium">
            Calories Burn *
          </Label>
          <Input
            type="text"
            {...register('exerciseDetails.caloriesBurn', {
              required: 'calories Burn is required.',
            })}
            placeholder="200 kcal"
            className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6] w-full"
          />
          {errors.exerciseDetails?.caloriesBurn && (
            <p className="text-red-500 text-sm">
              {errors.exerciseDetails.caloriesBurn.message}
            </p>
          )}
        </div>
      </div>

      {/* Difficulty Level */}
      <div className="flex items-center gap-2 mb-3">
        <Image src={labelIcon} width={18} height={18} alt="Upload Icon" />
        <span className="text-2xl">Difficulty Level</span>
      </div>
      <div className="space-y-4">
        <Label className="text-lg font-medium">
          Select the appropriate difficulty level for this exercise *
        </Label>
        <Controller
          name="difficultyLevel"
          control={control}
          rules={{ required: 'Difficulty level is required.' }}
          render={({ field }) => (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {difficultyLevels.map((level) => (
                <div key={level.label} className="flex-1">
                  <input
                    type="radio"
                    id={`difficulty-${level.label}`}
                    value={level.label}
                    checked={field.value === level.label}
                    onChange={() => field.onChange(level.label)}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={`difficulty-${level.label}`}
                    className="flex flex-col items-center justify-center p-4 transition-colors duration-200 cursor-pointer peer-checked:border-white peer-checked:bg-zinc-700 border border-secondary"
                  >
                    {/* <Image src={level.icon} width={40} height={40} alt="Upload Icon" className="pb-5" /> */}
                    <span className="text-lg font-semibold">{level.label}</span>
                    <span className="text-sm text-gray-400 mt-1">
                      {level.label === 'Beginner'
                        ? 'New to exercise'
                        : level.label === 'Intermediate'
                          ? 'Some experience'
                          : 'Highly experienced'}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          )}
        />
        {errors.difficultyLevel && (
          <p className="text-red-500 text-sm mt-2">
            {errors.difficultyLevel.message}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between space-x-4 mt-8">
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer font-medium py-2 px-4 flex items-center gap-2 bg-secondary text-white hover:bg-secondary/75"
          >
            <IoMdArrowBack />
            Back
          </button>
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="submit"
            className="cursor-pointer font-medium py-2 px-4 flex items-center gap-2 bg-secondary text-white hover:bg-secondary/75"
          >
            Next
            <IoMdArrowForward />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Step2;
