"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import { fetchSingleUser } from '@/services/userService'
import { UserDetailProps } from '@/types'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'


// export function generateStaticParams() {
//     return 
//   }

const SingleUser = ({ params }: { params: { id: string } }) => {
    const [user, setUser] = useState<UserDetailProps>()
    
    useEffect(() =>{
        const fetchAllUsers = async() =>{
            try {
                const response = await fetchSingleUser(params.id)
                console.log(response);
                setUser(response?.result)
            } catch (error) {
                console.log(error);    
            }
        }
        fetchAllUsers()
    },[params])
  return (
    <div>  
        <Head title='User Details' navigate={true}/>
        <div className='flex gap-5 mt-8'>
            <div className='bg-background w-2/5 p-6 rounded-xl'>
                <h3 className='font-semibold text-base mb-5'>Profile Information</h3>
                <table className='w-full'>
                 <tbody className='font-normal text-sm'>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Name</td>
                        <td className='py-3'>{user?.firstName}{user?.lastName}</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Email</td>
                        <td className='py-3'>{user?.email}</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Birth Date</td>
                        <td className='py-3'>{user?.birthDate ? user?.birthDate :"None"}</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Phone Number</td>
                        <td className='py-3'>{user?.phoneNumber ? user.phoneNumber : "None"}</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Gender</td>
                        <td className='py-3'>{user?.gender ? user?.gender : "None"}</td>
                    </tr>
                 </tbody>
                </table>
            </div>
            <div className='bg-background w-2/5 p-6 rounded-xl'>
                <h3 className='font-semibold text-base mb-5'>Bible Activity</h3>
                <table className='w-full'>
                 <tbody className='font-normal text-sm'>
                    <tr className='border-b border-b-white'>
                        <td className='py-3 w-40'>Current Streak</td>
                        <td className='py-3'>{user?.streak}</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Quiz Taken</td>
                        <td className='py-3'>{user?.quizzesTaken}</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Insights Shared</td>
                        <td className='py-3'>{user?.insightsShared}</td>
                    </tr>
                    <tr>
                        <td className='py-3'>Donations</td>
                        <td className='py-3'>{user?.donations}</td>
                    </tr>
                 </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default SingleUser
