import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState = {
    showSearch : false,
    searchQuery: ""
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        toggleSearch(state, action){
            state.showSearch = !state.showSearch;
        },

        setSearchQuery(state,action){
            state.searchQuery = action.payload
        }
    }
})

export const {toggleSearch, setSearchQuery} = searchSlice.actions;

export default searchSlice.reducer;