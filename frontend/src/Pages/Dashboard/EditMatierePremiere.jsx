import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditMatierePremiere = () => {
  // Déclaration des états pour chaque champ du formulaire
  const [designation, setDesignation] = useState('');
  
  const navigate = useNavigate(); // Pour rediriger après modification
  const { id } = useParams(); // Récupère l'ID dans l'URL

  // useEffect pour charger les données de la matière première à modifier
  useEffect(() => {
          axios.get(`http://localhost:8000/api/matiere-premieres/${id}`)
            .then(response => {
              console.log('Données reçues :', response.data); // <== pour vérifier la structure
              const data = response.data;
              setDesignation(data.designation);
            })
            .catch(error => {
              console.error("Erreur lors du chargement de la matière première :", error);
            });
        }, [id]);
  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Création de l'objet à envoyer à l'API
    const updatedMatiere = {
      designation
    };

    // Requête PUT pour mettre à jour la matière première
    axios.put(`http://localhost:8000/api/matiere-premieres/${id}`, updatedMatiere)
      .then(() => {
        // Affichage d'une alerte de succès
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Matière première mise à jour avec succès !'
        });
        // Redirection vers la liste des matières premières
        navigate('/dashboard/matiere-premiere');
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour :", error);
        // Affichage d'une alerte d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la mise à jour.'
        });
      });
  };

  return (
    <div className="container mx-auto mt-8 max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Modifier Matière Première</h2>

      {/* Formulaire de modification */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">

        {/* Champ Nom */}
        <div className="mb-4">
          <label className="block text-gray-700">Designation</label>
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default EditMatierePremiere;
