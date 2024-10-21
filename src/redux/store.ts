import { configureStore } from "@reduxjs/toolkit";
import { filmsReducer } from './films/slice';
import { shipsReducer } from "./ships/slice";
import { heroesReducer } from "./heroes/slice";


export const store = configureStore({
  reducer: {
    heroes: heroesReducer,
    films: filmsReducer,
    ships: shipsReducer,
  }
});

