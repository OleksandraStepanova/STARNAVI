import { configureStore } from "@reduxjs/toolkit";
import { filmsReducer } from './films/slice';
import { shipsReducer } from "./ships/slice";
import { heroesReducer } from "./heroes/slice";
import { combineReducers } from "redux";


export const rootReducer = combineReducers({
    heroes: heroesReducer,
    films: filmsReducer,
    ships: shipsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});


