"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { DonationsProps } from '@/types'
import EmptyState from '@/components/emptyState'
import { fetchDonations } from '@/services/dashboard'
import Image from 'next/image'
import Pill from '@/components/Pill'
import { BtnPrimary } from '@/components/Buttons'
import generatePDF, { Margin } from 'react-to-pdf'
import DownloadModal from '@/components/DownloadModal'


const Donations = () => {
    const [responseData, setResponseData] = useState<any>()
    const [pageNumber, setPageNumber] = useState(1)
    const [showModal, setShowModal] = useState(false)
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
        <Head title='Donations'/>
        <DownloadModal open={showModal} onClose={() => setShowModal(false)} name='Donations' />
        <div className='mt-5'>
          <BtnPrimary onClick={() => setShowModal(true)} className={'flex gap-1'}>
            <span>Export{" "}</span>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 13V14.2C19 15.8802 19 16.7202 18.673 17.362C18.3854 17.9265 17.9265 18.3854 17.362 18.673C16.7202 19 15.8802 19 14.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V13M15 8L10 13M10 13L5 8M10 13V1" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </BtnPrimary>
        </div>
        <div className='w-full mt-4'>
          {
            responseData?.result?.length === 0 ? 
            <EmptyState text='No Donations'/>:
            <Table
            head={['Picture', 'Name', 'Amount', 'Currency','Date', 'Status']}
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
                        <td className='p-4 font-light '>{donation.userId.firstName}{' '}{donation.userId.lastName}</td>
                        <td className='p-4 font-light'>{donation.amount.toLocaleString('en-US')}</td>
                        <td className='p-4 font-light'>{donation.currency}</td>
                        <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
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
