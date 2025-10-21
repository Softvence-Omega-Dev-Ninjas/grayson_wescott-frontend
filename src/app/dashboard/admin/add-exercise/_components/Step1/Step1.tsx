// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { getHyperVideos } from '@/services/admin/excercise-library';
// import { useState } from 'react';
// import { FaArrowRightLong } from 'react-icons/fa6';

// const Step1 = ({
//   onNext,
//   register,
//   control,
//   errors,
//   handleSubmit,
//   setVideoId,
// }: any) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchVideos, setSearchVideos] = useState([]);
//   // useEffect(() => {

//   //   res();
//   // }, [searchTerm]);
//   const handleGetVideos = async () => {
//     try {
//       const response = await getHyperVideos(searchTerm);
//       console.log('++++++++Result+++++++', response);
//       setSearchVideos(response?.data || []);
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//     }
//   };

//   console.log('=================SearchVideos===========>', searchVideos);
//   console.log('=================SearchTerm===========>', searchTerm);

//   return (
//     <form onSubmit={handleSubmit(onNext)} className="space-y-6">
//       {/* Upload Section */}
//       {/* <div className=" max-w-3xl px-2.5 mx-auto mt-14">
//         <h2 className="text-xl font-semibold mb-3">Upload Video or Add Link</h2>
//         <span className="font-medium text-sm mt-1">Upload from Device</span>
//         <div className="border border-dashed border-[#F4F5F7] p-6 text-center w-full mt-3">
//           <Image
//             src={uploadIcon}
//             width={50}
//             height={50}
//             alt="Upload Icon"
//             className="mx-auto"
//           />
//           <label
//             htmlFor="videoFile"
//             className="block text-xl font-medium cursor-pointer text-[#B9BDC6] mt-8"
//           >
//             Choose Video File
//           </label>
//           <p className="text-sm text-[#F4F5F7] font-normal mt-1">
//             Click to browse or drop and drag your video file here
//           </p>
//           <Controller
//             name="videoFile"
//             control={control}
//             render={({ field: { onChange } }) => (
//               <input
//                 id="videoFile"
//                 type="file"
//                 className="hidden"
//                 onChange={(e) => onChange(e.target.files?.[0] || null)}
//               />
//             )}
//           />
//         </div>
//       </div> */}

//       {/* Link Section */}
//       <div className="space-y-2">
//         <Label htmlFor="videoLink" className="text-lg font-medium">
//           Select Video
//         </Label>
//         <div className="flex space-x-2">
//           <Input
//             id="videoLink"
//             placeholder="Write the video name for search"
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
//           />
//           <Button
//             type="button"
//             onClick={handleGetVideos}
//             className="cursor-pointer font-medium py-2 px-4 transition-colors duration-200 bg-secondary text-white  border-none "
//           >
//             Search
//           </Button>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
//           {searchVideos.length > 0 ? (
//             <div className="max-h-60 overflow-y-auto mt-4 border border-gray-700 p-2">
//               {searchVideos.map((video: any) => (
//                 <div
//                   key={video.id}
//                   className="p-2 bg-secondary cursor-pointer hover:bg-secondary/75"
//                   onClick={() => setVideoId(video.id)}
//                 >
//                   <video
//                     src={video?.preview?.url}
//                     className="w-full h-36 object-cover"
//                     autoPlay
//                     loop
//                     muted
//                     playsInline
//                     poster={video?.preview?.thumbnail}
//                   />
//                   <p className="font-medium mt-2">{video?.name}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             // searchTerm &&
//             // searchTerm !== '' && (
//             //   <p className="text-[#B9BDC6] mt-4">
//             //     No videos found. Try a different search term.
//             //   </p>
//             // )
//             searchTerm &&
//             searchTerm !== '' &&
//             searchVideos &&
//             searchVideos.length === 0 && ( // 👈 **The necessary addition**
//               <p className="text-[#B9BDC6] mt-4">
//                 No videos found. Try a different search term.
//               </p>
//             )
//           )}
//         </div>
//       </div>

