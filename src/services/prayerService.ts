import { params } from "@/utils/utils";
import axios from "axios";
const baseUrl = 'https://oybs-backend.onrender.com/api/v1'
const headerToken = localStorage?.getItem('token')


export const fetchPrayers = (params:params) => {
    const request = axios.get(
      baseUrl + `/admin/prayers?limit=${params.pageSize}&page=${params.pageNumber}`,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const createPrayer = (data:any) => {
    const request = axios.post(
      baseUrl + `/admin/prayers`,
      data,
      {headers: {"Authorization":`Bearer ${headerToken}`,'Content-Type': 'multipart/form-data'}}
    ).then((response)=>
     response.data
    )
    return request
};

export const updatePrayer = (data:any, id:string | undefined) => {
    const request = axios.patch(
      baseUrl + `/admin/prayers/${id}`,
      data,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const deletePrayer = (id:string | undefined) => {
    const request = axios.delete(
      baseUrl + `/admin/prayers/${id}`,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};