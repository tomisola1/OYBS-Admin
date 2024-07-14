"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import image from '../../../../public/assets/image'
import Pill from '@/components/Pill'
import { TrashIcon } from '@heroicons/react/24/outline'
import { EditIcon } from '../../../../public/assets/icons'
import { Btn, BtnPrimary } from '@/components/Buttons'
import Modal from '@/components/Modal'
import InputField from '@/components/Inputfield'
import { createScripture, fetchNewTestamentBooks, fetchOldTestamentBooks, fetchScriptures, getBookInfo } from '@/services/scriptureService'
import { BookInfoProps, BooksProps, ScheduleProps, ScriptureProps } from '@/types'
import { getDayOfYear } from 'date-fns'
import EditScripture from './EditScripture'
import { Loader } from '@/components/Loaders'
import { toast } from 'react-toastify'

const Scripture = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState({create: false, edit: false})
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(false)
    const [responseData, setResponseData] = useState<any>()
    const [scripture, setScripture] = useState<ScriptureProps>()
    const [books, setBooks] = useState({
        oldtestaments: [],
        newtestaments: [],
    })
    const [oldSchedules, setOldSchedules] = useState<ScheduleProps[] | any>([{
        bookId: '',
        chapter: 0,
        startVerse: '',
        endVerse: '',
    }])
    const [newSchedules, setNewSchedules] = useState<ScheduleProps[] | any>([{
        bookId: '',
        chapter: 0,
        startVerse: '',
        endVerse: '',
    }])
    const [bookId, setBookId] = useState('')
    const [bookInfo, setBookInfo] = useState<BookInfoProps[]>()
    const [formData, setFormData] = useState<any>(
        {
        day: '',
        oldTestament: {
            schedule: [],
            title: ''
        },
        newTestament: {
            schedule:[],
            title: ''
        }})

    useEffect(() =>{
        const fetchAllScriptures = async() =>{
            setLoading(true)
            try {
                const response = await fetchScriptures({pageNumber: pageNumber, pageSize: 8})
                setResponseData(response.result)
                setLoading(false)
            } catch (error) {
                console.log(error);    
            }
        }
        fetchAllScriptures()
        
    },[pageNumber])

    useEffect(() =>{
        const fetchBooks = async() =>{
            setLoading(true)
            try {
               const oldBooks = await fetchOldTestamentBooks()
               const newBooks = await fetchNewTestamentBooks()
               if (oldBooks && newBooks){
                    books.oldtestaments = oldBooks.result ?? []
                    books.newtestaments = newBooks.result ?? []
               }else {
                console.log('One or more responses are null');
               }
               setLoading(false)
               
            } catch (error) {
                console.log(error);    
            }
        }
        fetchBooks()
   
    },[])

    useEffect(() => {
        const fetchBooksInfo = async() =>{
            try {
                setLoading(true);
                if(bookId){
                    const response = await getBookInfo(bookId)
                    setBookInfo(response.result.verses)
                    setLoading(false)
                }
               
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchBooksInfo()
    },[bookId])
    
    console.log(bookInfo);
    
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

   const addSchedules = (name:string) => {
    if (name === "oldTestament"){
        setOldSchedules([...oldSchedules, {}])
    }
    if (name === "newTestament"){
        setNewSchedules([...newSchedules, {}])
    }
   }


   const handleChange = (e: any, parentObject?: "oldTestament" | "newTestament") => {
    const { name, value } = e.target
    if (parentObject) {
       setFormData({ ...formData, [parentObject]: { ...formData[parentObject], [name]: value } })
    } else {
       setFormData({ ...formData, [name]: value })
    }

 }



 const extractBookId = (books:any)=>{
    books?.forEach((book:BooksProps) =>{
        setBookId(book.bookId) 
    })
 }

   const handleSchedulesChange = (e: any, index: number, title:string) => {
    const { name, value } = e.target;
    if(title === 'oldTestament'){
        const updatedSchedules = [...oldSchedules];
        updatedSchedules[index][name as keyof ScheduleProps] = value;
    
        setOldSchedules(updatedSchedules);
        
        extractBookId(oldSchedules)
        // setNewID(oldSchedule)
    }
    if(title === 'newTestament'){
        const updatedSchedules = [...newSchedules];
        updatedSchedules[index][name as keyof ScheduleProps] = value;
    
        setNewSchedules(updatedSchedules);
    }
    
  };

    const handleSubmit = async(e:any) => {
        e.preventDefault()  
        try{
            setLoading(true)
            const dayOfYear = getDayOfYear(new Date(formData.day))
          
            const payload = {
                day: dayOfYear,
                oldTestament: {
                    schedule: oldSchedules,
                    title: formData.oldTestament.title
                },
                newTestament: {
                    schedule: newSchedules,
                    title: formData.newTestament.title
                }
            }
            
            const response = await createScripture(payload)
            if(response) {
                setShowModal({create:false, edit:false})
                setLoading(false)
                location.reload()
            }

        } catch(error:any){
            console.log(); 
            toast.error(error.response.data.result)          
        }
       
    }

    const setScriptureAndModal: any= (data:ScriptureProps) => {
        setShowModal({create:false, edit:true}) 
         setScripture(data)
    }

  return (
    <div>
        <Head title='Scripture of the Day'/>
        <div className='mt-8'>
            <BtnPrimary onClick={()=>setShowModal({create:true, edit:false})}>Add the scripture of the day</BtnPrimary>
        </div>
        <div className='w-full'>
            <Table
            head={['Old Testatment', 'New Testament', 'Date', 'Action']}
            body={responseData?.schedules.map((schedule:ScriptureProps, index: number) =>
                <>
                    <tr className='border border-white' key={index}>
                        <td className='p-4 font-normal tracking-wide uppercase'>
                        {schedule?.oldTestament?.title}
                        </td>
                        <td className='p-4 font-light uppercase'>{schedule?.newTestament.title}</td>
                        <td className='p-4 font-light'>
                            <p>{new Date(schedule?.createdAt).toLocaleDateString()}</p>
                        </td>
                        <td className='pl-4 font-light flex gap-2 items-center h-14'>
                            <div onClick={()=>setScriptureAndModal(schedule)}>
                                <EditIcon />
                            </div>
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
        </div>
        <EditScripture
            show={showModal.edit}
            hide={() => setShowModal({edit:false, create:false})}
            data={scripture}
            // books={books}
        />
        <Modal
        show={showModal.create}
        hide={() => setShowModal({create:false, edit:false})}
        heading="Scripture of the Day"
        className='overflow-auto h-3/4'
      >
        <form className='mb-12' onSubmit={handleSubmit}> 
            <InputField placeholder='Title' name='title' value={formData.oldTestament.title} change={(e: any) => handleChange(e, 'oldTestament')} required/>
            {
                oldSchedules.map((schedule:ScheduleProps, index:number)=>(
                <>
                    <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mb-4 font-light text-sm' key={index} name="bookId" value={schedule.bookId} onChange={(e:any)=>handleSchedulesChange(e, index, 'oldTestament')} required>
                    <option>Old Testament</option>
                        {books && books?.oldtestaments?.map((oldtestament:BooksProps, index) => {
                            return (
                                <option key={index} value={oldtestament.bookId}>
                                    {`${oldtestament.name} - ${oldtestament.chapterSize} Chapters`}
                                </option>
                            );
                        })}
                    </select>
                    <div className='flex justify-between gap-2'>  
                        <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mb-4 font-light text-sm' key={index} name="chapter" value={schedule.chapter} onChange={(e:any)=>handleSchedulesChange(e, index, 'oldTestament')} required>
                        <option>Chapters</option>
                            {bookInfo && bookInfo?.map((info:BookInfoProps, index:number) => {
                                return (
                                    <option key={index} value={info.chapter}>
                                        {`Chapter ${info.chapter} - ${info.verses} Verses`}
                                    </option>
                                );
                            })}
                        </select>
                        <InputField placeholder='Verses' name='startVerse' change={(e:any)=>handleSchedulesChange(e, index, 'oldTestament')}/>
                        <InputField placeholder='Verses' name='endVerse' change={(e:any)=>handleSchedulesChange(e, index, 'oldTestament')}/>
                    </div>
                </>
                
                ))
            }
            <p className='text-primary font-semibold text-xs capitalize mb-3 cursor-pointer' onClick={()=>addSchedules("oldTestament")}>Add More books from the Old Testament</p>
            <InputField placeholder='Title' name='title' value={formData.newTestament.title} change={(e: any) => handleChange(e, 'newTestament')}/>
            {
                newSchedules.map((schedule:ScheduleProps, index:number)=>(
                    <>
                        <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mb-4 font-light text-sm' key={index} name="bookId" value={schedule.bookId} onChange={(e:any)=>handleSchedulesChange(e, index, 'newTestament')} required>
                        <option>New Testament</option>
                            {books && books?.newtestaments?.map((newtestament:BooksProps, index) => {
                                return (
                                    <option key={index} value={newtestament.bookId}>
                                        {`${newtestament.name} - ${newtestament.chapterSize} Chapters`}
                                    </option>
                                );
                            })}
                        </select>
                        <div className='flex gap-3'>
                       
                            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mb-4 font-light text-sm' key={index} name="chapter" value={schedule.chapter} onChange={(e:any)=>handleSchedulesChange(e, index, 'newTestament')} required>
                            <option>Chapters</option>
                                {bookInfo && bookInfo?.map((info:BookInfoProps, index:number) => {
                                    return (
                                        <option key={index} value={info.chapter}>
                                            {`${info.chapter} - ${info.verses} Verses`}
                                        </option>
                                    );
                                })}
                            </select>
                            <InputField placeholder='Verses' name='startVerse' change={(e:any)=>handleSchedulesChange(e, index, 'newTestament')}/>
                            <InputField placeholder='Verses' name='endVerse' change={(e:any)=>handleSchedulesChange(e, index, 'newTestament')}/>
                        </div>
                    </>

                ))
            }
            <p className='text-primary font-semibold text-xs capitalize mb-3 cursor-pointer' onClick={()=>addSchedules("newTestament")}>Add More books from the New Testament</p>
            <InputField type='date' name='day' change={(e: any) => handleChange(e)} required/>
          <BtnPrimary className="font-semibold text-base mt-6 tracking-wide w-full" type="submit">{loading ? <Loader/> :"Update SOD"}</BtnPrimary>
         </form>
      </Modal>         
    </div>
  )
}

export default Scripture