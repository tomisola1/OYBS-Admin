import { params } from "@/utils/utils";
import axios from "axios";
const baseUrl = 'https://oybs-backend.onrender.com/api/v1'
const headerToken = localStorage?.getItem('token')


export const fetchQuizzes = (params:params) => {
    const request = axios.get(
      baseUrl + `/admin/quizzes?limit=${params.pageSize}&page=${params.pageNumber}`,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};
export const createQuizzes = (data:any) => {
    const request = axios.post(
      baseUrl + `/admin/quizzes`,
      data,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const addQuestion = (data:any) => {
    const request = axios.post(
      baseUrl + `/admin/quizzes/questions`,
      data,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};