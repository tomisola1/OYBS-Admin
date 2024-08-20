import { instance } from "@/utils/apiFetcher";


export const fetchSupport = () => {
    const request = instance.get(`/admin/support`
    ).then((response)=>
     response.data
    )
    return request
};

export const updateSupport = (data:any) => {
  const request = instance.patch(`/admin/support`,
    data
  ).then((response)=>
   response.data
  )
  return request
};