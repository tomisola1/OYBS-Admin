import { BtnPrimary } from "@/components/Buttons";
import InputField from "@/components/Inputfield";
import { Loader } from "@/components/Loaders";
import Modal, { ModalProps } from "@/components/Modal";
import { updateQuiz } from "@/services/quizService";
import { QuizProps } from "@/types";
import { toDate } from "date-fns";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdateQuiz = (props:Props) =>{
    const { id, show, hide, data} = props;
    
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
            const { title, description, startDate, startTime, endDate, endTime } = quizData;
            if ((startDate && !startTime) || (!startDate && startTime)) {
                setLoading(false);
                toast.error("Please provide a valid date and time.");
                return;
            }
            if ((endDate && !endTime) || (!endDate && endTime)) {
                setLoading(false);
                toast.error("Please provide a valid date and time.");
                return;
            }

            const combinedStartDate = startDate && startTime ? combineDate(startDate, startTime) : data?.startDateTime;
            const combinedEndDate = endDate && endTime ? combineDate(endDate, endTime) : data?.endDateTime;
            
            const payload = {
                title: title || data?.title,
                description: description || data?.description,
                startDateTime: combinedStartDate,
                endDateTime: combinedEndDate,
                monthlyQuiz: quizType || data?.monthlyQuiz
            };

            
            const response = await updateQuiz(payload, id)
          
            if(response.success) {
                setLoading(false)
                hide()
                location.reload();
            }
        } catch (error:any) {
            setLoading(false)
            console.log(error);   
            toast.error(error.response.data.result)   
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
            <InputField name='title' placeholder="Quiz Title" change={handleChange} defaultValue={data?.title} value={quizData.title}/>   
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
            <InputField type='textarea' name='description' placeholder='Description' change={handleChange} defaultValue={data?.description}/>
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

export default UpdateQuiz;

interface Props extends ModalProps {
    id: string | undefined;
    data?: QuizProps;
  }