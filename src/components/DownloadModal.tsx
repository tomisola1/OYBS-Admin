import React, { useState } from 'react'
import Modal from './Modal'
import InputField from './Inputfield'
import { Btn } from './Buttons'
import { exportDonations } from '@/services/dashboard'
import { toast } from 'react-toastify'
import { Loader } from './Loaders'
import { exportNotifications } from '@/services/notificationService'
import { exportUser } from '@/services/userService'

type IDownload = {
    open: boolean
    onClose: () => void
    name: string
    id?: string
}
const DownloadModal:React.FC<IDownload> = ({open, onClose, name, id}) => {
    const [loading, setLoading] = useState(false)
     const [formData, setFormData] = useState({
            startDate:'',
            endDate:'',
         })
        const handleChange = (e:any) => {
        const {name, value} = e.target
        setFormData((prevState)=> ({...prevState, [name]: value}))
        }
    const handleSubmit = async (e:any) => {
        e.preventDefault();
                setLoading(true);
                try {
                    const { startDate, endDate } = formData;

                    switch (name) {
                        case 'Donations':
                            await exportDonations({pageNumber: 1, pageSize: 8, endDate, startDate, exportData: true})
                            toast.success('Exported successfully. Check your mail')
                            setLoading(false)
                            return
                        case 'Notifications':
                            await exportNotifications({pageNumber: 1, pageSize: 8, endDate, startDate, exportData: true})
                            toast.success('Exported successfully. Check your mail')
                            setLoading(false)
                            return
                        default:
                             await exportUser({pageNumber: 1, pageSize: 8, exportData: true}, id)
                             toast.success('Exported successfully. Check your mail')
                            setLoading(false)
                            return
                    }   
                } catch (error:any) {
                    setLoading(false)
                    console.log(error); 
                    toast.error(error.response.data.result[0])     
                }
    }
  return (
    <Modal
    show={open}
    hide={() => onClose()}
    heading={`Download ${name}`}
  >
    <div className='flex flex-col justify-center gap-6'>
        <form onSubmit={handleSubmit}>
            {
                name === 'User Info' ? "":
                <>
            <InputField label="From Date" name='startDate' type='date' change={handleChange} required/>
            <InputField label="To Date" name='endDate' type='date' change={handleChange} required/>
                </>
            }
        <div className='flex justify-center gap-4'>
            <Btn className="px-10 text-sm" onClick={() => onClose()}>No, Cancel</Btn>
            <Btn className="px-10 text-sm" type='submit'>{loading ? <Loader/> : 'Yes, confirm'}</Btn>
        </div>
        </form>
    </div>
  </Modal> 
  )
}

export default DownloadModal