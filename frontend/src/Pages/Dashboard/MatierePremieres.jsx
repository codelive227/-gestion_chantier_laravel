import React, { useEffect, useState } from "react";
import { getMatieresPremieres, deleteMatierePremiere } from "../../services/matierepremiereService";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import Swal from "sweetalert2";

const MatierePremiere = () => {
  const [matierePremiere, setmatierePremiere] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  const loadMatierePremiere = (page = 1) => {
    getMatieresPremieres({ search, page }).then((res) => {
      const data = res?.data ?? []; // <--- correction ici
      const current_page = res?.current_page ?? 1;
      const last_page = res?.last_page ?? 1;
  
      setmatierePremiere(data);
      setPagination({
        current_page,
        last_page,
      });
    });
  };
  
  

  useEffect(() => {
    loadMatierePremiere();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadMatierePremiere(1);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Supprimer ce matiere premiere ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMatierePremiere(id)
          .then(() => {
            Swal.fire("Supprimé", "Le matiere premiere a été supprimé.", "success");
            loadMatierePremiere(pagination.current_page);
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
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Matières Premières</h1>
        <Link
          to="/dashboard/ajouter-matiere-premiere"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded shadow flex items-center"
        >
          <Plus size={15} className="mr-2" /> Ajouter une matière première
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Rechercher une matière première..."
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
              <th className="px-4 py-3">Désignation</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matierePremiere.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center p-4 text-gray-500">
                  Aucune matière première trouvée.
                </td>
              </tr>
            ) : (
              matierePremiere.map((matierePremiere) => (
                <tr key={matierePremiere.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{matierePremiere.designation}</td>
                  <td className="px-4 py-2 flex justify-center space-x-3">
                    <Link
                      to={`/dashboard/modifier-matiere-premiere/${matierePremiere.id}`}
                      title="Modifier"
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      title="Supprimer"
                      onClick={() => handleDelete(matierePremiere.id)}
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
              onClick={() => loadMatierePremiere(page)}

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

export default MatierePremiere;