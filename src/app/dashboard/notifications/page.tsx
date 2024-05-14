"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Btn, BtnPrimary} from '@/components/Buttons'
import Modal from '@/components/Modal'
import InputField from '@/components/Inputfield'

const Notifications = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)

    const handleSubmit = () => {}

    const options = [1,5,10,20]
  return (
    <div>
        <Head title='Notifications'/>
        <div className='mt-8'>
            <BtnPrimary onClick={()=>setShowModal(true)}>Send a push notification</BtnPrimary>
        </div>
        <div className='w-full mt-10'>
            <Table
            head={['Header', 'Body', 'Date Sent', '']}
            body={Array.from({length: 50},(index: number) =>
                <>
                    <tr className='border border-white' key={index}>
                        <td className='p-4 font-normal tracking-wide pl-6'>
                        New App Update
                        </td>
                        <td className='p-4 font-light w-1/2'>We have updated our app to a new version. Make sure you download via app store
and play store and don’t forget to share and refer your friends. The One Year Bible 
Study App is available to everyone</td>
                        <td className='p-4 font-light'>
                            <p>24/04/2024</p>
                        </td>
                        <td className='pl-4 font-light'>
                           <BtnPrimary className='!py-3 font-medium'>Resend</BtnPrimary>
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
        heading="Notifications"
        sub="Send out an app push notification"
      >
        <form className='mb-12'> 
            <InputField placeholder='Header'/>
            <InputField as='textarea' placeholder='Body' rows={5}/>
         </form>
          <BtnPrimary className="font-semibold text-base mb-6 tracking-wide" type="submit" onClick={handleSubmit}>Send Notification</BtnPrimary>
      </Modal>        
    </div>
  )
}

export default Notifications