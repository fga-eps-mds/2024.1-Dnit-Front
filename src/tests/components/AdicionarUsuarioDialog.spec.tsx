/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { render, waitFor, act, fireEvent } from "@testing-library/react";
// import { Permissao } from "../models/auth";
// import { autenticar } from "./mock/autenticacao";
import server from "../mock/servicosAPI";
// import { MemoryRouter, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "../provider/Autenticacao";
// import GerenciarUsuariosEmpresa from "../pages/gerencia/GerenciarUsuariosEmpresa";
// import { empresas } from "./stub/empresaModelos";
// import { usuarios } from "./stub/usuarioModelos";
import MultiSelect from "../../components/MultiSelect";
import AdicionarUsuarioDialog from "../../components/AdicionarUsuarioDialog";
import { empresas } from "../stub/empresaModelos";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Testes para o componente AdicionarUsuarioDialog", () => {

    it("Deve abrir o componente", () => {
        const screen = render(
            <AdicionarUsuarioDialog 
                closeDialog={() => {}}
                cnpj={empresas[0].cnpj}
            />
        )

        expect(screen.getByText("Usuários")).toBeInTheDocument();
    })

})