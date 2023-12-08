import { ResponseStatus, sendCadastros } from "./apiUtils";
import * as DATA from "../models/service";
import * as URL from "../consts/service"

export async function sendPlanejamento(data: DATA.CriarPlanejamentoRequest): Promise<ResponseStatus> {
    return sendCadastros<DATA.CriarPlanejamentoRequest>(URL.criaPlanejamento, data);
}