'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  activePage: number;
  totalPages?: number;
}

const Pagination = ({ activePage, totalPages = 1 }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      router.push(`?${params.toString()}`);
    }
  };

  const baseBtnClasses =
    'h-8 w-8 p-0 hover:bg-gray-800 hover:text-white border border-gray-700 cursor-pointer text-white rounded-none';

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            variant={i === activePage ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              baseBtnClasses,
              i === activePage && 'bg-secondary text-white',
            )}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>,
        );
      }
    } else {
      let startPage = Math.max(1, activePage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      if (startPage > 1) {
        pages.push(
          <Button
            key={1}
            variant="ghost"
            size="sm"
            className={cn(baseBtnClasses)}
            onClick={() => handlePageChange(1)}
          >
            1
          </Button>,
        );
        if (startPage > 2)
          pages.push(
            <span key="start-ellipsis" className="text-gray-400">
              ...
            </span>,
          );
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Button
            key={i}
            variant={i === activePage ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              baseBtnClasses,
              i === activePage && 'bg-secondary text-white',
            )}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>,
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1)
          pages.push(
            <span key="end-ellipsis" className="text-gray-400">
              ...
            </span>,
          );
        pages.push(
          <Button
            key={totalPages}
            variant="ghost"
            size="sm"
            className={cn(baseBtnClasses)}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Button>,
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800 disabled:text-gray-600"
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {renderPageNumbers()}

      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800 disabled:text-gray-600"
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
export default Pagination;
