"use client"

import { Btn, BtnPrimary } from '@/components/Buttons'
import Head from '@/components/Head'
import InputField from '@/components/Inputfield'
import { Loader } from '@/components/Loaders'
import Modal, { ModalProps } from '@/components/Modal'
import { addQuestion, getQuizInfo, updateQuiz } from '@/services/quizService'
import { QuestionsProps, QuizProps } from '@/types'
import { toDate } from 'date-fns'
import React, { useEffect, useState } from 'react'

const SingleQuiz = ({ params }: { params: { id: string } }) => {
    const [quiz, setQuiz] = useState<QuizProps>()
    const [questions, setQuestions] = useState<QuestionsProps[]>()
    const [showModal, setShowModal] = useState({edit:false, add:false, update:false})
    
    useEffect(() =>{
        const fetchAllquizs = async() =>{
            try {
                const response = await getQuizInfo(params.id)
                setQuiz(response?.result.quiz)
                console.log(response?.result);
                
                setQuestions(response?.result.questions)
            } catch (error) {
                console.log(error);    
            }
        }
        fetchAllquizs()
    },[params])
  return (
    <div>  
        <Head title='Quiz Details' navigate={true}/>
            <div className='bg-background w-2/5 p-6 rounded-xl mt-6'>
                <div className='flex justify-between items-center mb-5'>
                  <h3 className='font-semibold text-base'>Quiz Information</h3>
                  <Btn className={"!px-8 !h-9"} onClick={() => setShowModal({edit:true, add:false, update:false})}>Edit</Btn>
                </div>
                <table className='w-full'>
                 <tbody className='font-normal text-sm'>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Quiz Title</td>
                        <td className='py-3'><p className='font-medium'>{quiz?.title}</p></td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Type</td>
                        <td className='py-3'><p className='font-medium'>{quiz?.monthlyQuiz ? "Monthly Quiz" : "Weekly Quiz"}</p></td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>No of Questions</td>
                        <td className='py-3'><p className='font-medium'>{quiz?.questionCount}</p></td>
                    </tr>
                    <tr className='border-b border-b-white'>
                        <td className='py-3'>Quiz Date</td>
                        <td className='py-3'> 
                            <p className='font-medium'>{new Date(quiz?.startDateTime).toLocaleString('en-GB', { timeZone: 'UTC' })?? "No date"}</p>
                            <p className='font-medium'>{new Date(quiz?.endDateTime).toLocaleString('en-GB', { timeZone: 'UTC' })?? "No date"}</p>
                        </td>
                    </tr>
                 </tbody>
                </table>
            </div>
            <div className='mt-8'>
                <h3 className='font-semibold text-lg'>Quiz Questions</h3>
            </div>
            <div className='grid grid-cols-2 gap-6'>
                {
                    questions?.map((question:QuestionsProps, index:number)=>(
                        <div className='mt-4' key={index}>
                            <h3 className='font-semibold text-base'>Question {index+1}</h3>
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
                        </div>
                    ))
                }

            </div>
            <Modal
            show={showModal.edit}
            hide={() => setShowModal({edit:false, add:false, update:false})}
            heading="Edit Quiz"
            sub="Kindly select which action you would like to proceed with."
            >
            <div className='flex justify-center gap-6'>
                <Btn className="px-10 text-sm" onClick={() => setShowModal({edit:false, add:false, update:true})}>Edit Quiz Information</Btn>
                <Btn className="px-10 text-sm" onClick={() => setShowModal({edit:false, add:true, update:false})}>Add Quiz Questions</Btn>
            </div>
            </Modal>
            <AddQuestion
         show={showModal.add}
         hide={() => setShowModal({edit:false, add:false, update:false})}
         data={quiz}
         id={params.id}
      />       
      <UpdateQuestion
         show={showModal.update}
         hide={() => setShowModal({edit:false, add:false, update:false})}
         data={quiz}
         id={params.id}
      /> 
    </div>
  )
}

export default SingleQuiz

interface Props extends ModalProps {
    id: string | undefined;
    data?: QuizProps;
  }
const AddQuestion = (props:Props) =>{
    const { id, show, hide} = props;
    console.log(id);
    
    const [options, setOptions] = useState([''])
    const [loading, setLoading] = useState(false)
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
        setLoading(true)
        try {
            const response  = await addQuestion({...questions, quiz: id})
            console.log(response);  
            if(response.success) {
                setLoading(false)
                hide()
                location.reload();
            }
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
            
              <BtnPrimary className="font-semibold text-base my-6 tracking-wide w-full" type="submit" >
                {loading ? <Loader/> : "Add Questions"}
              </BtnPrimary>
        </form>
       
      </Modal>  
    )
}

const UpdateQuestion = (props:Props) =>{
    const { id, show, hide, data} = props;
    console.log(id);
    
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
              title, 
              description, 
              startDateTime: combinedStartDate, 
              endDateTime: combinedEndDate,
              monthlyQuiz: quizType
            }
            console.log(payload);
            
            const response = await updateQuiz(payload, id)
            console.log(response);
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

    const quizTypes = ['Weekly quiz', 'Monthly quiz']

    return (
        <Modal
        show={show}
        hide={hide}
        heading="Update Quiz"
        className='h-4/5'
      >
        <form className='' onSubmit={handleSubmit}>
            <InputField name='title' placeholder="Quiz Title" change={handleChange}/>   
            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mb-4 font-light text-sm' onChange={handleSelectChange} >
            <option>{data?.monthlyQuiz?"Monthly Quiz":"Weekly Quiz"}</option>
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
            {loading ? <Loader/> : "Update Quiz"}
          </BtnPrimary>
         </form>
       
      </Modal>  
    )
}