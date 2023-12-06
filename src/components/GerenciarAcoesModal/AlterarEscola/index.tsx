import React, { useState, useEffect } from 'react';
import Modal from "../../Modal";
import ReactLoading from "react-loading";

interface ModalProps {
    //escolaId: string
    onClose: () => void;
    //onSalvar: () => void;
}

//TODO VERIFICAR QUAIS OUTROS PARAMETROS VAI TER
interface Escola {
    id: number
    nome: string;
    uf: string;
    qtdAlunos: number;
}

const dados: Escola = { id: 1, nome: "Sigma", uf: "SP", qtdAlunos: 500};

const ModalAlterarEscola: React.FC<ModalProps> = ({ onClose }) => {
    
    const [escola, setEscola] = useState<Escola | null>(dados);

    //TODO A FUNCAO FETCHESCOLA PELO ID
    // useEffect(() => {
    //     fetchEscolas(escolaId)
    //         .then((escola) => {
    //                 setEscola(escola);
    //             }
    //         )
    // }, []);

    if(!escola){
        return (
            <Modal className="modal-title" closeModal={() => onClose()}>
                <h4 className="text-center mt-2">Carregando Escola...</h4>
                <div className="d-flex justify-content-center m-4">
                    <ReactLoading type="spinningBubbles" color="#000000" />
                </div>
                <span></span>
            </Modal>
        );
    }

    return (
        <Modal className="default escola-ranque-modal" closeModal={() => onClose()}>
            <div className="d-flex flex-column">
                <div>
                    <h4 className="text-center mt-1">Alterar Escola</h4>
                </div>
                
                <div className="d-flex w-100 justify-content-end mb-2">
                    <button className="br-button secondary mr-3" type="button" onClick={() => onClose()}>
                        Cancelar
                    </button>
                    <button className="br-button primary mr-3" type="button" disabled>
                        Salvar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalAlterarEscola;