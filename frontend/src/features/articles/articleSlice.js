// src/features/matierePremiereSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as ouvrierService from '../../services/ouvrierService';

export const fetchOuvriers = createAsyncThunk(
  'ouvrier/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await ouvrierService.getOuvriers(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addOuvrier = createAsyncThunk(
  'ouvrier/add',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ouvrierService.createOuvrier(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOuvrier = createAsyncThunk(
  'ouvrier/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await ouvrierService.updateOuvrier(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeOuvrier = createAsyncThunk(
  'ouvrier/delete',
  async (id, { rejectWithValue }) => {
    try {
      await ouvrierService.deleteOuvrier(id);
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

const ouvrierSlice = createSlice({
  name: 'ouvrier',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOuvriers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOuvriers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.pagination = {
          currentPage: action.payload.current_page,
          totalPages: action.payload.last_page,
          totalItems: action.payload.total,
        };
      })
      .addCase(fetchOuvriers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Removed duplicate addCase for 'fetchOuvriers.fulfilled'
      .addCase(updateOuvrier.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(removeOuvrier.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default ouvrierSlice.reducer;