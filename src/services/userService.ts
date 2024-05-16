import { params } from "@/utils/utils";
import axios from "axios";
const baseUrl = 'https://oybs-backend.onrender.com/api/v1'
const headerToken = localStorage?.getItem('token')


export const fetchUsers = (params:params) => {
    const request = axios.get(
      baseUrl + `/admin/users/all/?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const fetchSingleUser = (userId:string | null) => {
    const request = axios.get(
      baseUrl + `/admin/users/${userId}`,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const fetchAdminUsers = (params:params) => {
  const request = axios.get(
    baseUrl + `/admin/?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`,
    {headers: {"Authorization":`Bearer ${headerToken}`}}
  ).then((response)=>
   response.data
  )
  return request
};