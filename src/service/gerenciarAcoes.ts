import {fetchDados, ResponseStatus, sendCadastros, update} from "./apiUtils";
import * as DATA from "../models/service";
import * as URL from "../consts/service"
import {PlanejamentoMacro} from "../models/gerenciarAcoes";
import axios, { AxiosResponse } from "axios";

//envia cadastro de planejamento macro
export async function sendPlanejamento(data: DATA.CriarPlanejamentoRequest): Promise<ResponseStatus> {
    return sendCadastros<DATA.CriarPlanejamentoRequest>(URL.criaPlanejamento, data);
}
//busca lista de planejamentos macro
export async function fetchPlanejamento(){
    return fetchDados<PlanejamentoMacro[]>(`${URL.criaPlanejamento}`);
}
//busca planejamento macro específico por id
export async function fetchPlanejamentoId(id: string): Promise<PlanejamentoMacro> {
    return fetchDados<PlanejamentoMacro>(`${URL.criaPlanejamento}/${id}`);
}

export async function deletePlanejamentoMacro({id_planejamento}: DATA.ExcluirPlanejamentoData): Promise<ResponseStatus>{
    try{
        const response: AxiosResponse<ResponseStatus> = await axios.delete(
            URL.excluiPlanejamento, { params: { id: id_planejamento}}
        );
        return response.data;
    } catch (error){
        console.error(error);
        throw error;
    }
}

export async function updatePlanejamento(id: string, data: PlanejamentoMacro): Promise<ResponseStatus> {
    return update<PlanejamentoMacro>(`${URL.criaPlanejamento}/${id}`, data);
} 