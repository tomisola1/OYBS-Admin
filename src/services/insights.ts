import { instance } from "@/utils/apiFetcher";
import { params } from "@/utils/utils";


export const fetchInsights = (params:params) => {
    const request = instance.get(`/admin/insights?limit=${params.pageSize}&page=${params.pageNumber}`
    ).then((response)=>
     response.data
    )
    return request
};

export const deleteInsights = (id:String|undefined) => {
    const request = instance.delete(`/admin/insights/${id}`
    ).then((response)=>
     response.data
    )
    return request
};