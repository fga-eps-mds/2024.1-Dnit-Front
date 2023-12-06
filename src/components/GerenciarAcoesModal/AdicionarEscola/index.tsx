import React, { useState, useEffect } from 'react';
import Modal from "../../Modal";
import ReactLoading from "react-loading";
import SelectSchoolCard from "../../SelectSchoolCard";

interface ModalProps {
    onClose: () => void;
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
    { id: 5, nome: "ABELIANO DA SILVA SANTOS PAULINO", uf: "BA", qtdAlunos: 800 },
    { id: 6, nome: "Gamma", uf: "SC", qtdAlunos: 550 },
    { id: 7, nome: "Delta", uf: "PR", qtdAlunos: 450 },
    { id: 8, nome: "Theta", uf: "CE", qtdAlunos: 350 },
    { id: 9, nome: "Zeta", uf: "PE", qtdAlunos: 900 },
    { id: 10, nome: "Iota", uf: "GO", qtdAlunos: 720 }
];

export default function ModalAdicionarEscola({ onClose }: ModalProps) {
    const [escolasBanco, setEscolasBanco] = useState<Escola[]>(dados);
    const [escolas, setEscolas] = useState<Escola[] | null>(escolasBanco);
    const [nome, setNome] = useState("");
    const [escolaSelecionada, setEscolaSelecionada] = useState<{ [key: number]: boolean }>({});
    const [listaEscolasSelecionadas, SetListaEscolasSelecionadas] = useState<Escola[]>([]);
    const [mes, setMes] = useState<string>("Dezembro");

    //TODO A FUNCAO FETCHESCOLAS
    // useEffect(() => {
    //     fetchEscolas(escolaId)
    //         .then((escolas) => {
    //                 setEscolasBanco(escolas);
    //                 setEscolas(escolas);
    //             }
    //         )
    // }, []);
    
    //TODO A FUNCAO FETCHMES
    // useEffect(() => {
    //     fetchMesAtual().then((mes) => { setMes(mes) })
    // }, []);
    
    useEffect(() => {
        setEscolas(
            escolasBanco.filter(index =>
                index.nome.toLowerCase().includes(nome.toLowerCase())
            )
        );
    }, [nome]);

    useEffect(() => {
        const escolasFiltradas = escolasBanco.filter(escola => escolaSelecionada[escola.id]);
        SetListaEscolasSelecionadas(escolasFiltradas);
    }, [escolaSelecionada, escolasBanco]);


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
    
    return (
        <Modal className="default" closeModal={() => onClose()}>
            <div className="d-flex flex-column">
                <div style={{ position: "sticky", top: 0, background: "white", zIndex: 1}}>
                    <h4 className="text-center mt-1">Adicionar Escola</h4>

                    {/*TODO ADICIONAR A INTERATIVIDADE DO MES*/}
                    <label className="text-center mt-1">A escola selecionada será adicionada ao mês de {mes}</label>
                    <div className='d-flex flex-column'>
                        <div className="br-input large input-button" style={{ width: "95%", fontSize: '16px', textAlign: 'start' }}>
                            <input
                                data-testid={"Procurar escola"}
                                className="br-input-search-large"
                                type="search"
                                placeholder={"Procure uma escola"}
                                onChange={e => setNome(e.target.value)}
                            />
                            <button className="br-button" type="button" aria-label="Buscar" onClick={() => { }}>
                                <i className="fas fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <br/>

                <div className="d-flex flex-column" style={{width: "95%", position: "relative", left: "2%"}}>
                    {escolas?.map((escola, index) => (
                        <div key={index}>
                            <SelectSchoolCard
                                schoolId={escola.id}
                                schoolName={escola.nome}
                                schoolUf={escola.uf}
                                schoolStudents={escola.qtdAlunos}
                                isSelected={escolaSelecionada[escola.id] || false}
                                onClick={() => {
                                    setEscolaSelecionada(prevState => ({
                                        ...prevState,
                                        [escola.id]: !prevState[escola.id]
                                    }));
                                }}
                            />
                            <br/>
                        </div>
                    ))}
                </div>
                <br/><br/>
                
                <div className="d-flex justify-content-end mb-2" style={{ position: "absolute", bottom: 0, right: "5%", height: "10%", width: "95%", backgroundColor: "white", zIndex: 1 }}>
                    <div style={{ position: "relative", top: "20%" }}>
                        <button className="br-button secondary mr-3" type="button" onClick={() => {
                            setEscolaSelecionada({});
                            onClose();
                        }}>
                            Cancelar
                        </button>
                        <button className="br-button primary" type="button" onClick={() => {
                            //TODO putEscolas(listaEscolasSelecionadas)
                            onClose();
                        }}>
                            Adicionar
                        </button>
                    </div>
                </div>
                
            </div>
        </Modal>
    );
};
    