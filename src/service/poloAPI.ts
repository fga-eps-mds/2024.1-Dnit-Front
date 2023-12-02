import axios, { AxiosResponse } from "axios";
import * as URL from "../consts/service"
import * as DATA from "../models/service";
import { PoloModel, ListaPaginada } from "../models/polo";

export async function fetchListarPolosFiltrados(filtroTabelaData: DATA.FiltroPoloData): Promise<ListaPaginada<PoloModel>> {
    try {
        const response: AxiosResponse<ListaPaginada<PoloModel>> = await axios.get(
            URL.polosFiltradosUrl,
            filtroTabelaData
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
