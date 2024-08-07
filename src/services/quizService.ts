import { params } from "@/utils/utils";
import axios from "axios";
const baseUrl = "https://oybs-backend.onrender.com/api/v1";
let headerToken: string | null;
if(typeof window !== 'undefined'){
  // now access your localStorage
   headerToken = localStorage.getItem('token');
 
}

export const fetchQuizzes = (params: params) => {
  const request = axios
    .get(
      baseUrl +
        `/admin/quizzes?limit=${params.pageSize}&page=${params.pageNumber}`,
      { headers: { Authorization: `Bearer ${headerToken}` } }
    )
    .then((response) => response.data);
  return request;
};

export const createQuizzes = (data: any) => {
  const request = axios
    .post(baseUrl + `/admin/quizzes`, data, {
      headers: { Authorization: `Bearer ${headerToken}` },
    })
    .then((response) => response.data);
  return request;
};

export const addQuestion = (data: any) => {
  const request = axios
    .post(baseUrl + `/admin/quizzes/questions`, data, {
      headers: { Authorization: `Bearer ${headerToken}` },
    })
    .then((response) => response.data);
  return request;
};

export const updateQuiz = (data: any, id: string | undefined) => {
  const request = axios
    .patch(baseUrl + `/admin/quizzes/${id}`, data, {
      headers: {
        Authorization: `Bearer ${headerToken}`,
      },
    })
    .then((response) => response.data);
  return request;
};

export const getQuizInfo = (id: string | undefined) => {
  const request = axios
    .get(baseUrl + `/admin/quizzes/${id}`, {
      headers: { Authorization: `Bearer ${headerToken}` },
    })
    .then((response) => response.data);
  return request;
};

export const deleteQuiz = (id: string | undefined) => {
  const request = axios
    .delete(baseUrl + `/admin/quizzes/${id}`, {
      headers: { Authorization: `Bearer ${headerToken}` },
    })
    .then((response) => response.data);
  return request;
};
