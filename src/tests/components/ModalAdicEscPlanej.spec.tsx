import {fireEvent, render, screen} from "@testing-library/react";
import ModalAdicionarEscola from "../../components/GerenciarAcoesModal/AdicionarEscola";

describe('Modal adicionar Escola', () => {

    it("Deve renderizar o modal de Adicionar Escola", () => {
        let aberto = true;
        render(
            <div>
                {aberto && <ModalAdicionarEscola
                    onClose={() => { aberto = false; }}
                />}
            </div>
        );
        expect(screen.getByText("Adicionar Escola")).toBeInTheDocument();
        expect(screen.getByText("Cancelar")).toBeInTheDocument();
        expect(screen.getByText("Adicionar")).toBeInTheDocument();
    });

    it("Deve testar o filtro do modal", async () => {
        let aberto = true;
        render(
            <div>
                {aberto && <ModalAdicionarEscola
                    onClose={() => { aberto = false; }}
                />}
            </div>
        );
        const input = screen.getByTestId("Procurar escola");

        fireEvent.change(input, { target: { value: "123321"}});
        expect(input).toHaveValue("123321");
    });

    it("Deve testar sair da Modal", async () => {
        let aberto = true;
        render(
            <div>
                {aberto && <ModalAdicionarEscola
                    onClose={() => { aberto = false; }}
                />}
            </div>
        );

        expect(screen.getByText('Cancelar')).toBeInTheDocument();
        fireEvent.click(screen.getByText("Cancelar"));
        expect(aberto).toEqual(false);
    });

})