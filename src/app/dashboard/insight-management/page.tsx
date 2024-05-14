"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Btn} from '@/components/Buttons'
import Modal from '@/components/Modal'

const InsightManagement = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)

    const handleSubmit = () => {}

    const options = [1,5,10,20]
  return (
    <div>
        <Head title='Insight Management'/>
        <div className='w-full mt-10'>
            <Table
            head={['UserName', 'Insight Reported', 'Reason for Report', 'Date Reported', 'Action']}
            body={Array.from({length: 50},(index: number) =>
                <>
                    <tr className='border border-white' key={index}>
                        <td className='p-4 font-normal tracking-wide pl-6'>
                        David Wagner
                        </td>
                        <td className='p-4 font-light w-1/3'>I am talking about the bible for today. Just read and read what I have shared you annoying people.</td>
                        <td className='p-4 font-light'>Inappropriate Language</td>
                        <td className='p-4 font-light'>
                            <p>24/04/2024</p>
                        </td>
                        <td className='pl-4 font-light flex gap-2 items-center h-14'>
                            <TrashIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mr-1" aria-hidden="true" onClick={()=>setShowModal(true)}/>
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