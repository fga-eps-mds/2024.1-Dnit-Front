import { MemoryRouter } from "react-router-dom";
import FatorForm from "../../components/FatorForm";
import server from "../mock/servicosAPI";
import { render } from "@testing-library/react";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Testes para componente FatorForm", () => {
    it("Deve renderizar o componente", () => {
        const screen = render(
            <MemoryRouter>
                <FatorForm fator={undefined} onSaveFator={(f) => {}}></FatorForm>
            </MemoryRouter>
        )

        expect(screen.getByText("Teste")).toBeInTheDocument();
        expect(screen.getByText("Cancelar")).toBeInTheDocument();
        expect(screen.getByText("Salvar")).toBeInTheDocument();
    })
}) 