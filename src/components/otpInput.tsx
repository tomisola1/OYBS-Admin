"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { LegacyRef, useEffect, useRef, useState } from 'react'


type props = {
    numberOfDigits: number;
    oTP: string
    value: string
    name: string
}
const OtpInput = ({numberOfDigits, oTP, name}:props) => {
    const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [otpError, setOtpError] = useState<null| string>(null);
  const otpBoxReference = useRef<HTMLInputElement[]>([]);
  const router = useRouter()

  function handleChange(value:string, index:number) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);
    
    if(value && index < numberOfDigits-1){
        const otpBoxArray = otpBoxReference.current as HTMLInputElement[];
        
        const prevInput = otpBoxArray[index + 1];
        if (prevInput) {
            prevInput.focus();
        }
    }
  }

  function handleBackspaceAndEnter(e:any, index:number) {
    if(e.key === "Backspace" && !e.target?.value && index > 0){
    //   otpBoxReference.current[index - 1].focus()
    const otpBoxArray = otpBoxReference.current as HTMLInputElement[];
        const prevInput = otpBoxArray[index - 1];
        if (prevInput) {
            prevInput.focus();
        }
    }
    if(e.key === "Enter" && e.target?.value && index < numberOfDigits-1){
    //   otpBoxReference.current[index + 1].focus()
    const otpBoxArray = otpBoxReference.current as HTMLInputElement[];
        const prevInput = otpBoxArray[index + 1];
        if (prevInput) {
            prevInput.focus();
        }
    }
  }
  

  useEffect(() => { 
    //onSubmit
    if(otp.join("") !== "" && otp.join("") !== oTP){
      setOtpError("❌ Wrong OTP Please Check Again")
    }else{
      setOtpError(null)
    //   router.push("/new-password")
    } 
   }, [otp]); 

  return (
    <article className="">  
     
     <div className='flex items-center gap-4'>
      {otp.map((digit, index)=>(
        <input key={index} value={digit} maxLength={1}  
        onChange={(e)=> handleChange(e.target.value, index)}
        onKeyUp={(e)=> handleBackspaceAndEnter(e, index)}
        name={name}
        ref={(reference:any) => (otpBoxReference.current[index] = reference)}
        className={`border-b w-20 h-auto py-2 px-3 font-semibold text-xl rounded-md block focus:outline-none appearance-none text-center`}
        />
      ))}

     </div>


      <p className={`text-md text-red-500  mt-4 ${otpError ? 'error-show' : ''}`}>{otpError}</p>
    </article>
  )
}

export default OtpInput