import { BtnPrimary } from '@/components/Buttons';
import InputField from '@/components/Inputfield';
import { Loader } from '@/components/Loaders';
import Modal, { ModalProps } from '@/components/Modal';
import { updateQuestion } from '@/services/quizService';
import { QuestionsProps, QuizProps } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const UpdateQuestions = (props:Props) => {
    const { show, hide, questionData} = props;
    const router = useRouter()
    
    const [options, setOptions] = useState([''])
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState<any>(
        {
            quiz: questionData?.quiz || '',
            question: questionData?.question || '',
            answer: questionData?.answer || '',
            answerDescription: questionData?.answerDescription || '',
            choice: questionData?.choice || ['','','', ''],
        }
    )
  console.log(questionData);
  
    const handleOptionChange = (e:any, choiceIndex?: number) => {
        const {value} = e.target
            console.log(questions)

        setQuestions((prevQuestions:any) => {
            if (choiceIndex !== undefined) {
                // Create a new array with the updated choice
                const updatedChoice = [...prevQuestions.choice];
                updatedChoice[choiceIndex] = value;
                return { ...prevQuestions, choice: updatedChoice };
            } 
        });
  
        console.log({...questions});
    
    }

    const handleChange = (e:any) => {
        const {name, value} = e.target
        setQuestions((prevQuestions:any) => ({ ...prevQuestions, [name]: value }))
    }


    // console.log("data", questionData);
    const handleSubmit = async(e:any) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            console.log("payload", questions);
            
            const response  = await updateQuestion(questions, questionData?._id)
            if(response.success) {
                toast.success('Question updated successfully')
                setLoading(false)
                hide()
                router.refresh()
            }
        } catch (error:any) {
            setLoading(false)
            console.log(error);
            toast.error(error.response.data.result) 
        }
    }

    return (
        <Modal
        show={show}
        hide={hide}
        heading="Update Question"
        className='h-4/5'
      >
        <form className='mb-12' onSubmit={handleSubmit}>
            <div>
                <InputField placeholder={`Question`} name='question' type='textarea' defaultValue={questionData?.question} change={handleChange}/>
                {questionData?.choice.map((choice:string, choiceIndex:number) => (
                <InputField
                    key={choiceIndex}
                    placeholder={`Option ${choiceIndex + 1}`}
                    name={`choice-${choiceIndex}`}
                    defaultValue={choice}
                    // value={choice}
                    change={(e: React.ChangeEvent<HTMLInputElement>) => handleOptionChange(e, choiceIndex)}
                />
                ))}
                <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mb-4 font-light text-sm' name="answer" onChange={handleChange}>
                    <option>{questionData?.answer}</option>
                    {
                       questions?.choice.map((choice:any, index:number) => (
                            <option key={index}>{choice}</option>
                        ))
                    }
                </select>
                <InputField placeholder="Answer Explanation" type='textarea' rows={4} name='answerDescription' defaultValue={questionData?.answerDescription} change={handleChange}/>
            </div>
            
              <BtnPrimary className="font-semibold text-base my-6 tracking-wide w-full" type="submit" >
                {loading ? <Loader/> : "Update Question"}
              </BtnPrimary>
        </form>
       
      </Modal>  
    )
}

export default UpdateQuestions
interface Props extends ModalProps {
    id: string | undefined;
    questionData?: QuestionsProps;
  }