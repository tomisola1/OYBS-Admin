"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { EditIcon } from '../../../../public/assets/icons'
import { Btn, BtnPrimary } from '@/components/Buttons'
import Modal, { ModalProps } from '@/components/Modal'
import InputField from '@/components/Inputfield'
import { createUser, deleteUser, editUser, fetchAdminUsers } from '@/services/userService'
import EmptyState from '@/components/emptyState'
import { Roles } from '@/utils/utils'
import { AdminProps } from '@/types'
import { Loader, SkeletonLoader } from '@/components/Loaders'
import { toast } from 'react-toastify'
import UserImageInput from '@/components/UserImageInput'

const AccessControl = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState({form:false, delete:false, edit:false})
    const [responseData, setResponseData] = useState<any>()
    const [pageNumber, setPageNumber] = useState(1)
    const [user, setUser] = useState<AdminProps>()
    const [loading, setLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState<any>();
    const [error, setError] = useState("")
    const [image, setImage] = useState<File | null>();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userType: "",
        picture: {},
        password: "",
    })


    useEffect(() =>{
        const fetchAllUsers = async() =>{
            setLoading(true)
            try {
                const response = await fetchAdminUsers({pageNumber: pageNumber, pageSize: 8})
                setResponseData(response.result)
                setLoading(false)
            } catch (error) {
                console.log(error);    
            }
        }
        fetchAllUsers()
    },[pageNumber])
    
    const setUserAndModal: any= (data:any) => {
        setShowModal({form:false, edit:true,  delete:false})
        
        setUser(data)
    }

    const setIdAndModal: any= (data:any) => {
        setShowModal({form:false, edit:false,  delete:true})
        
         setUser(data)
    }
    
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
    setFormData((prevState)=> ({...prevState, [name]: value}))
    
 }

 const handleImageSelect = (e: any) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (file) {
      setImage(file);
      console.log('Selected file:', file);
    }
    if (file?.size > 4194304){
        setError("Image size must be less than 4MB")
    }else{
        setError("")
    }
    const reader = new FileReader();
		reader.onload = function (event) {
			setPreviewImage(event?.target?.result);
		};
		reader.readAsDataURL(file);
   };

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await createUser({...formData, picture: image})
            if(result.success) {
                setLoading(false);
                setShowModal({form:false, delete:false, edit:false})
                location.reload();
            }
        } catch (error:any) {
            setLoading(false)
            toast.error(error.response.data.result)
            console.log(error);
            
        }
    }

  return (
    <div>
        <Head title='Access Control'/>
        <div className='mt-8'>
            <BtnPrimary onClick={()=>setShowModal({form:true, delete:false, edit:false})}>Add User</BtnPrimary>
        </div>
        <div className='w-full mt-4'>
            {            
                 responseData?.total === 0 ? 
                 <EmptyState text='No User Available'/>:
                <Table
                head={['Name', 'Email', 'Role', 'Date Added', 'Action']}
                body={responseData?.users.map((user: AdminProps, index: number) =>
                    <>
                        <tr className='border border-white' key={index}>
                            <td className='p-4 font-normal tracking-wide'>
                            {user.firstName}{' '}{user.lastName}
                            </td>
                            <td className='p-4 font-light'>{user.email}</td>
                            <td className='p-4 font-medium'>{user.userType}</td>
                            <td className='p-4 font-light'>
                                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                            </td>
                            <td className='pl-4 font-light flex gap-2 items-center h-14'>
                                <div onClick={()=>setUserAndModal(user)}>
                                    <EditIcon />
                                </div>
                                <TrashIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mr-1" aria-hidden="true" onClick={()=>setIdAndModal(user)}/>
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
        show={showModal.form}
        hide={() => setShowModal({form:false, delete:false, edit:false})}
        heading="Add User"
        sub="An email will be sent to the added user with their
        credentials"
        className='!h-4/5'
      >
        <form className='mb-12'> 
            <UserImageInput name='picture' onImageSelect={handleImageSelect} preview={previewImage} error={error} required/>
            <InputField placeholder='First Name' name='firstName' change={handleChange}/>
            <InputField placeholder='Last Name' name='lastName' change={handleChange}/>
            <InputField placeholder='Email' name='email' change={handleChange }/>
            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full font-light text-sm mb-4' name='userType' value={formData.userType}
            onChange={handleChange}>
            <option>Select Role</option>
                {Roles.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
            <InputField placeholder='Password' name='password' type='password' change={handleChange } />
          <BtnPrimary className="font-semibold text-base mt-6 tracking-wide w-full" type="submit" onClick={handleSubmit}>
          {loading ? <Loader/>: "Add user"}
          </BtnPrimary>
         </form>
      </Modal>
      <UpdateUser
        show={showModal.edit}
        hide={()=> setShowModal({form:false, delete:false, edit:false})}
        data={user}
        id={user?._id}
      />
      <DeleteUser
         show={showModal.delete}
         hide={()=> setShowModal({form:false, delete:false, edit:false})}
         id={user?._id}
      />
              
    </div>
  )
}

export default AccessControl

interface Props extends ModalProps {
    id?: string | undefined;
    data?: AdminProps;
  }
const DeleteUser = (props: Props) => {
    const router = useRouter()
    const { id, show, hide} = props;
    
    const handleDelete = async() => {
        try {
            const response = await deleteUser(id)
      
            if(response.success){
                hide()
                location.reload();

            }
        } catch (error) {
            console.log(error)        
        }
    }
    return (
        <Modal
        show={show}
        hide={hide}
        heading="Delete User"
        sub="Are you sure you want to delete this user?"
      >
        <div className='flex justify-center gap-6'>
            <Btn className="px-10 text-sm">No, Cancel</Btn>
            <Btn className="px-10 text-sm" onClick={handleDelete}>Yes, Confirm</Btn>
        </div>
      </Modal>  
    )
}


const UpdateUser = (props: Props) => {
    const router = useRouter()
    const { show, hide, data, id} = props;
    const [loading, setLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState<any>();
    const [image, setImage] = useState<File | null>();
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userType: "",
        picture:{},
        password: "",
    })

    const handleChange = (e:any) => {
        const {name, value} = e.target
        setFormData((prevState)=> ({...prevState, [name]: value}))
    }

    const handleImageSelect = (event: any) => {
		const file = event.target.files?.[0]; 
        
		if (!file) {
			return;
		}
        if (file) {
            setImage(file);
        }
        if (file?.size > 4194304){
            setError("Image size must be less than 4MB")
        }else{
            setError("")
        }
		const reader = new FileReader();
		reader.onload = function (event) {
			setPreviewImage(event?.target?.result);
		};
		reader.readAsDataURL(file);
	};

     const handleSubmit = async(e:any) => {
        e.preventDefault();
        setLoading(true)
        try {
            const {firstName, lastName, email, userType, password}=formData
            const payload = {
                firstName: firstName ? firstName : data?.firstName,
                lastName: lastName ? lastName : data?.lastName,
                email: email ? email : data?.email,
                userType: userType ? userType : data?.userType,
                password: password ? password : data?.password,
                picture: image ? image : data?.picture
            }
            const response = await editUser(payload, id)

            if(response.success) {
                toast.success("A New User has been created")
                setLoading(false)
                hide()
                location.reload();
            }
        } catch (error) {
            setLoading(false)
            console.log(error);      
        }
    }
    return (
        <Modal
        show={show}
        hide={hide}
        heading="Edit User"
        sub="This will be updated on the OYBS mobile app"
        className='!h-4/5'
      >
        <form className='mb-12'> 
            <UserImageInput name='picture' onImageSelect={handleImageSelect} preview={previewImage} error={error} required/>
            <InputField placeholder='First Name' name='firstName' change={handleChange} defaultValue={data?.firstName}/>
            <InputField placeholder='Last Name' name='lastName' change={handleChange} defaultValue={data?.lastName}/>
            <InputField placeholder='Email' name='email' change={handleChange } defaultValue={data?.email}/>
            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full font-light text-sm mb-4' name='userType' value={formData.userType}
            onChange={handleChange} defaultValue={data?.userType}>
            <option>{data?.userType}</option>
                {Roles.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
            <InputField placeholder='Password' name='password' change={handleChange }  />
          <BtnPrimary className="font-semibold text-base mt-6 tracking-wide w-full" type="submit" onClick={handleSubmit}>
            {loading ? <Loader/> : "Edit User"}
          </BtnPrimary>
         </form>
      </Modal>
    )
}