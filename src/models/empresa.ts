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