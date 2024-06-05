'use client'

import Head from '@/components/Head'
import Sidebar from '@/components/Sidebar'
import StatCard from '@/components/statCard'
import React, { useEffect, useRef, useState } from 'react'
import { DonationIcon, RoundArrow, UserIcon, UserIcon2 } from '../../../public/icons'
import { CalendarIcon } from '@heroicons/react/24/outline'
import Pill from '@/components/Pill'
import { BtnPrimary } from '@/components/Buttons'
import Image from 'next/image'
import image from '../../../public/image'
import { fetchDonations, fetchTotalDonations, fetchTotalInsights, fetchTotalUsers, fetchUpcomingPrayers } from '@/services/dashboard'
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { DonationsProps, PrayerProps } from '@/types'
import { useRouter } from 'next/navigation'
import { isToday } from 'date-fns'

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
    ssr: false,
});

const Dashboard = () => {
    const canvasEl = useRef();
    const router = useRouter()
    const [totals, setTotals] = useState({
        donations: 0,
        users: 0,
        insights: 0,
        activeUsers: 0,
        prayers: [],
        fetchedDonations: []
    })
    const [prayers, setPrayers] = useState({});

    const bibleTracker = {
      labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Completion Rate',
          data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56,],
          fill: false,
          borderColor: '#29BB89',
          tension: 0.2,
        },
        {
          label: 'Reading Progress',
          data: [65, 59, 65, 59, 80, 81, 56, 80, 81, 56],
          fill: false,
          borderColor: '#5372E7',
          tension: 0.2,
        },
      ],
    };

   
      const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Monthly Quiz Takers',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              '#29BB89',
              '#5372E7'
            ],
            borderColor: [
              '#29BB89',
              '#5372E7'
            ],
            borderRadius: 8,
            barThickness: 28
          },
        ],
      };

  
    useEffect(()=>{
        const fetchTotals = async () => {
            try {
                const donations = await fetchTotalDonations()
                const users = await fetchTotalUsers()
                const insights = await fetchTotalInsights()
                const prayers = await fetchUpcomingPrayers({pageNumber: 1, pageSize:3})
                const getdonation = await fetchDonations({pageNumber: 1, pageSize:6})
                if(donations && users && insights && prayers && getdonation) {
                    setTotals({
                        donations: donations.result?.totalDonations ?? 0,
                        users: users.result?.totalUsers ?? 0,
                        insights: insights.result?.totalInsights ?? 0,
                        activeUsers: users.result?.totalActiveUsers ?? 0,
                        prayers: prayers.result?.prayers ?? [],
                        fetchedDonations: getdonation.result?.donations ?? []
                    })
                }else {
                    console.log('One or more responses are null');
                }
                console.log(prayers)
                
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchTotals()
       
    },[])
  return (
    <>
        <div>
            <Head title='Dashboard'/>
            <div className='flex gap-5 my-8 overflow-y-scroll'>
                <div className='w-8/12 '>
                    <div className='flex justify-between'>
                        <StatCard Icon={<DonationIcon/>} Title='Total Donations' total={`₦${totals.donations}`} detail='2024' className='bg-[#5372E7]'/>
                        <StatCard Icon={<UserIcon2/>} Title='Total Users' total={`${totals.users}`} detail={`Active Users: ${totals.activeUsers}`} className='bg-[#3EC295]'/>
                        <StatCard Icon={<RoundArrow/>} Title='Insights Shared' total={`${totals.insights}`} detail='All Time' className='bg-[#FF9F24]'/>
                    </div>
                    <div className='bg-backgroud my-8 h-[308px]'>
                    <Line data={bibleTracker} />
                    </div>
                    <div className='bg-background rounded-xl py-6 px-7'>
                        <div className='flex justify-between'>
                            <h3 className='font-semibold text-lg'>Upcoming Prayers</h3>
                            <span className='text-primary text-sm font-normal' onClick={()=> router.push('/dashboard/prayer')}>View All</span>
                        </div>
                        <table className='w-full'>
                            <tbody>
                                {
                                    totals.prayers.length === 0 ?
                                    <p className='text-center my-4'>No prayers Available</p>:
                                    totals.prayers.map((prayer:PrayerProps, index:number) => (
                                    <tr key={index}>
                                        <td className='text-sm py-5'>{prayer.text}</td>
                                        <td className='text-sm font-light text-[#47464A] flex py-5'>
                                            <CalendarIcon className="h-5 w-5 flex-shrink-0 mr-1 text-[#84818A]" aria-hidden="true"/>
                                            {new Date(prayer.startDate).toLocaleDateString()}
                                        </td>
                                        {
                                            isToday(new Date(prayer.startDate)) ?
                                            <td className='pl-4'><Pill text='Today'/></td> :
                                            <td className='pl-4'><Pill text='Happening Soon'/></td>
                                        }
                                    </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='w-2/6'>
                    <div className='h-[268px]'>
                        <Bar data={data} height={268} width={422}/>
                    </div>
                    <div className='bg-background p-4 rounded-lg'>
                        <h3 className='text-base font-medium mb-6'>Top Donations</h3>
                        {totals.fetchedDonations?.map((donation:DonationsProps, index:number)=>(
                            <div className='flex justify-between mb-4' key={index}>
                                <div className='flex gap-4'>
                                    <Image src={donation?.userId?.profilePicture || image.user} alt="user image" width={40} height={40} className='rounded-full' />
                                    <div >
                                        <h3 className='font-normal text-xs'>{donation.userId.firstName}{' '}{donation.userId.lastName}</h3>
                                        <p className='text-[#00000064] text-[10.21px]'>{new Date(donation.createdAt).toLocaleDateString() }</p>
                                    </div>
                                </div>
                                <span className='text-sm font-medium'>₦{donation.amount}</span>
                            </div>
                        ))}
                        <BtnPrimary className="w-full">View All Donations</BtnPrimary>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard;