"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Btn, BtnPrimary} from '@/components/Buttons'
import Modal from '@/components/Modal'
import InputField from '@/components/Inputfield'
import Pill from '@/components/Pill'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'

const Support = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)

    const handleSubmit = () => {}

    const options = [1,5,10,20]
  return (
    <div>
        <Head title='Notifications'/>
        <div className='mt-8'>
            <BtnPrimary onClick={()=>setShowModal(true)}>Update support information</BtnPrimary>
        </div>
        <div className='mt-10 flex flex-col gap-10'>
           <div className='bg-background p-5 flex gap-5 w-1/2 rounded-lg'>
            <div className='rounded-full p-4 bg-[#fd6e211f] w-fit flex justify-center'>
                <EnvelopeIcon className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true"/>
            </div>
            <div>
                <h3 className='font-semibold text-base'>Support Email</h3>
                <p className='font-medium text-base'>support@oybs.app</p>
            </div>
           </div>
           <div className='bg-background p-5 flex gap-5 w-1/2 rounded-lg'>
            <div className='rounded-full p-4 bg-[#fd6e211f] w-fit flex justify-center'>
                <PhoneIcon className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true"/>
            </div>
            <div>
                <h3 className='font-semibold text-base'>Support Phone Number</h3>
                <p className='font-medium text-base'>+234 156 890 7890</p>
            </div>
           </div>
        </div>
        <Modal
        show={showModal}
        hide={() => setShowModal(false)}
        heading="Support"
      >
        <form className='mb-12'> 
            <InputField placeholder='Email'/>
            <InputField placeholder='Phone Number'/>
         </form>
          <BtnPrimary className="font-semibold text-base mb-6 tracking-wide" type="submit" onClick={handleSubmit}>Update Information</BtnPrimary>
      </Modal>        
    </div>
  )
}

export default Support