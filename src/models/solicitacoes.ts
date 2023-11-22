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
    escola: EscolaData;
    solicitante: string;
    vinculo: string;
    e_mail: string;
    tefelone: string;
    observações?: string;

}