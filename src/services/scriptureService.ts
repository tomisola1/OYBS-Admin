import { instance } from "@/utils/apiFetcher";
import { params } from "@/utils/utils";


export const fetchScriptures = (params:params) => {
    const request = instance.get(`/admin/sotd?limit=${params.pageSize}&page=${params.pageNumber}`
    ).then((response)=>
     response.data
    )
    return request
};

export const fetchOldTestamentBooks = () => {
    const request = instance.get(`/admin/sotd/get-old-books`
    ).then((response)=>
     response.data
    )
    return request
};

export const fetchNewTestamentBooks = () => {
    const request = instance.get(`/admin/sotd/get-new-books`
    ).then((response)=>
     response.data
    )
    return request
};

export const getBookInfo = (id:String|undefined) => {
  const request = instance.get(`/admin/sotd/get-book-info/${id}`
  ).then((response)=>
    response.data
  )
  return request
};

export const createScripture = (data:any) => {
    const request = instance.post(`/admin/sotd`,
      data
    ).then((response)=>
     response.data
    )
    return request
};

export const updateScripture = (data:any, id: String | undefined) => {
    const request = instance.put(`/admin/sotd`,
      data
    ).then((response)=>
     response.data
    )
    return request
};