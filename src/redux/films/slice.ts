import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFilms } from "./operations";
import { ApiResponseFilms, FilmsState } from "../../App.types";


export const initialState: FilmsState = {
    films: [],
    isLoading: false,
    error: null,
}


const filmsSlice = createSlice({
    name: "films",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder       
            .addCase(fetchFilms.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchFilms.fulfilled, (state, action: PayloadAction<ApiResponseFilms>) => {
                state.films = action.payload.results;
                state.isLoading = false;
            })
            .addCase(fetchFilms.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    },
});

export const filmsReducer = filmsSlice.reducer;