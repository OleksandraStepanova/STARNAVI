import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponseShips, Ship } from "../../App.types";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://sw-api.starnavi.io/";

export const fetchShips = createAsyncThunk < ApiResponseShips , number, {rejectValue:string}>(
  "ships/fetchShips",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get<ApiResponseShips>(`/starships/?page=${page}`);
      return response.data;
    } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
        return rejectWithValue('Something went wrong')    
    }
  }
);

export const fetchShipsById = createAsyncThunk < Ship , number, {rejectValue:string}>(
  "ships/fetchShipsById",
  async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get<Ship>(`/starships/${id}`);        
      return response.data;
    } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
        return rejectWithValue('Something went wrong')    
    }
  }
);