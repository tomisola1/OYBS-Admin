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

const AccessControl = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState({form:false, delete:false, edit:false})

    const handleSubmit = () => {}

    const options = [1,5,10,20]
  return (
    <div>
        <Head title='Access Control'/>
        <div className='w-full mt-10'>
            <Table
            head={['Name', 'Email', 'Role', 'Date Added', 'Action']}
            body={Array.from({length: 50},(index: number) =>
                <>
                    <tr className='border border-white' key={index}>
                        <td className='p-4 font-normal tracking-wide'>
                        David Wagner
                        </td>
                        <td className='p-4 font-light'>david_wagner@example.com</td>
                        <td className='p-4 font-medium'>Super Admin</td>
                        <td className='p-4 font-light'>
                            <p>24/04/2024</p>
                        </td>
                        <td className='pl-4 font-light flex gap-2 items-center h-14'>
                            <div onClick={()=>setShowModal({form:false, delete:false, edit:true})}>
                                <EditIcon />
                            </div>
                            <TrashIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mr-1" aria-hidden="true" onClick={()=>setShowModal({form:false, delete:true, edit:false})}/>
                        </td>
                    </tr>
                </>
                )}
            itemsPerPage={8}
            showFilter={true}
            BtnItem='Add User'
            />
        </div>

        <Modal
        show={showModal.form}
        hide={() => setShowModal({form:false, delete:false, edit:false})}
        heading="Add User"
        sub="An email will be sent to the added user with their
        credentials"
      >
        <form className='mb-12'> 
            <InputField placeholder='Full Name'/>
            <InputField placeholder='Email'/>
            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mt-4 font-light text-sm'>
            <option>Select Role</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
         </form>
          <BtnPrimary className="font-semibold text-base mb-6 tracking-wide" type="submit" onClick={handleSubmit}>Add User</BtnPrimary>
      </Modal>
      <Modal
        show={showModal.edit}
        hide={() => setShowModal({form:false, delete:false, edit:false})}
        heading="Edit User"
        sub="This will be updated on the OYBS mobile app"
      >
        <form className='mb-12'>
            <InputField placeholder="Title of Prayer Session"/>
            <InputField placeholder="Meeting Link"/>
            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mt-4 font-light text-sm'>
            <option>Select Role</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
         </form>
          <BtnPrimary className="font-semibold text-base mb-6 tracking-wide" type="submit" onClick={handleSubmit}>Edit User</BtnPrimary>
      </Modal>
        <Modal
        show={showModal.delete}
        hide={() => setShowModal({form:false, delete:false, edit:false})}
        heading="Delete User"
        sub="Are you sure you want to delete this user?"
      >
        <div className='flex justify-center gap-6'>
            <Btn className="px-10 text-sm">No, Cancel</Btn>
            <Btn className="px-10 text-sm">Yes, Confirm</Btn>
        </div>
      </Modal>        
    </div>
  )
}

export default AccessControl