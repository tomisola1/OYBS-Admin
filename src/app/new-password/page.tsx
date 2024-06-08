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
import { toast } from "react-toastify";
import { Loader } from "@/components/Loaders";

export default function NewPassword() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
 

  const handleChange = (e:any) => {
    if (e.target.name === "password1"){
      setPassword(e.target.value)   
    }
    if (e.target.name === "password2"){
      setConfirmPassword(e.target.value)  
    }
  }

  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        return
     }
      const response = await resetPasssword({
        password: confirmPassword
      })

      if(response.success) {
        setLoading(false)
        toast.success('Password changed successfully')
        router.replace("/")
      }
    } catch (error) {
      setLoading(false)
      toast.error("Something went wrong")
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
            <InputField placeholder="Create Password" type="password" name="password1" change={handleChange} required/>
            <InputField placeholder="Confirm Password" type="password" name="password2" change={handleChange} required/>
            <BtnPrimary className="font-semibold text-base w-full" type="submit">
              {loading ? <Loader/> : "Submit"}
            </BtnPrimary>
          </form>
        </div>
        <div className="absolute bottom-0">
          <span className="text-primary font-medium text-xs">...by BHM Inc.</span>
        </div>
     </div>
    </main>
  );
}
