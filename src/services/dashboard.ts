import { params } from "@/utils/utils";
import axios from "axios";
const baseUrl = 'https://oybs-backend.onrender.com/api/v1'
const headerToken = localStorage?.getItem('token')


export const fetchTotalUsers = () => {
    const request = axios.get(
      baseUrl + `/admin/stats/total-users`,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const fetchTotalInsights = () => {
  const request = axios.get(
    baseUrl + `/admin/stats/total-insights`,
    {headers: {"Authorization":`Bearer ${headerToken}`}}
  ).then((response)=>
   response.data
  )
  return request
};

export const fetchTotalDonations = () => {
  const request = axios.get(
    baseUrl + `/admin/stats/total-donations`,
    {headers: {"Authorization":`Bearer ${headerToken}`}}
  ).then((response)=>
   response.data
  )
  return request
};

export const fetchDonations = (params:params) => {
  const request = axios.get(
    baseUrl + `/admin/stats/get-donations?limit=${params.pageSize}&page=${params.pageNumber}`,
    {headers: {"Authorization":`Bearer ${headerToken}`}}
  ).then((response)=>
   response.data
  )
  return request
};

export const fetchUpcomingPrayers = (params:params) => {
  const request = axios.get(
    baseUrl + `/admin/stats/upcoming-prayers?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`,
    {headers: {"Authorization":`Bearer ${headerToken}`}}
  ).then((response)=>
   response.data
  )
  return request
};

export const fetchQuizTakers = () => {
  const request = axios.get(
    baseUrl + `/admin/stats/monthly-quiz-takers`,
    {headers: {"Authorization":`Bearer ${headerToken}`}}
  ).then((response)=>
   response.data
  )
  return request
};