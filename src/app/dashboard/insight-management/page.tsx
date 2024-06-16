"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Btn} from '@/components/Buttons'
import Modal from '@/components/Modal'
import { deleteInsights, fetchInsights } from '@/services/insights'
import { InsightProps } from '@/types'
import EmptyState from '@/components/emptyState'
import { SkeletonLoader } from '@/components/Loaders'

const InsightManagement = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [responseData, setResponseData] = useState<any>()
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        const fetchAllInsights = async() =>{
             setLoading(true)
            try {
                const response = await fetchInsights({pageNumber: pageNumber, pageSize: 8})
                console.log(response);
                setResponseData(response)
                setLoading(false)
            } catch (error) {
                console.log(error);    
            }
        }
        fetchAllInsights()
    },[pageNumber])
    
    
   // Handle previous page
   const handlePreviousPage = () => {
    if (pageNumber > 1){
        setPageNumber(pageNumber - 1)
    }
   };

   // Handle next page
   const handleNextPage = () => {
      setPageNumber(pageNumber + 1)
   };


    const handleDelete = async(id:string|undefined) => {
      try {
        setShowModal(true)
        const result = await deleteInsights(id)
        if (result.success){
          setShowModal(false)
          location.reload()
        }
      } catch (error) {
        console.log(error);    
      }
    }

  return (
    <div>
        <Head title='Insight Management'/>
        <div className='w-full mt-10'>
          {
            responseData?.result?.length === 0 ? 
            <EmptyState text='No insignts reported'/>:
            <Table
            head={['UserName', 'Insight Reported', 'Likes', 'Date Reported', 'Action']}
            body={responseData?.result?.map((insight: InsightProps, index: number) =>
                <>
                    <tr className='border border-white' key={index}>
                        <td className='p-4 font-normal tracking-wide pl-6'>
                        {insight?.userId?.firstName}{' '}{insight?.userId?.lastName}
                        </td>
                        <td className='p-4 font-light w-1/3'>{insight.content}</td>
                        <td className='p-4 font-light'>{insight.likes}</td>
                        <td className='p-4 font-light'>
                            <p>
                              {new Date(insight.createdAt).toLocaleDateString()}
                            </p>
                        </td>
                        <td className='pl-4 font-light flex gap-2 items-center h-14'>
                            <TrashIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mr-1" aria-hidden="true" onClick={()=>handleDelete(insight._id)}/>
                        </td>
                    </tr>
                </>
                )}
            itemsPerPage={8}
            showFilter={false}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            totalPages={responseData?.result?.length}
            isLoading={loading}
            currentPageNumber={pageNumber}
            />
          }
        </div>
        <Modal
        show={showModal}
        hide={() => setShowModal(false)}
        heading="Delete Insight"
        sub="Are you sure you want to delete this insight?"
      >
        <div className='flex justify-center gap-6'>
            <Btn className="px-10 text-sm">No, Cancel</Btn>
            <Btn className="px-10 text-sm">Yes, Confirm</Btn>
        </div>
      </Modal>        
    </div>
  )
}

export default InsightManagement