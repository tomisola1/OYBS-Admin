"use client"

import Carousel from "@/components/carousel";
import Image from "next/image";
import image from "../../public/assets/image";
import InputField from "@/components/Inputfield";
import { Btn, BtnPrimary } from "@/components/Buttons";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { adminLogin } from "@/services/authService";
import { toast } from "react-toastify";
import { Loader } from "@/components/Loaders";

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email:'',
    password:''
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setLoginData({...loginData, [name]:value})
  }

  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await adminLogin(loginData)
      if(typeof window !== 'undefined'){
        // now access your localStorage
        localStorage.setItem('token', response.result.refresh_token)      
      }
      console.log(response.result.access_token);
      
      if (response.success === true) {
        setLoading(false)
        toast.success('Login Successful')
        router.push("/dashboard") 
      }
    } catch (error:any) {
      setLoading(false)
      toast.error(error.response.data.result)
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
            <h3 className="font-bold sm:text-[32px] text-3xl leading-[4rem] tracking-wide ">Welcome back</h3>
            <p className="font-normal m-0 text-base">Sign in by entering your account here.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <InputField placeholder="Enter your email address" type="email" name="email" change={handleChange} required/>
            <InputField placeholder="Password" type="password" name="password" change={handleChange} required/>
            <Link href={"/forgot-password"} className="flex justify-end mt-2">
              <span className="text-primary font-medium text-xs">Forgot Password?</span>
            </Link>
           <BtnPrimary className="font-semibold text-base w-full mt-10" type="submit">
            {loading ? <Loader/> : "Login"}
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
