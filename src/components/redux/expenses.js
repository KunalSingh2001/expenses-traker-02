import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expenses: []
};


const expansesSlice = createSlice({
    name: "expanses",
    initialState: initialState,
    reducers: {
        listing(state, action) {
            state.expenses = action.payload || [];
        },
        add(state, action) {
            console.log('action.payload', action.payload);
            state.expenses.push(action.payload);
        },
        edit(state, action) {
            state.expenses = state.expenses.map(item =>
                item.id === action.payload.id ? action.payload : item
            );
        },
        deleteExpanse(state, action) {
            state.expenses = state.expenses.filter(
                item => item.id !== action.payload.id 
            );
        }

    }
});

export const { listing, add, edit, deleteExpanse } = expansesSlice.actions;

export default expansesSlice.reducer;



