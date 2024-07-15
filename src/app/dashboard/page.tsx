'use client'

import Head from '@/components/Head'
import Sidebar from '@/components/Sidebar'
import StatCard from '@/components/statCard'
import React, { useEffect, useRef, useState } from 'react'
import { RoundArrow, UserIcon, UserIcon2 } from '../../../public/assets/icons'
import { CalendarIcon } from '@heroicons/react/24/outline'
import Pill from '@/components/Pill'
import { BtnPrimary } from '@/components/Buttons'
import Image from 'next/image'
import image from '../../../public/assets/image'
import { fetchBibleTracker, fetchDonations, fetchQuizTakers, fetchTotalDonations, fetchTotalInsights, fetchTotalUsers, fetchUpcomingPrayers } from '@/services/dashboard'
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { DonationsProps, PrayerProps, QuizTakersProps, UserDetailProps, UserProps } from '@/types'
import { useRouter } from 'next/navigation'
import { isToday, isYesterday } from 'date-fns'
import { monthNames } from '@/utils/utils'
import { toast } from 'react-toastify'
import { fetchUsersWithHighStreaks } from '@/services/userService'
import Link from 'next/link'

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
        users: 0,
        insights: 0,
        activeUsers: 0,
        userStreak: [],
        prayers: [],
    })
    const [quizTakers, setQuizTakers] = useState<any>();
    const [bibleTrackers, setBibleTrackers] = useState([])
  
    useEffect(()=>{
        const fetchTotals = async () => {
            try {
                const users = await fetchTotalUsers()
                const userStreaks = await fetchUsersWithHighStreaks({pageNumber: 1, pageSize:6, streak: 'DESC'})
                const insights = await fetchTotalInsights()
                const prayers = await fetchUpcomingPrayers({pageNumber: 1, pageSize:3})
                if(users && insights && prayers && userStreaks) {
                    setTotals({
                        users: users.result?.totalUsers ?? 0,
                        insights: insights.result?.totalInsights ?? 0,
                        activeUsers: users.result?.totalActiveUsers ?? 0,
                        prayers: prayers.result?.prayers ?? [],
                        userStreak: userStreaks.result?.users ?? []
                    })
                }else {
                    console.log('One or more responses are null');
                }
               
                
                
            } catch (error:any) {
                console.log(error);
                toast.error(error.response.data.result)
            }
        }
        fetchTotals()

        const quizTakers = async() => {
            try {
                const takers = await fetchQuizTakers()
                setQuizTakers(takers.result);
            } catch (error) {
                console.log(error);
                
            }
         }
         quizTakers()
        const bibleTracking = async() => {
            try {
                const tracker = await fetchBibleTracker()
                setBibleTrackers(tracker.result);
            } catch (error) {
                console.log(error);
                
            }
         }
         bibleTracking()
    },[])

    console.log(totals);

    const totalUsersTakingQuiz = quizTakers?.map((takers:any) =>{
        return takers?.totalUsers
    })
    const completed = bibleTrackers?.map((item:any) =>{
        return item?.completed
    })
    
    const inProgress = bibleTrackers?.map((item:any) =>{
        return item?.uncompleted
    })
         
    const monthNamesArray = quizTakers?.map((item:QuizTakersProps) => monthNames[item?._id?.month]);
    const bibleTrackerMonthArray = bibleTrackers?.map((item:any) => monthNames[item?.month]);

    const BarChartData = {
        labels: monthNamesArray,
        datasets: [
          {
            label: 'Monthly Quiz Takers',
            data: totalUsersTakingQuiz,
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


    const bibleTracker = {
        labels: bibleTrackerMonthArray,
        datasets: [
          {
            label: 'Completion Rate',
            data: completed,
            fill: false,
            borderColor: '#29BB89',
            tension: 0.2,
          },
          {
            label: 'Reading Progress',
            data: inProgress,
            fill: false,
            borderColor: '#5372E7',
            tension: 0.2,
          },
        ],
      };
  

  return (
    <>
        <div>
            <Head title='Dashboard'/>
            <div className='xl:flex lg:gap-5 my-8 w-full'>
                <div className='xl:w-8/12'>
                    <div className='grid md:grid-cols-2 xl:gap-x-2 justify-between grid-cols-1 !gap-8'>
                        <StatCard Icon={<UserIcon2/>} Title='Total Users' total={`${totals.users}`} detail={`Active Users: ${totals.activeUsers}`} className='bg-[#3EC295]'/>
                        <StatCard Icon={<RoundArrow/>} Title='Insights Shared' total={`${totals.insights}`} detail='All Time' className='bg-[#FF9F24]'/>
                    </div>
                    <div>

                    </div>
                    <div className='bg-backgroud my-8 xl:h-[308px]'>
                    <Line data={bibleTracker}/>
                    </div>
                    <div className='bg-background rounded-xl py-6 px-7'>
                        <div className='flex justify-between'>
                            <h3 className='font-semibold text-lg'>Upcoming Prayers</h3>
                            <span className='text-primary text-sm font-normal cursor-pointer' onClick={()=> router.push('/dashboard/prayer')}>View All</span>
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
                                            isToday(new Date(prayer.startDate)) &&
                                            <td className='pl-4'><Pill text='Today'/></td>
                                            } 
                                        <td className='pl-4'><Pill text='Happening Soon'/></td>
                                    </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='xl:w-2/6 w-full xl:mt-0 mt-8'>
                    <div className='lg:h-[268px] mb-8'>
                        <Bar data={BarChartData} height={268} width={422}/>
                    </div>
                    <div className='bg-background p-4 rounded-lg'>
                        <h3 className='text-base font-medium mb-6'>Top Streaks</h3>
                        {totals.userStreak?.map((user:UserProps, index:number)=>(
                            <div className='flex justify-between mb-4' key={index}>
                                    <div >
                                        <h3 className='font-normal text-sm'>{user.fullName}</h3>
                                        <p className='text-[#00000078] text-[10.21px]'>{user.email}</p>
                                    </div>
                                <span className='text-sm font-medium'>{user.streak}</span>
                            </div>
                        ))}
                        <BtnPrimary className="w-full">
                            <Link href={"/dashboard/users"}>
                            View All Users
                            </Link>    
                        </BtnPrimary>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard;