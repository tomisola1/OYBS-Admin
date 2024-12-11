import { instance } from "@/utils/apiFetcher";
import { params } from "@/utils/utils";


export const fetchQuizzes = (params: params) => {
  const request = instance
    .get(
        `/admin/quizzes?limit=${params.pageSize}&page=${params.pageNumber}`,
    )
    .then((response) => response.data);
  return request;
};

export const createQuizzes = (data: any) => {
  const request = instance
    .post(`/admin/quizzes`, data)
    .then((response) => response.data);
  return request;
};

export const QuizLive = (id: string | undefined) => {
  const request = instance
    .post(`/admin/quizzes/live/${id}`,{},)
    .then((response) => response.data);
  return request;
};

export const EndQuiz = (id: string | undefined) => {
  const request = instance
    .post(`/admin/quizzes/completed/${id}`,{},)
    .then((response) => response.data);
  return request;
};

export const addQuestion = (data: any) => {
  const request = instance
    .post(`/admin/quizzes/questions`, data)
    .then((response) => response.data);
  return request;
};

export const revealAnswers = (id: string | undefined) => {
  const request = instance
   .post(`/admin/quizzes/reveal-answers/${id}`,{},)
    .then((response) => response.data);
  return request;
};

export const updateQuestion = (data: any, id: string | undefined) => {
  const request = instance
    .patch(`/admin/quizzes/questions/${id}`, data)
    .then((response) => response.data);
  return request;
};

export const updateQuiz = (data: any, id: string | undefined) => {
  const request = instance
    .patch(`/admin/quizzes/${id}`, data)
    .then((response) => response.data);
  return request;
};

export const getQuizInfo = (id: string | undefined) => {
  const request = instance
    .get(`/admin/quizzes/${id}`)
    .then((response) => response.data);
  return request;
};

export const deleteQuiz = (id: string | undefined) => {
  const request = instance
    .delete(`/admin/quizzes/${id}`)
    .then((response) => response.data);
  return request;
};
