import axios, { AxiosResponse } from "axios";
import * as URL from "../consts/service"
import * as DATA from "../models/service";
import { ResponseStatus, fetchDados, sendCadastros} from "./apiUtils";
import { EmpresaModel, ListaPaginada } from "../models/empresa";
import { ListarUsuariosQueryParams, UsuarioModel } from "../models/usuario";

export async function sendCadastroEmpresa(data:DATA.CadastroEmpresaData):Promise<ResponseStatus>{
    return sendCadastros<DATA.CadastroEmpresaData>(URL.cadastrarEmpresaUrl, data);
}

export async function fetchEmpresas(pagina: number, tamanhoPagina: number, nome: string, cnpj: string): Promise<ListaPaginada<EmpresaModel>> {
    try {
        const response: AxiosResponse<ListaPaginada<EmpresaModel>> = await axios.get(URL.listarEmpresasUrl, {
            params: {
                pageIndex: pagina,
                pageSize: tamanhoPagina,
                nome,
                cnpj
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

export async function fetchUsuariosEmpresa(cnpj: string, params: ListarUsuariosQueryParams): Promise<ListaPaginada<UsuarioModel>> {
    const url = `${URL.listarUsuariosEmpresaUrl}/${cnpj}`;
    try {
        const response: AxiosResponse<ListaPaginada<UsuarioModel>> = await axios.get(url, {
            params        
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteUsuarioEmpresa(cnpj: string, usuarioid: string) {
    const url = `${URL.removerUsuarioEmpresaUrl}`;
    try {
        const response: AxiosResponse<ResponseStatus> = await axios.delete(url, {
            params: {
                cnpj,
                usuarioid
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}