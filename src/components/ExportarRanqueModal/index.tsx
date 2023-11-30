import React, { ReactNode, useState, useEffect } from 'react';
import "../../styles/App.css";
import "../../pages/Ranque/";
import Modal from "../../components/Modal/index";
import Table, { CustomTableRow } from '../../components/Table';
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
    const colunas = ['Data', 'Hora', 'Número de escolas'];
    const [listaRanques, setListaRanques] = useState<RanqueData[]>([]);
    var teste = [{data: "data", hora: "hora", escolasNum: 1}, {data: "data", hora: "hora", escolasNum: 2}, {data: "data", hora: "hora", escolasNum: 3}];
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

    return (
        <div className='escola-ranque-modal'>
            <Modal className="default escola-ranque-modal" width={1000} closeModal={() => onClose()}>
                {contextHolder}
                {/* {ranqueAtual != null && <ModalDetalhesRanque onClose={() => { setranqueAtual(null) }} onCreateAcao={() => { }} escolaId={escolaAtual.escola.id} />} */}
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
                                // onDetailRow={_ => setRanqueSelecionado(e)}
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