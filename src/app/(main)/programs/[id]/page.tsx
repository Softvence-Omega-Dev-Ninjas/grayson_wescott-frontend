/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPublicProgrammDetails } from '@/services/user/public-program';

const PublicProgramDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  console.log(id);
  const programDetails = await getPublicProgrammDetails(id);
  console.log('++++++++++', programDetails);
  return (
    <div className="mt-28 px-3 md:px-5 container mx-auto">
      <h1 className="text-2xl md:text-4xl font-bold mb-7">
        {programDetails?.data?.name}
      </h1>
      <div className="flex items-center gap-2">
        <h1 className="font-semibold">Categories: </h1>
        <div className="flex items-center gap-4 flex-wrap">
          {programDetails?.data?.categories.map((item: string, idx: number) => {
            return (
              <span
                key={idx}
                className="bg-secondary px-3 py-1 text-sm font-medium"
              >
                {item}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <h1 className="font-medium text-slate-200">
          <span className="text-white font-semibold">Description:</span>{' '}
          {programDetails?.data?.description}
        </h1>
      </div>
      <h1 className="text-xl md:text-2xl mt-8">Excercises: </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 mb-10">
        {programDetails?.data?.exercises?.map((item: any) => {
          return (
            <div key={item?.id} className="mb-4 bg-primary-200 p-5">
              <h1 className="text-lg font-semibold mb-4">{item?.title}</h1>
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4 text-sm font-semibold text-gray-300">
                  <div>
                    Sets: <span className="text-gray-50">{item?.sets}</span>
                  </div>
                  <div>
                    Reps: <span className="text-gray-50">{item?.reps}</span>
                  </div>

                  <div>
                    Rest: <span className="text-gray-50">{item?.rest}</span>
                  </div>
                  <div>
                    Tempo: <span className="text-gray-50">{item?.tempo}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PublicProgramDetails;
