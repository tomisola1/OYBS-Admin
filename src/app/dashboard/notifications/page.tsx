"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Btn, BtnPrimary} from '@/components/Buttons'
import Modal, { ModalProps } from '@/components/Modal'
import InputField from '@/components/Inputfield'
import { createNotifications, deleteNotifications, fetchNotifications, resendNotifications } from '@/services/notificationService'
import { NotificationProps } from '@/types'
import EmptyState from '@/components/emptyState'
import { toast } from 'react-toastify'
import { Loader, SkeletonLoader } from '@/components/Loaders'
import { TrashIcon } from '@heroicons/react/24/outline'
import DownloadModal from '@/components/DownloadModal'

const Notifications = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState({create: false, resend: false, download: false})
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(false)
    const [responseData, setResponseData] = useState<any>()
    const [notification, setNotification] = useState<NotificationProps>()
    const [notifications, setNotifications] = useState<NotificationProps[]>()
    const [deletedIds, setDeletedIds] = useState(['']);
    const [formData, setFormData] = useState({
        title: '',
        body:''
    })

    useEffect(() =>{
        const fetchAllNotifications = async() =>{
            setLoading(true)
            try {
                const response = await fetchNotifications({pageNumber: pageNumber, pageSize: 8})
                setResponseData(response?.result)
                setNotifications(responseData?.notifications)
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

   const setIdandModal = (data:NotificationProps) => {
      setNotification(data)
       setShowModal({create: false, resend: true, download: false})
   }

   const handleChange = (e:any) => {
        const {name, value} = e.target
        setFormData((prevState)=> ({...prevState, [name]: value}))
    }

    const handleSubmit = async(e:any) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await createNotifications(formData)
            if (result.success){
                setLoading(false)
                toast.success(result)
                setShowModal({create: false, resend: false, download: false})
                location.reload() 
            }
        } catch (error) {
            setLoading(false)
            console.log(error);   
        }
    }
 
    const handleDelete = async(id: string) => {
        try {
            const result = await deleteNotifications(id)
            if (result.success){
                setLoading(false)
                toast.success("Notification deleted successfully")
                location.reload() 
            }
        } catch (error) {
            setLoading(false)
            console.log(error);   
        }
    };


  return (
    <div>
        <Head title='Notifications'/>
        <DownloadModal open={showModal.download} onClose={() => setShowModal({create: false, resend:false, download:false})} name='Notifications' />
        <div className='mt-8 flex justify-between'>
            <BtnPrimary onClick={()=>setShowModal({create: true, resend:false, download:false})}>Send a push notification</BtnPrimary>
            <BtnPrimary onClick={() => setShowModal({create: false, resend:false, download:true})} className={'flex gap-1'}>
                <span>Export{" "}</span>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13V14.2C19 15.8802 19 16.7202 18.673 17.362C18.3854 17.9265 17.9265 18.3854 17.362 18.673C16.7202 19 15.8802 19 14.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V13M15 8L10 13M10 13L5 8M10 13V1" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </BtnPrimary>
        </div>
        <div className='w-full mt-10'>
        {
            responseData?.totalNotifications === 0 ? 
            <EmptyState text='No Notifications Created'/>:
            <Table
            head={['Header', 'Body', 'Date Sent', '']}
            body={responseData?.notifications?.map((notification:NotificationProps, index: number) =>
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
                           <BtnPrimary className='!py-3 font-medium' onClick={()=>setIdandModal(notification)}>
                            {loading ? <Loader/> : "Resend"}
                           </BtnPrimary>
                        </td>
                        <td>
                            <TrashIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mr-3" aria-hidden="true" onClick={()=>handleDelete(notification._id)} />
                        </td>
                    </tr>
                </>
            )}
            itemsPerPage={8}
            showFilter={false}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            totalPages={responseData?.totalPages}
            isLoading={loading}
            currentPageNumber={pageNumber}
            />
        }
        </div>
        <ResendNotification 
         show={showModal.resend}
         hide={() => setShowModal({create: false, resend: false, download: false})}
         data={notification}
      />
        <Modal
        show={showModal.create}
        hide={() => setShowModal({create: false, resend: false, download: false})}
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

interface Props extends ModalProps {
    id?: string | undefined;
    data?: NotificationProps;
  }

const ResendNotification = (props: Props) => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const { show, hide, data} = props;
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        body:''
    })
    const handleChange = (e:any) => {
        const {name, value} = e.target
        setFormData((prevState)=> ({...prevState, [name]: value}))
        
     }
    
        const handleSubmit = async(e:any) => {
            e.preventDefault()
            setLoading(true)
            try {
                const payload = {
                    title: data?.title,
                    body:  data?.body
                }
                const result = await resendNotifications(payload, data?._id)
                if (result.success){
                    setLoading(false)
                    toast.success(result.result)
                    hide()
                    router.refresh()
                    location.reload()
                }
            } catch (error) {
                setLoading(false)
                console.log(error);   
            }
        }
    return (
        <Modal
        show={show}
        hide={hide}
        heading="Notifications"
        sub="Send out an app push notification"
      >
        <form className='mb-12' onSubmit={handleSubmit}> 
            <InputField placeholder='Header' change={handleChange} name='title' defaultValue={data?.title} readOnly />
            <InputField as='textarea' placeholder='Body' rows={5} change={handleChange} name='body' readOnly defaultValue={data?.body}/>
          <BtnPrimary className="font-semibold text-base mb-6 tracking-wide w-full" type="submit">
            {loading ? <Loader/> : "Resend Notifications"}
          </BtnPrimary>
         </form>
      </Modal>   
    )
}