import axios from "axios";
import { ApiResponseHeroes } from "../App.types";

axios.defaults.baseURL = 'https://sw-api.starnavi.io/';

export const getHeroes = async ():Promise<ApiResponseHeroes>=> {
    const data  = await axios.get<ApiResponseHeroes>('/people/?page=1');
    return data.data;
}