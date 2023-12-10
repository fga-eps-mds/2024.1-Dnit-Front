import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {AuthProvider} from "../../provider/Autenticacao";
import DeletarPlanejamentoDialog from "../../components/DeletarPlanejamentoDialog";
import {PlanejamentoMacro} from "../../models/gerenciarAcoes";

const planejamento1: PlanejamentoMacro = {
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

describe('Tabela de Gerenciar Acoes', () => {

    it("Deve renderizar a pagina de Gerenciar Acoes", async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <DeletarPlanejamentoDialog closeDialog={() => {}} planejamento={planejamento1}/>
                </AuthProvider>
            </MemoryRouter>
        );

        expect(screen.getByText("Tem certeza que deseja excluir este planejamento?")).toBeInTheDocument();
        expect(screen.getByText("Cancelar")).toBeInTheDocument();
        expect(screen.getByText("Confirmar")).toBeInTheDocument();
    });

    it('deve fechar ao clicar no overlay', async () => {
        render(
            <MemoryRouter>
                <DeletarPlanejamentoDialog closeDialog={() => {}} planejamento={planejamento1} />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Tem certeza que deseja excluir este planejamento?')).toBeInTheDocument();
        });

        const overlay = screen.getByTestId('overlay');
        fireEvent.click(overlay);
    });

})
