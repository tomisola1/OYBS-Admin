"use client"

import { ArrowLeftIcon, ArrowRightIcon, BackwardIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useEffect, useState } from 'react'
import { BtnPrimary } from './Buttons';
import Modal from './Modal';
import InputField from './Inputfield';
import { fetchUsers, suspendUsers } from '@/services/userService';
import { SkeletonLoader } from './Loaders';
import Image from 'next/image';
// import './index.scss'
interface TableProps {
   head?: React.ReactNode[];
   body: any[];
   type?: 'normal' | 'stripped';
   itemsPerPage?: number;
   showFilter?: boolean
   handleNextPage?: () => void;
   handlePreviousPage?: () => void
   totalPages?: number
   isLoading?: boolean;
   currentPageNumber?: number;
}
function Table({ head, body, type = 'normal', itemsPerPage = 8, showFilter = true, handleNextPage, handlePreviousPage, totalPages, isLoading, currentPageNumber }: TableProps) {

   const [currentPage, setCurrentPage] = useState(1);
   const [searchText, setSearchText] = useState('')


   // Calculate index of the first and last item of the current page
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = Math.min(startIndex + itemsPerPage, body?.length);

   // Filtered and paginated data based on search query
   const filteredData = body?.filter((item) =>
      Object.values(item).some((value: any) =>
         value?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
   );
   const currentPageData = filteredData?.slice(startIndex, endIndex);

   const options = [1,5,10,20]

   // Handle page change
   const handlePageChange = (page: number) => {
      setCurrentPage(page);
   };


   const handleSearch = (e: any) => {
      setSearchText(e.target.value)
      setCurrentPage(1)
   }
   
 
   return (
      <div className='w-full overflow-auto'>

         <table className='w-full overflow-x-auto mt-8 bg-[#F5F6FC] rounded-xl'>
            {
               head &&
               <thead className=' text-black text-left text-base font-medium border-b-2 border-white'>
                  <tr>
                     {
                        head?.map((item: React.ReactNode, idx: number) => (
                           <th key={idx} className='py-5 pl-5'>{item}</th>
                        ))
                     }
                  </tr>
               </thead>
            }
            {
               currentPageData &&
               <tbody className=' text-black text-xs font-normal'>
                  {     
                     currentPageData?.map((item: any, idx: number) => (
                        <Fragment key={idx}>
                           {item}
                        </Fragment>

                        ))
                  }
               </tbody>
            }
         </table>
         {isLoading && <SkeletonLoader />}
         {/* Pagination */}
         <div className='flex gap-7 justify-end my-8'>
          <div>
            {currentPageNumber}{' '}
            of{' '}
            {totalPages}
          </div>
         {
             currentPageData?.length <= itemsPerPage &&
             <div className="flex gap-4">
               <button onClick={handlePreviousPage} className=''>
                    <ArrowLeftIcon className="h-5 w-5 flex-shrink-0 text-gray-700 mr-1" aria-hidden="true" />
               </button>
               <div>
               </div>
               <button onClick={handleNextPage} className=''>
                <ArrowRightIcon className="h-5 w-5 flex-shrink-0 text-gray-700 ml-1" aria-hidden="true"/>
               </button>
            </div>
         }
         </div>

      </div>
   )
}

export default Table