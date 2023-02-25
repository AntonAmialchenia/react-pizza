import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { Pizza } from '../../models';

interface pizzaState {
  items: Pizza[];
  loading: boolean;
  error: string | null;
}

interface params {
  category: string;
  sortBy: string | undefined;
  order: 'asc' | 'desc';
  search: string;
  currentPage: number;
}

export const fetchPizzas = createAsyncThunk<Pizza[], params>(
  'pizza/fetchPizzasStatus',
  async ({ category, sortBy, order, search, currentPage }) => {
    const { data } = await axios.get<Pizza[]>(
      `https://63db90c6c45e08a043484e95.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

const initialState: pizzaState = {
  items: [],
  loading: false,
  error: null,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.items = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Ошибка';
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
