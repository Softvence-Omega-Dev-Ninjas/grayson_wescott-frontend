/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getHyperVideos } from '@/services/admin/excercise-library';
import { useEffect, useRef, useState } from 'react';
import { FaArrowRightLong, FaSpinner } from 'react-icons/fa6';

const Step1 = ({ onNext, register, errors, handleSubmit, setVideoId }: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchVideos, setSearchVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Fetch initial 10 videos
  useEffect(() => {
    const fetchInitialVideos = async () => {
      setLoading(true);
      try {
        const response = await getHyperVideos('');
        const allVideos = response?.data || [];
        setSearchVideos(allVideos.slice(0, 10));
      } catch (error) {
        console.error('Error fetching initial videos:', error);
        setSearchVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialVideos();
  }, []);

  const handleGetVideos = async () => {
    const newSearchTerm = inputRef.current?.value?.trim() || '';
    setLoading(true);

    if (!newSearchTerm) {
      setSearchTerm('');
      try {
        const response = await getHyperVideos('');
        const allVideos = response?.data || [];
        setSearchVideos(allVideos.slice(0, 10));
      } catch (error) {
        console.error('Error fetching default videos:', error);
        setSearchVideos([]);
      } finally {
        setLoading(false);
      }
      return;
    }

    setSearchTerm(newSearchTerm);

    try {
      const response = await getHyperVideos(newSearchTerm);
      setSearchVideos(response?.data || []);
    } catch (error) {
      console.error('Error fetching searched videos:', error);
      setSearchVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideoId(videoId);
    setVideoId(videoId);
    setVideoError('');
  };

  const handleNext = (data: any) => {
    if (!selectedVideoId) {
      setVideoError('Video is required.');
      return;
    }
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(handleNext)} className="space-y-6">
      {/* Video Search Section */}
      <div className="space-y-2">
        <Label htmlFor="videoLink" className="text-lg font-medium">
          Select Video
        </Label>
        <div className="flex space-x-2">
          <Input
            id="videoLink"
            ref={inputRef}
            placeholder="Search HyperHuman videos by name..."
            className="bg-secondary border-none text-white p-2.5 flex-1 placeholder:text-[#B9BDC6]"
          />
          <Button
            type="button"
            onClick={handleGetVideos}
            disabled={loading}
            className="cursor-pointer font-medium py-2 px-4 transition-colors duration-200 bg-secondary text-white border-none flex items-center gap-2"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin text-white" /> Loading...
              </>
            ) : (
              'Search'
            )}
          </Button>
        </div>

        {/* Video List */}
        <div className="max-h-60 overflow-y-auto mt-4 border border-gray-700 p-2">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <FaSpinner className="animate-spin text-white text-3xl" />
            </div>
          ) : searchVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {searchVideos.map((video: any) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoSelect(video.id)}
                  className={`p-2 cursor-pointer bg-secondary hover:bg-secondary/75 ${
                    selectedVideoId === video.id
                      ? 'ring-3 ring-slate-400' // 👈 highlight selected video
                      : ''
                  }`}
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
            searchTerm && (
              <p className="text-[#B9BDC6] mt-4 text-center">
                No videos found. Try a different search term.
              </p>
            )
          )}
        </div>

        {/* Video Validation Error */}
        {videoError && (
          <p className="text-red-500 text-sm mt-2">{videoError}</p>
        )}
      </div>

      {/* Basic Information Section */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="videoName" className="text-lg font-medium">
            Excercise Title *
          </Label>
          <Input
            id="videoName"
            type="text"
            placeholder="e.g., Barbell Back Squat"
            {...register('title', { required: 'Video Name is required.' })}
            className="bg-secondary border-none text-white p-2.5 placeholder:text-[#B9BDC6] w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="text-lg font-medium">
            Duration(in min) *
          </Label>
          <Input
            id="duration"
            type="text"
            placeholder="e.g., 30"
            {...register('duration', { required: ' Duration is required.' })}
            className="bg-secondary border-none text-white p-2.5 placeholder:text-[#B9BDC6]"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="videoDescription" className="text-lg font-medium">
          Excercise Description *
        </Label>
        <Textarea
          id="description"
          placeholder="Complete guide to performing the perfect barbell back squat"
          {...register('description', {
            required: 'Excercise Description is required.',
          })}
          className="bg-secondary border-none text-white p-2.5 placeholder:text-[#B9BDC6] rounded-none"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end mt-8">
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
