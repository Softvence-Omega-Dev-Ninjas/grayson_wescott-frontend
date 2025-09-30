"use client";
import Image from "next/image";
import { IFormData } from "../../page";
import successIcon from "@/assets/dashboard/add-excercise/tick.png";
import folderIcon from "@/assets/dashboard/add-excercise/folderIcon.png";
import plusIcon from "@/assets/dashboard/add-excercise/plusIcon.png";
import { IoIosArrowForward, IoMdArrowBack } from "react-icons/io";

const Step3 = ({
  onBack,
  onDone,
}: {
  formData: IFormData;
  onBack: () => void;
  onDone: () => void;
}) => {
  // console.log("FormData================>", formData);
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4 my-20">
        <div className="flex items-center justify-center">
          <Image
            src={successIcon}
            width={26}
            height={26}
            alt="Upload Icon"
            className="bg-secondary rounded-full w-20 h-20 p-7"
          />
        </div>
        <h2 className="text-3xl font-bold">Video Saved Successfully!</h2>
        <p className="text-gray-300 text-base font-medium">
          Your exercise video has been added to the library and is ready to use.
        </p>
      </div>

      {/* Preview Card */}
      {/* <div className="rounded-lg bg-zinc-800 border-none p-4">
        <div className="p-0 flex items-center space-x-4">
          <div className="w-24 h-24 bg-gray-600 rounded-md flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-400 p-4">
              <path d="m1.2 11.238 9.376 5.86a.75.75 0 0 0 .75 0L22.8 11.238a.75.75 0 0 0 0-1.238L12.016 4.14a.75.75 0 0 0-.75 0L1.2 10a.75.75 0 0 0 0 1.238Z" />
              <path d="M1.2 17.513l9.376 5.86a.75.75 0 0 0 .75 0l10.875-6.793a.75.75 0 0 0 0-1.238L12.016 10.42a.75.75 0 0 0-.75 0L1.2 16.275a.75.75 0 0 0 0 1.238Z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-lg">{formData.videoName}</h4>
            <p className="text-gray-400 text-sm">{formData.video}</p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              {formData.bodyPartTags.map((tag) => (
                <span key={tag} className="border border-zinc-700 rounded-full px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div> */}

      {/* What to do next section */}

      <div className="space-y-4 max-w-7xl mx-auto">
        <h3 className="text-xl font-semibold mt-8">
          What would you like to do next?
        </h3>
        <button className="w-full flex items-center justify-between gap-5  bg-primary-200 hover:bg-primary-200/85 border border-secondary h-auto font-medium py-4 px-4 transition-colors duration-200 cursor-pointer">
          <div className="flex gap-2 items-center space-x-4">
            <Image
              src={folderIcon}
              width={24}
              height={24}
              alt="Upload Icon"
              className="bg-secondary w-12 h-12 rounded-lg p-4"
            />
            <div className="text-left">
              <p className="font-semibold text-lg">View in Library</p>
              <p className="text-base text-gray-400">
                Browse all of your exercise videos in your library
              </p>
            </div>
          </div>
          <IoIosArrowForward />
        </button>
        <button className="w-full flex items-center justify-between  gap-5  bg-primary-200 hover:bg-primary-200/85 border border-secondary h-auto font-medium py-4 px-4 transition-colors duration-200 cursor-pointer">
          <div className="flex gap-2 items-center space-x-4">
            <Image
              src={plusIcon}
              width={24}
              height={24}
              alt="Upload Icon"
              className="bg-secondary w-12 h-12 rounded-lg p-4"
            />
            <div className="text-left">
              <p className="font-semibold text-lg">Add to Program</p>
              <p className="text-base text-gray-400">
                Include this video in a workout program
              </p>
            </div>
          </div>
          <IoIosArrowForward />
        </button>
        <button className="w-full flex items-center justify-between gap-5  bg-primary-200 hover:bg-primary-200/85 border border-secondary h-auto font-medium py-4 px-4 transition-colors duration-200 cursor-pointer">
          <div className="flex gap-2 items-center space-x-4">
            <Image
              src={folderIcon}
              width={24}
              height={24}
              alt="Upload Icon"
              className="bg-secondary w-12 h-12 rounded-lg p-4"
            />
            <div className="text-left">
              <p className="font-semibold text-lg">
                Send/Suggest to Specific Client
              </p>
              <p className="text-base text-gray-400">
                Share this exercise with a client directly
              </p>
            </div>
          </div>
          <IoIosArrowForward />
        </button>

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
              type="button"
              onClick={onDone}
              className="cursor-pointer font-medium py-2 px-4 flex items-center gap-2 bg-secondary text-white hover:bg-secondary/75"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step3;
