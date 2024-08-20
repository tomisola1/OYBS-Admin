"use client"

import { Btn, BtnPrimary } from '@/components/Buttons'
import Head from '@/components/Head'
import InputField from '@/components/Inputfield'
import { Loader } from '@/components/Loaders'
import Modal, { ModalProps } from '@/components/Modal'
import {  deleteQuiz, getQuizInfo } from '@/services/quizService'
import { QuestionsProps, QuizProps } from '@/types'
import { useRouter } from 'next/navigation'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import generatePDF, { Margin } from 'react-to-pdf'
import AddQuestion from './AddQuestions'
import UpdateQuiz from './UpdateQuiz'
import UpdateQuestions from './UpdateQuestions'
import { EditIcon } from '../../../../../public/assets/icons'

const SingleQuiz = ({ params }: { params: { id: string } }) => {
    const targetRef: RefObject<HTMLDivElement> = useRef(null);
    const [quiz, setQuiz] = useState<QuizProps>()
    const [questions, setQuestions] = useState<QuestionsProps[]>()
    const [selectedQuestion, setSelectedQuestion] = useState<QuestionsProps>()
    const [showModal, setShowModal] = useState({edit:false, add:false, update:false, question: false})
    const [loading, setLoading] = useState(false)

    const options = {
        page: {
            // margin is in MM, default is Margin.NONE = 0
            margin: Margin.MEDIUM,
            // default is 'A4'
            format: 'letter',
            // default is 'portrait'
         },
         canvas: {
            // default is 'image/jpeg' for better size performance,
            qualityRatio: 1
         },
         filename: `Quiz ${params.id}.pdf`
    }
    
    useEffect(() =>{
        const fetchAllquizs = async() =>{
            try {
                const response = await getQuizInfo(params.id)
                setQuiz(response?.result.quiz)               
                setQuestions(response?.result.questions)
            } catch (error) {
                console.log(error);    
            }
        }
        fetchAllquizs()
    },[params])

    const SelectQuestion =  (data:QuestionsProps) => {
        setSelectedQuestion(data)
        setShowModal({edit:false, add:false, update:false, question: true})
    }

  return (
    <div >  
        <Head title='Quiz Details' navigate={true}/>
            <div>
                <div className='flex md:flex-row flex-col justify-between'>
                    <div className='bg-background sm:w-3/4 px-[26px] py-8 rounded-xl mt-6'>
                        <div className='flex justify-between items-center mb-5'>
                        <h3 className='font-semibold text-base'>Quiz Information</h3>
                        <Btn className={"!px-8 !h-9"} onClick={() => setShowModal({edit:true, add:false, update:false, question:false})}>Edit Quiz</Btn>
                        </div>
                        <div className='w-full flex sm:flex-row flex-col gap-[10%]'>
                            <ul className='font-normal text-sm w-1/2'>
                                <li className='border-b border-b-white flex'>
                                    <span className='py-3 w-[40%]'>Quiz Title</span>
                                    <span className='py-3 text-left w-[60%]'><p className='font-medium'>{quiz?.title}</p></span>
                                </li>
                                <li className='border-b border-b-white flex'>
                                    <span className='py-3 w-[40%]'>Type</span>
                                    <span className='py-3 text-left w-[60%]'><p className='font-medium'>{quiz?.monthlyQuiz ? "Monthly Quiz" : "Weekly Quiz"}</p></span>
                                </li>
                                <li className='border-b border-b-white flex'>
                                    <span className='py-3 w-[40%]'>No of Questions</span>
                                    <span className='py-3 w-[60%]'><p className='font-medium'>{quiz?.questionCount}</p></span>
                                </li>
                                <li className='border-b border-b-white flex'>
                                    <span className='py-3 w-[40%]'>Quiz Date</span>
                                    <span className='py-3 w-[60%]'> 
                                        <p className='font-medium'>{quiz?.startDateTime
                                            ? new Date(quiz.startDateTime).toLocaleString('en-GB')
                                            : "No date"}
                                        </p>
                                        <p className='font-medium'>
                                        {quiz?.endDateTime
                                        ? new Date(quiz.endDateTime).toLocaleString('en-GB')
                                        : "No date"}
                                        </p>
                                    </span>
                                </li>
                                <li className='border-b border-b-white flex'>
                                    <span className='py-3 w-[40%]'>Date of creation</span>
                                    <span className='py-3 w-[60%]'><p className='font-medium'>{quiz?.createdAt
                                        ? new Date(quiz.createdAt).toLocaleString('en-GB')
                                        : "No date"}</p>
                                    </span>
                                </li>
                            </ul>
                            <ul className='font-normal text-sm w-1/2'>
                                <li className='border-b border-b-white flex'>
                                    <span className='py-3 w-[40%]'>Status</span>
                                    {
                                            quiz?.status === "LIVE"?
                                            <span className='py-3 w-[60%]'><p className='font-medium text-primary capitalize'>{quiz?.status?.toLowerCase()}</p></span>
                                        : quiz?.status === "COMPLETED"?
                                        <span className='py-3 w-[60%]'><p className='font-medium text-[#108A00] capitalize'>{quiz?.status?.toLowerCase()}</p></span>:
                                        <span className='py-3 w-[60%]'><p className='font-medium text-[#7C7C7C] capitalize'>{quiz?.status?.toLowerCase()}</p></span>
                                    }
                                </li> 
                                <li className='border-b border-b-white flex'>
                                    <span className='py-3 w-[40%]'>Created by</span>
                                    <span className='py-3 w-[60%]'><p className='font-medium'>Olabowale Popoola popoolapoet@gmail.com</p></span>
                                </li> 
                            </ul>
                        </div>
                    </div>
                    <div className='mt-6'>
                    <BtnPrimary onClick={() => generatePDF(targetRef, options )}>Download Questions</BtnPrimary>
                    </div>

                </div>
                <div ref={targetRef}>
                    <div className='mt-8'>
                        <h3 className='font-semibold text-lg'>Quiz Questions</h3>
                    </div>
                    <div className='grid sm:grid-cols-2 gap-6'>
                        {
                            questions?.map((question:QuestionsProps, index:number)=>(
                                <div className='mt-4' key={index}>
                                    <div className='flex gap-2'>
                                        <h3 className='font-semibold text-base'>Question {index+1}</h3>
                                        <div className='cursor-pointer' onClick={()=>SelectQuestion(question)}>
                                        <EditIcon />
                                        </div>
                                    </div>
                                    <div className='border rounded-lg py-2 px-3 text-sm mt-4'>
                                        <p>{question.question}</p>
                                    </div>
                                    {
                                        question.choice.map((choice, index:number)=>(
                                        <div className='border rounded-lg py-2 px-3 text-sm mt-4' key={index}>
                                            <p>{choice}</p>
                                        </div>
                                        ))
                                    }
                                    <div className='border rounded-lg py-2 px-3 text-sm mt-4'>
                                        <p><b>Answer:</b> {question.answer}</p>
                                    </div>
                                    <div className='border rounded-lg py-2 px-3 text-sm mt-4'>
                                        <p><b>Explanation:</b> {question.answerDescription}</p>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
            <Modal
            show={showModal.edit}
            hide={() => setShowModal({edit:false, add:false, update:false,question:false})}
            heading="Edit Quiz"
            sub="Kindly select which action you would like to proceed with."
            >
            <div className='flex justify-center gap-6'>
                <Btn className="px-10 text-sm" onClick={() => setShowModal({edit:false, add:false, update:true, question:false})}>Edit Quiz Information</Btn>
                <Btn className="px-10 text-sm" onClick={() => setShowModal({edit:false, add:true, update:false, question:false})}>Add Quiz Questions</Btn>
            </div>
            </Modal>
            <AddQuestion
         show={showModal.add}
         hide={() => setShowModal({edit:false, add:false, update:false, question:false})}
         id={params.id}
      /> 
      <UpdateQuestions
         show={showModal.question}
         hide={() => setShowModal({edit:false, add:false, update:false, question:false})}
         id={params.id}
         questionData={selectedQuestion}
      />      
      <UpdateQuiz
         show={showModal.update}
         hide={() => setShowModal({edit:false, add:false, update:false, question:false})}
         data={quiz}
         id={params.id}
      /> 
    </div>
  )
}

export default SingleQuiz

