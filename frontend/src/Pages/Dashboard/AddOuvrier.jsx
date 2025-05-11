// src/Pages/Dashboard/AddFournisseur.jsx
import React, { useState } from "react";
import { createOuvrier } from "../../services/ouvrierService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddOuvrier = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
   nom: "",
   prenom: "",
   statut: "",
   salaire_journalier: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    createOuvrier(formData)
      .then(() => {
        Swal.fire("Succès", "Ouvrier ajouté avec succès", "success");
        navigate("/dashboard/ouvrier");
      })
      .catch((error) => {
        Swal.fire("Erreur", error.response?.data?.message || "Une erreur est survenue", "error");
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ajouter un Ouvrier</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="block mb-1">Nom *</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="block mb-1">Prenom *</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="block mb-1">Statut *</label>
          <input
            type="text"
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="block mb-1">Salaire Journalier *</label>
          <input
            type="text"
            name="salaire_journalier"
            value={formData.salaire_journalier}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/ouvrier")}
            className="px-4 py-2 border rounded"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOuvrier;