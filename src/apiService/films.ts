import axios from "axios";
import { Films } from "../App.types";

axios.defaults.baseURL = 'https://sw-api.starnavi.io/';

export const getFilms = async (id:number):Promise<Films>=> {
    const data  = await axios.get<Films>(`/films/${id}`);
    return data.data;
}