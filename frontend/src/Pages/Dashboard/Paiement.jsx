import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPaiements, removePaiement } from "../../features/paiements/paiementSlice";
import Swal from "sweetalert2";
import { Pencil, Trash2, Plus } from "lucide-react";

const Paiement = () => {
  const dispatch = useDispatch();
  const { paiements, status, pagination } = useSelector((state) => state.paiement);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchPaiements({ search }));
  }, [dispatch, search]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Supprimer ce paiement?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removePaiement(id))
          .then(() => {
            Swal.fire("Supprimé", "Le paiement a été supprimé.", "success");
          })
          .catch(() => {
            Swal.fire("Erreur", "La suppression a échoué.", "error");
          });
      }
    });
  };

  // Vérification plus robuste des paiements
const hasPaiements = paiements?.data && paiements.data.length > 0;

  console.log("paiements:", paiements);


  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Entête et bouton d'ajout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Paiements</h1>
        <Link
          to="/dashboard/ajouter-paiement"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded shadow flex items-center transition-colors duration-200"
        >
          <Plus size={15} className="mr-2" /> Ajouter un paiement
        </Link>
      </div>

      {/* Barre de recherche */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Rechercher un paiement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full table-auto text-sm text-left bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 font-medium">Chantier</th>
              <th className="px-6 py-3 font-medium">Montant</th>
              <th className="px-6 py-3 font-medium">Mode de règlement</th>
              <th className="px-6 py-3 font-medium">Date de paiement</th>
              <th className="px-6 py-3 font-medium text-center">Actions</th>
            </tr>
          </thead>
         <tbody className="divide-y divide-gray-200">
  {status === 'loading' ? (
    <tr>
      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </td>
    </tr>
  ) : !hasPaiements ? (
    <tr>
      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
        Aucun paiement trouvé
      </td>
    </tr>
  ) : (
    paiements.data.map((paiement) => (
      <tr key={paiement.id} className="hover:bg-gray-50 transition-colors duration-150">
        <td className="px-6 py-4">{paiement.chantier?.designation || 'Chantier inconnu'}</td>
        <td className="px-6 py-4 font-medium">
          <span>
  {new Intl.NumberFormat('fr-FR', { 
    style: 'decimal', 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  }).format(paiement.montant ?? 0)} DH {/* Ton symbole personnalisé */}
</span>

        </td>
        <td className="px-6 py-4 capitalize">{paiement.mode_reglement}</td>
        <td className="px-6 py-4">{new Date(paiement.date_paiement).toLocaleDateString('fr-FR')}</td>
        <td className="px-6 py-4">
          <div className="flex justify-center space-x-4">
            <Link
              to={`/dashboard/modifier-paiement/${paiement.id}`}
              title="Modifier"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1 rounded hover:bg-blue-50"
            >
              <Pencil size={18} />
            </Link>
            <button
              title="Supprimer"
              onClick={() => handleDelete(paiement.id)}
              className="text-red-600 hover:text-red-800 transition-colors duration-200 p-1 rounded hover:bg-red-50"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>

      {/* Pagination */}
      {pagination?.totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => dispatch(fetchPaiements({ page, search }))}
              className={`px-4 py-2 border rounded-md ${
                pagination.currentPage === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              } transition-colors duration-200`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Paiement;