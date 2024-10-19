import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHeroes } from "./operations";
import { ApiResponseHeroes, HeroesState } from "../../App.types";


const initialState: HeroesState = {
    heroes: [],
    isLoading: false,
    error: null,
    next:''
}


const heroesSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder       
            .addCase(fetchHeroes.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchHeroes.fulfilled, (state, action: PayloadAction<ApiResponseHeroes>) => {
                state.heroes = action.payload.results;
                state.next = action.payload.next;
                state.isLoading = false;
            })
            .addCase(fetchHeroes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    },
});

export const heroesReducer = heroesSlice.reducer;