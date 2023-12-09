import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../provider/Autenticacao";
import server from "./mock/servicosAPI";
import { Permissao } from "../models/auth";
import { autenticar } from "./mock/autenticacao";
import GerenciarAcoes from "../pages/gerencia/GerenciarAcoes/Home";
import ModalAdicionarEscola from "../components/GerenciarAcoesModal/AdicionarEscola";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Tabela de Gerenciar Acoes', () => {

    it("Deve renderizar a pagina de Gerenciar Acoes", async () => {
        autenticar(Permissao.UsuarioEditar)
        render(
            <MemoryRouter>
                <AuthProvider>
                    <GerenciarAcoes/>
                </AuthProvider>
            </MemoryRouter>
        );

        expect(screen.getByText("Nome:")).toBeInTheDocument();
        expect(screen.getByText("Período:")).toBeInTheDocument();
        expect(screen.getByText("Responsável:")).toBeInTheDocument();
    });

    it("Deve filtrar as Acoes", async () => {
        autenticar(Permissao.RanqueVisualizar);

        render(
            <MemoryRouter>
                <AuthProvider>
                    <GerenciarAcoes />
                </AuthProvider>
            </MemoryRouter>
        );
        const inputs = screen.getAllByTestId("filtroNome");

        fireEvent.change(inputs[0], { target: { value: "PLANEJAMENTO CENTRO OESTE"}});
        expect(inputs[0]).toHaveValue("PLANEJAMENTO CENTRO OESTE");

        fireEvent.change(inputs[1], { target: { value: "Wellington Guimarães"}});
        expect(inputs[1]).toHaveValue("Wellington Guimarães");

    });

    it("Deve renderizar a pagina de Gerenciar Acoes (BOTAO)", async () => {
        autenticar(Permissao.UsuarioEditar)
        render(
            <MemoryRouter>
                <AuthProvider>
                    <GerenciarAcoes/>
                </AuthProvider>
            </MemoryRouter>
        );

        const novoPlanejamentoButton = await screen.findByTestId("botaoPossuiPermissao");
        expect(novoPlanejamentoButton).toBeInTheDocument();

    });


    it("Deve abrir o modal de deletar", async () => {
        autenticar(Permissao.UsuarioEditar);

        render(
            <MemoryRouter>
                <AuthProvider>
                    <GerenciarAcoes />
                </AuthProvider>
            </MemoryRouter>
        );
        fireEvent.click(screen.getByTestId('table-row-delete-0'));
        expect(screen.getByText('Tem certeza que deseja excluir este planejamento?')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Cancelar'));
        await waitFor(() => expect(screen.queryByText('Tem certeza que deseja excluir este planejamento?')).toBeNull());
    })

    it("Deve renderizar a tabela", async () => {

        autenticar(Permissao.UsuarioEditar);
        render(
            <MemoryRouter>
                <AuthProvider>
                    <GerenciarAcoes />
                </AuthProvider>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Quantidade de Ações")).toBeInTheDocument();
        });
    })

    it("Deve verificar se o filtro ta vazio", async () => {
        autenticar(Permissao.RanqueVisualizar);

        render(
            <MemoryRouter>
                <AuthProvider>
                    <GerenciarAcoes />
                </AuthProvider>
            </MemoryRouter>
        );
        const inputs = screen.getAllByTestId("filtroNome");
        expect(inputs[0]).toHaveValue("");
        expect(inputs[1]).toHaveValue("");
    });


})

describe('Modal adicionar Escola', () => {
    it("Deve renderizar o modal de Adicionar Escola", () => {
        let aberto = true;
        render(
            <div>
                {aberto && <ModalAdicionarEscola
                    onClose={() => { aberto = false; }}
                />}
            </div>
        );
        expect(screen.getByText("Adicionar Escola")).toBeInTheDocument();
        expect(screen.getByText("Cancelar")).toBeInTheDocument();
        expect(screen.getByText("Adicionar")).toBeInTheDocument();
    });

    it("Deve testar o filtro do modal", async () => {
        let aberto = true;
        render(
            <div>
                {aberto && <ModalAdicionarEscola
                    onClose={() => { aberto = false; }}
                />}
            </div>
        );
        const input = screen.getByTestId("Procurar escola");

        fireEvent.change(input, { target: { value: "Sigma"}});
        expect(input).toHaveValue("Sigma");
    });

    it("Deve testar sair da Modal", async () => {
        let aberto = true;
        render(
            <div>
                {aberto && <ModalAdicionarEscola
                    onClose={() => { aberto = false; }}
                />}
            </div>
        );

        expect(screen.getByText('Cancelar')).toBeInTheDocument();
        fireEvent.click(screen.getByText("Cancelar"));
        expect(aberto).toEqual(false);
    });

})