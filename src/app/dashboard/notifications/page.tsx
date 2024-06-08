"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Btn, BtnPrimary} from '@/components/Buttons'
import Modal from '@/components/Modal'
import InputField from '@/components/Inputfield'
import { createNotifications, fetchNotifications, resendNotifications } from '@/services/notificationService'
import { NotificationProps } from '@/types'
import EmptyState from '@/components/emptyState'
import { toast } from 'react-toastify'
import { Loader, SkeletonLoader } from '@/components/Loaders'

const Notifications = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(false)
    const [responseData, setResponseData] = useState<any>()
    const [formData, setFormData] = useState({
        title: '',
        body:''
    })

    useEffect(() =>{
        const fetchAllNotifications = async() =>{
            setLoading(true)
            try {
                const response = await fetchNotifications({pageNumber: pageNumber, pageSize: 8})
                console.log(response.result);
                setResponseData(response.result)
                setLoading(false)
            } catch (error) {
                console.log(error);    
            }
        }
        fetchAllNotifications()
    },[pageNumber])
    
    
   // Handle previous page
   const handlePreviousPage = () => {
    if (pageNumber > 1){
        setPageNumber(pageNumber - 1)
    }
   };

   // Handle next page
   const handleNextPage = () => {
      setPageNumber(pageNumber + 1)
   };

   const handleChange = (e:any) => {
    const {name, value} = e.target
    setFormData((prevState)=> ({...prevState, [name]: value}))
    console.log(formData);
    
 }

    const handleSubmit = async(e:any) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await createNotifications(formData)
            if (result.success){
                setLoading(false)
                toast.success(result)
                setShowModal(false)
                location.reload()
            }
        } catch (error) {
            setLoading(false)
            console.log(error);   
        }
    }

    const handleResend = async(id:string|undefined) => {
        try {
            const result = await resendNotifications(id)
            if (result.success){
                toast.success(result)
                setShowModal(false)
                location.reload()
            }
        } catch (error:any) {
            console.log(error.response.data.result);   
        }
    }

  return (
    <div>
        <Head title='Notifications'/>
        <div className='mt-8'>
            <BtnPrimary onClick={()=>setShowModal(true)}>Send a push notification</BtnPrimary>
        </div>
        <div className='w-full mt-10'>
            {loading && <SkeletonLoader/>}
        {
            responseData?.result?.length === 0 ? 
            <EmptyState text='No Notifications Created'/>:
            <Table
            head={['Header', 'Body', 'Date Sent', '']}
            body={responseData?.notifications.map((notification:NotificationProps, index: number) =>
                <>
                    <tr className='border border-white' key={index}>
                        <td className='p-4 font-normal tracking-wide pl-6'>
                        {notification.title}
                        </td>
                        <td className='p-4 font-light w-1/2'>{notification.body}</td>
                        <td className='p-4 font-light'>
                            <p>{new Date(notification.createdAt).toLocaleDateString()}</p>
                        </td>
                        <td className='pl-4 py-2 font-light'>
                           <BtnPrimary className='!py-3 font-medium' onClick={()=>handleResend(notification._id)}>
                            {loading ? <Loader/> : "Resend"}
                           </BtnPrimary>
                        </td>
                    </tr>
                </>
                )}
            itemsPerPage={8}
            showFilter={false}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            totalPages={responseData?.totalPages}
            />
        }
        </div>
        <Modal
        show={showModal}
        hide={() => setShowModal(false)}
        heading="Notifications"
        sub="Send out an app push notification"
      >
        <form className='mb-12' onSubmit={handleSubmit}> 
            <InputField placeholder='Header' change={handleChange} name='title' required/>
            <InputField as='textarea' placeholder='Body' rows={5} change={handleChange} name='body' required/>
          <BtnPrimary className="font-semibold text-base mb-6 tracking-wide w-full" type="submit">
            {loading ? <Loader/> : "Send Notifications"}
          </BtnPrimary>
         </form>
      </Modal>        
    </div>
  )
}

export default Notifications