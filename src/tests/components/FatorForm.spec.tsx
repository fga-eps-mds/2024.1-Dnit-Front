import { MemoryRouter } from "react-router-dom";
import FatorForm from "../../components/FatorForm";
import server from "../mock/servicosAPI";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { fatoresPriorizacao } from "../stub/priorizacaoModelos";
import { Permissao } from "../../models/auth";
import { autenticar } from "../mock/autenticacao";
import { AuthProvider } from "../../provider/Autenticacao";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe("Testes para componente FatorForm", () => {
  it("Deve renderizar o componente", () => {
      const screen = render(
          <MemoryRouter>
              <FatorForm fator={fatoresPriorizacao[1]} onSaveFator={(f) => {}}></FatorForm>
          </MemoryRouter>
      )
  })

  it("Deve remover uma condição", async() => {
    autenticar(Permissao.PrioridadesVisualizar, Permissao.PrioridadesEditar);

    const screen = render(
      <MemoryRouter>
        <AuthProvider>
          <FatorForm fator={fatoresPriorizacao[2]} onSaveFator={(f) => {}}></FatorForm>
        </AuthProvider>
      </MemoryRouter>
    )
    
    const botaoRemover = screen.getByTestId("remover-condicao-0");
    await waitFor(() => expect(botaoRemover).toBeInTheDocument);
    
    act(() => {
      botaoRemover.click();
    })
  })

  it("Deve adicionar uma condição", async() => {
    autenticar(Permissao.PrioridadesVisualizar, Permissao.PrioridadesEditar);

    const screen = render(
      <MemoryRouter>
        <AuthProvider>
          <FatorForm fator={fatoresPriorizacao[2]} onSaveFator={(f) => {}}></FatorForm>
        </AuthProvider>
      </MemoryRouter>
      
    )
    
    const botaoAdicionar = screen.getByTestId("adicionar-condicao");
    await waitFor(() => expect(botaoAdicionar).toBeInTheDocument);
    
    act(() => {
      botaoAdicionar.click();
    })

    await waitFor(() => expect(screen.getByTestId("remover-condicao-1")).toBeInTheDocument);
  })

  it("Deve clicar no switch de ativo", async() => {
    autenticar(Permissao.PrioridadesVisualizar, Permissao.PrioridadesEditar);

    const screen = render(
      <MemoryRouter>
        <AuthProvider>
          <FatorForm fator={fatoresPriorizacao[0]} onSaveFator={(f) => {}}></FatorForm>
        </AuthProvider>
      </MemoryRouter>
    )
    
    const ativo = screen.getByTestId("ativo-UPS");
    await waitFor(expect(ativo).toBeInTheDocument);

    act(() => {
      ativo.click();
    })

    
  })

  it("Deve limitar o peso entre 0 e 100", async() => {
    autenticar(Permissao.PrioridadesVisualizar, Permissao.PrioridadesEditar);

    const screen = render(
      <MemoryRouter>
        <AuthProvider>
          <FatorForm fator={fatoresPriorizacao[2]} onSaveFator={(f) => {}}></FatorForm>
        </AuthProvider>
      </MemoryRouter>
      
    )
    
    const inputPeso = screen.getByTestId("pesoFator A");
    await waitFor(() => expect(inputPeso).toBeInTheDocument);
    
    act(() => {
      fireEvent.change(inputPeso, {
        target: {value: "-66"}
      })
      expect(inputPeso).toHaveDisplayValue("0");
    })

    act(() => {
      fireEvent.change(inputPeso, {
        target: {value: "122"}
      })
      expect(inputPeso).toHaveDisplayValue("100");
    })

    act(() => {
      fireEvent.change(inputPeso, {
        target: {value: "34"}
      })
      expect(inputPeso).toHaveDisplayValue("34");
    })
  })

}) 
