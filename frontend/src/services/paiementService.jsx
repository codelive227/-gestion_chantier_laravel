import axios from 'axios';

export const getPaiements = (params) => {
  return axios.get('/api/paiements', { params }).then(res => res.data);
};
export const getPaiement = async (id) => {
  const response = await axios.get(`/api/paiements/${id}`);
  return response.data;
};

export const getClients = () => {
  return axios.get('/api/chantiers').then(res => res.data); // ou /api/clients selon ton backend
};

export const getChantiers = () => {
  return axios.get('/api/chantiers').then(res => res.data);
};

export const createPaiement = (data) => {
  return axios.post('/api/paiements', data).then(res => res.data);
};

export const updatePaiement = (id, data) => {
  return axios.put(`/api/paiements/${id}`, data).then(res => res.data);
};

export const removePaiement = (id) => {
  return axios.delete(`/api/paiements/${id}`).then(res => res.data);
};

export const getPaiementById = (id) => {
  return axios.get(`/api/paiements/${id}`).then(res => res.data);
};
