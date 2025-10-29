/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from '@/components/shared/dashboard/Pagination/Pagination';
import SectionHeader from '@/components/shared/main/SectionHeader/SectionHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function ProgramsBuildYou({ programs }: { programs: any }) {
  return (
    <div className="text-white py-12 px-4 md:px-8">
      <SectionHeader
        title="Programs that actually build you."
        description="No fluff. Just execution."
      />

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 grid-cols-1 gap-8 mt-10">
        {programs?.data?.map((item: any, index: number) => (
          <div
            key={item?.name || index}
            className="bg-primary-200 p-6 space-y-4 flex flex-col justify-between transition-all duration-300 ease-in-out  hover:shadow-lg"
          >
            {/* Top section: Title, Subtitle, Description */}
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-white">{item?.name}</h1>
              <p className="text-gray-300 font-medium">{item?.description}</p>
              {/* <h3 className="text-lg font-semibold mt-4">{item?.coachNote}</h3> */}
            </div>

            {/* Features List */}
            <div className="space-y-2 flex-grow">
              {item?.exercisesTitles
                ?.slice(0, 3)
                ?.map((feature: string, idx: number) => (
                  <div className="flex items-start gap-2" key={idx}>
                    <svg
                      className="w-5 h-5 text-blue-400 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <p className="text-gray-200">{feature}</p>
                  </div>
                ))}
              {item?.exerciseTitles?.length > 3 && (
                <p className="text-white">....</p>
              )}
            </div>

            {/* Footer and Button */}
            <div className="space-y-4 pt-4">
              <p className="text-sm text-gray-400">Note: {item?.coachNote}</p>
              <Link href={`/programs/${item?.id}`}>
                <Button className="bg-[#B9BDC6] cursor-pointer text-black text-lg  font-bold py-2 px-4 w-full transition-colors duration-200 hover:bg-[#B9BDC6]/80 ">
                  View Program
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 flex justify-center">
        <Pagination
          activePage={programs?.metadata?.page || 1}
          totalPages={programs?.metadata?.totalPage || 1}
        />
      </div>
    </div>
  );
}

export default ProgramsBuildYou;
