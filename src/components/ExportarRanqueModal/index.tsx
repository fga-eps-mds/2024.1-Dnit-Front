import React, { ReactNode, useState, useEffect } from 'react';
import "../../styles/App.css";
import "../../pages/Ranque/";
import Modal from "../../components/Modal/index";
import Table, { CustomTableRow } from '../../components/Table';
import ModalDetalhesRanque from '../../components/DetalhesRanqueModal';
import { fetchRanques } from '../../service/ranqueApi';
import { EscolaRanqueDetalhes, RanqueData, ListaPaginada } from '../../models/ranque';
import ReactLoading from "react-loading";
import "./index.css";
import { notification } from 'antd';
import { ranqueData } from '../../tests/stub/ranqueModelos';

interface ModalProps {
    onClose: () => void;
    ranqueId: string;
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

const ModalExportarRanque: React.FC<ModalProps> = ({ ranqueId: ranqueId, onClose}) => {
    const [notificationApi, contextHolder] = notification.useNotification();
    const [ranqueAtual, setRanqueAtual] = useState<RanqueData | null>();
    const colunas = ['Data', 'Hora', 'Número de escolas'];
    const [listaRanques, setListaRanques] = useState<RanqueData[]>([]);
    var teste = [{data: "1/12/23", hora: "10:00", escolasNum: 201}, {data: "15/11/23", hora: "09:00", escolasNum: 175}, {data: "9/10/23", hora: "12:00", escolasNum: 150}];
    const [pagina, setPagina] = useState(1);
    const [tamanhoPagina, setTamanhoPagina] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    // useEffect(() => {
    //     fetchRanques(pagina, tamanhoPagina)
    //         .then((ranque) => {
    //             setListaRanques(ranque.items);
    //             setTotalPages(ranque.totalPaginas);
    //         }
    //         )

    // }, []);
    if (!listaRanques) {
        return (
            <Modal className="modal-title" closeModal={() => onClose()}>
                <h4 className="text-center mt-2">Carregando Tabela...</h4>
                <div className="d-flex justify-content-center m-4">
                    <ReactLoading type="spinningBubbles" color="#000000" />
                </div>
                <span></span>
            </Modal>
        );
    }

    return (
        <div className='escola-ranque-modal'>
            <Modal className="default escola-ranque-modal" width={1000} closeModal={() => onClose()}>
                {contextHolder}
                {ranqueAtual != null && <ModalDetalhesRanque onClose={() => { setRanqueAtual(null) }} onEditDescription={() => { }} ranqueId='1' />}
                <div className="d-flex flex-column">
                    <h4 className="text-center mt-1">Histórico de Ranques</h4>
                    <div className='d-flex flex-column '>
                        <Label>Últimos Processamentos:</Label>
                    </div>
                </div>
                
                <Table
                
                    columsTitle={colunas}
                    title=''
                    initialItemsPerPage={10}
                    totalPages={totalPages}
                    totalItems={100}
                    onNextPage={() => {
                        if (pagina === totalPages) return;
                        setPagina(pagina + 1)
                    }}
                    onPreviousPage={() => {
                        if (pagina === totalPages) return;
                        setPagina(pagina - 1)
                    }}
                    onPageResize={(newTamanhoPagina) => {
                        setTotalPages(newTamanhoPagina)
                    }}
                    onPageSelect={(newPagina) => {
                        setPagina(newPagina)
                    }}>
                    {
                        teste.map((e, index) => 
                            <CustomTableRow
                                key={2}
                                id={index}
                                data={{
                                    '0': `${e.data}`,
                                    '1': `${e.hora}`,
                                    '2': `${e.escolasNum}`,
                                }}
                                hideTrashIcon={true}
                                hideEditIcon={true}
                                onDetailRow={_ => setRanqueAtual(e)}
                            />
                        )
                    }
            </Table>

                <br />
                <div className="d-flex w-100 justify-content-end mb-2">
                    <button className="br-button secondary mr-3" type="button" onClick={() => onClose()}>
                        Fechar
                    </button>
                </div>

            </Modal>
        </div>
    );
};

export default ModalExportarRanque;