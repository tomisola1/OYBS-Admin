import { instance } from "@/utils/apiFetcher";
import { params } from "@/utils/utils";
import axios from "axios";
const baseUrl = 'https://oybs-backend.onrender.com/api/v1'
let headerToken: string | null;
if(typeof window !== 'undefined'){
  // now access your localStorage
   headerToken = localStorage.getItem('token');
 
}


export const fetchNotifications = (params:params) => {
    const request = instance.get(`/admin/push-notifications?limit=${params.pageSize}&page=${params.pageNumber}`
    ).then((response)=>
     response.data
    )
    return request
};

export const createNotifications = (data:any) => {
    const request = instance.post(
      baseUrl + `/admin/push-notifications/send`,
      data
    ).then((response)=>
     response.data
    )
    return request
};

export const resendNotifications = (data:any, id:string|undefined) => {
    const request = instance.post(
      baseUrl + `/admin/push-notifications/resend/${id}`,
      data
    ).then((response)=>
     response.data
    )
    return request
};

export const deleteNotifications = (id:string|undefined) => {
    const request = instance.delete(
      baseUrl + `/admin/push-notifications/${id}`
    ).then((response)=>
     response.data
    )
    return request
};

export const exportNotifications = (params:params) => {
  const request = instance.get(`/admin/export-notifications?limit=${params.pageSize}&page=${params.pageNumber}${params.exportData? `&exportData=${params.exportData}`: ""}${params.startDate? `&startDate=${params.startDate}`: ""}${params.endDate? `&endDate=${params.endDate}`: ""}&exportType=csv`
  ).then((response)=>
   response.data
  )
  return request
};