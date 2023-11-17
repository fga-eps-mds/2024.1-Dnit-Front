export interface UFs {
    nome: string;
    id: number;
    sigla: string;
}

export interface EmpresaModel {
    cnpj: string;
    razaoSocial: string;
    uFs: UFs[];
}

export interface ListaPaginada<T> {
    pagina: number;
    itemsPorPagina: number;
    total: number;
    totalPaginas: number;
    items: T[];
}