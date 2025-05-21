// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './features/clients/clientSlice';
import fournisseurReducer from './features/fournisseurs/fournisseurSlice';
import matierePremiereReducer from './features/matierepremiere/matierePremiereSlice';
import ouvrierReducer from './features/ouvriers/ouvrierSlice';
import chantierReducer from './features/chantiers/chantierSlice';
import articleReducer from './features/articles/articleSlice';
import paiementReducer from './features/paiements/paiementSlice';

export const store = configureStore({
  reducer: {
    clients: clientReducer,
    fournisseurs: fournisseurReducer,
    matierePremiere: matierePremiereReducer,
    ouvriers: ouvrierReducer,
    chantier: chantierReducer,
    article: articleReducer,
    paiement: paiementReducer,
  }, 
});