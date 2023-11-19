/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { render, waitFor, act, fireEvent } from "@testing-library/react";
import { Permissao } from "../models/auth";
import { autenticar } from "./mock/autenticacao";
import server from "./mock/servicosAPI";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../provider/Autenticacao";
import GerenciarUsuariosEmpresa from "../pages/gerencia/GerenciarUsuariosEmpresa";
import { empresas } from "./stub/empresaModelos";
import { usuarios } from "./stub/usuarioModelos";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function setup() {
    return render(
        <MemoryRouter initialEntries={[`/gerenciarUsuariosEmpresa/${empresas[0].cnpj}`]}>
            <AuthProvider>
                <Routes>
                    <Route 
                        path="/gerenciarUsuariosEmpresa/:cnpj" 
                        element={<GerenciarUsuariosEmpresa />} />
                </Routes>
            </AuthProvider>
        </MemoryRouter>
    )
}

describe("Gerenciar usuários de empresa", () => {

    it("Deve carregar os usuários", async () => {
        autenticar(
            Permissao.PerfilVisualizar, 
            Permissao.EmpresaVisualizar, 
            Permissao.UsuarioVisualizar,
            Permissao.EmpresaGerenciarUsuarios,
            Permissao.EmpresaVisualizarUsuarios
        )

        const screen = setup()

        await waitFor(() => expect(screen.getByText(usuarios[0].nome)).toBeInTheDocument);

    })
})