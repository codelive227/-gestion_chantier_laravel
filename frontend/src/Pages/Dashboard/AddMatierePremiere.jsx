// src/Pages/Dashboard/AddFournisseur.jsx
import React, { useState } from "react";
import { createMatierePremiere } from "../../services/matierepremiereService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddMatierePremiere = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    designation: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    createMatierePremiere(formData)
      .then(() => {
        Swal.fire("Succès", "Matiere Premiere ajouté avec succès", "success");
        navigate("/dashboard/matiere-premiere");
      })
      .catch((error) => {
        Swal.fire("Erreur", error.response?.data?.message || "Une erreur est survenue", "error");
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ajouter un Matiere Premiere</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="block mb-1">Designation *</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/matiere-premiere")}
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

export default AddMatierePremiere;