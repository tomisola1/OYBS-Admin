import { instance } from "@/utils/apiFetcher";
import { params } from "@/utils/utils";
import axios from "axios";


export const fetchUsers = ({ pageSize, pageNumber, emailOrName, dateJoined, streak, insightsShared }: params) => {
  const queryParams = [
      `pageSize=${pageSize}`,
      `pageNumber=${pageNumber}`,
      emailOrName ? `emailOrName=${emailOrName}` : "",
      dateJoined ? `dateJoined=${dateJoined}` : "",
      streak ? `&streak=${streak}` : "",
      insightsShared ? `insightsShared=${insightsShared}` : ""
  ].filter(Boolean).join('&');

  return instance.get(
      `/admin/users/all/?${queryParams}`,
  )
  .then(response => response.data)
  .catch(error => {
      console.error('Error fetching users:', error);
      throw error;
  });
};


export const fetchUsersWithHighStreaks = (params:params) => {
    const request = instance.get(`/admin/users/all/?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}${params.streak ? `&streak=${params.streak}`: ""}`
    ).then((response)=>
     response.data
    )
    return request
};

export const fetchSingleUser = (userId:string | null) => {
    const request = instance.get(`/admin/users/${userId}`,
    ).then((response)=>
     response.data
    )
    return request
};

export const getAdminUser = () => {
  const request = instance.get(`/admin/me`
  ).then((response)=>
   response.data
  )
  return request
};

export const fetchAdminUsers = (params:params) => {
  const request = instance.get(`/admin/?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}${params.emailAddress ? `&emailAddress=${params.emailAddress}`: ""}${params.dateJoined ? `&dateJoined=${params.dateJoined}`: ""}${params.role ? `&role=${params.role}`: ""}`
  ).then((response)=>
   response.data
  )
  return request
};

export const suspendUsers = (data:any) => {
  const request = instance.post(`/admin/users/suspend`,
    data,
  ).then((response)=>
   response.data
  )
  return request
};

export const unsuspendUsers = (data:any) => {
  const request = instance.post(`/admin/users/unsuspend`,
    data,
  ).then((response)=>
   response.data
  )
  return request
};

export const createUser = (data:any) => {
  const request = instance.post(`/admin`,
    data,
    {headers: {'Content-Type': 'multipart/form-data'}}
  ).then((response)=>
   response.data
  )
  return request
};

export const editUser = (data:any, id:String| undefined) => {
  const request = instance.patch(`/admin/${id}`,
    data,
    {headers: {'Content-Type': 'multipart/form-data'}}
  ).then((response)=>
   response.data
  )
  return request
};

export const deleteUser = (id:String |  undefined) => {
  const request = instance.delete(`/admin/${id}`,
  ).then((response)=>
   response.data
  )
  return request
};

export const exportUser = (params:params, id:String |  undefined) => {
  const request = instance.get(`/admin/export-user/${id}?limit=${params.pageSize}&page=${params.pageNumber}${params.exportData? `&exportData=${params.exportData}`: ""}${params.startDate? `&startDate=${params.startDate}`: ""}${params.endDate? `&endDate=${params.endDate}`: ""}&exportType=csv`
  ).then((response)=>
   response.data
  )
  return request
};