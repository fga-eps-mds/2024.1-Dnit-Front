import React, { ReactNode, useState, useEffect } from 'react';
import "../../styles/App.css";
import "../../pages/Ranque/";
import Modal from "../../components/Modal/index";
import { fetchEscolaRanque } from '../../service/ranqueApi';
import { fetchSuperintendenciaData } from '../../service/escolaApi';
import { EscolaRanqueDetalhes } from '../../models/ranque';
import ReactLoading from "react-loading";
import { Superintendencia } from '../../models/service';
import { formataCustoLogistico } from '../../utils/utils';
import "./index.css";

interface ModalProps {
    onClose: () => void;
    onCreateAcao: () => void;
    escolaId?: string;
}

interface LabelProps {
    children: ReactNode,
    className?: string,
}

function Label({ children, className }: LabelProps) {
    return (<label style={{ fontSize: '14px', fontWeight: 'normal' }} className={'mb-2 ' + className}>
        {children}
    </label>)
}

const SolitacoesDialog: React.FC<ModalProps> = ({ escolaId, onClose, onCreateAcao }) => {

    const [escolaSelecionada, setEscolaSelecionada] = useState<EscolaRanqueDetalhes | null>(null);
    const [superintendenciaSelecionada, setSuperintendenciaSelecionada] = useState<Superintendencia | undefined>();

    const fetchSuperintendenciaSelecionada = async (superintendenciaId?: number) => {
        const superintendencia = await fetchSuperintendenciaData(superintendenciaId);
        setSuperintendenciaSelecionada(superintendencia);
    }

    // useEffect(() => {
    //     fetchEscolaRanque(escolaId)
    //         .then((escola) => {
    //             setEscolaSelecionada(escola);
    //             fetchSuperintendenciaSelecionada(escola.superintendencia?.id);
    //         }
    //         )

    // }, []);


    // if (!escolaSelecionada) {
    //     return (
    //         <Modal className="modal-title" closeModal={() => onClose()}>
    //             <h4 className="text-center mt-2">Carregando Escola...</h4>
    //             <div className="d-flex justify-content-center m-4">
    //                 <ReactLoading type="spinningBubbles" color="#000000" />
    //             </div>
    //             <span></span>
    //         </Modal>
    //     );
    // }

    return (
        <Modal className="default escola-ranque-modal" closeModal={() => onClose()}>
            <div className="d-flex flex-column">
                <h4 className="text-center mt-1">Detalhes da Solicitação</h4>
                <div className='d-flex flex-column '>
                    <Label>Nome Escola: Nome</Label>
                    <Label><strong>Dados</strong></Label>
                    <div className='row mb-2'>
                        <div className='col-12 col-md-6'>
                            <Label>Código: Codigo</Label>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Label>Telefone escola: {"619999888".replace(/^(\d{2})(\d{4})(\d{4})/gm, "($1) $2-$3")}</Label>
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-12 col-md-6'>
                            <Label>Alunos: numAlunos</Label>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Label>Professores: numProfessores</Label>
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-12 col-md-6'>
                            <Label>Porte: Porte</Label>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Label>Situação: Situacao</Label>
                        </div>
                    </div>
                    <Label>Rede: Rede</Label>
                    <Label>Etapas de Ensino: Etapas</Label>
                    <hr />
                    <div>
                        <div className='d-flex flex-column'>
                            <Label><strong>Endereço</strong></Label>
                            <Label>Endereco</Label>
                            <Label>Cep: Cep{/*escolaSelecionada.cep.replace(/^(\d{5})(\d{3})$/gm, "$1-$2")*/}</Label>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <Label>Estado: UF</Label>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <Label>Município: Municipio</Label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='d-flex flex-column '>
                        <Label><strong>Solicitações</strong></Label>
                        <div className='d-flex flex-column'>
                            <Label>Nome do Solicitante: Fulano</Label>
                            <Label>Vinculo com a Escola: Professor</Label>
                            <Label>e-mail: fulano@gmail.com</Label>
                            <Label>Telefone: {"619944888".replace(/^(\d{2})(\d{4})(\d{4})/gm, "($1) $2-$3")}</Label>
                            <Label>Observações: Sem pensar conquistamos o mundo geral e construímos o nosso pequeno
                                 lugar, deixando brilhar cada estrelinha. Estrelinhas. Doces, sensíveis, frias,
                                  ternurentas. Mas sempre presentes em qualquer parte. Os donos da amizade.</Label>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="d-flex w-100 justify-content-end mb-2">
                <button className="br-button secondary mr-3" type="button" onClick={() => onClose()}>
                    Fechar
                </button>
                <button className="br-button primary mr-3" type="button" onClick={() => { onCreateAcao() }} disabled>
                    Criar Ação
                </button>
            </div>

        </Modal>
    );
};

export default SolitacoesDialog;
