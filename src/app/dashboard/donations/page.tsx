"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import React, { useEffect, useState } from 'react'
import { DonationsProps } from '@/types'
import EmptyState from '@/components/emptyState'
import { fetchDonations } from '@/services/dashboard'
import Image from 'next/image'
import Pill from '@/components/Pill'


const Donations = () => {
    const [responseData, setResponseData] = useState<any>()
    const [pageNumber, setPageNumber] = useState(1)

    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        const fetchAllDonations = async() =>{
             setLoading(true)
            try {
               const response = await fetchDonations({pageNumber: 1, pageSize:8})
                setResponseData(response.result)
                setLoading(false)
            } catch (error) {
                console.log(error);    
            }
        }
        fetchAllDonations()
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


  return (
    <div>
        <Head title='Insight Management'/>
        <div className='w-full mt-10'>
          {
            responseData?.result?.length === 0 ? 
            <EmptyState text='No Donations'/>:
            <Table
            head={['Picture', 'Name', 'Amonunt', 'Currency', 'Status']}
            body={responseData?.donations.map((donation:DonationsProps, index: number) =>
                <>
                    <tr className='border border-white' key={index}>
                        <td className='p-4 font-normal tracking-wide pl-6'>
                        {
                          donation?.userId?.profilePicture ?
                          <Image src={donation?.userId?.profilePicture} alt="user image" width={40} height={40} className='rounded-full' />:
                          <Image src={"/assets/defaultImage.svg"} alt="user image" width={40} height={40} className='rounded-full' />
                        }
                        </td>
                        <td className='p-4 font-light w-1/3'>{donation.userId.firstName}{' '}{donation.userId.lastName}</td>
                        <td className='p-4 font-light'>{donation.amount.toLocaleString('en-US')}</td>
                        <td className='p-4 font-light'>{donation.currency}</td>
                       <td><Pill text={donation.transactionStatus}/></td>
                    </tr>
                </>
                )}
            itemsPerPage={8}
            showFilter={false}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            totalPages={responseData?.donations.length}
            isLoading={loading}
            currentPageNumber={pageNumber}
            />
          }
        </div>      
    </div>
  )
}

export default Donations
