import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { AuthProvider } from "../provider/Autenticacao";
import localStorageMock from "./mock/memoriaLocal";
import server from "./mock/servicosAPI";
import { Permissao } from "../models/auth";
import { autenticar } from "./mock/autenticacao";
import { wait } from "@testing-library/user-event/dist/utils";
import Modal from "../components/Modal";

window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  });
  

describe('TabelaRanque', () => {
    // test('Listar escolas em ranque', async () => {
    //     render(
    //         <MemoryRouter initialEntries={ ['/rota']} >
    //             <AuthProvider>
    //                 <App />
    //             </AuthProvider>
    //         </MemoryRouter>
    //     );

    //     await waitFor(() => {
    //         // table-row-edit-${id}`
    //         const linhas = screen.getAllByTestId("");
    //         expect(linhas).toHaveLength(4)
    //     })
    // })

    // test('Listar escolas em ranque', async () => {
    //     render(
    //         <MemoryRouter initialEntries={ ['/rota']} >
    //             <AuthProvider>
    //                 <App />
    //             </AuthProvider>
    //         </MemoryRouter>
    //     );

    //     // click('olhinho')
        
    //     const tituloModal = screen.getByText('Detalhes da Escola')
    //     expect(tituloModal).toBeInTheDocument()
    // })

    test("Deve renderizar o modal", async () => {
        render(
            <Modal className="modal" >
                <h4 className="text-center mt-2">{""}</h4>
                <div>
                    <p><strong>Posição:</strong> {""}</p>
                    <p><strong>Pontuação Total:</strong> {""}</p>
                    <p><strong>Código:</strong> {""}</p>
                </div>
                <button>
                    Sair
                </button>
            </Modal>
        )
        expect(screen.getByText("Posição:")).toBeInTheDocument;
        expect(screen.getByText("Pontuação Total:")).toBeInTheDocument;
        expect(screen.getByText("Código:")).toBeInTheDocument;
        expect(screen.getByText("Sair")).toBeInTheDocument;
    })

})
