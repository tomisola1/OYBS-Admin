import Carousel from "@/components/carousel";
import Image from "next/image";
import image from "../../../public/image";
import InputField from "@/components/Inputfield";
import { Btn, BtnPrimary } from "@/components/Buttons";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <main className="grid md:grid-cols-2 grid-cols-1">
     <div className="md:w-full hidden md:grid">
      <Carousel/>
     </div>
     <div className="w-full h-screen flex flex-col justify-center items-center relative px-7">
        <div className="w-[121px] md:mb-12 mb-6">
          <Image src={image.logo} alt="" className="w-full"/>
        </div>
        <div className="small-laptop:w-[403px] md:w-[303px] sm:w-3/4 w-full flex flex-col gap-12">
          <div className="text-center text-[#222222]">
            <h3 className="font-bold sm:text-[32px] text-3xl leading-[4rem] tracking-normal ">Forgot Password</h3>
            <p className="font-normal m-0 text-base">Please enter your email below and we will send you the OTP Code.</p>
          </div>
          <div>
            <InputField placeholder="Enter your email address"/>
          </div>
          <Link href={"/otp-verification"} className="w-full">
            <BtnPrimary className="font-semibold text-base w-full">Request OTP</BtnPrimary>
          </Link>
        </div>
        <div className="absolute bottom-0">
          <span className="text-primary font-medium text-xs">...by BHM Inc.</span>
        </div>
     </div>
    </main>
  );
}
