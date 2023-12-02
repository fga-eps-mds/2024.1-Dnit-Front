import React, { ReactNode, useState, useEffect } from 'react';
import Modal from "../../Modal";
import ReactLoading from "react-loading";
import InputFilter from "../../InputFilter";

interface ModalProps {
    onClose: () => void;
    onAdicionar: () => void;
}

interface Escola {
    nome: string;
    uf: string;
    qtdAlunos: number;
}

const dados: Escola[] = [
    { nome: "Escola A", uf: "SP", qtdAlunos: 500 },
    { nome: "Escola B", uf: "RJ", qtdAlunos: 700 },
    { nome: "Escola C", uf: "MG", qtdAlunos: 400 },
    { nome: "Escola D", uf: "RS", qtdAlunos: 600 },
    { nome: "Escola E", uf: "BA", qtdAlunos: 800 }
];

const ModalAdicionarEscola: React.FC<ModalProps> = ({ onClose, onAdicionar }) => {

    const[escolas, setEscolas] = useState<Escola[] | null>(null);

    //TODO CRIAR FETCH ESCOLAS
    // useEffect(() => {
    //     fetchEscolaRanque(escolaId)
    //         .then((escola) => {
    //                 setEscolaSelecionada(escola);
    //                 fetchSuperintendenciaSelecionada(escola.superintendencia?.id);
    //             }
    //         )
    // }, []);


    // if (!escolas) {
    //     return (
    //         <Modal className="modal-title" closeModal={() => onClose()}>
    //             <h4 className="text-center mt-2">Carregando Escolas...</h4>
    //             <div className="d-flex justify-content-center m-4">
    //                 <ReactLoading type="spinningBubbles" color="#000000" />
    //             </div>
    //             <span></span>
    //         </Modal>
    //     );
    // }

    const [nome, setNome] = useState("");
    useEffect(() => {
        setEscolas(
            dados.filter(index =>
                index.nome.toLowerCase().includes(nome.toLowerCase())
            )
        );
    }, [nome]);
    
    return (
        <Modal className="default escola-ranque-modal" closeModal={() => onClose()}>
            <div className="d-flex flex-column">
                <h4 className="text-center mt-1">Adicionar Escola</h4>
                {/*todo adicionar interatividade no mes*/}
                <label className="text-center mt-1" >A escola selecionada será adicionada ao mês de Novembro</label>
                <div className='d-flex flex-column '>
                    <div className={"inputNome"} style={{width: "100%"}}>
                        <InputFilter onChange={setNome} label={"Procure a escola"} placeholder={"digite aqui"} />
                    </div>
                    
                </div>
            </div>
            <br/>
            <div className="d-flex w-100 justify-content-end mb-2">
                <button className="br-button secondary mr-3" type="button" onClick={() => onClose()}>
                    Cancelar
                </button>
                <button className="br-button primary mr-3" type="button" onClick={() => { onAdicionar()}} disabled>
                    Adicionar
                </button>
            </div>

        </Modal>
    );
};

export default ModalAdicionarEscola;