/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { Controller } from "react-hook-form";
import uploadIcon from "@/assets/dashboard/add-excercise/div.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";

const Step1 = ({ onNext, register, control, errors, handleSubmit }: any) => {
  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      {/* Upload Section */}
      <div className=" max-w-3xl px-2.5 mx-auto mt-14">
        <h2 className="text-xl font-semibold mb-3">Upload Video or Add Link</h2>
        <span className="font-medium text-sm mt-1">Upload from Device</span>
        <div className="border border-dashed border-[#F4F5F7] p-6 text-center w-full mt-3">
          <Image src={uploadIcon} width={50} height={50} alt="Upload Icon" className="mx-auto" />
          <label htmlFor="videoFile" className="block text-xl font-medium cursor-pointer text-[#B9BDC6] mt-8">
            Choose Video File
          </label>
          <p className="text-sm text-[#F4F5F7] font-normal mt-1">Click to browse or drop and drag your video file here</p>
          <Controller
            name="videoFile"
            control={control}
            render={({ field: { onChange } }) => (
              <input id="videoFile" type="file" className="hidden" onChange={(e) => onChange(e.target.files?.[0] || null)} />
            )}
          />
        </div>
      </div>

      {/* Link Section */}
      <div className="space-y-2">
        <Label htmlFor="videoLink" className="text-lg font-medium">
          Paste Video Link
        </Label>
        <div className="flex space-x-2">
          <Input
            id="videoLink"
            placeholder="https://vimeo.com/... or https://youtube.com/..."
            {...register("videoLink")}
            className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
          />
          <Button type="button" className="cursor-pointer font-medium py-2 px-4 transition-colors duration-200 bg-secondary text-white  border-none ">
            Validate
          </Button>
        </div>
        <span className="text-xs">Supports Vimeo Pro and YouTube Unlisted videos</span>
      </div>

      {/* Basic Information Section */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="videoName" className="text-lg font-medium">
            Video Name *
          </Label>
          <Input
            id="videoName"
            type="text"
            placeholder="e.g., Barbell Back Squat"
            {...register("videoName", { required: "Video Name is required." })}
            className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6] w-full"
          />
          {errors.videoName && <p className="text-red-500 text-sm">{errors.videoName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration" className="text-lg font-medium">
            Duration
          </Label>
          <Input
            id="duration"
            type="text"
            placeholder="e.g., 5:00"
            {...register("duration")}
            className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="videoTitle" className="text-lg font-medium">
          Video Title *
        </Label>
        <Input
          id="videoTitle"
          type="text"
          placeholder="Complete guide to performing the perfect barbell back squat"
          {...register("videoTitle", { required: "Video Title is required." })}
          className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
        />
        {errors.videoTitle && <p className="text-red-500 text-sm">{errors.videoTitle.message}</p>}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end space-x-4 mt-8">
        <button type="submit" className="cursor-pointer font-medium py-2 px-4 flex items-center gap-2 bg-secondary text-white hover:bg-secondary/75">
          Next
          <FaArrowRightLong />
        </button>
      </div>
    </form>
  );
};

export default Step1;
