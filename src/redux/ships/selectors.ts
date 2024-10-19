import { RootState } from "../../App.types";

export const selectShipsIsLoading = (state: RootState) => state.ships.isLoading;
export const selectShipsError = (state:RootState) => state.ships.error;
export const selectShips = (state: RootState) => state.ships.ships;
export const selectShipsNext = (state:RootState) => state.ships.next;