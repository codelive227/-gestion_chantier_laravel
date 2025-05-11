import React, { useEffect, useState } from "react";
import { getOuvriers, deleteOuvrier } from "../../services/ouvrierService";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import Swal from "sweetalert2";

const Ouvrier = () => {
  const [ouvrier, setOuvrier] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  const loadOuvrier= (page = 1) => {
    getOuvriers({ search, page }).then((res) => {
      const data = res?.data ?? []; // <--- correction ici
      const current_page = res?.current_page ?? 1;
      const last_page = res?.last_page ?? 1;
  
      setOuvrier(data);
      setPagination({
        current_page,
        last_page,
      });
    });
  };
  
  

  useEffect(() => {
    loadOuvrier();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadOuvrier(1);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Supprimer ce ouvrier?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOuvrier(id)
          .then(() => {
            Swal.fire("Supprimé", "L'ouvrier a été supprimé.", "success");
            loadOuvrier(pagination.current_page);
          })
          .catch(() => {
            Swal.fire("Erreur", "La suppression a échoué.", "error");
          });
      }
    });
  };


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Ouvriers</h1>
        <Link
          to="/dashboard/ajouter-ouvrier"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded shadow flex items-center"
        >
          <Plus size={15} className="mr-2" /> Ajouter un ouvrier
            </Link>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Rechercher un ouvrier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded shadow-sm"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Rechercher
        </button>
      </form>

      <div className="overflow-x-auto rounded shadow">
        <table className="w-full table-auto text-sm text-left bg-white border">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">Nom</th>
               <th className="px-4 py-3">Prenom</th>
                <th className="px-4 py-3">Statut</th>
                 <th className="px-4 py-3">Salaire Journalier</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ouvrier.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center p-4 text-gray-500">
                  Aucune matière première trouvée.
                </td>
              </tr>
            ) : (
              ouvrier.map((ouvrier) => (
                <tr key={ouvrier.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{ouvrier.nom}</td>
                  <td className="px-4 py-2">{ouvrier.prenom}</td>
                  <td className="px-4 py-2">{ouvrier.statut}</td>
                  <td className="px-4 py-2">{ouvrier.salaire_journalier}</td>
                  <td className="px-4 py-2 flex justify-center space-x-3">
                    <Link
                      to={`/dashboard/modifier-ouvrier/${ouvrier.id}`}
                      title="Modifier"
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      title="Supprimer"
                      onClick={() => handleDelete(ouvrier.id)}
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

      {pagination.last_page > 1 && (
        <div className="flex justify-center mt-6 space-x-1">
          {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => loadOuvrier(page)}

              className={`px-3 py-1 border rounded ${
                pagination.current_page === page
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
}
export default Ouvrier;