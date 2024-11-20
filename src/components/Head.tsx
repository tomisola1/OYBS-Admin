"use client"

import React, { FormEvent, useEffect, useState } from 'react'
import { NotificationFill } from '../../public/assets/icons'
import Image from 'next/image'
import image from '../../public/assets/image'
import { ChevronLeftIcon, LockClosedIcon, PowerIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { AdminProps, UserProps } from '@/types'
import { getAdminUser } from '@/services/userService'
import Modal from './Modal'
import InputField from './Inputfield'
import { BtnPrimary } from './Buttons'
import { Loader } from './Loaders'
import { toast } from 'react-toastify'
import { resetPasssword } from '@/services/authService'

type props ={
    title: string;
    navigate?: boolean;
}

const Head = ({title, navigate}:props) => {
    const router = useRouter()
    const [admin, setAdmin] = useState<AdminProps>()
    const [showdropdown, setShowdropdown] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const getUser = async() => {
            try {
                const response = await getAdminUser()
                
                setAdmin(response?.result)
            } catch (error) {
                console.log(error);
                
            }
        }
        getUser()
    },[])

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
            setLoading(false)
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
        } catch (error:any) {
          setLoading(false)
          toast.error(error.response.data.result)
          console.log(error);
          
        }
      }

	const handleLogout = () => {
		localStorage.removeItem('token')
		router.replace('/')
	}

  return (
    <div className='flex justify-between relative'>
        <div className='flex items-center gap-2'>
        {
            navigate &&
        <ChevronLeftIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" onClick={router.back}/>
        }
        <h3 className='text-neutral-950 font-medium text-2xl'>{title}</h3>
        </div>
        <div className='flex gap-2 items-center cursor-pointer' onClick={()=>setShowdropdown(!showdropdown)}>
            <div className='leading-5'>
                <h3 className='text-neutral-950 font-medium text-sm'>{admin?.firstName} {admin?.lastName}</h3>
                <p className='font-light text-xs text-gray-600 text-right'>{admin?.userType}</p>
            </div>
            <div>
                {
                    admin?.profilePicture ?
                <Image src={admin?.profilePicture} alt='user image' width={32} height={32}/> : 
                <Image src={"/assets/defaultImage.svg"} alt='user image' width={32} height={32}/>
                }
            </div>
        </div>
        {
            showdropdown && 
            <div className='absolute bg-background rounded-[10px] right-3 top-12 py-5 px-4 text-gray-700 text-sm shadow-md shadow-gray-300'>
                <p className='flex gap-3 items-center py-2 px-4 hover:bg-gradient-to-r from-[#ffffff] to-[#ffffff1e] rounded-[10px] mb-4 font-medium' onClick={() => setShowModal(true)}>
                    <LockClosedIcon className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden='true'/>
                    <span>Change Password</span></p>
                <button className={"flex gap-3 items-center py-2 px-4 hover:bg-gradient-to-r from-[#ffffff] to-[#ffffff1e] rounded-[10px]"} onClick={handleLogout}>
                    <PowerIcon className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden='true'/>
                    <span className='text-[#515266] font-medium text-sm'>Logout</span>
                </button>
                {/* <p className='py-2 px-4 hover:bg-gradient-to-r from-[#ffffff] to-[#ffffff1e] rounded-[10px] mb-4'>Logout</p> */}
            </div>
        }
        <Modal
        show={showModal}
        hide={() => setShowModal(false)}
        heading="Change Password"
        sub=""
      >
        {/* <div className="small-laptop:w-[403px] md:w-[303px] sm:w-3/4 w-full flex flex-col gap-12"> */}
          <form onSubmit={handleSubmit}>
            <InputField placeholder="Create Password" type="password" name="password1" change={handleChange} required/>
            <InputField placeholder="Confirm Password" type="password" name="password2" change={handleChange} required/>
            <BtnPrimary className="font-semibold text-base w-full mt-6" type="submit">
              {loading ? <Loader/> : "Submit"}
            </BtnPrimary>
          </form>
        {/* </div> */}
      </Modal>
    </div>
  )
}

export default Head