//       {/* Basic Information Section */}
//       <h3 className="text-2xl font-semibold mt-8 mb-4">Basic Information</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <Label htmlFor="videoName" className="text-lg font-medium">
//             Video Name *
//           </Label>
//           <Input
//             id="videoName"
//             type="text"
//             placeholder="e.g., Barbell Back Squat"
//             {...register('videoName', { required: 'Video Name is required.' })}
//             className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6] w-full"
//           />
//           {errors.videoName && (
//             <p className="text-red-500 text-sm">{errors.videoName.message}</p>
//           )}
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="duration" className="text-lg font-medium">
//             Duration
//           </Label>
//           <Input
//             id="duration"
//             type="text"
//             placeholder="e.g., 5:00"
//             {...register('duration')}
//             className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
//           />
//         </div>
//       </div>
//       <div className="space-y-2">
//         <Label htmlFor="videoDescription" className="text-lg font-medium">
//           Video Description *
//         </Label>
//         <Textarea
//           id="videoDescription"
//           type="text"
//           placeholder="Complete guide to performing the perfect barbell back squat"
//           {...register('videoDescription', {
//             required: 'Video Description is required.',
//           })}
//           className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6] rounded-none"
//         />
//         {errors.videoDescription && (
//           <p className="text-red-500 text-sm">
//             {errors.videoDescription.message}
//           </p>
//         )}
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-end space-x-4 mt-8">
//         <button
//           type="submit"
//           className="cursor-pointer font-medium py-2 px-4 flex items-center gap-2 bg-secondary text-white hover:bg-secondary/75"
//         >
//           Next
//           <FaArrowRightLong />
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Step1;

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getHyperVideos } from '@/services/admin/excercise-library';
import { useRef, useState } from 'react'; // 👈 IMPORT useRef
import { FaArrowRightLong } from 'react-icons/fa6';

const Step1 = ({ onNext, register, errors, handleSubmit, setVideoId }: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchVideos, setSearchVideos] = useState([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleGetVideos = async () => {
    // 👇 1. Get the current value from the input ref
    const newSearchTerm = inputRef.current?.value || '';

    // Stop if the input is empty
    if (!newSearchTerm) {
      setSearchTerm(''); // Clear the submitted term if input is empty
      setSearchVideos([]); // Clear previous results
      return;
    }

    // 👇 2. Update the state with the submitted term (triggers the 'No videos found' check)
    setSearchTerm(newSearchTerm);

    try {
      // 3. Use the newSearchTerm for the API call
      const response = await getHyperVideos(newSearchTerm);
      console.log('++++++++Result+++++++', response);
      setSearchVideos(response?.data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setSearchVideos([]); // Ensure array is empty on error
    }
  };

  console.log('=================SearchVideos===========>', searchVideos);
  console.log('=================SearchTerm===========>', searchTerm);

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      {/* Link Section */}
      <div className="space-y-2">
        <Label htmlFor="videoLink" className="text-lg font-medium">
          Select Video
        </Label>
        <div className="flex space-x-2">
          <Input
            id="videoLink"
            placeholder="Write the video name for search"
            // REMOVED onChange={(e) => setSearchTerm(e.target.value)}
            // 👇 ADDED ref to link the input to the ref
            ref={inputRef}
            className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
          />
          <Button
            type="button"
            onClick={handleGetVideos} // This function now handles state update and API call
            className="cursor-pointer font-medium py-2 px-4 transition-colors duration-200 bg-secondary text-white  border-none "
          >
            Search
          </Button>
        </div>

        {/* Search Results Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {searchVideos.length > 0 ? (
            <div className="max-h-60 overflow-y-auto mt-4 border border-gray-700 p-2">
              {searchVideos.map((video: any) => (
                <div
                  key={video.id}
                  className="p-2 bg-secondary cursor-pointer hover:bg-secondary/75"
                  onClick={() => setVideoId(video.id)}
                >
                  <video
                    src={video?.preview?.url}
                    className="w-full h-36 object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={video?.preview?.thumbnail}
                  />
                  <p className="font-medium mt-2">{video?.name}</p>
                </div>
              ))}
            </div>
          ) : (
            searchTerm &&
            searchTerm !== '' && (
              <p className="text-[#B9BDC6] mt-4">
                No videos found. Try a different search term.
              </p>
            )
          )}
        </div>
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
            {...register('videoName', { required: 'Video Name is required.' })}
            className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6] w-full"
          />
          {errors.videoName && (
            <p className="text-red-500 text-sm">{errors.videoName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration" className="text-lg font-medium">
            Duration
          </Label>
          <Input
            id="duration"
            type="text"
            placeholder="e.g., 5:00"
            {...register('duration')}
            className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="videoDescription" className="text-lg font-medium">
          Video Description *
        </Label>
        <Textarea
          id="videoDescription"
          type="text"
          placeholder="Complete guide to performing the perfect barbell back squat"
          {...register('videoDescription', {
            required: 'Video Description is required.',
          })}
          className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6] rounded-none"
        />
        {errors.videoDescription && (
          <p className="text-red-500 text-sm">
            {errors.videoDescription.message}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end space-x-4 mt-8">
        <button
          type="submit"
          className="cursor-pointer font-medium py-2 px-4 flex items-center gap-2 bg-secondary text-white hover:bg-secondary/75"
        >
          Next
          <FaArrowRightLong />
        </button>
      </div>
    </form>
  );
};

export default Step1;
