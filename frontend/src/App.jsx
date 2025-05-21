import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store'; // Importer le store Redux

import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './components/layout/Dashboard';

import Home from './Pages/Home';
import Services from './Pages/Services';
import Projects from './Pages/Projects';
import Contact from './Pages/Contact';
import Login from './Pages/Login';

import DashboardHome from './Pages/dashboard/DashboardHome';
{/* Importer les autres composants de la page de tableau de bord ici */}
import Fournisseur from './Pages/dashboard/Fournisseur';
import AddFournisseur from './Pages/Dashboard/AddFournisseur';
import EditFournisseur from './Pages/dashboard/EditFournisseur';

import MatierePremiere from './Pages/Dashboard/MatierePremieres';
import AddMatierePremiere from './Pages/Dashboard/AddMatierePremiere';
import EditMatierePremiere from './Pages/Dashboard/EditMatierePremiere'

import Ouvrier from './Pages/dashboard/Ouvrier';
import AddOuvrier from './Pages/Dashboard/AddOuvrier';
import EditOuvrier from './Pages/Dashboard/EditOuvrier';

import Chantier from './Pages/dashboard/Chantier';
import AddChantier from './Pages/Dashboard/AddChantier';
import EditChantier from './Pages/Dashboard/EditChantier';

import Article from './Pages/Dashboard/Article';
import AddArticle from './Pages/Dashboard/AddArticle';
import EditArticle from './Pages/Dashboard/EditArticle';

import Clients from './Pages/dashboard/Client';
import AjouterClient from './Pages/dashboard/AjouterClient';
import ModifierClient from './Pages/dashboard/ModifierClient';

import Paiement from './Pages/Dashboard/Paiement';
import AddPaiemt from './Pages/Dashboard/AddPaiement';
import EditPaiement from './Pages/Dashboard/EditPaiement';



const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                <Route index element={<DashboardHome />} />
                {/* Autres routes de tableau de bord ici */}
                <Route path="clients" element={<Clients />} />
                <Route path="ajouter-client" element={<AjouterClient />} />
                <Route path="modifier-client/:id" element={<ModifierClient />} />

                <Route path="fournisseur" element={<Fournisseur />} />
                <Route path="ajouter-fournisseur" element={<AddFournisseur />} />
                <Route path="modifier-fournisseur/:id" element={<EditFournisseur />} />

                <Route path="matiere-premiere" element={<MatierePremiere />} />
                <Route path="/dashboard/ajouter-matiere-premiere" element={<AddMatierePremiere />} />
                <Route path="/dashboard/modifier-matiere-premiere/:id" element={<EditMatierePremiere />} />

                <Route path="/dashboard/ouvrier" element={<Ouvrier />} />
                <Route path="/dashboard/ajouter-ouvrier" element={<AddOuvrier />} />
                <Route path="/dashboard/modifier-ouvrier/:id" element={<EditOuvrier />} />

                <Route path="/dashboard/chantier" element={<Chantier />} />
                <Route path="/dashboard/ajouter-chantier" element={<AddChantier />} />
                <Route path="/dashboard/modifier-chantier/:id" element={<EditChantier />} />

                <Route path="/dashboard/article" element={<Article/>} />
                <Route path="/dashboard/ajouter-article" element={<AddArticle />} />
                <Route path="/dashboard/modifier-article/:id" element={<EditArticle />} />

                <Route path="/dashboard/paiement" element={<Paiement />} />
                <Route path="/dashboard/ajouter-paiement" element={<AddPaiemt />} />
                <Route path="/dashboard/modifier-paiement/:id" element={<EditPaiement />} />

                
                



                


            </Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
