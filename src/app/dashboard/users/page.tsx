"use client"

import Head from '@/components/Head'
import { SkeletonLoader } from '@/components/Loaders'
import Table from '@/components/Table'
import { fetchUsers } from '@/services/userService'
import { UserProps } from '@/types'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { log } from 'console'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Users = () => {
    const router = useRouter()
    const [responseData, setResponseData] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [searchText, setSearchText] = useState('')
    const [dateJoined, setDateJoined] = useState('')
    const [streak, setStreak] = useState('')
    const [insightsShared, setInsightsShared] = useState('')

// ===================================
// I prefect my functions this way 
// =============================================
    // const fetchAllUsers = async () => {
    //     setLoading(true);
    //     try {
    //       const response = await fetchUsers({
    //         pageNumber,
    //         pageSize: 8,
    //         emailOrName: searchText,
    //         dateJoined,
    //         streak,
    //         insightsShared,
    //       });
    //       setResponseData(response.result);
    //       setLoading(false);
    //       console.log(response.result);
    //     } catch (error) {
    //       console.log(error);
    //       setLoading(false);
    //     }
    //   };
    
    //   useEffect(() => {
    //     fetchAllUsers();
    //   }, [searchText, pageNumber, dateJoined, streak, insightsShared]);
    

    useEffect(() => {
        const fetchAllUsers = async () => {
          setLoading(true);
          try {
            const response = await fetchUsers({
              pageNumber,
              pageSize: 8,
              emailOrName: searchText,
              dateJoined,
              streak,
              insightsShared,
            });
            setResponseData(response.result);
            setLoading(false);
            console.log(response.result);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };
    
        fetchAllUsers();
      }, [searchText, pageNumber, dateJoined, streak, insightsShared]);
    
    
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

   const handleSearch = (e: any) => {
    setSearchText(e.target.value)
    setPageNumber(1)
  }
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const [type, order] = value.split('-');

    if (type === 'dateJoined') {
      setDateJoined(order);
      setStreak('');
      setInsightsShared('');
    } else if (type === 'streak') {
      setStreak(order);
      setDateJoined('');
      setInsightsShared('');
    } else if (type === 'insightsShared') {
      setInsightsShared(order);
      setDateJoined('');
      setStreak('');
    }
  }

  const filters = [
    { name: 'Date joined(asc)', value: 'dateJoined-ASC' },
    { name: 'Date joined(desc)', value: 'dateJoined-DESC' },
    { name: 'Insights Shared(asc)', value: 'insightsShared-ASC' },
    { name: 'Insights Shared(desc)', value: 'insightsShared-DESC' },
    { name: 'Streak(asc)', value: 'streak-ASC' },
    { name: 'Streak(desc)', value: 'streak-DESC' },
  ];

  const refreshPage = () => {
    console.log("hi");
    location.reload()
    
  }


  return (
    <div>
        <Head title='Users'/>
        <div className='flex flex-col sm:flex-row gap-5 items-center mt-10 justify-between'>
            <div className='relative'>
                    <MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0 text-gray-500 ml-1 absolute top-3 left-2"
                aria-hidden="true" />
                    <input placeholder='Search by email' onChange={handleSearch} className='pr-3.5 pl-10 py-2.5 rounded-lg placeholder:text-gray-500 placeholder:text-sm w-80 focus:outline-none focus:border-orange-200 bg-[#F5F6FC]'/>
            </div>
            <div>
            <select className='border-solid border-[1px] border-[#EFEFEF] rounded-lg p-3.5 text-[#75838db7]  placeholder-opacity-50 focus:outline-none focus:border-orange-200 focus:shadow w-full font-light text-sm' onChange={handleChange}>
            <option>Sort by</option>
                {filters.map((option, index) => {
                    return (
                        <option key={index} value={option.value}>
                            {option.name}
                        </option>
                    );
                })}
            </select>
            </div>
        </div>
        <div className='w-full mt-4'>
            {
                responseData?.total === 0 ? 
                <h3 className='text-center text-2xl font-semibold mt-20'>No User Available</h3>:
                <Table
                head={['Name', 'Email', 'Phone Number', 'Streak', 'Insights Shared', 'Date joined']}
                body={ responseData?.users.map((data:UserProps, index: number) =>
                    <>
                    {data.isSuspended ? (
                        <tr className='border border-white !text-red-600' key={index} onClick={()=>router.push(`/dashboard/users/${data._id}`)}>
                            <td className='p-6 font-medium tracking-wide'>{data?.fullName}</td>
                            <td className='p-6 font-light'>{data?.email}</td>
                            <td className='p-6 font-light w-48'>{data?.phoneNumber ? data?.phoneNumber : "None"}</td>
                            <td className='p-6 font-light'>{data?.streak}</td>
                            <td className='p-6 font-light w-36'>{data?.insightsShared}</td>
                            <td className='p-6 font-light w-36'>{new Date(data?.dateJoined)?.toLocaleDateString()}</td>
                        </tr>):(
                        <tr className='border border-white' key={index} onClick={()=>router.push(`/dashboard/users/${data._id}`)}>
                            <td className='p-6 font-medium tracking-wide'>{data?.fullName}</td>
                            <td className='p-6 font-light'>{data?.email}</td>
                            <td className='p-6 font-light w-48'>{data?.phoneNumber ? data?.phoneNumber : "None"}</td>
                            <td className='p-6 font-light'>{data?.streak}</td>
                            <td className='p-6 font-light w-36'>{data?.insightsShared}</td>
                            <td className='p-6 font-light w-36'>{new Date(data?.dateJoined)?.toLocaleDateString()}</td>
                        </tr>)
                    }
                    </>
                    )}
                itemsPerPage={8}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                totalPages={responseData?.totalPages}
                isLoading={loading}
                currentPageNumber={pageNumber}
                />
            }
        </div>
    </div>
  )
}

export default Users