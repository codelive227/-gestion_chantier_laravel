import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Wrench, Layers, Phone, LogIn } from 'lucide-react'; // icônes modernes
import { FaTachometerAlt } from 'react-icons/fa';


const Header = () => {
  return (
    <header className="bg-[#0F1C2E] text-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-3">
          {/* <img src="image/logo1.png" alt="Logo" className="h-10 w-10" /> */}
         
            AGRTravis
          
        </div>

        <ul className="flex space-x-6 text-sm font-medium">
          <li>
            <Link to="/" className="flex items-center space-x-1 hover:text-[#4DA6FF] transition-colors">
              <Home size={18} />
              <span>Accueil</span>
            </Link>
          </li>
          <li>
            <Link to="/services" className="flex items-center space-x-1 hover:text-[#4DA6FF] transition-colors">
              <Wrench size={18} />
              <span>Services</span>
            </Link>
          </li>
          <li>
            <Link to="/projects" className="flex items-center space-x-1 hover:text-[#4DA6FF] transition-colors">
              <Layers size={18} />
              <span>Projets</span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="flex items-center space-x-1 hover:text-[#4DA6FF] transition-colors">
              <Phone size={18} />
              <span>Contact</span>
            </Link>
          </li>
          <li>
                <Link to="/dashboard" className="flex items-center space-x-1 hover:text-[#4DA6FF] transition-colors">
                <FaTachometerAlt size={18} />
                <span>Dashboard</span>
                </Link>
          </li>
          <li>
            <Link to="/login" className="flex items-center space-x-1 hover:text-[#4DA6FF] transition-colors">
              <LogIn size={18} />
              <span>Connexion</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
