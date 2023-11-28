import { EscolaData, EtapasDeEnsinoData, MunicipioData, RedeData, SituacaoData, Superintendencia, UnidadeFederativaData } from "./service";

export interface ListaPaginada<T> {
    pagina: number;
    itemsPorPagina: number;
    total: number;
    totalPaginas: number;
    items: T[];
}

export interface SolicitacoesData{
    id: string;
    escola?: EscolaData;
    escolaId: string;
    escolaCadastrada: boolean;
    nomeSolicitante: string;
    //vinculo: string;
    email: string;
    telefone: string;
    observacoes?: string;
    dataRealizadaUtc: string;

}