import { BtnPrimary } from '@/components/Buttons';
import InputField from '@/components/Inputfield';
import { Loader } from '@/components/Loaders';
import Modal, { ModalProps } from '@/components/Modal';
import { fetchNewTestamentBooks, fetchOldTestamentBooks, getBookInfo, updateScripture } from '@/services/scriptureService';
import { BookInfoProps, BooksProps, ScheduleProps, ScriptureProps } from '@/types';
import { getDayOfYear } from 'date-fns';
import React, { useEffect, useState } from 'react'

interface Props extends ModalProps {
    id?: string | undefined;
    data?: ScriptureProps;
  }

const EditScripture = (props:Props) => {
    const { show, hide, data} = props;
    const [showModal, setShowModal] = useState({create: false, edit: false})
    const [loading, setLoading] = useState(false)
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
               console.log(books.oldtestaments);
               
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
                    console.log(bookInfo);
                }
               
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchBooksInfo()
    },[bookId])

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
    console.log(formData);

 }



 const extractBookId = (books:any)=>{
    books?.forEach((book:BooksProps) =>{
        console.log(book.bookId);
        setBookId(book.bookId) 
            console.log(bookId);
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
    console.log(oldSchedules, newSchedules);

   
    
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
            
            const response = await updateScripture(payload, data?._id)
            if(response) {
                setLoading(false)
            }

        } catch(error){
            console.log();           
        }
       
    }
  return (
    <Modal
    show={show}
    hide={hide}
    heading="Edit Scripture of the Day"
    className='overflow-auto h-3/4'
  >
    <form className='mb-12' onSubmit={handleSubmit}> 
        <InputField placeholder='Title' name='title' value={formData.oldTestament.title} change={(e: any) => handleChange(e, 'oldTestament')} />
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
                                        {`${info.chapter} - ${info.verses} Verser`}
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
        <InputField type='date' name='day' change={(e: any) => handleChange(e)}/>
      <BtnPrimary className="font-semibold text-base mt-6 tracking-wide w-full" type="submit">{loading ? <Loader/> :"Update SOD"}</BtnPrimary>
     </form>
  </Modal>     
  )
}

export default EditScripture