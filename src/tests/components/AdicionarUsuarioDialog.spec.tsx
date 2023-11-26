/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { render, waitFor, act, fireEvent } from "@testing-library/react";
import server from "../mock/servicosAPI";
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
                nomeEmpresa={empresas[0].razaoSocial}
                cnpj={empresas[0].cnpj}
            />
        )

        expect(screen.getByText("Usuários")).toBeInTheDocument();
    })

})