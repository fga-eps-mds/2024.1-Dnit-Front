import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import ModalAlterarEscola from "../../components/GerenciarAcoesModal/AlterarEscola";

describe('Modal alterar Escola', () => {

    it("Deve renderizar o modal de Alterar Escola", () => {
        let aberto = true;
        render(
            <div>
                {aberto && <ModalAlterarEscola
                    onClose={() => { aberto = false; }}
                />}
            </div>
        );
        expect(screen.getByText("Indisponível...")).toBeInTheDocument();
    });
    
    
    
})