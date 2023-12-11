import {EscolasPlanejamentoTabela, PlanejamentoMacro} from "../../models/gerenciarAcoes";
import { PlanejamentoFiltrados } from "../../models/service";

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

export const escolaSelected: EscolasPlanejamentoTabela={
    ups: 12,
    nome: "Escola A",
    uf: "DF",
    quantidadeAlunos: 1000,
    custoLogistico: 2
}

export const fetchPlanejamentosResponse: PlanejamentoFiltrados = {
    
        "pagina": 1,
        "itemsPorPagina": 10000,
        "total": 8,
        "totalPaginas": 1,
        "items": [
            {
                "planejamentoMacroMensal": [
                    {
                        "mes": 3,
                        "ano": "2023",
                        "upsTotal": 2787,
                        "quantidadeEscolasTotal": 2,
                        "quantidadeAlunosTotal": 669,
                        "escolas": [
                            {
                                "id": "ec1107a4-4f85-43f5-ac8f-4b011ff2ffa9",
                                "ups": 1333,
                                "nome": "IEE MARECHAL RONDON",
                                "uf": "RO",
                                "quantidadeAlunos": 575,
                                "distanciaPolo": 318.82236091941206
                            },
                            {
                                "id": "d996c1e4-2d89-4dfc-bac2-034f82a5c1d5",
                                "ups": 1454,
                                "nome": "EM - ESCOLA MUNICIPAL ENGENHO NOVO",
                                "uf": "PE",
                                "quantidadeAlunos": 94,
                                "distanciaPolo": 20.403647776845823
                            }
                        ],
                        "detalhesPorUF": [
                            {
                                "uf": "RO",
                                "quantidadeEscolasTotal": 1
                            },
                            {
                                "uf": "PE",
                                "quantidadeEscolasTotal": 1
                            }
                        ]
                    },
                    {
                        "mes": 2,
                        "ano": "2023",
                        "upsTotal": 233,
                        "quantidadeEscolasTotal": 1,
                        "quantidadeAlunosTotal": 342,
                        "escolas": [
                            {
                                "id": "f4850523-537c-44ab-a7c7-a0e7c40c1aeb",
                                "ups": 233,
                                "nome": "EEB NORMELIO CUNHA",
                                "uf": "SC",
                                "quantidadeAlunos": 342,
                                "distanciaPolo": 188.47160437789148
                            }
                        ],
                        "detalhesPorUF": [
                            {
                                "uf": "SC",
                                "quantidadeEscolasTotal": 1
                            }
                        ]
                    }
                ],
                "id": "e54dc3c6-d3b4-4da8-a8eb-3744c7017bb6",
                "nome": "Planejamento Ca",
                "responsavel": "tester@gmail.com",
                "mesInicio": 2,
                "mesFim": 4,
                "anoInicio": "2023",
                "anoFim": "2024",
                "quantidadeAcoes": 4
            },
        ]
}