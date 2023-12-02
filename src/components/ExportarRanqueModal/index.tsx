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
import { urlAPIEscolas } from '../../consts/service';

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

const ModalExportarRanque: React.FC<ModalProps> = ({ ranqueId: ranqueId, onClose }) => {
    const [notificationApi, contextHolder] = notification.useNotification();
    const [ranqueAtual, setRanqueAtual] = useState<RanqueData | null>();
    const colunas = ['Data e Hora', 'Número de escolas'];
    const [listaRanques, setListaRanques] = useState<RanqueData[]>([]);
    var teste = [{ data: "1/12/23", hora: "10:00", escolasNum: 201 },
    { data: "15/11/23", hora: "09:00", escolasNum: 175 },
    { data: "1/12/23", hora: "10:00", escolasNum: 201 },
    { data: "1/12/23", hora: "10:00", escolasNum: 201 },];
    const [pagina, setPagina] = useState(1);
    const [tamanhoPagina, setTamanhoPagina] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchRanques(pagina, tamanhoPagina)
            .then((ranque) => {
                setListaRanques(ranque.items);
                setTotalPages(ranque.totalPaginas);
            }
            )

    }, []);
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

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const padZeros = (n: number) => n.toString().padStart(2, '0');
        return `${padZeros(date.getDate())}/${padZeros(date.getMonth())}/${date.getFullYear()} ${padZeros(date.getHours())}:${padZeros(date.getMinutes())}`
    }

    const onDownload = (ranque: RanqueData) => {
        window.open(`${urlAPIEscolas}/ranque/${ranque.id}/exportar`, "_blank")
    }

    return (
        <div className='exportar-ranque-modal'>
            <Modal className="default exportar-ranque-modal" width={1000} closeModal={() => onClose()}>
                {contextHolder}
                {ranqueAtual != null && <ModalDetalhesRanque onClose={() => { setRanqueAtual(null) }} onEditDescription={() => { }} ranque={ranqueAtual} />}
                <div className="d-flex flex-column">
                    <h4 className="text-center mt-1">Histórico de Ranques</h4>
                    <div className='d-flex flex-column '>
                        <Label>Últimos Processamentos:</Label>
                    </div>
                </div>

                <div style={{ maxHeight: '800px', overflowY: 'visible' }}>
                    <Table
                        columsTitle={colunas}
                        title=''
                        initialItemsPerPage={5}
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
                            listaRanques.map((e, index) =>
                                <CustomTableRow
                                    key={2}
                                    id={index}
                                    data={{
                                        '0': `${formatDate(e.data)}`,
                                        '1': `${e.numEscolas}`,
                                    }}
                                    hideTrashIcon={true}
                                    hideEditIcon={true}
                                    hideDownloadIcon={false}
                                    onDetailRow={_ => setRanqueAtual(e)}
                                    onDownload={_ => onDownload(e)}
                                />
                            )
                        }
                    </Table>
                    <div className="d-flex w-100 justify-content-end mb-2">
                        <button className="br-button secondary mr-3" type="button" onClick={() => onClose()}>
                            Fechar
                        </button>
                    </div>
                </div>

                <br />

            </Modal>
        </div>
    );
};

export default ModalExportarRanque;