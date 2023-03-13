import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalPrice: 0
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
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if(findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            },0)

        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
        },
        createItem(state, action) {
            state.items = []
        }

    },
});

export const { addItem,removeItem, createItem } =
    cartSlice.actions;

export default cartSlice.reducer;
