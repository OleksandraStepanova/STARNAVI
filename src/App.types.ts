import { store } from "./redux/store";

export type ApiResponseHeroes = { 
    data: ApiResponseHeroesData,   
}

export type ApiResponseHeroesData = {
        next: string | null;
        previous: string | null;
        results: Heroe[];
}
    

export type Heroe = {
    id: number;
    name: string;
    films: number[];
    starships: number[];
    height: number,
    mass: number,
    birth_year: string,
    gender:'male'|'female'|'hermaphrodite',
}

export type ApiResponseFilms = {
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
    next: string | null,
    previous: string | null,
    error: string | null,
    isLoading: boolean,   
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
export interface RootState {
  heroes: HeroesState;
  films: FilmsState;
  ships: ShipsState;
}
// export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

