import Carousel from "@/components/carousel";
import Image from "next/image";
import image from "../../../public/image";
import InputField from "@/components/Inputfield";
import { Btn, BtnPrimary } from "@/components/Buttons";
import Link from "next/link";
import OtpInput from "@/components/otpInput";

export default function OtpVerification() {
 
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
            <h3 className="font-bold sm:text-[32px] text-3xl leading-[4rem] tracking-normal ">OTP Verification</h3>
            <p className="font-normal m-0 text-base">We sent a 4 digit code to your email at <b>example@example.com</b></p>
          </div>
          <div>
            <OtpInput numberOfDigits={4} oTP="1234"/>
          </div>
          <div>
            <Link href={"/new-password"} className="w-full">
              <BtnPrimary className="font-semibold text-base w-full">Continue</BtnPrimary>
            </Link>
            <p className="text-[#75788D] text-xs mt-4 text-center">Didn’t received the code? <b className="text-primary">20 Secs</b> </p>
            <p className="text-[#75788D] text-xs mt-4 text-center hidden">Didn’t received the code? <b className="text-primary">Resend Code</b> </p>
          </div>
        </div>
        <div className="absolute bottom-0">
          <span className="text-primary font-medium text-xs">...by BHM Inc.</span>
        </div>
     </div>
    </main>
  );
}
