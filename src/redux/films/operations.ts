import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponseFilms } from "../../App.types";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://sw-api.starnavi.io/";

export const fetchFilms = createAsyncThunk < ApiResponseFilms, void,{rejectValue:string}>(
  "films/fetchFilms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<ApiResponseFilms>(`/films`);
      return response.data;
    } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error('Something went wrong');
        }
        return rejectWithValue('Something went wrong')    
    }
  }
);
