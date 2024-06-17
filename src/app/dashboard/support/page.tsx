"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Btn, BtnPrimary} from '@/components/Buttons'
import Modal from '@/components/Modal'
import InputField from '@/components/Inputfield'
import Pill from '@/components/Pill'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { fetchSupport, updateSupport } from '@/services/supportService'
import { transformPhoneNumber } from '@/utils/utils'
import { Loader } from '@/components/Loaders'

const Support = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [responseData, setResponseData] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        supportPhoneNumber: "",
        supportEmail: ""
    })

    useEffect(() =>{
      const getSupport = async() =>{
          try {
              const response = await fetchSupport()
              console.log(response);
              setResponseData(response.result)
          } catch (error) {
              console.log(error);    
          }
      }
      getSupport()
  },[])

  const handleChange = (e: any) => {
      const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async(e:any) => {
    e.preventDefault()
    setLoading(true)
    try { 
        let whatsappNumber = transformPhoneNumber(formData.supportPhoneNumber) 
        console.log({...formData, supportPhoneNumber: whatsappNumber});
        
        const result = await updateSupport({...formData, supportPhoneNumber: whatsappNumber})
        console.log(result);
        if(result.success) {
            setLoading(false)
            setShowModal(false) 
            location.reload();
        }
        
    } catch (error) {
        setLoading(false)
        console.log(error);  
    }
  }

  return (
    <div>
        <Head title='Support'/>
        <div className='mt-8'>
            <BtnPrimary onClick={()=>setShowModal(true)}>Update support information</BtnPrimary>
        </div>
        <div className='mt-10 flex flex-col gap-10 md:w-1/2 sm:w-8/12 '>
           <div className='bg-background p-5 flex gap-5 rounded-lg'>
            <div className='rounded-full p-4 bg-[#fd6e211f] w-fit flex justify-center'>
                <EnvelopeIcon className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true"/>
            </div>
            <div>
                <h3 className='font-semibold text-base'>Support Email</h3>
                <p className='font-medium text-base'>{responseData?.email}</p>
            </div>
           </div>
           <div className='bg-background p-5 flex gap-5 rounded-lg'>
            <div className='rounded-full p-4 bg-[#fd6e211f] w-fit flex justify-center'>
                <PhoneIcon className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true"/>
            </div>
            <div>
                <h3 className='font-semibold text-base'>Support Whatsapp Number</h3>
                <p className='font-medium text-base'>{responseData?.phoneNumber}</p>
            </div>
           </div>
        </div>
        <Modal
        show={showModal}
        hide={() => setShowModal(false)}
        heading="Support"
      >
        <form className='mb-12' onSubmit={handleSubmit}> 
            <InputField placeholder='Email' name='supportEmail' type='email' change={handleChange} defaultValue={responseData?.email} value={responseData?.email}/>
            <InputField placeholder='Phone Number' name='supportPhoneNumber' type='tel' pattern="[0-9]{3} [0-9]{4} [0-9]{4}" change={handleChange} defaultValue={responseData?.phoneNumber} value={responseData?.phoneNumber}/>
          <BtnPrimary className="font-semibold text-base mt-6 tracking-wide w-full" type="submit">
            {loading ? <Loader/> : "Update Information"}
          </BtnPrimary>
         </form>
      </Modal>        
    </div>
  )
}

export default Support