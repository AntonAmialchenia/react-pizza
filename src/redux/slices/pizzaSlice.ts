import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { Pizza } from '../../models';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface pizzaState {
  items: Pizza[];
  status: Status  
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
  status: Status.LOADING
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
        state.status = Status.LOADING
        state.items = [];        
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = Status.ERROR
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
