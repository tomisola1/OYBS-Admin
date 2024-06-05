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

export const suspendUsers = (data:any) => {
  const request = axios.post(
    baseUrl + `/admin/users/suspend`,
    data,
    {headers: {"Authorization":`Bearer ${headerToken}`}}
  ).then((response)=>
   response.data
  )
  return request
};

export const createUser = (data:any) => {
  const request = axios.post(
    baseUrl + `/admin`,
    data,
    {headers: {"Authorization":`Bearer ${headerToken}`}}
  ).then((response)=>
   response.data
  )
  return request
};

export const editUser = (data:any, id:String| undefined) => {
  const request = axios.patch(
    baseUrl + `/admin/${id}`,
    data,
    {headers: {"Authorization":`Bearer ${headerToken}`}}
  ).then((response)=>
   response.data
  )
  return request
};

export const deleteUser = (id:String |  undefined) => {
  const request = axios.delete(
    baseUrl + `/admin/${id}`,
    {headers: {"Authorization":`Bearer ${headerToken}`}}
  ).then((response)=>
   response.data
  )
  return request
};