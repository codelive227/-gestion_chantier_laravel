import React, { useState } from "react";
import { createClient } from "../../services/ClientService";
import { useNavigate } from "react-router-dom";

const AjouterClient = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    type_client: 'Selectionnez ici',
    adresse: '',
    email: '',
    telephone: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let errors = {};
    if (!form.nom.trim()) errors.nom = "Le nom est requis";
    if (!form.prenom.trim()) errors.prenom = "Le prénom est requis";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Veuillez entrer une adresse email valide";
    }
    if (!form.telephone.trim()) errors.telephone = "Le téléphone est requis";
    if (form.type_client === 'Selectionnez ici') {
      errors.type_client = "Veuillez sélectionner un type de client";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await createClient(form);
      setSuccessMessage("Client ajouté avec succès. Redirection...");
      setTimeout(() => navigate("/dashboard/clients"), 2000);
    } catch (error) {
      if (error.validationErrors) {
        setErrors(error.validationErrors);
        setErrorMessage("Veuillez corriger les erreurs dans le formulaire.");
      } else {
        setErrorMessage(error.message || "Erreur lors de l'ajout du client.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ajouter un client</h1>

      {successMessage && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['nom', 'prenom', 'adresse', 'email', 'telephone'].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              placeholder={`Entrez le ${field}`}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className={`p-2 border rounded w-full ${errors[field] ? 'border-red-500' : ''}`}
            />
            {errors[field] && <p className="text-red-600 text-sm mt-1">{errors[field]}</p>}
          </div>
        ))}
        
        <div>
          <label className="block mb-1">Type de client</label>
          <select
            name="type_client"
            value={form.type_client}
            onChange={(e) => setForm({ ...form, type_client: e.target.value })}
            className={`p-2 border rounded w-full ${errors.type_client ? 'border-red-500' : ''}`}
          >
            <option value="Selectionnez ici">Sélectionnez le type</option>
            <option value="Particulier">Particulier</option>
            <option value="Entreprise">Entreprise</option>
            <option value="Autre">Autre</option>
          </select>
          {errors.type_client && <p className="text-red-600 text-sm mt-1">{errors.type_client}</p>}
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-between mt-4">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            disabled={isSubmitting}
          >
            Retour
          </button>
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AjouterClient;