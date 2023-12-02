import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../provider/Autenticacao";
import server from "./mock/servicosAPI";
import { Permissao } from "../models/auth";
import { autenticar } from "./mock/autenticacao";
import GerenciarAcoes from "../pages/gerencia/GerenciarAcoes/Home";

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

        expect(screen.getByTestId("inputNome")).toHaveValue("");
        expect(screen.getByTestId("inputResponsavel")).toHaveValue("");
        expect(screen.getByLabelText("Período:")).toHaveValue("");
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

        fireEvent.change(screen.getByTestId("inputNome"), { target: { value: "PLANEJAMENTO CENTRO OESTE"}});
        expect(screen.getByTestId("inputNome")).toHaveValue("PLANEJAMENTO CENTRO OESTE");
        await waitFor(() => expect(screen.getByText('PLANEJAMENTO CENTRO OESTE')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('PLANEJAMENTO CENTRO NORTE')).not.toBeInTheDocument());

        fireEvent.change(screen.getByTestId("inputResponsavel"), { target: { value: "Wellington Guimarães"}});
        expect(screen.getByTestId("inputResponsavel")).toHaveValue("Wellington Guimarães");
        await waitFor(() => expect(screen.getByText('Wellington Guimarães')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Julieta Vieira')).not.toBeInTheDocument());
    })

    it("Deve renderizar a pagina de Gerenciar Acoes (BOTAO)", async () => {
        autenticar(Permissao.UsuarioEditar)
        render(
            <MemoryRouter>
                <AuthProvider>
                    <GerenciarAcoes/>
                </AuthProvider>
            </MemoryRouter>
        );
        
        const novoPlanejamentoButton = screen.getByText("Criar Novo Planejamento");
        expect(novoPlanejamentoButton).toBeInTheDocument();
        
        fireEvent.click(novoPlanejamentoButton);
        expect(screen.getByText("Gerar Planejamento")).toBeInTheDocument(); 
    });
    
    
})