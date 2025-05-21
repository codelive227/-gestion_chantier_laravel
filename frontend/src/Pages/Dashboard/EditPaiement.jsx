import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPaiement, // ← ajoute ceci
  getPaiements,
  updatePaiement,
  getChantiers,
} from "../../services/paiementService";

import Swal from "sweetalert2";

const EditPaiement = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chantiers, setChantiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    montant: "",
    mode_reglement: "",
    chantier_id: "",
    date_paiement: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les chantiers
        const chantierRes = await getChantiers();
        const chantierData = Array.isArray(chantierRes.data)
          ? chantierRes.data
          : chantierRes.data?.data || [];
        setChantiers(chantierData);

        // Récupérer paiement à modifier
        const paiementRes = await getPaiement(id);
        if (paiementRes.success) {
          const p = paiementRes.data;
          setFormData({
            montant: p.montant || "",
            mode_reglement: p.mode_reglement || "",
            chantier_id: p.chantier_id || "",
            date_paiement: p.date_paiement ? p.date_paiement.split('T')[0] : "", // YYYY-MM-DD
          });
        } else {
          Swal.fire("Erreur", "Paiement introuvable", "error");
          navigate("/dashboard/paiement");
        }
      } catch (error) {
        Swal.fire("Erreur", "Impossible de charger les données", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePaiement(id, formData);
      Swal.fire("Succès", "Paiement mis à jour avec succès", "success");
      navigate("/dashboard/paiement");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0] ||
        "Erreur lors de la mise à jour";
      Swal.fire("Erreur", message, "error");
    }
  };

  if (loading) return <div className="p-6">Chargement en cours...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modifier un paiement</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Chantier*</label>
          <select
            name="chantier_id"
            value={formData.chantier_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Sélectionner un chantier</option>
            {chantiers.map((chantier) => (
              <option key={chantier.id} value={chantier.id}>
                {chantier.designation} {chantier.etat || ""} ({chantier.location || "Sans localisation"})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Montant*</label>
          <input
            type="number"
            name="montant"
            value={formData.montant}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            step="0.01"
          />
        </div>

        <div>
          <label className="block mb-1">Mode de règlement*</label>
          <select
            name="mode_reglement"
            value={formData.mode_reglement}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Sélectionner le mode</option>
            <option value="Espèce">Espèce</option>
            <option value="Chèque">Chèque</option>
            <option value="Carte bancaire">Carte bancaire</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Date de paiement*</label>
          <input
            type="date"
            name="date_paiement"
            value={formData.date_paiement}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/paiement")}
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

export default EditPaiement;
