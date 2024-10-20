import { RootState } from "../../App.types";

export const selectFilmsIsLoading = (state: RootState) => state.films.isLoading;
export const selectFilmsError = (state:RootState) => state.films.error;
export const selectFilms = (state:RootState) => state.films.films;