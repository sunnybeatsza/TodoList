import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: ["Laundry", "Walking the dog"]
};

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.list.push(action.payload);
        },
        editItem: (state, action) => {
            const { index, updatedItem } = action.payload;
            state.list[index] = updatedItem;
        }
    }
});

export const { addItem, editItem } = listSlice.actions;

export default listSlice.reducer;
