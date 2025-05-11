// src/Pages/Dashboard/Fournisseurs.jsx
import React, { useEffect, useState } from "react";
import { getFournisseurs, deleteFournisseur } from "../../services/FournisseurService";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import Swal from "sweetalert2";

const Fournisseurs = () => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  const loadFournisseurs = (page = 1) => {
    getFournisseurs({ search, page }).then((res) => {
      setFournisseurs(res.data.data);
      setPagination({
        current_page: res.data.current_page,
        last_page: res.data.last_page,
      });
    });
  };

  useEffect(() => {
    loadFournisseurs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadFournisseurs(1);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Supprimer ce fournisseur ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFournisseur(id)
          .then(() => {
            Swal.fire("Supprimé", "Le fournisseur a été supprimé.", "success");
            loadFournisseurs(pagination.current_page);
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
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Fournisseurs</h1>
        <Link
          to="/dashboard/ajouter-fournisseur"
                   className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded shadow flex items-center"
        >
          <Plus size={15} className="mr-2" /> Ajouter un fournisseur
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Rechercher un fournisseur..."
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
              <th className="px-4 py-3">Raison Sociale</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Téléphone</th>
              <th className="px-4 py-3">Adresse</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fournisseurs.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  Aucun fournisseur trouvé.
                </td>
              </tr>
            ) : (
              fournisseurs.map((fournisseur) => (
                <tr key={fournisseur.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{fournisseur.raison_sociale}</td>
                  <td className="px-4 py-2">{fournisseur.nom_contact}</td>
                  <td className="px-4 py-2">{fournisseur.email}</td>
                  <td className="px-4 py-2">{fournisseur.tel}</td>
                  <td className="px-4 py-2">{fournisseur.adresse}</td>
                  <td className="px-4 py-2 flex justify-center space-x-3">
                    <Link
                      to={`/dashboard/modifier-fournisseur/${fournisseur.id}`}
                      title="Modifier"
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      title="Supprimer"
                      onClick={() => handleDelete(fournisseur.id)}
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
              onClick={() => loadFournisseurs(page)}
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
};

export default Fournisseurs;