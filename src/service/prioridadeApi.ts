import { CustoLogisticoModel } from "../models/prioridade";
import * as URL from "../consts/service"
import { fetchDados } from "./apiUtils";

export async function fetchCustosLogisticos(): Promise<CustoLogisticoModel[]> {
    return fetchDados<CustoLogisticoModel[]>(URL.obterCustosLogisticos);
}