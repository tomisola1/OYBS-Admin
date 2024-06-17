"use client"

import { ArrowLeftIcon, ArrowRightIcon, BackwardIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useEffect, useState } from 'react'
import { BtnPrimary } from './Buttons';
import Modal from './Modal';
import InputField from './Inputfield';
import { fetchUsers, suspendUsers } from '@/services/userService';
import { SkeletonLoader } from './Loaders';
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
   currentPageNumber?: number
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


   // Generate an array of page numbers to display
   // const getPageNumbers = () => {
   //    const pageNumbers = [];
   //    for (let i = 1; i <= totalPages; i++) {
   //       console.log(i, totalPages);

   //       if (i <= 3 || i > totalPages - 3 || (i >= currentPage - 1 && i <= currentPage + 1) || +i == +totalPages) {
   //          pageNumbers.push(i);
   //       }
   //    }
   //    console.log(pageNumbers);
      
   //    return pageNumbers;
   // };

   const handleSearch = (e: any) => {
      setSearchText(e.target.value)
      setCurrentPage(1)
   }
   
   // const users = async()=>{
   //    const res = await fetchUsers({pageNumber: currentPage, pageSize: 8,emailAddress:searchText})
   //    setFiltered(res.result.users)
   //    console.log(filtered);
      
   //    // console.log(res);
      
   // }

   // useEffect(() => {
   //    if (searchText) {
   //      users();
   //    }else {
   //       setFiltered(body); // Reset to the original body if search text is cleared
   //     }
   //  }, [searchText]);

 
   return (
      <div className='w-full overflow-auto'>
         {/* {
            showFilter &&
            <div className='flex gap-5 items-center'>
                <div className='relative'>
                    <MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0 text-gray-500 ml-1 absolute top-3 left-2"
                aria-hidden="true" />
                    <input placeholder='Search by email' onChange={handleSearch} className='pr-3.5 pl-10 py-2.5 rounded-lg placeholder:text-gray-500 placeholder:text-sm w-80 focus:outline-none focus:border-orange-200 bg-[#F5F6FC]'/>
                </div>
            </div>
         } */}

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