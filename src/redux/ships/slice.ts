import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  ApiResponseShips, Ship, ShipsState } from "../../App.types";
import { fetchShips, fetchShipsById} from "./operations";


export const initialState: ShipsState = {
    ships: [],
    isLoading: false,
    error: null,
    next:'',
}

const shipsSlice = createSlice({
    name: "ships",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder       
            .addCase(fetchShipsById.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchShipsById.fulfilled, (state, action: PayloadAction<Ship>) => {
                if (state.ships.find(ship => ship.id === action.payload.id)) return;
                state.ships.push(action.payload);
                state.isLoading = false;
            })
            .addCase(fetchShipsById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchShips.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchShips.fulfilled, (state, action: PayloadAction<ApiResponseShips>) => {
                state.ships.push(...action.payload.results);
                state.isLoading = false;
            })
            .addCase(fetchShips.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    },
});

export const shipsReducer = shipsSlice.reducer;
