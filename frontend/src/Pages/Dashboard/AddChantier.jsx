import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createChantier, getClients } from "../../services/chantierService";
import Swal from "sweetalert2";

const AddChantier = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    designation: "",
    type_chantier: "",
    etat: "En attente",
    client_id: "",
    localisation: "",
    date_debut: "",
    date_estime: ""
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getClients();
        setClients(response.data);
        setLoading(false);
      } catch (error) {
        Swal.fire("Erreur", "Impossible de charger les clients", "error");
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createChantier(formData);
      Swal.fire("Succès", "Chantier créé avec succès", "success");
      navigate("/dashboard/chantier");
    } catch (error) {
      Swal.fire("Erreur", error.response?.data?.message || "Erreur lors de la création", "error");
    }
  };

  if (loading) return <div className="p-6">Chargement des clients...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ajouter un chantier</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Désignation*</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Type de chantier*</label>
          <input
            type="text"
            name="type_chantier"
            value={formData.type_chantier}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Client*</label>
          <select
            name="client_id"
            value={formData.client_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Sélectionner un client</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.nom} {client.prenom || ''} ({client.entreprise || 'Sans entreprise'})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">État*</label>
          <select
            name="etat"
            value={formData.etat}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="En attente">En attente</option>
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Localisation*</label>
          <textarea
            name="localisation"
            value={formData.localisation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Date de début*</label>
            <input
              type="date"
              name="date_debut"
              value={formData.date_debut}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Date estimée*</label>
            <input
              type="date"
              name="date_estime"
              value={formData.date_estime}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/chantiers")}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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

export default AddChantier;