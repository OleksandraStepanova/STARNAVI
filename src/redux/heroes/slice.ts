import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHeroes } from "./operations";
import {ApiResponseHeroesData, HeroesState } from "../../App.types";


export const initialState: HeroesState = {
    heroes: [],
    isLoading: false,
    error: null,
    next: null,
    previous: null,
}


const heroesSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder       
            .addCase(fetchHeroes.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchHeroes.fulfilled, (state, action: PayloadAction<ApiResponseHeroesData>) => {
                state.heroes = action.payload.results;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
                state.isLoading = false;
            })
            .addCase(fetchHeroes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    },
});

export const heroesReducer = heroesSlice.reducer;

