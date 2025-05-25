import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getChantierById } from '../../services/chantierService';

const DetailChantier = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentChantier, loading, error } = useSelector((state) => state.chantier);

  useEffect(() => {
    dispatch(getChantierById(id));
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!currentChantier) return null;

  const { designation, type_chantier, etat, date_debut, date_estime, localisation, articles } = currentChantier;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Détails du Chantier</h1>
      <div className="bg-white shadow rounded p-4">
        <p><strong>Désignation:</strong> {designation}</p>
        <p><strong>Type:</strong> {type_chantier}</p>
        <p><strong>État:</strong> {etat}</p>
        <p><strong>Début:</strong> {date_debut}</p>
        <p><strong>Estimation:</strong> {date_estime}</p>
        <p><strong>Localisation:</strong> {localisation}</p>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Articles associés</h2>
        <ul className="list-disc pl-5">
          {articles.map(article => (
            <li key={article.id}>
              {article.nom} (ID: {article.id})
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {article.ouvriers.map(ouvrier => (
                  <li key={ouvrier.id}>
                    {ouvrier.nom} {ouvrier.prenom} - {ouvrier.statut}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-4">
        <a href={`http://localhost:8000/api/chantiers/${id}/export-pdf`} target="_blank" className="btn btn-red">
          Export PDF
        </a>
      </div>
    </div>
  );
};

export default DetailChantier;
