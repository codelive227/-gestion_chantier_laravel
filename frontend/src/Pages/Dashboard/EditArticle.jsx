// src/Pages/Dashboard/EditArticle.jsx
import React, { useEffect, useState } from "react";
import { getArticleById, updateArticle } from "../../services/articleService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Récupère l'ID de l'article depuis l'URL

  const [formData, setFormData] = useState({
    reference: "",
    designation: "",
    unite: "",
    salaire_journalier: ""
  });

  // Récupération des données de l'article à l'ouverture du composant
  useEffect(() => {
    getArticleById(id)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        Swal.fire("Erreur", "Article introuvable", "error");
        navigate("/dashboard/article");
      });
  }, [id, navigate]);

  // Mise à jour du formulaire à chaque changement d'input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Soumission du formulaire pour mettre à jour l'article
  const handleSubmit = (e) => {
    e.preventDefault();

    updateArticle(id, formData)
      .then(() => {
        Swal.fire("Succès", "Article mis à jour avec succès", "success");
        navigate("/dashboard/article");
      })
      .catch((error) => {
        Swal.fire("Erreur", error.response?.data?.message || "Une erreur est survenue", "error");
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modifier un Article</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        {/* Champ Nom */}
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

        {/* Champ Prénom */}
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

        {/* Champ Statut */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="block mb-1">Uinte *</label>
          <input
            type="text"
            name="unite"
            value={formData.unite}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Champ Salaire journalier */}
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

        {/* Boutons */}
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

export default EditArticle;
