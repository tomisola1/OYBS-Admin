"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import image from '../../public/image'
import { ChartIcon, DashboardIcon, LockIcon, NotificationIcon, PrayerIcon, QuizIcon, ReminderIcon, SupportIcon, UserIcon } from '../../public/icons'
import { PowerIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'

const Sidebar = () => {
	const pathname = usePathname()
  return (
    <>
        <aside className='box-border h-auto'>
				<div className="flex gap-3 bg-gradient-to-r from-[#ffffff] to-[#ffffff1e] mt-[50px] ml-8 pt-3.5 pl-3.5 pb-4 rounded-xl">
					<Image src={image.logo} alt="oybs logo" width={40} className='h-7'/>
                    <div className="leading-5">
                        <h3 className='text-neutral-950 font-medium text-sm'>One Year Bible Study</h3>
                        <p className='font-light text-xs text-gray-400'>Admin Portal</p>
                    </div>
				</div>
				<ul className="flex flex-col gap-2 mt-[30px] pl-8">
					<li className="transition-colors duration-700 ease-in-out">
						<Link
							href={"/dashboard"}
							className={`flex gap-3 items-center text-[#515266] pl-3.5 pt-3.5 pb-4 ${pathname === '/dashboard' ? 'active-link' : ''}`}>
							<DashboardIcon />
							<span className='font-medium text-sm'>Dashboard</span>
						</Link>
					</li>

					<li className="transition-colors duration-700 ease-in-out">
						<Link
							href={'/dashboard/users'}
							className={`flex gap-3 items-center text-[#515266] pl-3.5 pt-3.5 pb-4 ${pathname.match(/users/gi) ? 'active-link' : ''}`}>
							<UserIcon />
							<span className='font-medium text-sm'>Users</span>
						</Link>
					</li>

					<li className="transition-colors duration-700 ease-in-out">
						<Link
							href={'/dashboard/prayer'}
							className={`flex gap-3 items-center text-[#515266] pl-3.5 pt-3.5 pb-4 ${pathname.match(/prayer/gi) ? 'active-link' : ''}`}>
							<PrayerIcon />
							<span className='font-medium text-sm'>Prayer</span>
						</Link>
					</li>
					<li className="transition-colors duration-700 ease-in-out">
						<Link
							href={'/dashboard/quiz'}
							className={`flex gap-3 items-center text-[#515266] pl-3.5 pt-3.5 pb-4 ${pathname.match(/quiz/gi) ? 'active-link' : ''}`}>
							<QuizIcon />
							<span className='font-medium text-sm'>Quiz</span>
						</Link>
					</li>
					<li className="transition-colors duration-700 ease-in-out">
						<Link
							href={'/dashboard/scripture'}
							className={`flex gap-3 items-center text-[#515266] pl-3.5 pt-3.5 pb-4 ${pathname.match(/scripture/gi) ? 'active-link' : ''}`}>
							<ReminderIcon/>
							<span className='font-medium text-sm'>Scripture of the day</span>
						</Link>
					</li>
					<li className="transition-colors duration-700 ease-in-out">
						<Link
							href={'/dashboard/access-control'}
							className={`flex gap-3 items-center text-[#515266] pl-3.5 pt-3.5 pb-4 ${pathname.match(/access-control/gi) ? 'active-link' : ''}`}>
							<LockIcon />
							<span className='font-medium text-sm'>Access Control</span>
						</Link>
					</li>
					<li className="transition-colors duration-700 ease-in-out">
						<Link
							href={'/dashboard/incident'}
							className={`flex gap-3 items-center text-[#515266] pl-3.5 pt-3.5 pb-4 ${pathname.match(/incident/gi) ? 'active-link' : ''}`}>
							<ChartIcon />
							<span className='font-medium text-sm'>Incident Management</span>
						</Link>
					</li>
					<li className="transition-colors duration-700 ease-in-out">
						<Link
							href={'/dashboard/notifications'}
							className={`flex gap-3 items-center text-[#515266] pl-3.5 pt-3.5 pb-4 ${pathname.match(/notification/gi) ? 'active-link' : ''}`}>
							<NotificationIcon />
							<span className='font-medium text-sm'>Notifications</span>
						</Link>
					</li>
					<li className="transition-colors duration-700 ease-in-out">
						<Link
							href={'/dashboard/support'}
							className={`flex gap-3 items-center text-[#515266] pl-3.5 pt-3.5 pb-4 ${pathname.match(/support/gi) ? 'active-link' : ''}`}>
							<SupportIcon />
							<span className='font-medium text-sm'>Support</span>
						</Link>
					</li>
				</ul>
				<div className=" transition-colors duration-700 ease-in-out hover:bg-gradient-to-r from-[#ffffff] to-[#ffffff1e] mt-[30px] pt-3.5 pb-4 rounded-xl pl-3.5 ml-8">
					<button className={"flex gap-3 items-center"}>
                        <PowerIcon className="h-5 w-5 flex-shrink-0" aria-hidden='true'/>
						<span className='text-[#515266] font-medium text-sm'>Logout</span>
					</button>
				</div>
			</aside>
    </>
  )
}

export default Sidebar