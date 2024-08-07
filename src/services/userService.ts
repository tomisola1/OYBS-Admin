import { params } from "@/utils/utils";
import axios from "axios";
const baseUrl = 'https://oybs-backend.onrender.com/api/v1'
let headerToken: string | null;
if(typeof window !== 'undefined'){
  // now access your localStorage
   headerToken = localStorage.getItem('token');
 
}


export const fetchUsers = (params:params) => {
    const request = axios.get(
      baseUrl + `/admin/users/all/?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}${params.emailOrName ? `&emailOrName=${params.emailOrName}`: ""}${params.dateJoined ? `&dateJoined=${params.dateJoined}`: ""}${params.streak ? `&streak=${params.streak}`: ""}${params.insightsShared ? `&insightsShared=${params.insightsShared}`: ""}`,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const fetchUsersWithHighStreaks = (params:params) => {
    const request = axios.get(
      baseUrl + `/admin/users/all/?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}${params.streak ? `&streak=${params.streak}`: ""}`,
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

export const getAdminUser = () => {
  const request = axios.get(
    baseUrl + `/admin/me`,
    {headers: {"Authorization":`Bearer ${headerToken}`}}
  ).then((response)=>
   response.data
  )
  return request
};

export const fetchAdminUsers = (params:params) => {
  const request = axios.get(
    baseUrl + `/admin/?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}${params.emailAddress ? `&emailAddress=${params.emailAddress}`: ""}${params.dateJoined ? `&dateJoined=${params.dateJoined}`: ""}${params.role ? `&role=${params.role}`: ""}`,
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

export const unsuspendUsers = (data:any) => {
  const request = axios.post(
    baseUrl + `/admin/users/unsuspend`,
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