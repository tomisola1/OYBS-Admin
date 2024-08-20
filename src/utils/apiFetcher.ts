import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_OYBS_URL
let headerToken: string | null = null;
if(typeof window !== 'undefined'){
  // now access your localStorage
   headerToken = localStorage.getItem('token');
 
}

export const instance = axios.create({
    baseURL: baseUrl,
    headers: {"Authorization":`Bearer ${headerToken}`}
});


