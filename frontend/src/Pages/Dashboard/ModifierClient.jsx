import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClient, updateClient } from "../../services/ClientService";

const ModifierClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    type_client: '',
    adresse: '',
    email: '',
    telephone: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getClient(id).then((response) => {
      setForm(response.data);
    }).catch(() => {
      setErrorMessage("Impossible de charger les informations du client.");
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateClient(id, form);
      setSuccessMessage("Client modifié avec succès.");
      setTimeout(() => navigate("/dashboard/clients"), 2000);
    } catch (error) {
      setErrorMessage("Erreur lors de la modification du client.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Modifier le client</h1>

      {successMessage && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{successMessage}</div>}
      {errorMessage && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="nom"
          type="text"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="prenom"
          type="text"
          placeholder="Prénom"
          value={form.prenom}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <select
          name="type_client"
          value={form.type_client}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Sélectionnez le type</option>
          <option value="Particulier">Particulier</option>
          <option value="Entreprise">Entreprise</option>
          <option value="Autre">Autre</option>
        </select>
        <input
          name="adresse"
          type="text"
          placeholder="Adresse"
          value={form.adresse}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="telephone"
          type="text"
          placeholder="Téléphone"
          value={form.telephone}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <div className="col-span-1 md:col-span-2 flex justify-between">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Retour
          </button>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifierClient;
