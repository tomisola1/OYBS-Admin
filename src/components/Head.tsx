"use client"

import React, { useEffect, useState } from 'react'
import { NotificationFill } from '../../public/assets/icons'
import Image from 'next/image'
import image from '../../public/assets/image'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { AdminProps, UserProps } from '@/types'
import { getAdminUser } from '@/services/userService'

type props ={
    title: string;
    navigate?: boolean;
}

const Head = ({title, navigate}:props) => {
    const router = useRouter()
    const [admin, setAdmin] = useState<AdminProps>()

    useEffect(()=>{
        const getUser = async() => {
            try {
                const response = await getAdminUser()
                
                setAdmin(response.result)
            } catch (error) {
                console.log(error);
                
            }
        }
        getUser()
    },[])

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
                <h3 className='text-neutral-950 font-medium text-sm'>{admin?.firstName} {admin?.lastName}</h3>
                <p className='font-light text-xs text-gray-600 text-right'>{admin?.userType}</p>
            </div>
            <div>
                {
                    admin?.profilePicture ?
                <Image src={admin?.profilePicture} alt='user image' width={32} height={32}/> : 
                <Image src={"/assets/defaultImage.svg"} alt='user image' width={32} height={32}/>
                }
            </div>
        </div>
    </div>
  )
}

export default Head