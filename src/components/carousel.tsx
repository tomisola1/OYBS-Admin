"use client"

import React, { useEffect, useRef, useState } from 'react'
import image from '../../public/assets/image'
import Image from 'next/image'

const delay = 10000;
const Carousel = () => {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const images = [image.image1, image.image2, image.image3, image.image4]

    function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
          () =>
            setIndex((prevIndex) =>
            (prevIndex + 1) % images.length
            
            ),
            delay
            );   
        return () => {};
      }, [index]);
  return (
    <div className="my-0 mx-auto overflow-hidden w-full h-auto relative">
      <div className="h-auto whitespace-nowrap transition ease-in duration-1000 relative"  style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        <div className="w-full ">
        {
            images.map((image, index) =>(
                <Image src={image} alt='' key={index} className='w-full min-h-screen h-auto rounded-tr-3xl rounded-br-3xl inline-block'/>
            ))
        }
        </div>
      </div>
      <div className="flex justify-end gap-1.5 absolute bottom-7 right-7">
        {images.map((_, idx) => (
        <div key={idx} className={`inline-block h-3 w-3 rounded-full cursor-pointer ${index===idx ? "bg-primary" : "bg-gray-500"}`} 
        onClick={() => {
            setIndex(idx);
          }}></div>
        ))}
     </div>
    </div>
  )
}

export default Carousel