"use client"

import Head from '@/components/Head'
import Table from '@/components/Table'
import { fetchUsers } from '@/services/userService'
import { UserProps } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Users = () => {
    const router = useRouter()
    const [responseData, setResponseData] = useState<any>()
    const [pageNumber, setPageNumber] = useState(1)
    useEffect(() =>{
        const fetchAllUsers = async() =>{
            try {
                const response = await fetchUsers({pageNumber: pageNumber, pageSize: 8})
                console.log(response.result.users);
                setResponseData(response.result)
            } catch (error) {
                console.log(error);    
            }
        }
        fetchAllUsers()
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
  return (
    <div>
        <Head title='Users'/>
        <div className='w-full mt-10'>
            {
                responseData?.total === 0 ? 
                <h3 className='text-center text-2xl font-semibold mt-20'>No User Available</h3>:
                <Table
                head={['Name', 'Email', 'Phone Number', 'Streak', 'Insights Shared', 'Date joined']}
                body={ responseData?.users.map((data:UserProps, index: number) =>
                    <>
                        <tr className='border border-white' key={index} onClick={()=>router.push(`/dashboard/users/${data._id}`)}>
                            <td className='p-6 font-medium tracking-wide'>{data?.fullName}</td>
                            <td className='p-6 font-light'>{data?.email}</td>
                            <td className='p-6 font-light w-48'>{data?.phoneNumber ? data?.phoneNumber : "None"}</td>
                            <td className='p-6 font-light'>{data?.streak}</td>
                            <td className='p-6 font-light w-36'>{data?.insightsShared}</td>
                            <td className='p-6 font-light w-36'>{new Date(data?.dateJoined)?.toLocaleDateString()}</td>
                        </tr>
                    </>
                    )}
                itemsPerPage={8}
                showFilter={true}
                BtnItem='Suspend User'
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                totalPages={responseData?.totalPages}
                />
            }
        </div>
    </div>
  )
}

export default Users