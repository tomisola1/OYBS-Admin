import React, { ReactNode } from 'react'
import { DonationIcon } from '../../public/assets/icons'

interface statProps {
    Icon: ReactNode;
    Title: string;
    total: string;
    detail: string;
    className: string;
}
const StatCard = ({Icon, Title, total, detail, className}:statProps) => {
  return (
    <div>
        <div className='bg-background rounded-xl w-full p-4 pb-6 flex flex-col gap-1'>
            <div className='flex gap-2 items-center mb-4'>
                <span className={`rounded-full p-1 ${className}`}>{Icon}</span>
                <span className='text-sm'>{Title}</span>
            </div>
            <p className='text-2xl font-semibold m-0'>{total}</p>
            <span className='text-gray-500 text-xs font-light '>{detail}</span>
        </div>
    </div>
  )
}

export default StatCard