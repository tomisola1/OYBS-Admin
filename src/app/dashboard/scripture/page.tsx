"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import React, { FormEvent, useEffect, useState } from 'react'
import { EditIcon } from '../../../../public/assets/icons'
import { Btn, BtnPrimary } from '@/components/Buttons'
import Modal from '@/components/Modal'
import InputField from '@/components/Inputfield'
import { createScripture, fetchNewTestamentBooks, fetchOldTestamentBooks, fetchScriptures, getBookInfo } from '@/services/scriptureService'
import { BookInfoProps, BooksProps, ScheduleProps, ScriptureProps } from '@/types'
import { getDayOfYear } from 'date-fns'
import EditScripture from './EditScripture'
import { Loader } from '@/components/Loaders'
import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import { toast } from 'react-toastify'

const Scripture = () => {
    dayjs.extend(dayOfYear)
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
        // verseCount: 0,
    }])
    const [newSchedules, setNewSchedules] = useState<ScheduleProps[] | any>([{
        bookId: '',
        chapter: 0,
        startVerse: '',
        endVerse: '',
    }])
    const [bookId, setBookId] = useState('')
    const [bookInfo, setBookInfo] = useState<string[]>()
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
                    setBookInfo(response.result.chapters)
                    setLoading(false)
                }
               
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchBooksInfo()
    },[bookId])
    
    
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
        // if (name === 'chapter'){
            
        //     const selectedChapter = value;
        //     console.log(bookInfo);
        //     const selectedBookInfo = bookInfo?.find(
        //             (info:any) => info.chapter === Number(selectedChapter)
        //         );
        //         console.log(selectedBookInfo);
        //         updatedSchedules[index].verseCount = selectedBookInfo?.verses ?? 0
        //         setOldSchedules(updatedSchedules); 
        //         console.log(oldSchedules);
                
        // }
        // setNewID(oldSchedule)
    }
    if(title === 'newTestament'){
        const updatedSchedules = [...newSchedules];
        updatedSchedules[index][name as keyof ScheduleProps] = value;
    
        setNewSchedules(updatedSchedules);
        extractBookId(newSchedules)
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
            console.log(error); 
            toast.error(error.response.data.result)          
        }
       
    }

    const setScriptureAndModal: any= (data:ScriptureProps) => {
        setShowModal({create:false, edit:true}) 
        setScripture(data)
    }

    const getDateFromDayOfYear = (data: string) => {
        // Create a date object for the current year and set the day of the year
        const day = Number(data)
        const date = dayjs().startOf('year').dayOfYear(day);
        return date.format('MMMM D, YYYY');
    };
    
    // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const query = e.target.value;
    //     setSearchQuery(query);
    
    //     // Filter schedules based on the search query
    //     const filtered = responseData?.schedules.filter((schedule: ScriptureProps) =>
    //       dayjs(schedule.day).format('MMMM').includes(query)
    //     );
    //     setFilteredSchedules(filtered)
    //   };
    
      

  return (
    <div>
        <Head title='Scriptures of the Day'/>
        <div className='mt-8'>
            <BtnPrimary onClick={()=>setShowModal({create:true, edit:false})}>Add the scripture of the day</BtnPrimary>
        </div>
        {/* <div className="mt-4">
            <input
            type="text"
            placeholder="Search by month (e.g., November)"
            value={searchQuery}
            onChange={handleSearch}
            className='pr-3.5 pl-10 py-2.5 rounded-lg placeholder:text-gray-500 placeholder:text-sm w-80 focus:outline-none focus:border-orange-200 bg-[#F5F6FC]'
            />
        </div> */}

        <div className='w-full'>
            <Table
            head={[ 'Date', 'Old Testatment', 'New Testament', 'Action']}
            body={responseData?.schedules?.map((schedule:ScriptureProps, index: number) => {
                const isToday = schedule.day === dayjs().format('MMMM D, YYYY');
                return (
                <>   
                    <tr className={`border border-white ${isToday ? '!text-primary' : ''}`} key={index}>
                        <td className='p-4 font-light uppercase'>
                            <p>{getDateFromDayOfYear(schedule.day)}</p>
                        </td>
                        <td className={`p-4 font-normal tracking-wide uppercase ${isToday ? '!text-primary' : ''}`}>
                        {schedule?.oldTestament?.title}
                        </td>
                        <td className={`p-4 font-light uppercase ${isToday ? '!text-primary' : ''}`}>{schedule?.newTestament.title}</td>
                        <td className='pl-4 font-light flex gap-2 items-center h-14'>
                            <div onClick={()=>setScriptureAndModal(schedule)}>
                                <EditIcon />
                            </div>
                        </td>
                    </tr>
                </>
                )
            })}
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
                    <div className='flex max-sm:flex-col justify-between sm:items-end gap-2'>  
                        <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mb-4 font-light text-sm' key={index} name="chapter" value={schedule.chapter} onChange={(e:any)=>handleSchedulesChange(e, index, 'oldTestament')} required>
                        <option>Chapters</option>
                            {bookInfo && bookInfo?.map((chapter:any, index:number) => {
                                return (
                                    <option key={index} value={chapter}>
                                        {`Chapter ${chapter}`}
                                    </option>
                                );
                            })}
                        </select>
                        {/* <select
                            className="border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7] placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mb-4 font-light text-sm"
                            name="startVerse"
                            value={schedule.startVerse}
                            onChange={(e: any) => handleSchedulesChange(e, index, "oldTestament")}
                            required
                            >
                            <option>Start Verse</option>
                            {Array.from({ length: Number(oldSchedules.verseCount) }, (_, i) => i + 1).map((verse, index) => (
                                <option key={index} value={verse}>
                                    <p>{oldSchedules.verseCount}</p>
                                {`Verse ${verse}` }
                                </option>
                            ))}
                        </select> */}
                        <InputField placeholder='start verse' type='number' name='startVerse' label='(optional)' change={(e:any)=>handleSchedulesChange(e, index, 'oldTestament')}/>
                        <InputField placeholder='end verse' type='number' name='endVerse' label='(optional)' change={(e:any)=>handleSchedulesChange(e, index, 'oldTestament')}/>
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
                        <div className='flex max-sm:flex-col justify-between sm:items-end gap-2'>
                       
                            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mb-4 font-light text-sm' key={index} name="chapter" value={schedule.chapter} onChange={(e:any)=>handleSchedulesChange(e, index, 'newTestament')} required>
                            <option>Chapters</option>
                                {bookInfo && bookInfo?.map((chapter:string, index:number) => {
                                    return (
                                        <option key={index} value={chapter}>
                                            {`Chapter ${chapter}`}
                                        </option>
                                    );
                                })}
                            </select>
                            <InputField placeholder='start verse' type='number' name='startVerse' label='(optional)' change={(e:any)=>handleSchedulesChange(e, index, 'newTestament')}/>
                            <InputField placeholder='end verse' type='number' name='endVerse' label='(optional)' change={(e:any)=>handleSchedulesChange(e, index, 'newTestament')}/>
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