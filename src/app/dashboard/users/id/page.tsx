import Head from '@/components/Head'
import Table from '@/components/Table'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import React from 'react'

const SingleUser = () => {
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
                        <td className='py-3'>Mike Bolanle</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Email</td>
                        <td className='py-3'>Mikebola@gmail.com</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Birth Date</td>
                        <td className='py-3'>02/10/2004</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Phone Number</td>
                        <td className='py-3'>+234 651-406-5337</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Gender</td>
                        <td className='py-3'>Male</td>
                    </tr>
                    <tr>
                        <td className='py-3'>Country</td>
                        <td className='py-3'>Nigeria</td>
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
                        <td className='py-3'>30</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Highest Streak</td>
                        <td className='py-3'>100</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Quiz Taken</td>
                        <td className='py-3'>10</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Highest Score</td>
                        <td className='py-3'>12</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Insights Shared</td>
                        <td className='py-3'>50</td>
                    </tr>
                    <tr>
                        <td className='py-3'>Donations</td>
                        <td className='py-3'>0</td>
                    </tr>
                 </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default SingleUser
