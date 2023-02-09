import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface sort {
  name: string;
  sortProperty: string;
}

export interface FilterState {
  categoryId: number;
  sort: sort;
}

const initialState: FilterState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<sort>) {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId, setSortType } = filterSlice.actions;

export default filterSlice.reducer;
