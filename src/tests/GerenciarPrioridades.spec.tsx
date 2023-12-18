/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import server from "./mock/servicosAPI";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../provider/Autenticacao";
import GerenciarPrioridades from "../pages/gerencia/GerenciarPrioridades";
import { autenticar } from "./mock/autenticacao";
import { Permissao } from "../models/auth";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function setup() {
    return render(
        <MemoryRouter>
            <AuthProvider>
                <GerenciarPrioridades />
            </AuthProvider>
        </MemoryRouter>
    )
}

describe("Gerenciar Prioridades", () => {
    it("Deve retornar a tela inicial se não tiver permissão de visualizar prioridades", async() => {
        const screen = setup();
    })

    it("Deve listar fatores", async () => {
        autenticar(Permissao.PrioridadesVisualizar);
        
        const screen = setup();
        
        await waitFor(() => expect(screen.getByTestId("inputFatorUPS")).toBeInTheDocument);

    })

    it("Deve editar peso do custo logístico", async () => {
        autenticar(Permissao.PrioridadesVisualizar, Permissao.PrioridadesEditar);

        const screen = setup();
        
        await waitFor(() => expect(screen.getByTestId("pesoCusto Logistico")).toBeInTheDocument);
        const botaoSalvar = screen.getByTestId("botaoSalvarCusto Logistico");
        act(() => {
            botaoSalvar.click();
        })
    })

    it("Deve alterar parâmetro do custo logístico", async () => {
        autenticar(Permissao.PrioridadesVisualizar, Permissao.PrioridadesEditar);

        const screen = setup();
        
        await waitFor(() => expect(screen.getByTestId("raioParam1")).toBeInTheDocument);
        await waitFor(() => expect(screen.getByTestId("botaoSalvarCusto Logistico")).toBeInTheDocument);
        await waitFor(() => expect(screen.getByTestId("valorParam1")).toBeInTheDocument);
        
        const raioInput = screen.getByTestId("raioParam1");
        const valorInput = screen.getByTestId("valorParam1");
        const botaoSalvar = screen.getByTestId("botaoSalvarCusto Logistico");

        act(() => {
            fireEvent.change(raioInput, {
                target: {value: "5"}
            })
            botaoSalvar.click();
        })

        act(() => {
            fireEvent.change(valorInput, {
                target: {value: "66"}
            })
            botaoSalvar.click();
        })
    })

    it("Deve editar fator", async () => {
        autenticar(Permissao.PrioridadesVisualizar, Permissao.PrioridadesEditar);

        const screen = setup();
        
        await waitFor(() => expect(screen.getByTestId("inputFatorFator B")).toBeInTheDocument);
        await waitFor(() => expect(screen.getByTestId("botaoSalvarFator B")).toBeInTheDocument);
        const input = screen.getByTestId("inputFatorFator B");
        const botaoSalvar = screen.getByTestId("botaoSalvarFator B");

        act(() => {
            fireEvent.change(input, {
                target: {value: "Fator Editado"}
            })
            botaoSalvar.click();
        })
    })

    it("Não deve salvar fator com nome vazio", async () => {
        autenticar(Permissao.PrioridadesVisualizar, Permissao.PrioridadesEditar);

        const screen = setup();
        
        await waitFor(() => expect(screen.getByTestId("inputFatorFator A")).toBeInTheDocument);
        const input = screen.getByTestId("inputFatorFator A");
        const botaoSalvar = screen.getByTestId("botaoSalvarFator A");

        act(() => {
            fireEvent.change(input, {
                target: {value: ""}
            })
            botaoSalvar.click();
        })
    })

    it("Deve excluir fator", async () => {
        autenticar(Permissao.PrioridadesVisualizar, Permissao.PrioridadesExcluir);

        const screen = setup();
        
        await waitFor(() => expect(screen.getByTestId("botaoExcluirFator B")).toBeInTheDocument);
        const botaoExcluir = screen.getByTestId("botaoExcluirFator B");

        act(() => {
            botaoExcluir.click();
        })
    })

    it("Deve criar novo fator", async () => {
        autenticar(Permissao.PrioridadesVisualizar, Permissao.PrioridadesEditar);

        const screen = setup();
        
        await waitFor(() => expect(screen.getByTestId("inputFatorFator A")).toBeInTheDocument);
        const input = screen.getByTestId("inputFatorFator A");
        const botaoSalvar = screen.getByTestId("botaoSalvarFator A");
        act(() => {
            fireEvent.change(input, {
                target: {value: "Novo Fator"}
            })
            botaoSalvar.click();
        })
    })

    it("Deve clicar em botão Novo Fator", async () => {
        autenticar(Permissao.PrioridadesVisualizar, Permissao.PrioridadesEditar);

        const screen = setup();
        
        await waitFor(() => expect(screen.getByTestId("botaoAdicionarFator")).toBeInTheDocument);
        const botaoAdicionar = screen.getByTestId("botaoAdicionarFator");
        act(() => {
            botaoAdicionar.click();
        })
    })

    it("Deve selecionar propriedade de condição", async () => {
        autenticar(Permissao.PrioridadesVisualizar, Permissao.PrioridadesEditar);

        const screen = setup();

        await waitFor(() => expect(screen.getAllByTestId("undefinedcustomSelect")).toBeInTheDocument);
        const propriedadeSelect = screen.getAllByTestId("undefinedcustomSelect")[0];
        
        const numeroDePropriedades = 6;

        for (let i = 0; i < numeroDePropriedades; i++) {
            act(() => {
                propriedadeSelect.click();
            });
            const propriedade = screen.getByTestId(`undefined${i}`);
            await waitFor(() => expect(propriedade).toBeInTheDocument);

            act(() => {
                propriedade.click();
            });
        }
    })

    it("Deve selecionar um operador de condição", async () => {
        autenticar(Permissao.PrioridadesVisualizar, Permissao.PrioridadesEditar);

        const screen = setup();

        await waitFor(() => expect(screen.getAllByTestId("undefinedcustomSelect")).toBeInTheDocument);
        const operadorSelect = screen.getAllByTestId("undefinedcustomSelect")[1];
        
        
        act(() => {
            operadorSelect.click();
        });

        const operador = screen.getByTestId("undefined0");
        await waitFor(() => expect(operador).toBeInTheDocument);

        act(() => {
            operador.click();
        });
    })

    it("Deve selecionar um valor de condição", async () => {
        autenticar(Permissao.PrioridadesVisualizar, Permissao.PrioridadesEditar);

        const screen = setup();

        await waitFor(() => expect(screen.getAllByTestId("undefinedcustomSelect")).toBeInTheDocument);
        const valorMultiSelect = screen.getAllByTestId("undefinedcustomSelect")[2];
        
        
        act(() => {
            valorMultiSelect.click();
        });
        
        await waitFor(() => expect(screen.getByTestId("cbs0")).toBeInTheDocument);
        const valor = screen.getByTestId("cbs0");

        act(() => {
            valor.click();
        });
    })
})