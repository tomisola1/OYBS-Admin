import { instance } from "@/utils/apiFetcher";
import axios from "axios";
const baseUrl = 'https://oybs-backend.onrender.com/api/v1'
let headerToken: string | null;
if(typeof window !== 'undefined'){
  // now access your localStorage
   headerToken = localStorage.getItem('token');
 
}


export const adminLogin = (data:any) => {
    const request = instance.post("/auth/admin/signin",
      data
    ).then((response)=>
     response.data
    )
    return request
};

export const resetPasssword = (data:any) => {
    const request = instance.post("/auth/reset/password",
      data
    ).then((response)=>
     response.data
    )
    return request
};

export const otpRequest = (data:any) => {  
    const request = instance.post("/auth/request/reset/password",
      data
    ).then((response)=>
     response.data
    )
    return request
};

export const resendOtpRequest = (data:any) => {
    const request = instance.post("/auth/resend/verify/reset/password",
      data
    ).then((response)=>
     response.data
    )
    return request
};

export const otpVerification = (data:any) => {
    const request = instance.post("/auth/verify/reset/password",
      data
    ).then((response)=>
     response.data
    )
    return request
};