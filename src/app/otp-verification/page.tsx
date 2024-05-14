"use client"

import Carousel from "@/components/carousel";
import Image from "next/image";
import image from "../../../public/image";
import InputField from "@/components/Inputfield";
import { Btn, BtnPrimary } from "@/components/Buttons";
import Link from "next/link";
import OtpInput from "@/components/otpInput";
import { otpVerification, resendOtpRequest } from "@/services/authService";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function OtpVerification() {
  const router = useRouter()
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [otpError, setOtpError] = useState<null| string>(null);
  const otpBoxReference = useRef<HTMLInputElement[]>([]);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);


  function handleChange(value:string, index:number) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);
    console.log(otp);
    
    if(value && index < 4-1){
        const otpBoxArray = otpBoxReference.current as HTMLInputElement[];
        console.log(otpBoxArray);
        
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
    if(e.key === "Enter" && e.target?.value && index < 4-1){
    //   otpBoxReference.current[index + 1].focus()
    const otpBoxArray = otpBoxReference.current as HTMLInputElement[];
        const prevInput = otpBoxArray[index + 1];
        if (prevInput) {
            prevInput.focus();
        }
    }
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    console.log(seconds, minutes);
    

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTP = async() => {
    const response = await resendOtpRequest({
      email: localStorage.getItem("email"),
    })
    setMinutes(2);
    setSeconds(59);
  };

 console.log(otp);
 
  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      
      const response = await otpVerification({
        email: localStorage.getItem("email"),
        otp:otp.join("")
      })
      console.log(response);
      if(response.success) {
        localStorage.setItem("token",response.result)
        router.replace("/new-password")
      }
    } catch (error) {
      console.log(error);
      setOtpError("❌ Wrong OTP Please Check Again")
      
    }
  }

  return (
    <main className="grid md:grid-cols-2 grid-cols-1">
     <div className="md:w-full hidden md:grid h-auto min-h-screen">
      <Carousel/>
     </div>
     <div className="w-full h-auto min-h-screen flex flex-col justify-center items-center relative px-7">
        <div className="w-[121px] md:mb-12 mb-6">
          <Image src={image.logo} alt="" className="w-full"/>
        </div>
        <div className="small-laptop:w-[403px] md:w-[303px] sm:w-3/4 w-full flex flex-col gap-12">
          <div className="text-center text-[#222222]">
            <h3 className="font-bold sm:text-[32px] text-3xl leading-[4rem] tracking-normal ">OTP Verification</h3>
            <p className="font-normal m-0 text-base">We sent a 4 digit code to your email at <b>{localStorage.getItem("email")}</b></p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='flex items-center gap-4'>
      {otp.map((digit, index)=>(
        <input key={index} value={digit} maxLength={1}  
        onChange={(e)=> handleChange(e.target.value, index)}
        onKeyUp={(e)=> handleBackspaceAndEnter(e, index)}
        name=''
        ref={(reference:any) => (otpBoxReference.current[index] = reference)}
        className={`border-b w-20 h-auto py-2 px-3 font-semibold text-xl rounded-md block focus:outline-none appearance-none text-center`}
        />
      ))}

     </div>
        <p className={`text-md text-red-500  mt-4 ${otpError ? 'error-show' : ''}`}>{otpError}</p>
            <div className="mt-14">
                <BtnPrimary className="font-semibold text-base w-full" type="submit">Continue</BtnPrimary>
                {
                  seconds > 0 || minutes > 0 ? (
                    <p className="text-[#75788D] text-xs mt-4 text-center">Didn’t received the code? <b className="text-primary">{seconds} Secs</b> </p>
                  ): (
                    <p className="text-[#75788D] text-xs mt-4 text-center cursor-pointer">Didn’t received the code? <b className="text-primary"onClick={resendOTP} >Resend Code</b> </p>

                  )
                }
            </div>
          </form>
        </div>
        <div className="absolute bottom-0">
          <span className="text-primary font-medium text-xs">...by BHM Inc.</span>
        </div>
     </div>
    </main>
  );
}
