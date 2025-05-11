import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as chantierService from '../../services/chantierService';

// Thunks
export const fetchChantiers = createAsyncThunk(
  'chantier/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      return await chantierService.getChantiers(params);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchClients = createAsyncThunk(
  'chantier/fetchClients',
  async (_, { rejectWithValue }) => {
    try {
      return await chantierService.getClients();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addChantier = createAsyncThunk(
  'chantier/add',
  async (data, { rejectWithValue }) => {
    try {
      return await chantierService.createChantier(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateChantier = createAsyncThunk(
  'chantier/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await chantierService.updateChantier(id, data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeChantier = createAsyncThunk(
  'chantier/delete',
  async (id, { rejectWithValue }) => {
    try {
      await chantierService.deleteChantier(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getChantierById = createAsyncThunk(
  'chantier/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await chantierService.getChantierById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  chantiers: [],
  clients: [],
  status: 'idle',
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
};

const chantierSlice = createSlice({
  name: 'chantier',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch chantiers
      .addCase(fetchChantiers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChantiers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chantiers = action.payload.data;
        state.pagination = {
          currentPage: action.payload.current_page,
          totalPages: action.payload.last_page,
          totalItems: action.payload.total,
        };
      })
      .addCase(fetchChantiers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch clients
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.clients = action.payload.data;
      })
      
      // Add chantier
      .addCase(addChantier.fulfilled, (state, action) => {
        state.chantiers.unshift(action.payload);
      })
      
      // Update chantier
      .addCase(updateChantier.fulfilled, (state, action) => {
        const index = state.chantiers.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.chantiers[index] = action.payload;
        }
      })
      .addCase(getChantierById.fulfilled, (state, action) => {
          state.currentChantier = action.payload;
  }   )
      .addCase(getChantierById.rejected, (state, action) => {
         state.error = action.payload;
      })
      
      // Delete chantier
      .addCase(removeChantier.fulfilled, (state, action) => {
        state.chantiers = state.chantiers.filter(c => c.id !== action.payload);
      });
  },
});

export default chantierSlice.reducer;