import * as URL from "../consts/service"
import { fetchDados } from "./apiUtils";
import { EscolaRanqueData, EscolaRanqueDetalhes, EscolaRanqueFiltro, ListaPaginada, RanqueProcessamentoData, RanqueData } from "../models/ranque";
import axios, { AxiosResponse } from "axios";


export async function fetchEscolasRanque(filtro: EscolaRanqueFiltro): Promise<ListaPaginada<EscolaRanqueData>> {
  return fetchDados<ListaPaginada<EscolaRanqueData>>(URL.listarEscolasRanque, filtro);
}

export async function fetchProcessamentoRanque(): Promise<RanqueProcessamentoData> {
  return fetchDados<RanqueProcessamentoData>(URL.ranqueamentoProcessamento);
}

export async function fetchEscolaRanque(id: string) {
  return fetchDados<EscolaRanqueDetalhes>(`${URL.listarEscolasRanque}/${id}`);
}

export async function fetchRanques(
  pagina: number,
  tamanhoPagina: number
): Promise<ListaPaginada<RanqueData>> {
  try {
      const response: AxiosResponse<ListaPaginada<RanqueData>> = await axios.get(URL.listarRanques, {
          params: {
              pagina,
              tamanhoPagina
          }
      });
      return response.data;
  } catch (error) {
      console.log(error);
      throw error;
  }
}

