import React, { ReactNode, useState, useEffect } from 'react';
import "../../styles/App.css";
import "../../pages/Ranque/";
import Modal from "../../components/Modal/index";
import Table, { CustomTableRow } from '../../components/Table';
import { fetchEscolaRanque } from '../../service/ranqueApi';
import { EscolaRanqueDetalhes } from '../../models/ranque';
import ReactLoading from "react-loading";
import "./index.css";

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
const colunas = ['Data', 'Hora', 'Número de escolas'];

const ModalExportarRanque: React.FC<ModalProps> = ({ ranqueId: ranqueId, onClose}) => {

    const [ranqueSelecionado, setRanqueSelecionado] = useState<EscolaRanqueDetalhes | null>(null); // OLHAR

    useEffect(() => {
        fetchEscolaRanque(ranqueId)
            .then((ranque) => {
                setRanqueSelecionado(ranque);
            }
            )

    }, []);

    return (
        <Modal className="default escola-ranque-modal" closeModal={() => onClose()}>
            <div className="d-flex flex-column">
                <h4 className="text-center mt-1">Histórico de Ranques</h4>
                <div className='d-flex flex-column '>
                    <Label>Últimos Processamentos:</Label>
                </div>
            </div>
            
            {/* <Table
                columsTitle={colunas}
                title='' initialItemsPerPage={10} totalItems={escolas?.total}
                onNextPage={() => {
                    if (paginacao.pagina === escolas?.totalPaginas) return;
                    setPaginacao(p => { return { ...p, pagina: p.pagina + 1 } })
                }}
                onPreviousPage={() => {
                    if (paginacao.pagina === 1) return;
                    setPaginacao({ ...paginacao, pagina: paginacao.pagina - 1 })
                }}
                onPageResize={(tamanhoPagina) => {
                    setPaginacao({ ...paginacao, tamanhoPagina })
                }}
                onPageSelect={(pagina) => {
                    setPaginacao({ ...paginacao, pagina })
                }}>
                {
                    escolas?.items.map((e, index) =>
                        <CustomTableRow
                            key={e.escola.id}
                            id={index}
                            data={{
                                '0': `${e.posicao}°`,
                                '1': `${e.pontuacao}`,
                                '2': e.escola.nome,
                             }}
                            hideTrashIcon={true}
                            hideEditIcon={true}
                            onDetailRow={_ => setEscolaAtual(e)}
                        />
                    )
                }
          </Table> */}

            <br />
            <div className="d-flex w-100 justify-content-end mb-2">
                <button className="br-button secondary mr-3" type="button" onClick={() => onClose()}>
                    Fechar
                </button>
            </div>

        </Modal>
    );
};

export default ModalExportarRanque;