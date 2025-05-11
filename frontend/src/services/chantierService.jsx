import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getChantiers = async (params = {}) => {
  const response = await axios.get(`${API_URL}/chantiers`, { params });
  return response.data;
};

export const getClients = async () => {
  const response = await axios.get(`${API_URL}/clients`);
  return response.data;
};

export const createChantier = async (data) => {
  const response = await axios.post(`${API_URL}/chantiers`, data);
  return response.data;
};

export const getChantierById = async (id) => {
  const response = await axios.get(`${API_URL}/chantiers/${id}`);
  return response.data;
};

export const updateChantier = async (id, data) => {
  const response = await axios.put(`${API_URL}/chantiers/${id}`, data);
  return response.data;
};

export const deleteChantier = async (id) => {
  await axios.delete(`${API_URL}/chantiers/${id}`);
  return id;
};