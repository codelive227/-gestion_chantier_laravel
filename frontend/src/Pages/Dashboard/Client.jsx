import React, { useEffect, useState } from "react";
import { getClients, deleteClient } from "../../services/ClientService";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";  // Ajout de l'icône Plus
import Swal from "sweetalert2";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  const loadClients = (page = 1) => {
    getClients({ search, page }).then((res) => {
      setClients(res.data.data);
      setPagination({
        current_page: res.data.current_page,
        last_page: res.data.last_page,
      });
    });
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadClients(1);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Supprimer ce client ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteClient(id)
          .then(() => {
            Swal.fire("Supprimé", "Le client a été supprimé.", "success");
            loadClients(pagination.current_page);
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
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Clients</h1>
        <Link
          to="/dashboard/ajouter-client"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded shadow flex items-center"
        >
          <Plus size={15} className="mr-2" /> Ajouter un client
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Rechercher un client..."
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
              <th className="px-4 py-3">Prénom</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Adresse</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Téléphone</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  Aucun client trouvé.
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr key={client.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{client.nom}</td>
                  <td className="px-4 py-2">{client.prenom}</td>
                  <td className="px-4 py-2">{client.type_client}</td>
                  <td className="px-4 py-2">{client.adresse}</td>
                  <td className="px-4 py-2">{client.email}</td>
                  <td className="px-4 py-2">{client.telephone}</td>
                  <td className="px-4 py-2 flex justify-center space-x-3">
                    {/* Modifier */}
                    <Link
                      to={`/dashboard/modifier-client/${client.id}`}
                      title="Modifier"
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Pencil size={18} />
                    </Link>

                    {/* Supprimer */}
                    <button
                      title="Supprimer"
                      onClick={() => handleDelete(client.id)}
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
              onClick={() => loadClients(page)}
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

export default Clients;
