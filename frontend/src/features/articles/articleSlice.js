
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as articleService from '../../services/articleService';

export const fetchArticles = createAsyncThunk(
  'article/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await articleService.getArticles(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addArticle = createAsyncThunk(
  'article/add',
  async (data, { rejectWithValue }) => {
    try {
      const response = await articleService.createArticle(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateArticle = createAsyncThunk(
  'article/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await articleService.updateArticle(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeArticle = createAsyncThunk(
  'article/delete',
  async (id, { rejectWithValue }) => {
    try {
      await articleService.deleteArticle(id);
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

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.pagination = {
          currentPage: action.payload.current_page,
          totalPages: action.payload.last_page,
          totalItems: action.payload.total,
        };
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Removed duplicate addCase for 'fetchArticles.fulfilled'
      .addCase(updateArticle.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(removeArticle.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default articleSlice.reducer;