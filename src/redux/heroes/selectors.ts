import { RootState } from "../../App.types";

export const selectHeroesIsLoading = (state: RootState) => state.heroes.isLoading;
export const selectHeroesError = (state:RootState) => state.heroes.error;
export const selectHeroes = (state: RootState) => state.heroes.heroes;
export const selectHeroesNext = (state: RootState) => state.heroes.next;
export const selectHeroesPrevious = (state:RootState) => state.heroes.previous;