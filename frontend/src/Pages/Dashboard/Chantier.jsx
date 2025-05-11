import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchChantiers, removeChantier } from "../../features/chantiers/chantierSlice";
import Swal from "sweetalert2";
import { Pencil, Trash2, Plus } from "lucide-react";

const Chantier = () => {
  const dispatch = useDispatch();
  const { chantiers, status, pagination } = useSelector((state) => state.chantier);
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    dispatch(fetchChantiers({ search }));
  }, [dispatch, search]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Supprimer ce chantier?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeChantier(id))
          .then(() => {
            Swal.fire("Supprimé", "Le chantier a été supprimé.", "success");
          })
          .catch(() => {
            Swal.fire("Erreur", "La suppression a échoué.", "error");
          });
      }
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Entête et bouton d'ajout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Chantiers</h1>
        <Link
          to="/dashboard/ajouter-chantier"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded shadow flex items-center"
        >
          <Plus size={15} className="mr-2" /> Ajouter un chantier
        </Link>
      </div>

      {/* Barre de recherche */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Rechercher un chantier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded shadow-sm"
        />
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto rounded shadow">
        <table className="w-full table-auto text-sm text-left bg-white border">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">Désignation</th>
               <th className="px-4 py-3">Type Chantier</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">État</th>
               <th className="px-4 py-3">Localisation</th>
              <th className="px-4 py-3">Date Début</th>
              <th className="px-4 py-3">Date Estime</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {status === 'loading' ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  Chargement...
                </td>
              </tr>
            ) : chantiers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  Aucun chantier trouvé
                </td>
              </tr>
            ) : (
              chantiers.map((chantier) => (
                <tr key={chantier.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{chantier.designation}</td>
                  <td className="px-4 py-2">{chantier.type_chantier}</td>
                  <td className="px-4 py-2">
                    {chantier.client?.nom || 'Client inconnu'}
                  </td>
                  <td className="px-4 py-2">{chantier.etat}</td>
                  <td className="px-4 py-2">{chantier.localisation}</td>
                  <td className="px-4 py-2">
                    {new Date(chantier.date_debut).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(chantier.date_estime).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 flex justify-center space-x-3">
                    <Link
                      to={`/dashboard/modifier-chantier/${chantier.id}`}
                      title="Modifier"
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      title="Supprimer"
                      onClick={() => handleDelete(chantier.id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-1">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => dispatch(fetchChantiers({ page, search }))}
              className={`px-3 py-1 border rounded ${
                pagination.currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chantier;