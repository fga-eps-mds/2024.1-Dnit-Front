import { Permissao, PermissaoCategoria, PermissaoModel, TipoPerfil } from "./auth";
import { EmpresaModel } from "./empresa";
import { PerfilModel } from "./perfil";

export interface UsuarioDto {
    nome: string;
    permissoes: Permissao[];
}

export interface UsuarioModel {
    id: string;
    email: string;
    nome: string;
    empresa?: EmpresaModel;
    perfilId: string;
    perfil: PerfilModel;
    ufLotacao: number;
    municipio: number;
}

export interface ListarUsuariosQueryParams {
    pagina: number;
    itemsPorPagina: number;
    empresa?: string;
    nome?: string;
    ufLotacao?: string;
    perfilId?: string;
    municipio?: string
}
  