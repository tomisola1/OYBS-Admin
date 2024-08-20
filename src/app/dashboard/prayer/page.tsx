"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import image from '../../../../public/assets/image'
import Pill from '@/components/Pill'
import { TrashIcon } from '@heroicons/react/24/outline'
import { EditIcon } from '../../../../public/assets/icons'
import { Btn, BtnPrimary } from '@/components/Buttons'
import Modal, { ModalProps } from '@/components/Modal'
import InputField from '@/components/Inputfield'
import { createPrayer, deletePrayer, fetchPrayers, updatePrayer } from '@/services/prayerService'
import { PrayerProps } from '@/types'
import { isToday, isTomorrow, isYesterday, toDate } from "date-fns";
import dayjs from 'dayjs'
import EmptyState from '@/components/emptyState'
import { Loader, SkeletonLoader } from '@/components/Loaders'
import ImageInput from '@/components/ImageInput'
import { validateURLWithConstructor } from '@/utils/utils'
import { toast } from 'react-toastify'

const Prayer = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState({form:false, delete:false, edit:false})
    const [image, setImage] = useState<File | null>();
    const [responseData, setResponseData] = useState<any>()
    const [pageNumber, setPageNumber] = useState(1)
    const [prayerId, setPrayerId] = useState('')
    const [loading, setLoading] = useState(false)
    const [prayer, setPrayer] = useState<PrayerProps>()
    const [previewImage, setPreviewImage] = useState<any>();
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        text:'',
        meetingLink:'',
        picture:{},
        startDate:'',
        time:''
     })


    useEffect(() =>{
        const fetchAllPrayers = async() =>{
            setLoading(true)
            try {
                const response = await fetchPrayers({pageNumber: pageNumber, pageSize: 8})
                setResponseData(response?.result)
                setLoading(false)
            } catch (error) {
                console.log(error);    
            }
        }
        fetchAllPrayers()
    },[])
    
    
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
   }

   const handleImageSelect = (e: any) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (file) {
      setImage(file);
      console.log('Selected file:', file);
    }
    if (file?.size > 4194304){
        setError("Image size must be less than 4MB")
    }else{
        setError("")
    }
    const reader = new FileReader();
		reader.onload = function (event) {
			setPreviewImage(event?.target?.result);
		};
		reader.readAsDataURL(file);
   };

   const setPrayerAndModal: any= (data:PrayerProps) => {
       setShowModal({form:false, delete:false, edit:true}) 
        setPrayer(data)
   }

   const setIdAndModal: any= (id:string) => {
       setShowModal({form:false, delete:true, edit:false}) 
        setPrayerId(id)
   }

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { startDate, time, text, meetingLink } = formData;
            const [year, month, day] = startDate.split('-').map(Number);
            const [hours, minutes] = time.split(':').map(Number);
      
            const combinedDateTime = new Date(year, month - 1, day, hours, minutes);
            if (meetingLink) {
             validateURLWithConstructor(meetingLink)

            }
            const payload = {
                text,
                meetingLink,
                startDate: toDate(combinedDateTime) ,
                picture: image
            }
            
            const response = await createPrayer(payload)

            if(response.success) {
                setLoading(false)
                setShowModal({form:false, delete:false, edit:false})
                location.reload();
            }
        } catch (error:any) {
            setLoading(false)
            console.log(error); 
            toast.error(error.response.data.result[0])     
        }
    }

    const displayTime = (date:any) => {
        const now = dayjs();
        const prayerDate = dayjs(date)
        const differenceInHour = prayerDate.diff(now, 'h');
        const differenceInDays = prayerDate.diff(now, 'day');
        const differenceInWeeks = prayerDate.diff(now, 'w');
        const differenceInMonths = prayerDate.diff(now, 'M');
        
        
        let timeDifference;
        if((differenceInDays === 0) && (differenceInHour > 0)){
            timeDifference = "Happening Soon"
        }else if((differenceInDays < 0) || (differenceInHour < 0)){
            timeDifference = "Has passed"
        }else if(differenceInHour === 0){
            timeDifference = "In Progress"
        }
        else if(differenceInDays < 8) {
        timeDifference = `In ${differenceInDays} day(s)`;
        } else if(differenceInWeeks < 4){
             timeDifference = `In ${differenceInWeeks} week(s)`
        }
        else  {
            timeDifference = `In ${differenceInMonths} month(s)`
        }
        return timeDifference;

    }
   
  return (
    <div>
        <Head title='Prayer'/>
        <div className='mt-8'>
            <BtnPrimary onClick={()=>setShowModal({form:true, delete:false, edit:false})}>Add Prayer Session</BtnPrimary>
        </div>
        <div className='w-full'>
            {
                responseData?.total === 0 ? 
                <EmptyState text='No prayers available'/>
                :
                <Table
                head={['Title', 'Meeting Link', 'Status', 'Meeting Date', 'Action']}
                body={responseData?.prayers.map((prayer:PrayerProps,index: number) =>
                    <>
                        <tr className='border border-white' key={index}>
                            <td className='p-4 font-normal capitalize tracking-wide flex items-center gap-3'>
                            <Image src={prayer.picture} alt='prayer image' width={55} height={55}/> 
                            {prayer.text} 
                            </td>
                            <td className='p-4 font-light'>{prayer.meetingLink}</td>
                            <td className='pl-4'>
                                <Pill text={displayTime(prayer.startDate)}/>
                            </td>

                            <td className='p-4 font-light'>
                                <p>{new Date(prayer.startDate).toLocaleTimeString('en-US')}</p>
                                <p>{new Date(prayer.startDate).toLocaleDateString()}</p>
                            </td>
                            <td className='pr-4 font-light flex gap-2 justify-center items-center h-full'>
                                <div onClick={()=>setPrayerAndModal(prayer)}>
                                    <EditIcon />
                                </div>
                                <TrashIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mr-1" aria-hidden="true" onClick={()=>setIdAndModal(prayer._id)} />
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

        <Modal
        show={showModal.form}
        hide={() => setShowModal({form:false, delete:false, edit:false})}
        heading="Add Prayer Session"
        sub="This will be updated on the OYBS mobile app"
        className='h-4/5'
      >
        <form onSubmit={handleSubmit}>
            <InputField placeholder="Title of Prayer Session" name='text' change={handleChange} required/>
            <InputField placeholder="Meeting Link" name='meetingLink' change={handleChange} required/>
            <InputField placeholder="Time of Prayer Session" name='time' type='time' change={handleChange} required/>
            <InputField placeholder="Date of Prayer Session" name='startDate' type='date' change={handleChange} required/>
            <ImageInput name='picture' onImageSelect={handleImageSelect} preview={previewImage} error={error} required/>
          <BtnPrimary className="font-semibold text-base my-6 tracking-wide w-full" type="submit">
            {loading ? <Loader/> : "Add Prayer Session"}
          </BtnPrimary>
         </form>
      </Modal>
       
      <UpdatePrayer 
         show={showModal.edit}
         hide={() => setShowModal({form:false, delete:false, edit:false})}
         data={prayer}
      />
      <DeletePrayer 
         show={showModal.delete}
         hide={() => setShowModal({form:false, delete:false, edit:false})}
         id={prayerId}
      />
         
    </div>
  )
}

export default Prayer

interface Props extends ModalProps {
    id?: string | undefined;
    data?: PrayerProps;
  }
const DeletePrayer = (props: Props) => {
    const router = useRouter()
    const { id, show, hide} = props;
    const handleDelete = async() => {
        try {
            const response = await deletePrayer(id)

            if(response.success){
                hide()
                location.reload();

            }
        } catch (error) {
            console.log(error)        
        }
    }
    return (
        <Modal
        show={show}
        hide={hide}
        heading="Delete Prayer"
        sub="Are you sure you want to delete this Prayer Session?"
      >
        <div className='flex justify-center gap-6'>
            <Btn className="px-10 text-sm" onClick={hide}>No, Cancel</Btn>
            <Btn className="px-10 text-sm" onClick={handleDelete}>Yes, Confirm</Btn>
        </div>
      </Modal>
    )
}


const UpdatePrayer = (props: Props) => {
    const router = useRouter()
    const { show, hide, data} = props;
    const [image, setImage] = useState<File | null>();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState<any>();
    const [formData, setFormData] = useState({
        text:'',
        meetingLink:'',
        picture:{},
        startDate:'',
        time:''
     })

    const handleChange = (e:any) => {
        const {name, value} = e.target
        setFormData((prevState)=> ({...prevState, [name]: value}))
    }
  

    const handleImageSelect = (event: any) => {
		const file = event.target.files?.[0]; 
        
		if (!file) {
			return;
		}
        if (file) {
            setImage(file);
        }
       
        if (file?.size > 4194304){
            setError("Image size must be less than 4MB")
        }else{
            setError("")
        }
        
		const reader = new FileReader();
		reader.onload = function (event) {
			setPreviewImage(event?.target?.result);
		};
		reader.readAsDataURL(file);
	};
  

     const handleSubmit = async(e:any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { startDate, time, text, meetingLink } = formData;
            if ((startDate && !time) || (!startDate && time)) {
                setLoading(false);
                toast.error("Please provide a valid date and time.");
                return;
            }
            if (meetingLink) {
                const res = validateURLWithConstructor(meetingLink)
                if (!res) {
                    setLoading(false);
                    return;
                }
            }
            const [year, month, day] = startDate.split('-').map(Number);
            const [hours, minutes] = time.split(':').map(Number);
      
            const combinedDateTime = new Date(year, month - 1, day, hours, minutes);
            
            const payload = {
                text: text || data?.text,
                meetingLink: meetingLink || data?.meetingLink,
                startDate: combinedDateTime || data?.startDate,
                picture: image || data?.picture,
            }
        
            const response = await updatePrayer(payload, data?._id)
            if(response.success) {
                setLoading(false)
                hide()
                location.reload();
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
        heading="Edit Prayer Session"
        sub="This will be updated on the OYBS mobile app"
      >
       <form className='mb-12'  onSubmit={handleSubmit}>
            <InputField placeholder="Title of Prayer Session" name='text' defaultValue={data?.text} value={formData.text} change={handleChange}/>
            <InputField placeholder="Meeting Link" name='meetingLink' defaultValue={data?.meetingLink} value={formData.meetingLink} change={handleChange}/>
            <InputField placeholder="Time of Prayer Session" name='time' type='time' value={formData.time} change={handleChange}/>
            <InputField placeholder="Date of Prayer Session" name='startDate' value={formData.startDate} type='date' change={handleChange}/>
            <ImageInput name='picture' onImageSelect={handleImageSelect} defaultVal={data?.picture} preview={previewImage} error={error} />
          <BtnPrimary className="font-semibold text-base my-6 tracking-wide w-full" type="submit">{loading ? <Loader/> : "Edit Prayer Session"}</BtnPrimary>
         </form>
      </Modal>
    )
}