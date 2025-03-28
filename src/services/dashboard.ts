import { instance } from "@/utils/apiFetcher";
import { params } from "@/utils/utils";


export const fetchTotalUsers = () => {
    const request = instance.get( `/admin/stats/total-users`
    ).then((response)=>
     response.data
    )
    return request
};

export const fetchTotalInsights = () => {
  const request = instance.get(`/admin/stats/total-insights`
  ).then((response)=>
   response.data
  )
  return request
};

export const fetchTotalDonations = () => {
  const request = instance.get(`/admin/stats/total-donations`
  ).then((response)=>
   response.data
  )
  return request
};

export const fetchDonations = (params:params) => {
  const request = instance.get(`/admin/stats/get-donations?limit=${params.pageSize}&page=${params.pageNumber}`
  ).then((response)=>
   response.data
  )
  return request
};

export const exportDonations = (params:params) => {
  const request = instance.get(`/admin/export-donation?limit=${params.pageSize}&page=${params.pageNumber}${params.exportData? `&exportData=${params.exportData}`: ""}${params.startDate? `&startDate=${params.startDate}`: ""}${params.endDate? `&endDate=${params.endDate}`: ""}&exportType=csv`
  ).then((response)=>
   response.data
  )
  return request
};

export const fetchUpcomingPrayers = (params:params) => {
  const request = instance.get(`/admin/stats/upcoming-prayers?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`
  ).then((response)=>
   response.data
  )
  return request
};

export const fetchQuizTakers = () => {
  const request = instance.get(`/admin/stats/monthly-quiz-takers`
  ).then((response)=>
   response.data
  )
  return request
};

export const fetchBibleTracker= () => {
  const request = instance.get(`/admin/stats/oybs-progress`
  ).then((response)=>
   response.data
  )
  return request
};