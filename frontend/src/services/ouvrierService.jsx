// src/services/ouvrierService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/ouvriers';


export const getOuvriers = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const createOuvrier = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const getOuvrierById = (id) => {
  return axios.get(`/api/ouvriers/${id}`);
};

export const updateOuvrier = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteOuvrier = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};