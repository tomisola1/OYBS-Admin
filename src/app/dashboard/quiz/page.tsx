"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import image from '../../../../public/image'
import Pill from '@/components/Pill'
import { TrashIcon } from '@heroicons/react/24/outline'
import { EditIcon } from '../../../../public/icons'
import { Btn, BtnPrimary } from '@/components/Buttons'
import Modal, { ModalProps } from '@/components/Modal'
import InputField from '@/components/Inputfield'
import { addQuestion, createQuizzes, fetchQuizzes } from '@/services/quizService'
import { QuestionsProps, QuizProps } from '@/types'
import { toDate } from 'date-fns'

const Quiz = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState({create:false, edit:false, add:false, delete:false, update:false})
    const [responseData, setResponseData] = useState<any>()
    const [pageNumber, setPageNumber] = useState(1)
    const [quiz, setQuiz] = useState<QuizProps>()
    const [quizType, setQuizType] = useState(false)
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
            try {
                const response = await fetchQuizzes({pageNumber: pageNumber, pageSize: 8})
                console.log(response.result);
                setResponseData(response?.result)
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

    const setQuizAndModal: any= (data:QuizProps) => {
        setShowModal({create:false, edit:true, add:false, delete:false, update:false})
        console.log(data);
        
         setQuiz(data)
    }


    const handleSubmit = async(e:any) => {
        e.preventDefault();
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
                setShowModal({create:false, edit:false, add:false, delete:false, update:false});
                location.reload();
            }
        } catch (error) {
            console.log(error);      
        }
    }

    const quizTypes = ['Weekly quiz', 'Monthly quiz']

  return (
    <div>
        <Head title='Quiz'/>
        <div className='mt-8'>
            <BtnPrimary onClick={()=>setShowModal({create:true, edit:false, add:false, delete:false, update:false})}>Create Quiz</BtnPrimary>
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
                                <div onClick={()=>setQuizAndModal(quiz)}>
                                    <EditIcon />
                                </div>
                                <TrashIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mr-1" aria-hidden="true"/>
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
        show={showModal.edit}
        hide={() => setShowModal({create:false, edit:false, add:false, delete:false, update:false})}
        heading="Edit Quiz"
        sub="Kindly select which action you would like to proceed with."
        >
         <div className='flex justify-center gap-6'>
            <Btn className="px-10 text-sm">Edit Quiz Information</Btn>
            <Btn className="px-10 text-sm" onClick={() => setShowModal({create:false, edit:false, add:true, delete:false, update:false})}>Add Quiz Questions</Btn>
          </div>
        </Modal>
        <Modal
        show={showModal.create}
        hide={() => setShowModal({create:false, edit:false, add:false, delete:false,update:false})}
        heading="Create Quiz"
        sub="This will be updated on the OYBS mobile app"
        className='h-4/5'
      >
        <form className=''>
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
          <BtnPrimary className="font-semibold text-base my-6 tracking-wide w-full" type="submit" onClick={handleSubmit}>Create Quiz</BtnPrimary>
         </form>
      </Modal>  
      <AddQuestion
         show={showModal.add}
         hide={() => setShowModal({create:false, edit:false, add:false, delete:false, update:false})}
         data={quiz}
         id={quiz?._id}
      />       
    </div>
  )
}

export default Quiz

interface Props extends ModalProps {
    id: string | undefined;
    data?: QuizProps;
  }
const AddQuestion = (props:Props) =>{
    const { id, show, hide} = props;
    console.log(id);
    
    const [options, setOptions] = useState([''])
    const [questions, setQuestions] = useState<QuestionsProps>(
        {
        quiz: '',
        question: '',
        answer: '',
        answerDescription: '',
        choice: ['', '', '', ''],
        }
    )
  
    const handleChange = (e:any, choiceIndex?: number) => {
        console.log({...questions});
        const {name, value} = e.target
        const updatedQuestions = {...questions};
        if (choiceIndex !== undefined) {
            updatedQuestions.choice[choiceIndex] = value;
        } else {
            updatedQuestions[name as keyof QuestionsProps] = value;
        }
          setQuestions(updatedQuestions);
    }

    const handleSubmit = async(e:any) => {
        e.preventDefault()
        try {
            console.log(questions);
            
            const response  = await addQuestion({...questions, quiz: id})
            console.log(response);  
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
        show={show}
        hide={hide}
        heading="Add Questions"
        className='h-4/5'
      >
        <form className='mb-12' onSubmit={handleSubmit}>
        {/* {
            questions.map((question:QuestionsProps, index:number) => ( */}
                <div>
                     <InputField placeholder={`Question 1`} name='question' change={handleChange}/>
                     {questions.choice.map((choice:string, choiceIndex:number) => (
                        <InputField
                            key={choiceIndex}
                            placeholder={`Option ${choiceIndex + 1}`}
                            name={`choice-${choiceIndex}`}
                            value={choice}
                            change={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, choiceIndex)}
                        />
                    ))}
                    <InputField placeholder='Answer' name='answer' change={handleChange}/>
                    <InputField placeholder="Answer Explanation" name='answerDescription' change={handleChange}/>
                </div>
               
            {/* ))
        } */}
                {/* <div className='text-primary font-semibold text-[15px] mt-3' onClick={addQuestions}>
                    <p>Click to Add More Questions</p>
                </div> */}
              <BtnPrimary className="font-semibold text-base my-6 tracking-wide w-full" type="submit" >Add Questions</BtnPrimary>
        </form>
       
      </Modal>  
    )
}