import { store } from "./redux/store";

export type ApiResponseHeroes = { 
    count: number;
    next: string | null;
    previous: string | null;
    results: Heroe[];
}

export type Heroe = {
    id: string;
    name: string;
    films: number[];
    starships: number[];
}

export type ApiResponseFilms = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Film[];
}

export type Film = {
    id: number;
    title: string;
    starships: number[];
}



export type ApiResponseShips = { 
    count: number;
    next: string | null;
    previous: string | null;
    results: Ship[];
}

export type Ship = {
    id: number;
    name: string;
}

export interface HeroesState {
    heroes: Heroe[],
    isLoading: boolean,
    error: string | null,
    next:string|null,
}

export interface FilmsState {
    films: Film[],
    isLoading: boolean,
    error: string|null,
}

export interface ShipsState {
    ships: Ship[],
    isLoading: boolean,
    error: string | null,
    next:string|null,
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;