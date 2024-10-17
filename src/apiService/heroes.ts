import axios from "axios";
import { ApiResponse } from "../App.types";

axios.defaults.baseURL = 'https://sw-api.starnavi.io/';

export const getHeroes = async ():Promise<ApiResponse>=> {
    const data  = await axios.get<ApiResponse>('/people/?page=1');
    return data.data;
}