/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import { render } from "@testing-library/react";
import server from "./mock/servicosAPI";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../provider/Autenticacao";
import GerenciarPrioridades from "../pages/gerencia/GerenciarPrioridades";

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
    it("Deve renderizar a página de gerenciar prioridades", async() => {
        const screen = setup();
    })
})