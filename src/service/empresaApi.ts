import axios, { AxiosResponse } from "axios";
import * as URL from "../consts/service"
import * as DATA from "../models/service";
import { ResponseStatus, sendCadastros} from "./apiUtils";
import { EmpresaModel } from "../models/empresa";

export async function sendCadastroEmpresa(data:DATA.CadastroEmpresaData):Promise<ResponseStatus>{
    return sendCadastros<DATA.CadastroEmpresaData>(URL.cadastrarEmpresaUrl, data);
}

export async function fetchEmpresas(pagina: number, tamanhoPagina: number, nome: string): Promise<EmpresaModel[]> {
    try {
        const response: AxiosResponse<EmpresaModel[]> = await axios.get(URL.listarEmpresasUrl, {
            params: {
                pageIndex: pagina,
                pageSize: tamanhoPagina,
                nome
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}