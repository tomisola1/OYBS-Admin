import { params } from "@/utils/utils";
import axios from "axios";
const baseUrl = 'https://oybs-backend.onrender.com/api/v1'
let headerToken: string | null;
if(typeof window !== 'undefined'){
  // now access your localStorage
   headerToken = localStorage.getItem('token');
 
}


export const fetchInsights = (params:params) => {
    const request = axios.get(
      baseUrl + `/admin/insights?limit=${params.pageSize}&page=${params.pageNumber}`,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const deleteInsights = (id:String|undefined) => {
    const request = axios.delete(
      baseUrl + `/admin/insights/${id}`,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};