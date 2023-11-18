import {useEffect, useState} from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./index.css";
import {fetchEtapasDeEnsino, fetchUnidadeFederativa} from '../../service/escolaApi';
import {EtapasDeEnsinoData, UnidadeFederativaData} from '../../models/service';
import TrilhaDeNavegacao from '../../components/Navegacao';
import ReactLoading from 'react-loading';
import Table, {CustomTableRow} from '../../components/Table';
import {fetchEscolasRanque} from '../../service/ranqueApi';
import {EscolaRanqueData, ListaPaginada} from '../../models/ranque';
import {notification} from 'antd';
import ModalRanqueEscola from '../../components/EscolaRanqueModal';

export function formataCustoLogistico(distancia: number){
    switch(true){
        case distancia <= 250:
            return "$";
        case distancia > 250 && distancia <= 500:
            return  "$$"
        case distancia > 500 && distancia <= 1000:
            return "$$$"
        default:
            return "$$$$"
    }
}

interface fatores {
    nome: string;
    peso: number;
    valor: number;
}

interface ranqueInfo {
    ranqueId: number;
    pontuacao: number;
    posicao: number;
    fatores: fatores[];
}

interface escola {
    idEscola: string;
    
    codigoEscola: number;
    nomeEscola: string;
    idRede: number;
    descricaoRede: string;
    cep: string;
    idUf: number;
    siglaUf: string;
    endereco: string;
    idMunicipio: number;
    nomeMunicipio: string;
    idLocalizacao: number;
    descricaoLocalizacao: string;
    longitude: string;
    latitude: string;
    idEtapasDeEnsino: number;
    etapasEnsino: EtapasDeEnsinoData[];
    numeroTotalDeAlunos: number;
    idSituacao: number;
    descricaoSituacao: string;
    idPorte: number;
    descricaoPorte: string;
    telefone: string;
    numeroTotalDeDocentes: number;
    observacao: string;

    uf: number;
    descricaoUf: string;
    descricaoEtapasEnsino: string;
    rede: number;
    porte: number;
    localizacao: number;
    situacao: string;
    
    distanciaSuperintendencia: number;
    cepSuperintendencia: number;
    enderecoSuperintendencia: string;
    ufSuperintendencia: number;
}

export interface EscolaDataR {
    ranqueInfo: ranqueInfo;
    escola: escola;
}

