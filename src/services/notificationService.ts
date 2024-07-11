import { params } from "@/utils/utils";
import axios from "axios";
const baseUrl = 'https://oybs-backend.onrender.com/api/v1'
const headerToken = localStorage?.getItem('token')


export const fetchNotifications = (params:params) => {
    const request = axios.get(
      baseUrl + `/admin/push-notifications?limit=${params.pageSize}&page=${params.pageNumber}`,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const createNotifications = (data:any) => {
    const request = axios.post(
      baseUrl + `/admin/push-notifications/send`,
      data,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const resendNotifications = (data:any, id:string|undefined) => {
    const request = axios.post(
      baseUrl + `/admin/push-notifications/resend/${id}`,
      data,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};