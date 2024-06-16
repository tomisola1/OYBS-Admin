"use client"

import Carousel from "@/components/carousel";
import Image from "next/image";
import image from "../../../public/assets/image";
import InputField from "@/components/Inputfield";
import { Btn, BtnPrimary } from "@/components/Buttons";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { otpRequest, resetPasssword } from "@/services/authService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const router = useRouter()
  const  [email, setEmail] = useState('')

  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      const response = await otpRequest({email: email})
      console.log(response);
      if(response.success) {
        toast.success(response.result)
        localStorage.setItem('email',email)
        router.replace("/otp-verification")
      }
    } catch (error) {
      console.log(error);
      
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
        <div className="small-laptop:w-[403px] md:w-[303px] sm:w-3/4 w-full">
          <div className="text-center text-[#222222] mb-12">
            <h3 className="font-bold sm:text-[32px] text-3xl leading-[4rem] tracking-normal ">Forgot Password</h3>
            <p className="font-normal m-0 text-base">Please enter your email below.</p>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-12">
              <InputField placeholder="Enter your email address" type="email" value={email} change={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} required/>
            </div>
              <BtnPrimary type="submit" className="font-semibold text-base w-full">Request OTP</BtnPrimary>
          </form>
        </div>
        <div className="absolute bottom-0">
          <span className="text-primary font-medium text-xs">...by BHM Inc.</span>
        </div>
     </div>
    </main>
  );
}
