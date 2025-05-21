import React, { useState, useEffect } from 'react';
import {
  FaBars, FaSearch, FaHome, FaTachometerAlt, FaWarehouse,
  FaTools, FaHardHat, FaMoneyCheckAlt, FaProjectDiagram,
  FaUsers, FaUserCircle, FaSignOutAlt, FaBox
} from 'react-icons/fa';
import { Outlet, useNavigate } from 'react-router-dom';

const menuItems = [
  { name: 'Accueil', icon: <FaHome />, path: '/accueil' },
  { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
  { name: 'Fournisseurs', icon: <FaWarehouse />, path: '/dashboard/fournisseur' },
  { name: 'Matière premières', icon: <FaTools />, path: '/dashboard/matiere-premiere' },
  { name: 'Ouvriers', icon: <FaHardHat />, path: '/dashboard/ouvrier' },
  { name: 'Articles', icon: <FaBox />, path: '/dashboard/articles' },
  { name: 'Paiements', icon: <FaMoneyCheckAlt />, path: '/dashboard/paiement' },
  { name: 'Chantiers', icon: <FaProjectDiagram />, path: '/dashboard/chantier' },
  { name: 'Clients', icon: <FaUsers />, path: '/dashboard/clients' },
  { name: 'Utilisateurs', icon: <FaUserCircle />, path: '/dashboard/utilisateur' },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // Charger les infos utilisateur depuis le localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserInfo(user);
    } else {
      // Si aucune info, on redirige vers la page de connexion
      navigate('/login');
    }
  }, [navigate]);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // si tu stockes aussi le token
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-md h-full transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b">
          {sidebarOpen && <span className="text-lg font-bold text-blue-600">AGRTRAVIS</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
            <FaBars />
          </button>
        </div>
        <div className="flex flex-col mt-4 space-y-2">
          {menuItems.map(item => (
            <a
              key={item.name}
              href={item.path}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100"
            >
              <span className="text-xl mr-3">{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </a>
          ))}

          {/* Bouton de déconnexion */}
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-red-600 hover:bg-red-100 w-full"
          >
            <FaSignOutAlt className="text-xl mr-3" />
            {sidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow">
          <div className="flex items-center gap-2">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Recherche..."
              className="px-2 py-1 border rounded focus:outline-none focus:ring"
            />
          </div>
          <div className="flex items-center gap-3">
            {userInfo ? (
              <>
                <span className="font-medium text-gray-700">
                  Bienvenu {userInfo.nom} {userInfo.prenom}, vous êtes connecté
                </span>
              </>
            ) : (
              <span className="font-medium text-gray-700">Chargement...</span>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
