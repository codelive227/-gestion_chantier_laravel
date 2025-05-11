// src/features/matierePremiereSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as matierePremiereService from '../../services/matierepremiereService';

export const fetchMatieresPremieres = createAsyncThunk(
  'matierePremiere/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await matierePremiereService.getMatieresPremieres(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addMatierePremiere = createAsyncThunk(
  'matierePremiere/add',
  async (data, { rejectWithValue }) => {
    try {
      const response = await matierePremiereService.createMatierePremiere(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateMatierePremiere = createAsyncThunk(
  'matierePremiere/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await matierePremiereService.updateMatierePremiere(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeMatierePremiere = createAsyncThunk(
  'matierePremiere/delete',
  async (id, { rejectWithValue }) => {
    try {
      await matierePremiereService.deleteMatierePremiere(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
};

const matierePremiereSlice = createSlice({
  name: 'matierePremiere',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatieresPremieres.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMatieresPremieres.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.pagination = {
          currentPage: action.payload.current_page,
          totalPages: action.payload.last_page,
          totalItems: action.payload.total,
        };
      })
      .addCase(fetchMatieresPremieres.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addMatierePremiere.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateMatierePremiere.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(removeMatierePremiere.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default matierePremiereSlice.reducer;