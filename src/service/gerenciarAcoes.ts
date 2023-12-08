import {fetchDados, ResponseStatus, sendCadastros} from "./apiUtils";
import * as DATA from "../models/service";
import * as URL from "../consts/service"
import {PlanejamentoMacro} from "../models/gerenciarAcoes";

export async function sendPlanejamento(data: DATA.CriarPlanejamentoRequest): Promise<ResponseStatus> {
    return sendCadastros<DATA.CriarPlanejamentoRequest>(URL.criaPlanejamento, data);
}

export async function fetchPlanejamento(){
    return fetchDados<PlanejamentoMacro[]>(`${URL.criaPlanejamento}`);
}
