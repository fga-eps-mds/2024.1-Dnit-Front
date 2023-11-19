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

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const testItems = [
    {
        id: "1",
        rotulo: "a"
    },
    {
        id: "2",
        rotulo: "b"
    },
    {
        id: "3",
        rotulo: "c"
    },
    {
        id: "4",
        rotulo: "d"
    }
]

describe("Testes para o componente MultiSelect", () => {
    
    it("Deve renderizar o componente", () => {
        const screen = render(
            <MultiSelect 
                items={testItems}
                onChange={(_id) => {}}
                value={[testItems[0].id, testItems[1].id]}
                label="MultiSelect"
                // definePlaceholder=""
                // labelStyle={{display: "inline", fontSize: "14px", marginLeft: "0px !important"}}
            />
        )

        expect(screen.getByText("MultiSelect")).toBeInTheDocument();
    })

    it("Deve renderizar o componente com a opção todos", () => {
        const screen = render(
            <MultiSelect 
                items={testItems}
                onChange={(_id) => {}}
                value={[testItems[0].id, testItems[1].id]}
                label="MultiSelect"
                filtrarTodos={true}
                // definePlaceholder=""
                // labelStyle={{display: "inline", fontSize: "14px", marginLeft: "0px !important"}}
            />
        )

        expect(screen.getByText("MultiSelect")).toBeInTheDocument();
    })

    it("Deve abrir o dropdown", () => {
        const screen = render(
            <MultiSelect 
                items={testItems}
                onChange={(_id) => {}}
                value={[testItems[0].id, testItems[1].id]}
                label="MultiSelect"
                // definePlaceholder=""
                // labelStyle={{display: "inline", fontSize: "14px", marginLeft: "0px !important"}}
            />
        )

        act(() => {
            screen.getByTestId("MultiSelectcustomSelect").click()
            screen.getByTestId("MultiSelectcustomSelect").click()
        })
    })

    it("Deve abrir o dropdown e clicar em algum item (todos habilitado)", async () => {
        const screen = render(
            <MultiSelect 
                items={testItems}
                onChange={(_id) => {}}
                value={[testItems[0].id, testItems[1].id]}
                label="MultiSelect"
                filtrarTodos={true}
                // definePlaceholder=""
                // labelStyle={{display: "inline", fontSize: "14px", marginLeft: "0px !important"}}
            />
        )

        act(() => {
            screen.getByTestId("MultiSelectcustomSelect").click()
        })

        const item = screen.getByTestId("cbs2")
        await waitFor(expect(item).toBeInTheDocument)
        act(() => {
            item.click()
        })
    })

    it("Deve abrir o dropdown e clicar em algum item (todos não habilitado)", async () => {
        const screen = render(
            <MultiSelect 
                items={testItems}
                onChange={(_id) => {}}
                value={[]}
                label="MultiSelect"
                // filtrarTodos={true}
                // definePlaceholder=""
                // labelStyle={{display: "inline", fontSize: "14px", marginLeft: "0px !important"}}
            />
        )

        act(() => {
            screen.getByTestId("MultiSelectcustomSelect").click()
        })

        const item = screen.getByTestId("cbs2")
        await waitFor(expect(item).toBeInTheDocument)
        act(() => {
            item.click()
        })
    })

    it("Deve abrir o dropdown e clicar em selecionar tudo", async () => {
        const screen = render(
            <MultiSelect 
                items={testItems}
                onChange={(_id) => {}}
                value={[testItems[0].id, testItems[1].id]}
                label="MultiSelect"
                filtrarTodos={true}
                // definePlaceholder=""
                // labelStyle={{display: "inline", fontSize: "14px", marginLeft: "0px !important"}}
            />
        )

        act(() => {
            screen.getByTestId("MultiSelectcustomSelect").click()
        })

        const item = screen.getByTestId("cbs0")
        await waitFor(expect(item).toBeInTheDocument)
        act(() => {
            item.click()
        })
    })
})