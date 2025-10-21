import clockIcon from '@/assets/dashboard/excercise-library/clockIcon.png';
import crossIcon from '@/assets/dashboard/excercise-library/cross.png';
import dumbellIcon from '@/assets/dashboard/excercise-library/dumbellIcon.png';
import levelIcon from '@/assets/dashboard/excercise-library/levelIcon.png';
import starIcon from '@/assets/dashboard/excercise-library/star.png';
import tagIcon from '@/assets/dashboard/excercise-library/tagIcon.png';
import tickIcon from '@/assets/dashboard/excercise-library/tick.png';
import warningIcon from '@/assets/dashboard/excercise-library/warning.png';
import { Button } from '@/components/ui/button';
import { getExcerciseDetails } from '@/services/admin/excercise-library';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlay } from 'react-icons/fa6';

const ViewExcerciseDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const excerciseDetails = await getExcerciseDetails(id);
  console.log(excerciseDetails);
  return (
    <div className="mb-20">
      {/* Video Info */}
      <div className="space-y-2 mb-5">
        <h1 className="text-2xl font-bold">{excerciseDetails?.data?.title}</h1>

        <div className="flex items-center justify-start flex-wrap gap-x-6 gap-y-2">
          <div className="flex items-center gap-1">
            <Image
              src={tagIcon}
              alt="Tags"
              width={12}
              height={12}
              className="shrink-0"
            />
            <span className="font-medium text-sm text-white">
              {excerciseDetails?.data?.bodyPartTags.join(', ')}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src={levelIcon}
              alt="Tags"
              width={12}
              height={12}
              className="shrink-0"
            />
            <span className="font-medium text-sm text-white mt-0.5">
              {excerciseDetails?.data?.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src={clockIcon}
              alt="Tags"
              width={12}
              height={12}
              className="shrink-0"
            />
            <span className="font-medium text-sm text-white mt-0.5">
              {excerciseDetails?.data?.duration} mins
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src={dumbellIcon}
              alt="Tags"
              width={12}
              height={12}
              className="shrink-0"
            />
            <span className="font-medium text-sm text-white mt-0.5">
              {excerciseDetails?.data?.equipmentTags.join(', ')}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="relative">
            <Image
              src={excerciseDetails?.data?.thumbnailUrl}
              alt="Upload Icon"
              width={500}
              height={500}
              className="w-full h-[500px] object-fill"
            />
            <Link
              href={'/dashboard/admin/all-exercise/video/1'}
              className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-1/2"
            >
              <Button className="flex items-center justify-center gap-1.5 bg-[#7DA6FF]  py-4  px-10 cursor-pointer">
                <FaPlay />
                <span>Play Full Video</span>
              </Button>
            </Link>
          </div>

          {/* Description */}
          <div className="bg-primary-200 border border-secondary p-4">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-300 leading-relaxed">
              {excerciseDetails?.data?.description}
            </p>

            <div className="mt-4 space-y-2 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Image
                    src={starIcon}
                    alt="Upload Icon"
                    className="w-5 h-4 shrink-0"
                  />
                  <h1 className="font-semibold text-xl"> Key Benifits</h1>
                </div>

                {excerciseDetails?.data?.keyBenefits.map(
                  (item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-1.5 mt-1">
                      <Image
                        src={tickIcon}
                        alt="Upload Icon"
                        className="w-3 h-4 shrink-0"
                      />
                      <span className="font-medium text-sm">{item}</span>
                    </div>
                  ),
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Image
                    src={warningIcon}
                    alt="Upload Icon"
                    className="w-5 h-4 shrink-0"
                  />
                  <h1 className="font-semibold text-xl">Common Mistakes</h1>
                </div>

                {excerciseDetails?.data?.commonMistakes.map(
                  (item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-1.5 mt-1">
                      <Image
                        src={crossIcon}
                        alt="Upload Icon"
                        className="w-3 h-4 shrink-0"
                      />
                      <span className="font-medium text-sm">{item}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Exercise Steps */}
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold text-white">Exercise Steps</h3>
            <div className="space-y-3">
              {excerciseDetails?.data?.steps.map(
                (step: string, idx: number) => (
                  <div
                    key={idx}
                    className="bg-primary-200 border border-secondary  p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">{step}</h4>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {/* const exerciseDetails = [
  { label: 'Equipment', value: 'Barbell, Rack' },
  { label: 'Type', value: 'Compound' },
  { label: 'Primary Muscles', value: 'Quads, Glutes, Hamstrings' },
  { label: 'Secondary Muscles', value: 'Core, Lower Back' },
  { label: 'Calories Burn', value: '~120 / 10 min' },
]; */}
        <div className="lg:col-span-1 bg-primary-200 border border-secondary h-fit p-5">
          <h1 className="text-xl font-bold">Excercise Details</h1>
          <div className="space-y-2 mt-6">
            <div className="flex justify-between gap-3 flex-wrap pb-1">
              <span className="text-gray-400">Equipment</span>
              <span className="text-white font-medium">
                {excerciseDetails?.data?.equipment}
              </span>
            </div>
            <div className="flex justify-between gap-3 flex-wrap pb-1">
              <span className="text-gray-400">Type</span>
              <span className="text-white font-medium">
                {excerciseDetails?.data?.type}
              </span>
            </div>
            <div className="flex justify-between gap-3 flex-wrap pb-1">
              <span className="text-gray-400">Primary Muscles</span>
              <span className="text-white font-medium">
                {excerciseDetails?.data?.primaryMuscle}
              </span>
            </div>
            <div className="flex justify-between gap-3 flex-wrap pb-1">
              <span className="text-gray-400">Secondary Muscles</span>
              <span className="text-white font-medium">
                {excerciseDetails?.data?.secondaryMuscle}
              </span>
            </div>
            <div className="flex justify-between gap-3 flex-wrap pb-1">
              <span className="text-gray-400">Calories Burned</span>
              <span className="text-white font-medium">
                {excerciseDetails?.data?.caloriesBurned}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExcerciseDetailsPage;
