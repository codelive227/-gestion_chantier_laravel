// src/services/MatierePremiereService.js
import axios from 'axios';

const API_URL = '/api/matiere-premieres';

export const getMatieresPremieres = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const createMatierePremiere = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateMatierePremiere = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteMatierePremiere = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};