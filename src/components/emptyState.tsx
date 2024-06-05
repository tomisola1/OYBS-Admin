import Image from 'next/image'
import React from 'react'
import image from '../../public/image'

interface props {
    text: string;
}
const EmptyState = ({text}:props) => {
  return (
    <div className='h-1/6 flex flex-col justify-center items-center my-32'>
        <Image src={image.emptyImage} alt='document' height={150} width={150}/>
        <h3 className='text-center text-2xl font-semibold mt-5'>{text}</h3>
    </div>
  )
}

export default EmptyState