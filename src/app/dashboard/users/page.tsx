"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import { useRouter } from 'next/navigation'
import React from 'react'

const Users = () => {
    const router = useRouter()
  return (
    <div>
        <Head title='Users'/>
        <div className='w-full mt-10'>
            <Table
            head={['Name', 'Email', 'Phone Number', 'Streak', 'Insights Shared', 'Date joined']}
            body={Array.from({length: 50},(index: number) =>
                <>
                    <tr className='border border-white' key={index} onClick={()=>router.push("/dashboard/users/id")}>
                        <td className='p-6 font-medium tracking-wide'>David Wagner</td>
                        <td className='p-6 font-light'>david_wagner@example.com</td>
                        <td className='p-6 font-light w-48'>+223 806 678 9076</td>
                        <td className='p-6 font-light'>20</td>
                        <td className='p-6 font-light w-36'>300</td>
                        <td className='p-6 font-light w-36'>24/04/2024</td>
                    </tr>
                </>
                )}
            itemsPerPage={8}
            showFilter={true}
            BtnItem='Suspend User'
            />
        </div>
    </div>
  )
}

export default Users