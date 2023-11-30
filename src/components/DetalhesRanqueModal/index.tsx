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

const ModalDetalhesRanque: React.FC<ModalProps> = ({ ranqueId: ranqueId, onClose}) => {
    const [notificationApi, contextHolder] = notification.useNotification();

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
            <Modal className="default escola-ranque-modal" closeModal={() => onClose()}>
                {contextHolder}
                <div className="d-flex flex-column">
                    <h4 className="text-center mt-1">Detalhes do Ranque</h4>
                    <div className='d-flex flex-column '>
                    </div>
                </div>

                <br />
                <div className="d-flex w-100 justify-content-end mb-2">
                    <button className="br-button secondary mr-3" type="button" onClick={() => onClose()}>
                        Fechar
                    </button>
                    <button className="br-button primary mr-3" type="button" onClick={() => onClose()}>
                        Editar Descrição
                    </button>

                </div>

            </Modal>
        </div>
    );
};

export default ModalDetalhesRanque;