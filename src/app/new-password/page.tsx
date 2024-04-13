import Carousel from "@/components/carousel";
import Image from "next/image";
import image from "../../../public/image";
import InputField from "@/components/Inputfield";
import { Btn, BtnPrimary } from "@/components/Buttons";
import Link from "next/link";

export default function NewPassword() {
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
            <h3 className="font-bold sm:text-[32px] text-3xl leading-[4rem] tracking-normal ">Create a New Password</h3>
            <p className="font-normal m-0 text-base">Create a new password to access your account.</p>
          </div>
          <div>
            <InputField placeholder="Create Password" type="password"/>
            <InputField placeholder="Confirm Password" type="password"/>
          </div>
          <Link href={"/"} className="w-full">
            <BtnPrimary className="font-semibold text-base w-full" type="submit">Continue</BtnPrimary>
          </Link>
        </div>
        <div className="absolute bottom-0">
          <span className="text-primary font-medium text-xs">...by BHM Inc.</span>
        </div>
     </div>
    </main>
  );
}
