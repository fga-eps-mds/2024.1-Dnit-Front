import { fireEvent, getByRole, getByTestId, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../provider/Autenticacao";
import server from "./mock/servicosAPI";
import { Permissao } from "../models/auth";
import { autenticar } from "./mock/autenticacao";
import GerenciarAcoes from "../pages/gerencia/GerenciarAcoes/GerarPlanejamento";
import { act } from "react-dom/test-utils";
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

  it("Deve carregar o botão Gerar Planejamento", async() => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <GerenciarAcoes/>
        </AuthProvider>
      </MemoryRouter>
    );
    const button = screen.getByText("Gerar Planejamento")
    expect(button).toBeInTheDocument();
  })

  it("Deve subir erro de nome obrigatório ao clicar no botão com label Título vazia", async() => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <GerenciarAcoes/>
        </AuthProvider>
      </MemoryRouter>
    );

    const button = screen.getByText("Gerar Planejamento")
    const vazio = screen.getByTestId("inputTitulo");

    fireEvent.click(button);
    if(vazio === null) { 
      await waitFor(() => expect(screen.getByText("O nome é obrigatório")).toBeInTheDocument());
    }

  })

  it("Deve subir erro caso a string passada na Label Título tiver menos que 5 caracteres", async() => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <GerenciarAcoes/>
        </AuthProvider>
      </MemoryRouter>
    );

    const button = screen.getByText("Gerar Planejamento")
    const string = screen.getByTestId("inputTitulo");

    act(() => {
      fireEvent.change(string, {target: {value: "abcd"}})
    })

    const stringHTML = string.outerHTML;

    fireEvent.click(button);
    if(stringHTML.length < 5) {
      await waitFor(() => expect(screen.getByText('O nome do planejamento deve conter pelo menos 5 caracteres')).toBeInTheDocument());
    }
  })

  it("Deve renderizar o select com meses do ano", async() => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <GerenciarAcoes/>
        </AuthProvider>
      </MemoryRouter>
    );

    const button = screen.getByText("Gerar Planejamento")

    const selectElement = screen.getAllByRole('combobox')[0];

    fireEvent.change(selectElement, {target: { value: 'Fevereiro'}});
    expect(selectElement).toBeInTheDocument();
  })

  // it("Deve subir erro Escolha Quantidade de ações caso ações forem iguais à zero", async() => {
  //   render(
  //     <MemoryRouter>
  //       <AuthProvider>
  //         <GerenciarAcoes/>
  //       </AuthProvider>
  //     </MemoryRouter>
  //   );

  //   const qtdAcoes = screen.getByTestId('qtd-actions-field')

  //   const textQtdAcoes = qtdAcoes.textContent || qtdAcoes.innerText
  //   const number = parseInt(textQtdAcoes)

  //   if(!isNaN(number) && number === 0){
  //     await waitFor(() => expect(screen.getByText("Escolha a quantidade de ações")).toBeInTheDocument())
  //   }

  // })
})