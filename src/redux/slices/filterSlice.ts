import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface sort {
  name: string;
  sortProperty: string;
}

export interface FilterState {
  categoryId: number;
  currentPage: number;
  searchValue: string;
  sort?: sort;
}

interface SetFilters {
  sort?: sort;
  categoryId: number;
  currentPage: number;
}

const initialState: FilterState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: "",
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<SetFilters>) {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort;
        state.currentPage = action.payload.currentPage;
        state.categoryId = action.payload.categoryId;
      } else {
        state.categoryId = 0;
        state.currentPage = 1;
        state.searchValue = "";
        state.sort = {
          name: "популярности",
          sortProperty: "rating",
        };
      }
    },
  },
});

export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setSearchValue,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
