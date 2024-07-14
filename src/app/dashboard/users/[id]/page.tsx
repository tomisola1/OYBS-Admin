"use client"

import { Btn, BtnPrimary, BtnSec } from '@/components/Buttons'
import Head from '@/components/Head'
import InputField from '@/components/Inputfield'
import { Loader } from '@/components/Loaders'
import Modal from '@/components/Modal'
import { fetchSingleUser, suspendUsers, unsuspendUsers } from '@/services/userService'
import { UserDetailProps } from '@/types'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'



const SingleUser = ({ params }: { params: { id: string } }) => {
    const [user, setUser] = useState<UserDetailProps>()
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
       email:'',
       reason:'',
       daysSuspended:0
    })
    
    useEffect(() =>{
        const fetchAllUsers = async() =>{
            try {
                const response = await fetchSingleUser(params.id)
                setUser(response?.result)
            } catch (error) {
                console.log(error);    
            }
        }
        fetchAllUsers()
    },[params])

    const handleChange = (e: any) => {
        const {name, value} = e.target
         setFormData({...formData, [name]: value})
      }

      const handleUnsuspendUser = async()=> {
        try {
            setLoading(true)
            const response = await unsuspendUsers({email: user?.email})
            if(response.success){
                toast.success(response.result)
                setLoading(false)
                location.reload()
            }
        } catch (error:any) {
            console.log(error);
            toast.error(error.response.data.result)
        }
      }
   
      const handleSubmit = async(e:any) => {
         e.preventDefault()
         try {
            setLoading(true)
            if (formData.daysSuspended < 0){
               toast.error('Days cannot be less than 0');           
               setLoading(false)
               return
            }
            const response = await suspendUsers({...formData, email: user?.email})
            if(response.success){
               setShowModal(false)
               setLoading(false)
               location.reload()
            }
            
         } catch (error:any) {
            console.log(error);
            toast.error(error.response.data.result)
         }
      }
      
      
  return (
    <div>  
        <Head title='User Details' navigate={true}/>
        <div className='flex gap-5 mt-8 relative'>
            <div className='bg-background w-2/5 p-6 rounded-xl'>
                <h3 className='font-semibold text-base mb-5'>Profile Information</h3>
                <table className='w-full'>
                 <tbody className='font-normal text-sm'>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Name</td>
                        <td className='py-3'>{user?.firstName} {user?.lastName}</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Email</td>
                        <td className='py-3'>{user?.email}</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Birth Date</td>
                        <td className='py-3'>{user?.birthDate ? user?.birthDate :"None"}</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Phone Number</td>
                        <td className='py-3'>{user?.phoneNumber ? user?.phoneNumber : "None"}</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Gender</td>
                        <td className='py-3'>{user?.gender ? user?.gender : "None"}</td>
                    </tr>
                 </tbody>
                </table>
            </div>
            <div className='bg-background w-2/5 p-6 rounded-xl'>
                <h3 className='font-semibold text-base mb-5'>Bible Activity</h3>
                <table className='w-full'>
                 <tbody className='font-normal text-sm'>
                    <tr className='border-b border-b-white'>
                        <td className='py-3 w-40'>Current Streak</td>
                        <td className='py-3'>{user?.streak}</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Quiz Taken</td>
                        <td className='py-3'>{user?.quizzesTaken}</td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Insights Shared</td>
                        <td className='py-3'>{user?.insightsShared}</td>
                    </tr>
                    <tr>
                        <td className='py-3'>Donations</td>
                        <td className='py-3'>{user?.donations}</td>
                    </tr>
                    {
                    user?.userSuspension !== null && 
                    <tr>
                        <td className='py-3'>Days of Suspension</td>
                        <td className='py-3'>{user?.userSuspension.daysSuspended}</td>
                    </tr>

                    }
                 </tbody>
                </table>
            </div>
        </div>
            {
                user?.userSuspension !== null && 
                <div className='bg-background w-3/5 p-6 rounded-xl mt-5'>
                    <h3 className='font-semibold text-base mb-5'>Reason For Suspension</h3>
                    {user?.userSuspension.reason}
                </div>

            }
            {
               user?.userSuspension !== null ?
               <div className='absolute bottom-3 right-3'>
                 <Btn className='p-0' onClick={handleUnsuspendUser}>{loading?<Loader/> : "Unsuspend User"}</Btn>
              </div>:
                <div className='absolute bottom-3 right-3'>
                    <BtnPrimary className='p-0' onClick={()=>setShowModal(true)}>{loading?<Loader/> : "Suspend User"}</BtnPrimary>
                </div>
            }
        <Modal
        show={showModal}
        hide={() => setShowModal(false)}
        heading="Suspend User"
        sub="The user will no longer have access to OYBS for the 
        duration of the suspension "
      >
        <form className='w-full' onSubmit={handleSubmit}>
            {/* <InputField placeholder="User Email" type='email' name='email'  change={handleChange} required/> */}
            <InputField placeholder="Reason for Suspension" name='reason' change={handleChange} required/>
            <InputField placeholder="Select number of days" type='number' name='daysSuspended' change={handleChange} required/>
          <BtnPrimary className="font-semibold text-base my-6 tracking-wide w-full" type="submit" >Suspend User</BtnPrimary>
         </form>
      </Modal>
    </div>
  )
}

export default SingleUser
