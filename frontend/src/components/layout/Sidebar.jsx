import { FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }
      );

      // Supprime le token côté frontend
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirige vers la page de connexion
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center w-full px-4 py-2 mt-auto text-red-600 hover:bg-red-100"
    >
      <FaSignOutAlt className="text-xl mr-3" />
      {sidebarOpen && <span>Déconnexion</span>}
    </button>
  );
};

export default Sidebar;
