import { EmpresaModel } from "../../models/empresa";

export const empresas: EmpresaModel[] = [
    {
        cnpj: "01255734000184",
        razaoSocial: "Empresa A",
        uFs: [
            {
                id: 27,
                nome: "Distrito Federal",
                sigla: "DF"
            }
        ]
    },
    {
        cnpj: "32296737000190",
        razaoSocial: "Empresa B",
        uFs: [
            {
                id: 27,
                nome: "Distrito Federal",
                sigla: "DF"
            },
            {
                id: 24,
                nome: "São Paulo",
                sigla: "SP"
            }
        ]
    }
]