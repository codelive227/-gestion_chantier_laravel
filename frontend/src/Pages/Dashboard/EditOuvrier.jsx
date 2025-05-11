// src/Pages/Dashboard/EditOuvrier.jsx
import React, { useEffect, useState } from "react";
import { getOuvrierById, updateOuvrier } from "../../services/ouvrierService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditOuvrier = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Récupère l'ID de l'ouvrier depuis l'URL

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    statut: "",
    salaire_journalier: ""
  });

  // Récupération des données de l'ouvrier à l'ouverture du composant
  useEffect(() => {
    getOuvrierById(id)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        Swal.fire("Erreur", "Ouvrier introuvable", "error");
        navigate("/dashboard/ouvrier");
      });
  }, [id, navigate]);

  // Mise à jour du formulaire à chaque changement d'input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Soumission du formulaire pour mettre à jour l'ouvrier
  const handleSubmit = (e) => {
    e.preventDefault();

    updateOuvrier(id, formData)
      .then(() => {
        Swal.fire("Succès", "Ouvrier mis à jour avec succès", "success");
        navigate("/dashboard/ouvrier");
      })
      .catch((error) => {
        Swal.fire("Erreur", error.response?.data?.message || "Une erreur est survenue", "error");
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modifier un Ouvrier</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        {/* Champ Nom */}
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

        {/* Champ Prénom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="block mb-1">Prénom *</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Champ Statut */}
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

        {/* Champ Salaire journalier */}
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

        {/* Boutons */}
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

export default EditOuvrier;
