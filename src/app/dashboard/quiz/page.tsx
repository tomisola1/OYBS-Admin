"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Btn, BtnPrimary } from '@/components/Buttons'
import Modal, { ModalProps } from '@/components/Modal'
import InputField from '@/components/Inputfield'
import { EndQuiz, QuizLive, createQuizzes, deleteQuiz, fetchQuizzes, revealAnswers, updateQuiz } from '@/services/quizService'
import { QuizProps } from '@/types'
import { toDate } from 'date-fns'
import { Loader } from '@/components/Loaders'
import { toast } from 'react-toastify'
import Image from 'next/image'

const Quiz = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState({create:false, delete:false})
    const [responseData, setResponseData] = useState<any>()
    const [pageNumber, setPageNumber] = useState(1)
    const [quiz, setQuiz] = useState<string | undefined>('')
    const [showActions, setShowActions] = useState<number | null>(null)
    const [quizType, setQuizType] = useState(false)
    const [loading, setLoading] = useState(false)
    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        duration: 0
    })


    useEffect(() =>{
        const fetchAllQuizzes = async() =>{
            setLoading(true)
            try {
                const response = await fetchQuizzes({pageNumber: pageNumber, pageSize: 8})
                setResponseData(response?.result)
                setLoading(false)
            } catch (error) {
                console.log(error);    
            }
        }
        fetchAllQuizzes()
    },[pageNumber])
    
    console.log(responseData);
    
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
    }

    const handleSelectChange = (e:any) => {
        const {value} = e.target
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
            const { title, description, startDate, startTime, endDate, endTime, duration } = quizData;

           const combinedStartDate = combineDate(startDate, startTime);
           const combinedEndDate = combineDate(endDate, endTime);
            const payload = {
              title, description, 
              startDateTime: combinedStartDate, 
              endDateTime: combinedEndDate,
              monthlyQuiz: quizType,
              duration: duration
            }
            
            const response = await createQuizzes(payload)

            if(response.success) {
                setLoading(false)
                setShowModal({create:false, delete:false});
                location.reload()
            }
        } catch (error:any) {
            setLoading(false)
            console.log(error);
            toast.error(error.response.data.result)       
        }
    }

    const handleGoLive = async(id:string|undefined) => {
        try {
            const response = await QuizLive(id) 
            if(response.success) {
                setLoading(false)
                toast.success("Quiz is successfully Live.") 
                location.reload() 
            }
        } catch (error:any) {
            setLoading(false)
            console.log(error);
            toast.error(error.response.data.result)  
        }
    }

    const handleRevealAnswer = async(id:string|undefined) => {
        try {
            const response = await revealAnswers(id) 
            if(response.success) {
                setLoading(false)
                toast.success("Users can view answers.") 
                location.reload() 
            }
        } catch (error:any) {
            setLoading(false)
            console.log(error);
            toast.error(error.response.data.result)  
        }
    }

    const endQuiz = async(id:string|undefined) => {
        try {
            const response = await EndQuiz(id) 
            if(response.success) {
                setLoading(false)
                toast.success("Ended quiz successfully.")  
                location.reload()
            }
        } catch (error:any) {
            setLoading(false)
            console.log(error);
            toast.error(error.response.data.result)  
        }
    }

    const handleActions = (id: number) => {
        setShowActions(id === showActions ? null : id);
      };

      const setQuizId = (id:string|undefined) => {
        setShowModal({create:false, delete:true})
        setQuiz(id);
      }

    const quizTypes = ['Weekly quiz', 'Monthly quiz']

  return (
    <div>
        <Head title='Quiz'/>
        <div className='mt-8'>
            <BtnPrimary onClick={()=>setShowModal({create:true, delete:false})}>Create Quiz</BtnPrimary>
        </div>
        <div className='w-full'>
            {
                responseData?.total === 0 ? 
                <h3 className='text-center text-2xl font-semibold mt-20'>No Quiz Available</h3>:
                <Table
                head={['Quiz Title', 'Type', 'Questions', 'Created by', 'Status', 'Quiz Date', 'Action']}
                body={responseData?.quizzes.map((quiz:QuizProps, index: number) =>
                    <>
                        <tr className='border border-white relative ' key={index}>
                            <td className='p-4 pl-5 font-normal tracking-wide'>
                            {quiz.title}
                            </td>
                            <td className='p-4 pl-5 font-light'>{quiz.monthlyQuiz ? "Monthly Quiz" : "Weekly Quiz"}</td>
                            <td className='p-4 pl-5 font-light'>{quiz.questionCount}</td>
                            <td className='p-4 pl-5 font-light'>
                                <p>{quiz.author?.firstName} {quiz.author?.lastName}</p>
                                <p>{quiz.author?.email}</p>
                            </td>
                            {
                                    quiz.status === "LIVE"?
                                <td className='p-4 pl-5 text-primary font-bold capitalize'>
                                    {quiz.status?.toLowerCase()}
                                </td>: quiz.status === "COMPLETED"?
                                <td className='p-4 pl-5 text-[#108A00] font-bold capitalize'>
                                    {quiz.status?.toLowerCase()}
                                </td>:
                                <td className='p-4 pl-5 text-[#7C7C7C] font-bold capitalize'>
                                {quiz.status?.toLowerCase()}
                                </td>
                            }
                            <td className='p-4 pl-5 font-light'>
                                <p>{new Date(quiz.startDateTime).toLocaleString('en-GB')}</p>
                                <p>{new Date(quiz.endDateTime).toLocaleString('en-GB')}</p>
                            </td>                   
                            <td className='p-4 pl-5'>
                                <Image src={"/assets/menu-dots.svg"} alt={"menu"} width={30} height={30} onClick={()=>handleActions(index)}/>
                            </td>
                            {
                            showActions === index && (
                            <td className='flex flex-col absolute z-10 bg-white rounded-[10px] right-3 top-14 py-5 px-2 text-xs w-36 shadow-md'>
                                <span className='py-2 px-4 hover:bg-[#fe7200] hover:bg-opacity-10 transition-colors duration-700 rounded-[10px] cursor-pointer' onClick={()=>handleGoLive(quiz._id)}>Go Live</span>
                                <span className='py-2 px-4 hover:bg-[#fe7200] hover:bg-opacity-10 transition-colors duration-700 rounded-[10px] cursor-pointer' onClick={()=>router.push(`/dashboard/quiz/${quiz._id}`)}>View Info</span>
                                <span className='py-2 px-4 hover:bg-[#fe7200] hover:bg-opacity-10 transition-colors duration-700 rounded-[10px] cursor-pointer' onClick={()=>endQuiz(quiz._id)}>End Quiz</span>
                                {
                                    (!quiz.canReview && quiz.status === "COMPLETED")&&
                                    <span className='py-2 px-4 hover:bg-[#fe7200] hover:bg-opacity-10 transition-colors duration-700 rounded-[10px] cursor-pointer' onClick={()=>handleRevealAnswer(quiz._id)}>Reveal Answers</span>
                                }
                                <span className='py-2 px-4 hover:bg-[#fe7200] hover:bg-opacity-10 transition-colors duration-700 rounded-[10px] cursor-pointer text-red-600' onClick={() => setQuizId(quiz._id) }>Delete Quiz</span>
                            </td>)
                            }
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
        show={showModal.create}
        hide={() => setShowModal({create:false, delete:false})}
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
            <InputField type='number' placeholder='Quiz Duration' name='duration' change={handleChange}/>
          <BtnPrimary className="font-semibold text-base my-6 tracking-wide w-full" type="submit">
            {loading ? <Loader/> : "Create Quiz"}
          </BtnPrimary>
         </form>
      </Modal>  
      <DeleteQuiz
         show={showModal.delete}
         hide={() => setShowModal({create:false, delete:false})}
         id={quiz}
      />     
    </div>
  )
}

export default Quiz

interface Props extends ModalProps {
    id: string | undefined;
    data?: QuizProps;
  }

const DeleteQuiz = (props: Props) => {
    const router = useRouter()
    const { id, show, hide} = props;
    console.log(id);
    
    const handleDelete = async() => {
        try {
            const response = await deleteQuiz(id)
            
            if(response.success){
                hide()
                location.reload()
            }
        } catch (error) {
            console.log(error)        
        }
    }
    return (
        <Modal
        show={show}
        hide={hide}
        heading="Delete Quiz"
        sub="Are you sure you want to delete this Quiz?"
      >
        <div className='flex justify-center gap-6'>
            <Btn className="px-10 text-sm" onClick={hide}>No, Cancel</Btn>
            <Btn className="px-10 text-sm" onClick={handleDelete}>Yes, Confirm</Btn>
        </div>
      </Modal>
    )
}