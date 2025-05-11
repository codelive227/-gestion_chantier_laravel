// src/features/fournisseur/fournisseurSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getFournisseurs, 
  createFournisseur, 
  updateFournisseur, 
  deleteFournisseur 
} from '../../services/FournisseurService';

export const fetchFournisseurs = createAsyncThunk(
  'fournisseurs/fetchFournisseurs', 
  async ({ search, page }) => {
    const response = await getFournisseurs({ search, page });
    return response.data;
  }
);

export const addFournisseur = createAsyncThunk(
  'fournisseurs/addFournisseur',
  async (fournisseurData) => {
    const response = await createFournisseur(fournisseurData);
    return response.data;
  }
);

export const editFournisseur = createAsyncThunk(
  'fournisseurs/editFournisseur',
  async ({ id, fournisseurData }) => {
    const response = await updateFournisseur(id, fournisseurData);
    return response.data;
  }
);

export const removeFournisseur = createAsyncThunk(
  'fournisseurs/removeFournisseur',
  async (id) => {
    await deleteFournisseur(id);
    return id;
  }
);

const fournisseurSlice = createSlice({
  name: 'fournisseurs',
  initialState: {
    fournisseurs: [],
    pagination: {
      current_page: 1,
      last_page: 1,
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    resetFournisseurs: (state) => {
      state.fournisseurs = [];
      state.pagination = { current_page: 1, last_page: 1 };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFournisseurs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFournisseurs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.fournisseurs = action.payload.data;
        state.pagination = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
        };
      })
      .addCase(fetchFournisseurs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addFournisseur.fulfilled, (state, action) => {
        state.fournisseurs.push(action.payload);
      })
      .addCase(editFournisseur.fulfilled, (state, action) => {
        const index = state.fournisseurs.findIndex(
          f => f.id === action.payload.id
        );
        if (index >= 0) {
          state.fournisseurs[index] = action.payload;
        }
      })
      .addCase(removeFournisseur.fulfilled, (state, action) => {
        state.fournisseurs = state.fournisseurs.filter(
          f => f.id !== action.payload
        );
      });
  },
});

export const { resetFournisseurs } = fournisseurSlice.actions;
export default fournisseurSlice.reducer;