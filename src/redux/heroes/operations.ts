import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {  ApiResponseHeroes } from "../../App.types";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://sw-api.starnavi.io/";

export const fetchHeroes = createAsyncThunk < ApiResponseHeroes, number,{rejectValue:string}>(
  "heroes/fetchHeroes",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get<ApiResponseHeroes>(`/people/?page=${page}`);
      return response.data;
    } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
        return rejectWithValue('Something went wrong')  
    }
  }
);