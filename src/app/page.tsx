"use client"

import Carousel from "@/components/carousel";
import Image from "next/image";
import image from "../../public/image";
import InputField from "@/components/Inputfield";
import { Btn, BtnPrimary } from "@/components/Buttons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const handleSubmit = () => {
    router.push("/dashboard")
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
          <form>
            <InputField placeholder="Enter your email address"/>
            <InputField placeholder="Password" type="password"/>
            <Link href={"/forgot-password"} className="flex justify-end mt-2">
              <span className="text-primary font-medium text-xs">Forgot Password?</span>
            </Link>
          </form>
          <BtnPrimary className="font-semibold text-base" type="submit" onClick={handleSubmit}>Login</BtnPrimary>
        </div>
        <div className="absolute bottom-0">
          <span className="text-primary font-medium text-xs">...by BHM Inc.</span>
        </div>
     </div>
    </main>
  );
}
