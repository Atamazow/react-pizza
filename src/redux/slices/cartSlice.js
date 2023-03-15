import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // state.items.push(action.payload)
      // state.totalPrice = state.items.reduce((sum, obj) => {
      //     return obj.price + sum
      // },0)
      // задача которая расскажу на собесе. Создал функция которая не дублирует одинаковые элементы в массив
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
      minusItem(state, action) {
          const findItem = state.items.find((obj) => obj.id === action.payload);
          if (findItem) {
              findItem.count--;
          }
      },


      removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    createItem(state) {
      state.items = [];
      state.totalPrice = 0
    },
  },
});

export const { addItem, removeItem, createItem,minusItem } = cartSlice.actions;

export default cartSlice.reducer;
