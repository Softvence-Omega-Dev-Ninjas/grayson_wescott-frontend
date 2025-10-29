import clockIcon from '@/assets/dashboard/excercise-library/clockIcon.png';
import crossIcon from '@/assets/dashboard/excercise-library/cross.png';
import dumbellIcon from '@/assets/dashboard/excercise-library/dumbellIcon.png';
import levelIcon from '@/assets/dashboard/excercise-library/levelIcon.png';
import tagIcon from '@/assets/dashboard/excercise-library/tagIcon.png';
import tickIcon from '@/assets/dashboard/excercise-library/tick.png';
import watchIcon from '@/assets/dashboard/excercise-library/watchIcon.png';
import { getExcerciseDetails } from '@/services/admin/excercise-library';
import Image from 'next/image';
import { RelatedVideos } from './_components/RelatedVideos/RelatedVideos';
import { VideoPlayer } from './_components/VideoPlayer/VideoPlayer';

const WorkoutPlayVideoPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const excerciseDetails = await getExcerciseDetails(id);
  return (
    <div className="mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <VideoPlayer
            src={excerciseDetails?.data?.videoUrl}
            poster={excerciseDetails?.data?.thumbnailUrl}
          />

          {/* Video Info */}
          <div className="space-y-2 mb-5">
            <h1 className="text-2xl font-bold">
              {excerciseDetails?.data?.title}
            </h1>

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
              <div className="flex items-center gap-1">
                <Image
                  src={watchIcon}
                  alt="Tags"
                  width={12}
                  height={12}
                  className="shrink-0"
                />
                <span className="font-medium text-sm text-white mt-0.5">
                  {excerciseDetails?.data?.views} views
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-300 leading-relaxed">
              {excerciseDetails?.data?.description}
            </p>

            <div className="mt-4 space-y-2">
              <p className="text-gray-300">
                <strong>Benefits:</strong>
              </p>
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
              <p className="text-gray-300">
                <strong>Common Mistakes to Avoid:</strong>
              </p>
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

          {/* Downloadable Resources */}
          {/* <div className=" mt-6">
            <h3 className="text-lg font-semibold mb-4">
              Downloadable Resources
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="border border-secondary bg-primary-200 cursor-pointer hover:bg-primary-100 border-none hover:text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                Form Guide
              </Button>
              <Button
                variant="outline"
                className="border border-secondary bg-primary-200 cursor-pointer hover:bg-primary-100 border-none hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Workout Tracker
              </Button>
            </div>
          </div> */}

          {/* Notes & Tips */}
          {/* <NotesTips notes={notesTips} /> */}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <RelatedVideos videos={excerciseDetails?.data?.relatedExercises} />
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlayVideoPage;
