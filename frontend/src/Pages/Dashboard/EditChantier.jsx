import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateChantier, fetchClients, getChantierById } from "../../features/chantiers/chantierSlice";
import Swal from "sweetalert2";

const EditChantier = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clients, status } = useSelector((state) => state.chantier);
  
  const [formData, setFormData] = React.useState({
    designation: "",
    type_chantier: "",
    etat: "En attente",
    client_id: "",
    localisation: "",
    date_debut: "",
    date_estime: ""
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Charge les clients d'abord
        await dispatch(fetchClients()).unwrap();
        
        // Charge les données du chantier
        const result = await dispatch(getChantierById(id)).unwrap();
        
        if (!result) {
          throw new Error("Chantier non trouvé");
        }

        setFormData({
          designation: result.designation || "",
          type_chantier: result.type_chantier || "",
          etat: result.etat || "En attente",
          client_id: result.client_id || "",
          localisation: result.localisation || "",
          date_debut: result.date_debut?.split('T')[0] || "",
          date_estime: result.date_estime?.split('T')[0] || ""
        });
      } catch (error) {
        console.error("Erreur détaillée:", error);
        Swal.fire({
          title: "Erreur",
          text: error.message || "Le chantier n'a pas pu être chargé",
          icon: "error"
        }).then(() => {
          navigate("/dashboard/chantier");
        });
      }
    };

    loadData();
  }, [id, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateChantier({ id, data: formData })).unwrap();
      Swal.fire("Succès", "Chantier modifié avec succès", "success");
      navigate("/dashboard/chantier");
    } catch (error) {
      Swal.fire("Erreur", error.message || "Erreur lors de la modification", "error");
    }
  };

  if (status === 'loading' && !currentChantier) {
    return <div className="p-6">Chargement en cours...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modifier le chantier</h1>
      
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
            disabled={status === 'loading'}
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
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditChantier;