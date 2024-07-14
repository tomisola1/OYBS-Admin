import { params } from "@/utils/utils";
import axios from "axios";
const baseUrl = 'https://oybs-backend.onrender.com/api/v1';
let headerToken: string | null;
if(typeof window !== 'undefined'){
  // now access your localStorage
   headerToken = localStorage.getItem('token');
 
}

export const fetchSupport = () => {
    const request = axios.get(
      baseUrl + `/admin/support`,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const updateSupport = (data:any) => {
  const request = axios.patch(
    baseUrl + `/admin/support`,
    data,
    {headers: {"Authorization":`Bearer ${headerToken}`}}
  ).then((response)=>
   response.data
  )
  return request
};