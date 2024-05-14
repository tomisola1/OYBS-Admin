"use client"

import Carousel from "@/components/carousel";
import Image from "next/image";
import image from "../../../public/image";
import InputField from "@/components/Inputfield";
import { Btn, BtnPrimary } from "@/components/Buttons";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { resetPasssword } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function NewPassword() {
  const router = useRouter()
  const [password, setPasword] = useState("")

  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      
      const response = await resetPasssword({
        password: password
      })
      console.log(response);
      if(response.success) {
        router.replace("/")
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
        <div className="small-laptop:w-[403px] md:w-[303px] sm:w-3/4 w-full flex flex-col gap-12">
          <div className="text-center text-[#222222]">
            <h3 className="font-bold sm:text-[32px] text-3xl leading-[4rem] tracking-normal ">Create a New Password</h3>
            <p className="font-normal m-0 text-base">Create a new password to access your account.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <InputField placeholder="Create Password" type="password" required/>
            <InputField placeholder="Confirm Password" type="password" change={(e:any) => setPasword(e.target.value)} required/>
            <BtnPrimary className="font-semibold text-base w-full" type="submit">Continue</BtnPrimary>
          </form>
        </div>
        <div className="absolute bottom-0">
          <span className="text-primary font-medium text-xs">...by BHM Inc.</span>
        </div>
     </div>
    </main>
  );
}
