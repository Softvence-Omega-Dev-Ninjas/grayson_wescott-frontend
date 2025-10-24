/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from '@/components/shared/dashboard/Pagination/Pagination';
import { getAllProgramms } from '@/services/admin/programm';
import { Plus, SquarePen } from 'lucide-react';
import Link from 'next/link';

const ClientsProgrammBuildersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const { data, metadata } = await getAllProgramms(page);
  return (
    <div>
      <div className="flex items-center justify-between gap-5 flex-wrap">
        <h1 className="text-xl font-bold">Excercise Library</h1>
        <Link href={'/dashboard/admin/clients-programm-builders/add-program'}>
          <button
            type="button"
            className="cursor-pointer font-medium py-2.5 px-6 flex items-center gap-2 bg-secondary text-white hover:bg-secondary/75"
          >
            <Plus />
            Add Program
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-5 mt-10">
        {data?.map((item: any) => {
          return (
            <div
              key={item?.id}
              className="w-full flex items-center justify-between gap-5  bg-primary-200 hover:bg-primary-200/85 border border-secondary h-auto font-medium py-4 px-4 transition-colors duration-200 cursor-pointer"
            >
              <div className="text-left">
                <p className="font-semibold text-lg">{item?.name}</p>
                <p className="text-base text-gray-400">
                  {item?.description?.length > 100
                    ? item.description.slice(0, 100) + '...'
                    : item?.description}
                </p>
              </div>
              <Link
                href={`/dashboard/admin/clients-programm-builders/${item?.id}`}
              >
                <span>
                  <SquarePen />
                </span>
              </Link>
            </div>
          );
        })}
      </div>
      {/* Pagination */}
      <div className="mt-10 flex justify-center">
        <Pagination
          activePage={metadata?.page || 1}
          totalPages={metadata?.totalPage || 1}
        />
      </div>
    </div>
  );
};

export default ClientsProgrammBuildersPage;
