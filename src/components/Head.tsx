"use client"

import React from 'react'
import { NotificationFill } from '../../public/icons'
import Image from 'next/image'
import image from '../../public/image'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

type props ={
    title: string;
    navigate?: boolean;
}

const Head = ({title, navigate}:props) => {
    const router = useRouter()
  return (
    <div className='flex justify-between'>
        <div className='flex items-center gap-2'>
        {
            navigate &&
        <ChevronLeftIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" onClick={router.back}/>
        }
        <h3 className='text-neutral-950 font-medium text-2xl'>{title}</h3>
        </div>
        <div className='flex gap-2 items-center'>
            <NotificationFill/>
            <div className='leading-5'>
                <h3 className='text-neutral-950 font-medium text-sm'>Billy Alexander</h3>
                <p className='font-light text-xs text-gray-600 text-right'>Administrator</p>
            </div>
            <div>
                <Image src={image.profile} alt='user image'/>
            </div>
        </div>
    </div>
  )
}

export default Head