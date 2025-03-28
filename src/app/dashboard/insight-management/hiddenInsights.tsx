"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Btn} from '@/components/Buttons'
import Modal from '@/components/Modal'
import { fetchInsights, hideInsights } from '@/services/insights'
import { InsightProps } from '@/types'
import EmptyState from '@/components/emptyState'
import { toast } from 'react-toastify'

const HiddenInsights = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [responseData, setResponseData] = useState<any>()
    const [pageNumber, setPageNumber] = useState(1)
    const [selectedInsight, setSelectedInsight] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        const fetchAllInsights = async() =>{
             setLoading(true)
            try {
                const response = await fetchInsights({pageNumber: pageNumber, pageSize: 8, isHide: true})
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

   const setIdAndModal = (id:string) => {
    setSelectedInsight(id)
    setShowModal(true)
   }

    const handleUnhide = async(id:string|undefined) => {
      try {
        setShowModal(true)
        const result = await hideInsights(id, {hide: false})
        if (result.success){
          toast.success("Insight is no longer hidden")
          setShowModal(false)
          location.reload()
        }
      } catch (error) {
        console.log(error);    
      }
    }

  return (
    <div>
        <div className='w-full'>
          {
            responseData?.result?.length === 0 ? 
            <EmptyState text='No hidden insights'/>:
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
                        <td className='pl-4 font-bold flex gap-2 items-center h-14 text-primary cursor-pointer text-[11.75px]' onClick={() => setIdAndModal(insight._id) }>
                            {/* <TrashIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mr-1" aria-hidden="true" onClick={() => setIdAndModal(insight._id) } /> */}
                            Unhide
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
        heading="Unhide Insight"
        sub="Are you sure you want to unhide this insight?"
      >
        <div className='flex justify-center gap-6'>
            <Btn className="px-10 text-sm">No, Cancel</Btn>
            <Btn className="px-10 text-sm" onClick={()=>handleUnhide(selectedInsight)}>Yes, Confirm</Btn>
        </div>
      </Modal>        
    </div>
  )
}

export default HiddenInsights