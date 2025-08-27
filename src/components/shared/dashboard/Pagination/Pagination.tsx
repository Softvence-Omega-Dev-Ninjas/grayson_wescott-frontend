"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  activePage: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({ activePage, totalPages = 20, onPageChange }: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (onPageChange && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const baseBtnClasses = "h-8 w-8 p-0 hover:bg-gray-800 border border-gray-700 cursor-pointer text-white";

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            variant={i === activePage ? "default" : "ghost"}
            size="sm"
            className={cn(baseBtnClasses, i === activePage && "bg-secondary text-white hover:bg-gray-200")}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>
        );
      }
    } else {
      // Calculate start and end page numbers
      let startPage = Math.max(1, activePage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Adjust start page if we're near the end
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      // Show ellipsis at the beginning if needed
      if (startPage > 1) {
        pages.push(
          <Button key={1} variant="ghost" size="sm" className={cn(baseBtnClasses)} onClick={() => handlePageChange(1)}>
            1
          </Button>
        );

        if (startPage > 2) {
          pages.push(
            <span key="start-ellipsis" className="flex h-8 w-8 items-center justify-center text-sm text-gray-400">
              ...
            </span>
          );
        }
      }

      // Show the visible page numbers
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Button
            key={i}
            variant={i === activePage ? "default" : "ghost"}
            size="sm"
            className={cn(baseBtnClasses, i === activePage && "bg-secondary text-white hover:bg-gray-200")}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>
        );
      }

      // Show ellipsis at the end if needed
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(
            <span key="end-ellipsis" className="flex h-8 w-8 items-center justify-center text-sm text-gray-400">
              ...
            </span>
          );
        }

        pages.push(
          <Button key={totalPages} variant="ghost" size="sm" className={cn(baseBtnClasses)} onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </Button>
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
}
