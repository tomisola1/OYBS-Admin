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
import { addQuestion, createQuizzes, fetchQuizzes, updateQuiz } from '@/services/quizService'
import { QuestionsProps, QuizProps } from '@/types'
import { toDate } from 'date-fns'
import { Loader, SkeletonLoader } from '@/components/Loaders'

const Quiz = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [responseData, setResponseData] = useState<any>()
    const [pageNumber, setPageNumber] = useState(1)
    const [quiz, setQuiz] = useState<QuizProps>()
    const [quizType, setQuizType] = useState(false)
    const [loading, setLoading] = useState(false)
    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: ''
    })


    useEffect(() =>{
        const fetchAllQuizzes = async() =>{
            setLoading(true)
            try {
                const response = await fetchQuizzes({pageNumber: pageNumber, pageSize: 8})
                console.log(response.result);
                setResponseData(response?.result)
                setLoading(false)
            } catch (error) {
                console.log(error);    
            }
        }
        fetchAllQuizzes()
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
    setQuizData((prevState)=> ({...prevState, [name]: value}))
    console.log(quizData);
    }

    const handleSelectChange = (e:any) => {
        const {value} = e.target
        console.log(value);
        if(value === 'Monthly quiz'){
            setQuizType(true)
        }else {
            setQuizType(false)
        }
    }

    const combineDate = (date:string, time:string) => {
        const [year, month, day] = date.split('-').map(Number);
        const [hours, minutes] = time.split(':').map(Number);
  
        const combinedDateTime = new Date(year, month - 1, day, hours, minutes);
        return toDate(combinedDateTime)
    }


    const handleSubmit = async(e:any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { title, description, startDate, startTime, endDate, endTime } = quizData;

           const combinedStartDate = combineDate(startDate, startTime);
           const combinedEndDate = combineDate(endDate, endTime);
            const payload = {
              title, description, 
              startDateTime: combinedStartDate, 
              endDateTime: combinedEndDate,
              monthlyQuiz: quizType
            }
            console.log(payload);
            
            const response = await createQuizzes(payload)
            console.log(response);
            if(response.success) {
                setLoading(false)
                setShowModal(false);
                location.reload();
            }
        } catch (error) {
            setLoading(false)
            console.log(error);      
        }
    }

    const quizTypes = ['Weekly quiz', 'Monthly quiz']

  return (
    <div>
        <Head title='Quiz'/>
        <div className='mt-8'>
            <BtnPrimary onClick={()=>setShowModal(true)}>Create Quiz</BtnPrimary>
        </div>
        <div className='w-full'>
            {
                responseData?.total === 0 ? 
                <h3 className='text-center text-2xl font-semibold mt-20'>No Quiz Available</h3>:
                <Table
                head={['Quiz Title', 'Type', 'Number of Questions', 'Quiz Date', 'Action']}
                body={responseData?.quizzes.map((quiz:QuizProps, index: number) =>
                    <>
                        <tr className='border border-white' key={index}>
                            <td className='p-4 font-normal tracking-wide'>
                            {quiz.title}
                            </td>
                            <td className='p-4 font-light'>{quiz.monthlyQuiz ? "Monthly Quiz" : "Weekly Quiz"}</td>
                            <td className='p-4 font-light'>{quiz.questionCount}</td>
                            <td className='p-4 font-light'>
                                <p>{new Date(quiz.startDateTime).toLocaleString('en-GB', { timeZone: 'UTC' })}</p>
                                <p>{new Date(quiz.endDateTime).toLocaleString('en-GB', { timeZone: 'UTC' })}</p>
                            </td>
                            <td className='pl-4 font-light flex gap-2 items-center h-14'>
                                <BtnPrimary className={"!h-10 font-medium text-sm"} onClick={()=>router.push(`/dashboard/quiz/${quiz._id}`)}>Open</BtnPrimary>
                                {/* <div onClick={()=>setQuizAndModal(quiz)}>
                                    <EditIcon />
                                </div>
                                <TrashIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mr-1" aria-hidden="true"/> */}
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
        show={showModal}
        hide={() => setShowModal(false)}
        heading="Create Quiz"
        sub="This will be updated on the OYBS mobile app"
        className='h-4/5'
      >
        <form className='' onSubmit={handleSubmit}>
            <InputField name='title' placeholder="Quiz Title" change={handleChange}/>   
            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mb-4 font-light text-sm' onChange={handleSelectChange}>
            <option>Quiz Type</option>
                {quizTypes.map((option, index) => {
                    return (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    );
                })}
            </select>
            <InputField type='textarea' name='description' placeholder='Description' change={handleChange}/>
            <div>
            Quiz Starting Date
            <InputField type='date' name='startDate' change={handleChange}/>
            <InputField type='time' name='startTime' change={handleChange}/>

            </div>
            <div>
            Quiz Ending Date
            <InputField type='date' name='endDate' change={handleChange}/>
            <InputField type='time' name='endTime' change={handleChange}/>

            </div>
          <BtnPrimary className="font-semibold text-base my-6 tracking-wide w-full" type="submit">
            {loading ? <Loader/> : "Create Quiz"}
          </BtnPrimary>
         </form>
      </Modal>  
            
    </div>
  )
}

export default Quiz

