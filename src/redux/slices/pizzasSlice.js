import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzas",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://6368ce8715219b84960742ec.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending](state) {
        state.status = 'loading'
        state.items = []
    },[fetchPizzas.fulfilled](state, action) {
        state.items = action.payload
        state.status = 'success'
    },[fetchPizzas.rejected](state, action) {
        state.status = 'rejected'
        state.items = []
    },
  },
});

export const { reducers } = pizzasSlice.actions;

export default pizzasSlice.reducer;
