"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import image from '../../../../public/image'
import Pill from '@/components/Pill'
import { TrashIcon } from '@heroicons/react/24/outline'
import { EditIcon } from '../../../../public/icons'
import { Btn, BtnPrimary } from '@/components/Buttons'
import Modal from '@/components/Modal'
import InputField from '@/components/Inputfield'

const Scripture = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)

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
            body={Array.from({length: 50},(index: number) =>
                <>
                    <tr className='border border-white' key={index}>
                        <td className='p-4 font-normal tracking-wide'>
                        Judges 5-6
                        </td>
                        <td className='p-4 font-light'>Luke 11:37-54</td>
                        <td className='p-4 font-light'>
                            <p>24/04/2024</p>
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
            />
        </div>

        <Modal
        show={showModal}
        hide={() => setShowModal(false)}
        heading="Create Quiz"
        sub="This will be updated on the OYBS mobile app"
      >
        <form className='mb-12'> 
            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mt-4 font-light text-sm'>
            <option>Old Testament</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mt-4 font-light text-sm'>
            <option>New Testament</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mt-4 font-light text-sm'>
            <option>Date</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
         </form>
          <BtnPrimary className="font-semibold text-base mb-6 tracking-wide" type="submit" onClick={handleSubmit}>Update SOD</BtnPrimary>
      </Modal>         
    </div>
  )
}

export default Scripture