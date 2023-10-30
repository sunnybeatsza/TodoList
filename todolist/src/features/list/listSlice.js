import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list : []
}

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addItem: (state, action) => {
            let userInput = action.payload
            state.list.push(userInput);
        }
    }
})

export const { addItem } = listSlice.actions;

export default listSlice.reducer;