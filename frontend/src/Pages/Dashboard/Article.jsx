import React, { useEffect, useState } from "react";
import { getArticles, deleteArticle } from "../../services/articleService";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import Swal from "sweetalert2";

const Article = () => {
  const [article, setArticle] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  const loadArticle= (page = 1) => {
    getArticles({ search, page }).then((res) => {
      const data = res?.data ?? []; // <--- correction ici
      const current_page = res?.current_page ?? 1;
      const last_page = res?.last_page ?? 1;
  
      setArticle(data);
      setPagination({
        current_page,
        last_page,
      });
    });
  };
  
  

  useEffect(() => {
    loadArticle();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadArticle(1);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Supprimer ce article?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteArticle(id)
          .then(() => {
            Swal.fire("Supprimé", "L'article a été supprimé.", "success");
            loadArticle(pagination.current_page);
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
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Article</h1>
        <Link
          to="/dashboard/ajouter-article"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded shadow flex items-center"
        >
          <Plus size={15} className="mr-2" /> Ajouter un article
            </Link>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Rechercher un article..."
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
              <th className="px-4 py-3">Reference</th>
               <th className="px-4 py-3">Designation</th>
                <th className="px-4 py-3">Uinte</th>
                 <th className="px-4 py-3">Cout</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {article.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center p-4 text-gray-500">
                  Aucune matière première trouvée.
                </td>
              </tr>
            ) : (
              article.map((article) => (
                <tr key={article.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{article.reference}</td>
                  <td className="px-4 py-2">{article.designation}</td>
                  <td className="px-4 py-2">{article.unite}</td>
                  <td className="px-4 py-2">{article.cout}</td>
                  <td className="px-4 py-2 flex justify-center space-x-3">
                    <Link
                      to={`/dashboard/modifier-article/${article.id}`}
                      title="Modifier"
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      title="Supprimer"
                      onClick={() => handleDelete(article.id)}
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
              onClick={() => loadArticle(page)}

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
export default Article;