function Ranque() {
    const [ufSelecionado, setUfSelecionado] = useState('');
    const [municipioSelecionado, setMunicipioSelecionado] = useState('');
    const [etapasEnsinoSelecionada, setEtapasEnsinoSelecionada] = useState('');
    const [ultimaAcaoSelecionada, setultimaAcaoSelecionada] = useState('');

    const ProcessamentoUPS: boolean = false;
    const [ultimoProcessamento] = useState("23/05/2023 16:43");

    const [ufs, setUfs] = useState<UnidadeFederativaData[]>([]);
    const [etapasEnsino, setEtapasEnsino] = useState<EtapasDeEnsinoData[]>([]);

    const paginas = [{nome: "Logout", link: "/login"}];
    const [loading, setLoading] = useState(true);
    const [escolas, setEscolas] = useState<ListaPaginada<EscolaRanqueData> | null>(null);
    const colunas = ['Posição', 'Pontuação', 'Escola', 'Etapas de Ensino', 'UF', 'Município', 'UF Superintendência', 'Custo Logístico', 'Ações'];

    const [paginacao, setPaginacao] = useState({pagina: 1, tamanhoPagina: 10,});
    const [notificationApi, notificationContextHandler] = notification.useNotification();

    useEffect(() => {
        fetchUnidadeFederativa()
            .then(ufs => setUfs(ufs));
        fetchEtapasDeEnsino()
            .then(etapas => {
                etapas.sort((a, b) => b.descricao.localeCompare(a.descricao));
                setEtapasEnsino(etapas);
            });
    }, []);

    useEffect(() => {
        fetchEscolasRanque({...paginacao})
            .then(e => {
                if (escolas?.items != null && escolas.items.length > 0 && e.items[0]?.ranqueId != escolas?.items[0].ranqueId) {
                    notificationApi.success({message: "A tabela foi atualizada com os resultados do novo processamento"});
                }
                setEscolas(e);
            })
            .finally(() => setLoading(false));
    }, [ufSelecionado, municipioSelecionado, etapasEnsino, paginacao]);

    const formatEtapaEnsino = (etapaEnsino: EtapasDeEnsinoData[], max = 2) => {
        if (!etapaEnsino) {
            return '';
        }
        return `${etapaEnsino.map(etapa => etapa.descricao).slice(0, max).join(', ')}${etapaEnsino.length > max ? '...' : ''}`;
    }
    
    const [escolaAtual, setEscolaAtual] = useState<EscolaRanqueData | null>();
        
    return (
        <div className="App ranque-container">
            <Header/>
            {notificationContextHandler}

           
            {escolaAtual != null && <ModalRanqueEscola  onClose={()=>{setEscolaAtual(null)}} onCreateAcao={()=>{}} escolaId={escolaAtual.escola.id}/>}
            
            <TrilhaDeNavegacao elementosLi={paginas}/>

            <div className='d-flex flex-column m-5'>
                <div className='d-flex justify-content-between align-items-center pl-3'>
                    <div className="filtros">

                        <div className="mr-4 text-start">
                            <label htmlFor="uf" className='text-start'>UF:</label>
                            <select
                                id="uf"
                                value={ufSelecionado}
                                onChange={(e) => setUfSelecionado(e.target.value)}
                                style={{
                                    marginLeft: "px",
                                    background: "none",
                                    height: "40px",
                                    width: "150px",
                                    borderRadius: "5px",
                                    border: "1px solid #000"
                                }}
                            >
                                <option value="">Todos</option>
                                {ufs.map(uf => <option key={uf.sigla} value={uf.sigla}>{uf.sigla}</option>)}
                            </select>
                        </div>

                        <div className="mr-4 text-start">
                            <label htmlFor="municipio">Município:</label>
                            <input
                                type="text"
                                id="municipio"
                                value={municipioSelecionado}
                                onChange={(e) => setMunicipioSelecionado(e.target.value)}
                                style={{
                                    marginLeft: "px",
                                    background: "none",
                                    height: "40px",
                                    width: "150px",
                                    borderRadius: "5px",
                                    border: "1px solid #000"
                                }}
                            />
                        </div>

                        <div className="mr-4 text-start">
                            <label htmlFor="etapasEnsino">Etapas de Ensino:</label>
                            <select
                                id="etapasEnsino"
                                value={etapasEnsinoSelecionada}
                                onChange={(e) => setEtapasEnsinoSelecionada(e.target.value)}
                                style={{
                                    marginLeft: "px",
                                    background: "none",
                                    height: "40px",
                                    width: "150px",
                                    borderRadius: "5px",
                                    border: "1px solid #000"
                                }}
                            >
                                <option value="_">Todas</option>
                                {etapasEnsino.map(e => <option key={e.id}>{e.descricao}</option>)}
                            </select>
                        </div>

                        <div className="mr-4 text-start">
                            <label htmlFor="municipio">Última ação:</label>
                            <input
                                type="text"
                                id="ultimaAcao"
                                value={ultimaAcaoSelecionada}
                                onChange={(e) => setultimaAcaoSelecionada(e.target.value)}
                                style={{
                                    marginLeft: "px",
                                    background: "none",
                                    height: "40px",
                                    width: "150px",
                                    borderRadius: "5px",
                                    border: "1px solid #000"
                                }}
                            />
                        </div>

                    </div>

                    <div>
                        {ProcessamentoUPS ? (
                            <p className="small-font mb-0">Novo cálculo de ranking em processamento...</p>
                        ) : (
                            <p className="small-font mb-0">
                                Último processamento: {ultimoProcessamento}&nbsp; &nbsp; &nbsp; &nbsp;
                            </p>
                        )}
                    </div>

                </div>

                {loading && <Table columsTitle={colunas} initialItemsPerPage={10} title=""><></>
                    <></>
                </Table>}
                {escolas?.items != null &&
                    <Table
                        columsTitle={colunas}
                        title='' initialItemsPerPage={10} totalItems={escolas?.total}
                        onNextPage={() => {
                            if (paginacao.pagina === escolas?.totalPaginas) return;
                            setPaginacao(p => {
                                return {...p, pagina: p.pagina + 1}
                            })
                        }}
                        onPreviousPage={() => {
                            if (paginacao.pagina === 1) return;
                            setPaginacao({...paginacao, pagina: paginacao.pagina - 1})
                        }}
                        onPageResize={(tamanhoPagina) => {
                            setPaginacao({...paginacao, tamanhoPagina})
                        }}
                        onPageSelect={(pagina) => {
                            setPaginacao({...paginacao, pagina})
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
                                        '3': formatEtapaEnsino(e.escola.etapaEnsino),
                                        '4': e.escola.uf?.sigla || '',
                                        '5': e.escola.municipio?.nome || '',
                                        '6': e.escola.ufSuperintendencia,     
                                        '7': formataCustoLogistico(e.escola.distanciaSuperintendencia)
                                    }}
                                    hideEditIcon={true}
                                    hideTrashIcon={true}
                                    onDetailRow={() => setEscolaAtual(e)}
                                />
                            )
                        }
                    </Table>
                }
                {loading &&
                    <div className="d-flex justify-content-center w-100 m-5"><ReactLoading type="spinningBubbles" color="#000000"/></div>}
            </div>
            <Footer/>
        </div>
    );
}

export default Ranque;