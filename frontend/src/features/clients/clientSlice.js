import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getClients, createClient, updateClient, deleteClient } from '../../services/ClientService';

export const fetchClients = createAsyncThunk('clients/fetchClients', async ({ search, page }) => {
  const response = await getClients({ search, page });
  return response.data;
});

export const addClient = createAsyncThunk('clients/addClient', async (clientData) => {
  const response = await createClient(clientData);
  return response.data;
});

export const editClient = createAsyncThunk('clients/editClient', async ({ id, clientData }) => {
  const response = await updateClient(id, clientData);
  return response.data;
});

export const removeClient = createAsyncThunk('clients/removeClient', async (id) => {
  await deleteClient(id);
  return id;
});

const clientSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: [],
    pagination: {
      current_page: 1,
      last_page: 1,
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    resetClients: (state) => {
      state.clients = [];
      state.pagination = { current_page: 1, last_page: 1 };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients = action.payload.data;
        state.pagination = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
        };
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
      })
      .addCase(editClient.fulfilled, (state, action) => {
        const index = state.clients.findIndex(client => client.id === action.payload.id);
        if (index >= 0) {
          state.clients[index] = action.payload;
        }
      })
      .addCase(removeClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter(client => client.id !== action.payload);
      });
  },
});

export const { resetClients } = clientSlice.actions;
export default clientSlice.reducer;
