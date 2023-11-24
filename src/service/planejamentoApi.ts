import axios, { AxiosResponse } from "axios";
import { PlanejamentoMacroModel } from "../models/planejamento";
import { ListaPaginada } from "../models/planejamento";


export async function fetchPlanejamento(pagina: number, tamanhoPagina: number, nome: string, periodo: string = "", qtdAcoes: number, responsavel: string ): Promise<ListaPaginada<PlanejamentoMacroModel>> {
  try {
    const response: AxiosResponse<ListaPaginada<PlanejamentoMacroModel>> = await axios.get("", {
        params: {
            pageIndex: pagina,
            pageSize: tamanhoPagina,
            nome,
            periodo,
            qtdAcoes,
            responsavel
        }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}