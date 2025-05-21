// src/Pages/Dashboard/AddFournisseur.jsx
import React, { useState } from "react";
import { createArticle } from "../../services/articleService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddArticle = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
   reference: "",
   designation: "",
   unite: "",
   cout: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    createArticle(formData)
      .then(() => {
        Swal.fire("Succès", "Article ajouté avec succès", "success");
        navigate("/dashboard/article");
      })
      .catch((error) => {
        Swal.fire("Erreur", error.response?.data?.message || "Une erreur est survenue", "error");
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ajouter un Article</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="block mb-1">Reference *</label>
          <input
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
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
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="block mb-1">Unite *</label>
          <input
            type="text"
            name="unite"
            value={formData.unite}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="block mb-1">Cout  *</label>
          <input
            type="text"
            name="cout"
            value={formData.cout}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/article")}
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

export default AddArticle;