import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as paiementService from '../../services/paiementService';

// Thunks
export const fetchPaiements = createAsyncThunk(
  'paiement/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      return await paiementService.getPaiements(params);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Les autres thunks restent inchangés
export const fetchClients = createAsyncThunk(
  'paiement/fetchClients',
  async (_, { rejectWithValue }) => {
    try {
      return await paiementService.getClients();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addPaiement = createAsyncThunk(
  'paiement/add',
  async (data, { rejectWithValue }) => {
    try {
      return await paiementService.createChantier(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePaiement = createAsyncThunk(
  'paiement/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await paiementService.updatePaiement(id, data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removePaiement = createAsyncThunk(
  'paiement/delete',
  async (id, { rejectWithValue }) => {
    try {
      await paiementService.removePaiement(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPaiementById = createAsyncThunk(
  'paiement/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await paiementService.getPaiementById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  paiements: {
    data: [],
  },
  status: 'idle',
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
};


const paiementSlice = createSlice({
  name: 'paiement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaiements.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPaiements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.paiements = action.payload.data;
        state.pagination = {
          currentPage: action.payload.current_page,
          totalPages: action.payload.last_page,
          totalItems: action.payload.total,
        };
      })
      .addCase(fetchPaiements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchClients.fulfilled, (state, action) => {
        state.clients = action.payload.data;
      })

      .addCase(addPaiement.fulfilled, (state, action) => {
        // Selon ta réponse API, tu ajoutes action.payload.data si présent
        state.paiements.unshift(action.payload.data ?? action.payload);
      })

      .addCase(updatePaiement.fulfilled, (state, action) => {
        const index = state.paiements.findIndex(p => p.id === action.payload.data.id);
        if (index !== -1) {
          state.paiements[index] = action.payload.data;
        }
      })

     .addCase(removePaiement.fulfilled, (state, action) => {
  state.paiements.data = state.paiements.data.filter(p => p.id !== action.payload);
});

  },
});

export default paiementSlice.reducer;
