import React, { useState, useEffect } from 'react';
import Modal from "../../Modal";
import ReactLoading from "react-loading";
import SelectSchoolCard from "../../SelectSchoolCard";

interface ModalProps {
    onClose: () => void;
    onAdicionar: () => void;
}

interface Escola {
    id: number
    nome: string;
    uf: string;
    qtdAlunos: number;
}

const dados: Escola[] = [
    { id: 1, nome: "Sigma", uf: "SP", qtdAlunos: 500 },
    { id: 2, nome: "Beta", uf: "RJ", qtdAlunos: 700 },
    { id: 3, nome: "Omega", uf: "MG", qtdAlunos: 400 },
    { id: 4, nome: "Alpha", uf: "RS", qtdAlunos: 600 },
    { id: 5, nome: "Teta", uf: "BA", qtdAlunos: 800 }
];

const ModalAdicionarEscola: React.FC<ModalProps> = ({ onClose, onAdicionar }) => {

    const[escolasBanco, setEscolasBanco] = useState<Escola[] | null>(dados);
    const[escolas, setEscolas] = useState<Escola[] | null>(escolasBanco);

    //TODO A FUNCAO FETCHESCOLAS
    // useEffect(() => {
    //     fetchEscolas(escolaId)
    //         .then((escolas) => {
    //                 setEscolasBanco(escolas);
    //                 setEscolas(escolas);
    //             }
    //         )
    // }, []);


    if(!escolas){
        return (
            <Modal className="modal-title" closeModal={() => onClose()}>
                <h4 className="text-center mt-2">Carregando Escolas...</h4>
                <div className="d-flex justify-content-center m-4">
                    <ReactLoading type="spinningBubbles" color="#000000" />
                </div>
                <span></span>
            </Modal>
        );
    }

    const [nome, setNome] = useState("");
    useEffect(() => {
        setEscolas(
            
            //TODO COLOCAR ESCOLAS BANCO NO DADOS DEPOIS QUE FAZER O FETCH
            dados.filter(index =>
                index.nome.toLowerCase().includes(nome.toLowerCase())
            )
        );
    }, [nome]);
    
    return (
        <Modal className="default escola-ranque-modal" closeModal={() => onClose()}>
            <div className="d-flex flex-column">
                
                {/*TODO DEIXAR ESSA PARTE FIXA NO TOPO*/}
                <div>
                    <h4 className="text-center mt-1">Adicionar Escola</h4>
                    
                    {/*TODO ADICIONAR INTERATIVIDADE NO MES*/}
                    <label className="text-center mt-1" >A escola selecionada será adicionada ao mês de Novembro</label>

                    <div className='d-flex flex-column '>
                        <div className="br-input large input-button" style={{ width: "95%", fontSize: '16px', textAlign: 'start'}}>
                            <input className="br-input-search-large" type="search" placeholder={"Procure uma escola"}
                                   onChange={e => setNome(e.target.value)}
                            />
                            <button className="br-button" type="button" aria-label="Buscar" onClick={() => { }}>
                                <i className="fas fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/*TODO CORRIGIR A RESPONSIVIDADE*/}
                <div>
                    {escolas?.map((escola, index) => (
                        <div key={index} style={{width: "30%"}}>
                            <SelectSchoolCard
                                schoolId={escola.id}
                                schoolName={escola.nome}
                                schoolUf={escola.uf}
                                schoolStudents={escola.qtdAlunos}
                                onClick={() => {
                                    // Lógica de manipulação ao clicar na escola
                                }}
                            />
                            <br/>
                        </div>
                    ))}
                </div>
                <br/>
                
                {/*TODO DEIXAR ESSA PARTE FIXA EM BAIXO*/}
                <div className="br-modal-footer">
                    <div className="d-flex w-100 justify-content-end mb-2">
                        <button className="br-button secondary mr-3" type="button" onClick={() => onClose()}>
                            Cancelar
                        </button>
                        <button className="br-button primary mr-3" type="button" onClick={() => { onAdicionar()}} disabled>
                            Adicionar
                        </button>
                    </div>
                </div>
                
            </div>
        </Modal>
    );
};

export default ModalAdicionarEscola;