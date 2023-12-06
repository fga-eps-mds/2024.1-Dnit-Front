import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../provider/Autenticacao";
import server from "./mock/servicosAPI";
import { Permissao } from "../models/auth";
import { autenticar } from "./mock/autenticacao";
import GerenciarAcoes from "../pages/gerencia/GerenciarAcoes/GerarPlanejamento";
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Criar planejamento", () => {
  it("Deve carregar a página de Criar Planejamento", async() => {
      autenticar(Permissao.UsuarioEditar)
      render(
        <MemoryRouter>
          <AuthProvider>
            <GerenciarAcoes/>
          </AuthProvider>
        </MemoryRouter>
      );
      
      expect(screen.getByText("Título")).toBeInTheDocument();
      expect(screen.getByText("Mês inicial")).toBeInTheDocument();
      expect(screen.getByText("Mês final")).toBeInTheDocument();
      expect(screen.getByText("Quantidade de Ações")).toBeInTheDocument();
  });
})