import {PlanejamentoMacro} from "../../models/gerenciarAcoes";

export const planejamento: PlanejamentoMacro = {
    id: "1",
    nome: "Planejamento 1",
    responsavel: "Fulano",
    mesInicio: 1,
    mesFim: 6,
    anoInicio: "2023",
    anoFim: "2023",
    quantidadeAcoes: 3,
    planejamentoMacroMensal: [
        {
            mes: 1,
            ano: "2023",
            upsTotal: 10,
            quantidadeEscolasTotal: 5,
            quantidadeAlunosTotal: 500,
            escolas: [
                {
                    id: "1",
                    ups: 1,
                    nome: "Escola 1",
                    uf: "SP",
                    quantidadeAlunos: 100,
                    distanciaPolo: 20,
                },
            ],
            detalhesPorUF: [
                {
                    uf: "SP",
                    quantidadeEscolasTotal: 3,
                },
            ],
        },
    ],
};

export const planejamento2: PlanejamentoMacro = {
    id: "2",
    nome: "Planejamento 1",
    responsavel: "Fulano",
    mesInicio: 1,
    mesFim: 6,
    anoInicio: "2023",
    anoFim: "2023",
    quantidadeAcoes: 3,
    planejamentoMacroMensal: [
        {
            mes: 1,
            ano: "2023",
            upsTotal: 10,
            quantidadeEscolasTotal: 5,
            quantidadeAlunosTotal: 500,
            escolas: [
                {
                    id: "1",
                    ups: 1,
                    nome: "Escola 1",
                    uf: "SP",
                    quantidadeAlunos: 100,
                    distanciaPolo: 20,
                },
            ],
            detalhesPorUF: [
                {
                    uf: "SP",
                    quantidadeEscolasTotal: 3,
                },
            ],
        },
    ],
};