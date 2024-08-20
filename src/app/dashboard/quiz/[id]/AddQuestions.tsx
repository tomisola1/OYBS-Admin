import { BtnPrimary } from "@/components/Buttons";
import InputField from "@/components/Inputfield";
import { Loader } from "@/components/Loaders";
import Modal, { ModalProps } from "@/components/Modal";
import { addQuestion } from "@/services/quizService";
import { QuestionsProps, QuizProps } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const initialQuestionState = {
    quiz: '',
    question: '',
    answer: '',
    answerDescription: '',
    choice: ['', '', '', ''],
};

const AddQuestion = (props:Props) =>{
    const { id, show, hide} = props;
    const router = useRouter()
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
        const {name, value} = e.target
        const updatedQuestions = {...questions};
        if (choiceIndex !== undefined) {
            updatedQuestions.choice[choiceIndex] = value;
        } else {
            updatedQuestions[name as keyof QuestionsProps] = value;
        }
          setQuestions(updatedQuestions);
        console.log({...questions});
    }


    const handleSubmit = async(e:any) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            const response  = await addQuestion({...questions, quiz: id})
            if(response.success) {
                toast.success('Question added successfully')
                setLoading(false)
                router.refresh()
                setQuestions(initialQuestionState)
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
        heading="Add Questions"
        className='h-4/5'
      >
        <form className='mb-12' onSubmit={handleSubmit}>
            <div>
                <InputField placeholder={`Question`} name='question' type='textarea' value={questions.question} change={handleChange} required/>
                {questions.choice.map((choice:string, choiceIndex:number) => (
                <InputField
                    key={choiceIndex}
                    placeholder={`Option ${choiceIndex + 1}`}
                    name={`choice-${choiceIndex}`}
                    value={choice}
                    change={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, choiceIndex)}
                    required
                />
                ))}
                <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full mb-4 font-light text-sm' value={questions.answer} name="answer" onChange={handleChange} required>
                    <option>Answers</option>
                    {
                        questions.choice.map((choice, index) => (
                            <option key={index}>{choice}</option>
                        ))
                    }
                </select>
                <InputField placeholder="Answer Explanation" type='textarea' name='answerDescription' value={questions.answerDescription}  change={handleChange} required/>
            </div>
            
              <BtnPrimary className="font-semibold text-base my-6 tracking-wide w-full" type="submit" >
                {loading ? <Loader/> : "Add Questions"}
              </BtnPrimary>
        </form>
       
      </Modal>  
    )
}

export default AddQuestion;

interface Props extends ModalProps {
    id: string | undefined;
  }