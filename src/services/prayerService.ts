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