'use client'

import { useState } from "react";

import { useQueryParams } from "@/hooks/useQueryParams";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { queryParams, setQueryParams } = useQueryParams();  
  const currentOffset = parseInt(queryParams?.offset) || 0;

  const handlePageNextChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);

      setQueryParams({
        ...queryParams,
        offset: currentOffset + 20
      })
    }
  };

  const handlePagePrevChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    
      setQueryParams({
        ...queryParams,
        offset: currentOffset - 20
      })
    }
  };

  return (
    <div data-testid="pagination" className="flex items-stretch justify-between space-x-2 mt-4 border-t border-gray-300 mt-12 pt-4">
      <button
        onClick={() => handlePagePrevChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded disabled:text-gray-400 flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>
        Previous
      </button>

      <button
        onClick={() => handlePageNextChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded disabled:text-gray-400 flex items-center"
      >
        Next 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
      </button>
    </div>
  );
};