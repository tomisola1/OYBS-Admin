import { instance } from "@/utils/apiFetcher";
import { params } from "@/utils/utils";


export const fetchInsights = (params:params) => {
    const request = instance.get(`/admin/insights?limit=${params.pageSize}&page=${params.pageNumber}${params.isHide ? `&isHide=${params.isHide}`: ""}`
    ).then((response)=>
     response.data
    )
    return request
};

export const reportedInsights = (params:params) => {
    const request = instance.get(`/admin/insights/reported?limit=${params.pageSize}&page=${params.pageNumber}${params.isHide ? `&isHide=${params.isHide}`: ""}`
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

export const hideInsights = (id:String|undefined, data: any) => {
    const request = instance.patch(`/admin/insights-hide/${id}`, data
    ).then((response)=>
     response.data
    )
    return request
};