// src/services/articleService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/articles';


export const getArticles = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const createArticle = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const getArticleById = (id) => {
  return axios.get(`/api/articles/${id}`);
};

export const updateArticle = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteArticle = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};