// src/services/ClientService.jsx

import axios from "axios";

// Récupérer la liste des clients avec pagination et recherche
export const getClients = (params) => {
  return axios.get("/api/clients", { params });
};

// Récupérer un seul client par ID
export const getClient = (id) => {
  return axios.get(`/api/clients/${id}`);
};

// Créer un nouveau client
export const createClient = async (data) => {
  try {
      const response = await axios.post('/api/clients', data, {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      });
      return response.data;
  } catch (error) {
      if (error.response && error.response.status === 422) {
          // Retourner les erreurs de validation
          throw {
              validationErrors: error.response.data.errors,
              message: 'Validation failed'
          };
      }
      throw error;
  }
};

// Mettre à jour un client existant
export const updateClient = (id, data) => {
  return axios.put(`/api/clients/${id}`, data);
};

// Supprimer un client
export const deleteClient = (id) => {
  return axios.delete(`/api/clients/${id}`);
};
