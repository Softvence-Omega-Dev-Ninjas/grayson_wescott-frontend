"use client"
import { IFormData } from "../../page";

const Step3 = ({ formData, onBack, onDone }: { formData: IFormData; onBack: () => void; onDone: () => void }) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 mx-auto text-green-500">
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.483 4.473-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4.0-5.5Z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-3xl font-bold">Video Saved Successfully!</h2>
        <p className="text-gray-400">Your exercise video has been added to the library and is ready to use.</p>
      </div>

      {/* Preview Card */}
      <div className="rounded-lg bg-zinc-800 border-none p-4">
        <div className="p-0 flex items-center space-x-4">
          <div className="w-24 h-24 bg-gray-600 rounded-md flex-shrink-0">
            {/* Placeholder for video thumbnail */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-400 p-4">
              <path d="m1.2 11.238 9.376 5.86a.75.75 0 0 0 .75 0L22.8 11.238a.75.75 0 0 0 0-1.238L12.016 4.14a.75.75 0 0 0-.75 0L1.2 10a.75.75 0 0 0 0 1.238Z" />
              <path d="M1.2 17.513l9.376 5.86a.75.75 0 0 0 .75 0l10.875-6.793a.75.75 0 0 0 0-1.238L12.016 10.42a.75.75 0 0 0-.75 0L1.2 16.275a.75.75 0 0 0 0 1.238Z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-lg">{formData.videoName}</h4>
            <p className="text-gray-400 text-sm">{formData.videoTitle}</p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              {formData.bodyPartTags.map((tag) => (
                <span key={tag} className="border border-zinc-700 rounded-full px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* What to do next section */}
      <h3 className="text-xl font-semibold mt-8">What would you like to do next?</h3>
      <div className="space-y-4">
        <button className="w-full justify-between p-4 bg-zinc-800 hover:bg-zinc-700 h-auto font-medium py-2 px-4 rounded-md transition-colors duration-200">
          <div className="flex items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-400">
              <path d="M20 4a2 2 0 0 0-2-2h-7.5a.5.5 0 0 1 0-1h8a1.5 1.5 0 0 1 1.5 1.5V4h-2Zm-1.5 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z" />
            </svg>
            <div className="text-left">
              <p className="font-semibold">View in Library</p>
              <p className="text-xs text-gray-400">Browse all of your exercise videos in your library</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10l-3.293-3.293a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end space-x-4 mt-8">
        <button
          onClick={onBack}
          type="button"
          className="font-medium py-2 px-4 rounded-md transition-colors duration-200 bg-zinc-700 text-white hover:bg-zinc-600 border-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 0 1-.75.75H5.811l3.97 3.97a.75.75 0 1 1-1.06 1.06l-5.25-5.25a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 1 1 1.06 1.06L5.811 9.25H16.25A.75.75 0 0 1 17 10Z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>
        <button onClick={onDone} className="font-medium py-2 px-4 transition-colors duration-200 bg-white text-black hover:bg-gray-200 rounded-md">
          Done
        </button>
      </div>
    </div>
  );
};
export default Step3;
