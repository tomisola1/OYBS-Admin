import { instance } from "@/utils/apiFetcher";
import { params } from "@/utils/utils";


export const fetchPrayers = (params:params) => {
    const request = instance.get(`/admin/prayers?limit=${params.pageSize}&page=${params.pageNumber}`
    ).then((response)=>
     response.data
    )
    return request
};

export const createPrayer = (data:any) => {
    const request = instance.post(`/admin/prayers`,
      data,
      {headers: {'Content-Type': 'multipart/form-data'}}
    ).then((response)=>
     response.data
    )
    return request
};

export const updatePrayer = (data:any, id:string | undefined) => {
    const request = instance.patch(`/admin/prayers/${id}`,
      data,
      {headers: {'Content-Type': 'multipart/form-data'}}
    ).then((response)=>
     response.data
    )
    return request
};

export const deletePrayer = (id:string | undefined) => {
    const request = instance.delete(`/admin/prayers/${id}`
    ).then((response)=>
     response.data
    )
    return request
};