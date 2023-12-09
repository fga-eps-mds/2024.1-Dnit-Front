export interface CustoLogisticoModel {
    custo: number;
    raioMin: number;
    raioMax: number | null;
    valor: number;
}

export interface Condicao {
    id?: string;
    propriedade: string;
    operador: number;
    valor: string;
    fatorPriorizacaoId?: string;
}

export interface FatorModel {
    id?: string;
    nome: string;
    peso: number;
    ativo: boolean;
    primario: boolean;
    fatorCondicoes: Condicao[];
}

export interface Propriedade {
    id: string;
    rotulo: string;
}