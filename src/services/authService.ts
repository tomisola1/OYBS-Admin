import axios from "axios";
const baseUrl = 'https://oybs-backend.onrender.com/api/v1'
let headerToken: string | null;
if(typeof window !== 'undefined'){
  // now access your localStorage
   headerToken = localStorage.getItem('token');
 
}


export const adminLogin = (data:any) => {
    const request = axios.post(
      baseUrl + "/auth/admin/signin",
      data
    ).then((response)=>
     response.data
    )
    return request
};

export const resetPasssword = (data:any) => {
    const request = axios.post(
      baseUrl + "/auth/reset/password",
      data,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const otpRequest = (data:any) => {  
    const request = axios.post(
      baseUrl + "/auth/request/reset/password",
      data,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const resendOtpRequest = (data:any) => {
    const request = axios.post(
      baseUrl + "/auth/resend/verify/reset/password",
      data,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};

export const otpVerification = (data:any) => {
    const request = axios.post(
      baseUrl + "/auth/verify/reset/password",
      data,
      {headers: {"Authorization":`Bearer ${headerToken}`}}
    ).then((response)=>
     response.data
    )
    return request
};