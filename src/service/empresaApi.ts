import axios, { AxiosResponse } from "axios";
import * as URL from "../consts/service"
import * as DATA from "../models/service";
import { ResponseStatus, fetchDados, sendCadastros, update} from "./apiUtils";
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

export async function fetchEmpresa(cnpj: string): Promise<EmpresaModel> {
    const url = `${URL.visualizarEmpresaUrl}/${cnpj}`;
    return fetchDados<EmpresaModel>(url);
}

export async function updateEmpresa(cnpj: string, empresa: DATA.EditarEmpresaData): Promise<EmpresaModel> {
    const url = `${URL.editarEmpresaUrl}/${cnpj}`;
    try {
        const response: AxiosResponse<EmpresaModel> = await axios.put(url, empresa);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteEmpresa(cnpj: string): Promise<ResponseStatus> {
    const url = `${URL.excluirEmpresaUrl}/${cnpj}`;
    try{
        const response: AxiosResponse<ResponseStatus> = await  axios.delete(url);
        return response.data;
    } catch (error){
        console.error(error);
        throw error;
    }
}