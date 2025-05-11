// src/services/FournisseurService.js
import axios from "axios";

// Récupérer la liste des fournisseurs avec pagination et recherche
export const getFournisseurs = (params) => {
  return axios.get("/api/fournisseurs", { params });
};

// Récupérer un seul fournisseur par ID
export const getFournisseur = (id) => {
  return axios.get(`/api/fournisseurs/${id}`);
};

// Créer un nouveau fournisseur
export const createFournisseur = (data) => {
  return axios.post("/api/fournisseurs", data);
};

// Mettre à jour un fournisseur existant
export const updateFournisseur = (id, data) => {
  return axios.put(`/api/fournisseurs/${id}`, data);
};

// Supprimer un fournisseur
export const deleteFournisseur = (id) => {
  return axios.delete(`/api/fournisseurs/${id}`);
};