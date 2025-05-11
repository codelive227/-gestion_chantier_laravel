// src/Pages/Dashboard/AddFournisseur.jsx
import React, { useState } from "react";
import { createFournisseur } from "../../services/FournisseurService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddFournisseur = () => {
  // Hook pour la navigation entre les pages
  const navigate = useNavigate();
  
  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    raison_sociale: "",    // Raison sociale du fournisseur
    nom_contact: "",       // Nom du contact
    email: "",             // Email du fournisseur
    tel: "",               // Téléphone du fournisseur
    adresse: "",           // Adresse du fournisseur
  });

  // Gestionnaire de changement pour les inputs du formulaire
  const handleChange = (e) => {
    // Met à jour l'état formData avec les nouvelles valeurs
    setFormData({
      ...formData,                  // Conserve les valeurs existantes
      [e.target.name]: e.target.value, // Met à jour le champ modifié
    });
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    // Appel du service pour créer un nouveau fournisseur
    createFournisseur(formData)
      .then(() => {
        // Affiche un message de succès
        Swal.fire("Succès", "Fournisseur ajouté avec succès", "success");
        // Redirige vers la liste des fournisseurs
        navigate("/dashboard/fournisseur");
      })
      .catch((error) => {
        // Affiche un message d'erreur en cas d'échec
        Swal.fire(
          "Erreur", 
          error.response?.data?.message || "Une erreur est survenue", 
          "error"
        );
      });
  };

  // Rendu du composant
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Titre de la page */}
      <h1 className="text-2xl font-bold mb-6">Ajouter un Fournisseur</h1>
      
      {/* Formulaire d'ajout */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        {/* Grille responsive pour les champs du formulaire */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Champ Raison Sociale */}
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
          
          {/* Champ Nom du Contact */}
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
          
          {/* Champ Email */}
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
          
          {/* Champ Téléphone */}
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
        
        {/* Champ Adresse (pleine largeur) */}
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
        
        {/* Boutons d'action */}
        <div className="flex justify-end space-x-3">
          {/* Bouton Annuler - retour à la liste */}
          <button
            type="button"
            onClick={() => navigate("/dashboard/fournisseurs")}
            className="px-4 py-2 border rounded"
          >
            Annuler
          </button>
          {/* Bouton Enregistrer - soumet le formulaire */}
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

export default AddFournisseur;