// src/Pages/Dashboard/EditFournisseur.jsx
import React, { useEffect, useState } from "react";
import { getFournisseur, updateFournisseur } from "../../services/FournisseurService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditFournisseur = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ID du fournisseur depuis l'URL

  const [formData, setFormData] = useState({
    raison_sociale: "",
    nom_contact: "",
    email: "",
    tel: "",
    adresse: "",
  });

  // Récupération des données du fournisseur au chargement
  useEffect(() => {
    getFournisseur(id)
      .then((res) => setFormData(res.data))
      .catch((err) => {
        Swal.fire("Erreur", "Impossible de charger les données du fournisseur", "error");
        navigate("/dashboard/fournisseur");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFournisseur(id, formData)
      .then(() => {
        Swal.fire("Succès", "Fournisseur mis à jour avec succès", "success");
        navigate("/dashboard/fournisseurs");
      })
      .catch((error) => {
        Swal.fire(
          "Erreur",
          error.response?.data?.message || "Une erreur est survenue",
          "error"
        );
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modifier le Fournisseur</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Raison Sociale *</label>
            <input
              type="text"
              name="raison_sociale"
              value={formData.raison_sociale}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Nom du Contact *</label>
            <input
              type="text"
              name="nom_contact"
              value={formData.nom_contact}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Téléphone *</label>
            <input
              type="text"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Adresse *</label>
          <input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/fournisseurs")}
            className="px-4 py-2 border rounded"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFournisseur;
