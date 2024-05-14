'use client'

import Head from '@/components/Head'
import Sidebar from '@/components/Sidebar'
import StatCard from '@/components/statCard'
import React from 'react'
import { DonationIcon, RoundArrow, UserIcon, UserIcon2 } from '../../../public/icons'
import { CalendarIcon } from '@heroicons/react/24/outline'
import Pill from '@/components/Pill'
import { BtnPrimary } from '@/components/Buttons'
import Image from 'next/image'
import image from '../../../public/image'

const Dashboard = () => {
  return (
    <>
        <div>
            <Head title='Dashboard'/>
            <div className='flex gap-5'>
                <div className='w-8/12 '>
                    <div className='flex justify-between'>
                        <StatCard Icon={<DonationIcon/>} Title='Total Donations' total='₦30,243,780.00' detail='2024' className='bg-[#5372E7]'/>
                        <StatCard Icon={<UserIcon2/>} Title='Total Users' total='30,678' detail='Active Users: 25,678' className='bg-[#3EC295]'/>
                        <StatCard Icon={<RoundArrow/>} Title='Insights Shared' total='82,100' detail='All Time' className='bg-[#FF9F24]'/>
                    </div>
                    <div></div>
                    <div className='bg-background rounded-xl py-6 px-7'>
                        <div className='flex justify-between'>
                            <h3 className='font-semibold text-lg'>Upcoming Prayers</h3>
                            <span className='text-primary text-sm font-normal'>View All</span>
                        </div>
                        <table className='w-full'>
                            <tbody>
                                <tr>
                                    <td className='text-sm py-5'>Prayer for Married Women Across Nigeria</td>
                                    <td className='text-sm font-light text-[#47464A] flex py-5'>
                                        <CalendarIcon className="h-5 w-5 flex-shrink-0 mr-1 text-[#84818A]" aria-hidden="true"/>
                                        Today
                                    </td>
                                    <td className='pl-4'><Pill text='In Progress'/></td>
                                </tr>
                                <tr>
                                    <td className='text-sm py-5'>Prayer for Married Women Across Nigeria</td>
                                    <td className='text-sm font-light text-[#47464A] flex py-5'>
                                        <CalendarIcon className="h-5 w-5 flex-shrink-0 mr-1 text-[#84818A]" aria-hidden="true"/>
                                        Today
                                    </td>
                                    <td className='pl-4'><Pill text='Happening Soon'/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='w-2/6'>
                    <div className='bg-background p-4 rounded-lg'>
                        <h3 className='text-base font-medium'>Top Donations</h3>
                        <div className='flex justify-between'>
                            <div>
                                <Image src={image.user} alt="user image" />
                                <div>
                                    <h3>Emmanuel Mark</h3>
                                    <p>2 hours ago</p>
                                </div>
                            </div>
                            <span>N2,393,100.00</span>
                        </div>
                        <BtnPrimary className="w-full">View All Donations</BtnPrimary>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard