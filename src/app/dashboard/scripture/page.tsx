"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import image from '../../../../public/image'
import Pill from '@/components/Pill'
import { TrashIcon } from '@heroicons/react/24/outline'
import { EditIcon } from '../../../../public/icons'
import { Btn, BtnPrimary } from '@/components/Buttons'
import Modal from '@/components/Modal'
import InputField from '@/components/Inputfield'
import { fetchScriptures } from '@/services/scriptureService'
import { ScriptureProps } from '@/types'

const Scripture = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [responseData, setResponseData] = useState<any>()

    useEffect(() =>{
        const fetchAllScriptures = async() =>{
            try {
                const response = await fetchScriptures({pageNumber: pageNumber, pageSize: 8})
                console.log(response);
                setResponseData(response.result)
            } catch (error) {
                console.log(error);    
            }
        }
        fetchAllScriptures()
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

   const addOldTestament = () => {
    
   }

   const addNewTestament = () => {

   }

    const handleSubmit = () => {}

    const options = [1,5,10,20]
  return (
    <div>
        <Head title='Scripture of the Day'/>
        <div className='mt-8'>
            <BtnPrimary onClick={()=>setShowModal(true)}>Add the scripture of the day</BtnPrimary>
        </div>
        <div className='w-full'>
            <Table
            head={['Old Testatment', 'New Testament', 'Date', 'Action']}
            body={responseData?.schedules.map((schedule:ScriptureProps, index: number) =>
                <>
                    <tr className='border border-white' key={index}>
                        <td className='p-4 font-normal tracking-wide'>
                        {schedule?.oldTestament?.title}
                        </td>
                        <td className='p-4 font-light'>{schedule?.newTestament.title}</td>
                        <td className='p-4 font-light'>
                            <p>{new Date(schedule.createdAt).toLocaleDateString()}</p>
                        </td>
                        <td className='pl-4 font-light flex gap-2 items-center h-14'>
                            <div>
                                <EditIcon />
                            </div>
                            <TrashIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mr-1" aria-hidden="true"/>
                        </td>
                    </tr>
                </>
                )}
            itemsPerPage={8}
            showFilter={false}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            totalPages={responseData?.totalPages}
            />
        </div>

        <Modal
        show={showModal}
        hide={() => setShowModal(false)}
        heading="Scripture of the Day"
      >
        <form className='mb-12'> 
            <InputField placeholder='Title'/>
            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mb-4 font-light text-sm'>
            <option>Old Testament</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
            <p className='text-primary font-semibold text-xs capitalize mb-3'>Add More books from the Old Testament</p>
            <InputField placeholder='Title'/>
            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mb-4 font-light text-sm'>
            <option>New Testament</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
            <p className='text-primary font-semibold text-xs capitalize mb-3'>Add More books from the New Testament</p>
            <InputField type='date'/>
         </form>
          <BtnPrimary className="font-semibold text-base mb-6 tracking-wide" type="submit" onClick={handleSubmit}>Update SOD</BtnPrimary>
      </Modal>         
    </div>
  )
}

export default Scripture