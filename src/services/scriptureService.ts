import { params } from "@/utils/utils";
import axios from "axios";
const baseUrl = 'https://oybs-backend.onrender.com/api/v1'
const headerToken = localStorage?.getItem('token')


export const fetchScriptures = (params:params) => {
    const request = axios.get(
      baseUrl + `/admin/sotd?limit=${params.pageSize}&page=${params.pageNumber}`,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const fetchOldTestamentBooks = () => {
    const request = axios.get(
      baseUrl + `/admin/sotd/get-old-books`,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const fetchNewTestamentBooks = () => {
    const request = axios.get(
      baseUrl + `/admin/sotd/get-new-books`,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const getBookInfo = (id:String|undefined) => {
  const request = axios.get(
    baseUrl + `/admin/sotd/get-book-info/${id}`,
    {headers: {"Authorization":`Bearer ${headerToken}`}}
  ).then((response)=>
    response.data
  )
  return request
};

export const createScripture = (data:any) => {
    const request = axios.post(
      baseUrl + `/admin/sotd`,
      data,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const updateScripture = (data:any, id: String | undefined) => {
    const request = axios.put(
      baseUrl + `/admin/sotd`,
      data,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};