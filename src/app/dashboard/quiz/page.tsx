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

const Quiz = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)

    const handleSubmit = () => {}

    const options = [1,5,10,20]
  return (
    <div>
        <Head title='Quiz'/>
        <div className='mt-8'>
            <BtnPrimary onClick={()=>setShowModal(true)}>Create Quiz</BtnPrimary>
        </div>
        <div className='w-full'>
            <Table
            head={['Quiz Title', 'Type', 'Number of Questions', 'Quiz Date', 'Action']}
            body={Array.from({length: 50},(index: number) =>
                <>
                    <tr className='border border-white' key={index}>
                        <td className='p-4 font-normal tracking-wide'>
                        January Week 1 Quiz
                        </td>
                        <td className='p-4 font-light'>Weekly Quiz</td>
                        <td className='p-4 font-light'>10</td>
                        <td className='p-4 font-light'>
                            <p>08:00 AM</p>
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
        className='h-4/5'
      >
        <form className='mb-12'>
            <InputField placeholder="Quiz Title"/>   
            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mt-4 font-light text-sm'>
            <option>Quiz Type</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mt-4 font-light text-sm'>
            <option>Quiz Starting Date</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mt-4 font-light text-sm'>
            <option>Quiz Ending Date</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
            <h3 className='font-semibold text-[32px] text-center mt-5'>Questions</h3>
            <InputField placeholder="Question 1"/>
            <InputField placeholder="Option 1"/>
            <InputField placeholder="Option 2"/>
            <InputField placeholder="Option 3"/>
            <InputField placeholder="Option 4"/>
            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mt-4 font-light text-sm'>
            <option>Answer</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
            <InputField placeholder="Answer Explanation "/>
            <div className='text-primary font-semibold text-[15px] mt-3'>
                <p>Click to Add More Questions</p>
            </div>
         </form>
          <BtnPrimary className="font-semibold text-base mb-6 tracking-wide" type="submit" onClick={handleSubmit}>Create Quiz</BtnPrimary>
      </Modal>         
    </div>
  )
}

export default Quiz