import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { cartItem } from "../../models";
import { getCartFromLS } from "./../../utils/getCartFromLS";
import { calcTotalPrice } from "./../../utils/calcTotalPrice";

interface cartState {
  totalPrice: number;
  items: cartItem[];
}

const { items, totalPrice } = getCartFromLS();

const initialState: cartState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<cartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count!++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem && findItem.count! > 1) {
        findItem.count!--;
        state.totalPrice = state.totalPrice - findItem.price;
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.totalPrice - findItem?.price! * findItem?.count!;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
