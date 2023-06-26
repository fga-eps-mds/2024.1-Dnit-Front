import "../../styles/App.css";
import "../components-escolasCadastradas/style/TabelaEscola.css";
import { useEffect, useState, useRef } from "react";
import { EscolaData } from "../../models/service";
import ExibirInformacoesEscola from "../../pages/ExibirInformacoesEscola";
import { useFiltroTabela } from "../../context/FiltroTabela";
import { notification } from "antd";



export default function TabelaEscola() {
  const {escolasFiltradas, paginaAtual, mudarPagina, escolasPorPagina, mudarQuantidadePorPaginas, totalEscolas } = useFiltroTabela()

  const [, contextHolder] = notification.useNotification();

  const [showOptionsPages, setShowOptionsPages] = useState(false);
  const [showSchoolsPerPage, setShowSchoolsPerPage] = useState(false);
  const optionsSchoolsPerPage = ['2', '5', '10', '20'];
  const [schools, setschools] = useState<EscolaData[]>([]);
  const [modalStates, setModalStates] = useState(Array(schools.length).fill(false));
  const [escolaSelecionada, setEscolaSelecionada] = useState<EscolaData>();
  const [indexescolaSelecionada, setIndexEscolaSelecionada] = useState<number>(0);


  const handleButtonClick = (selectNumeber: number) => {
    if (selectNumeber == 1) {
      setShowOptionsPages(!showOptionsPages);
    }
  }
  const handleOptionClick = (option: number) => {
    mudarQuantidadePorPaginas(option);
    setShowSchoolsPerPage(false);


  }

  const OpenModal = (id: EscolaData, index: number) => {
    const newModalStates = [...modalStates];
    newModalStates[index] = true;
    setModalStates(newModalStates);
    setEscolaSelecionada(id);
    setIndexEscolaSelecionada(index);
  }

  const CloseModal = (index: number) => {
    const newModalStates = [...modalStates];
    newModalStates[index] = false;
    setModalStates(newModalStates);
  }


  const getpagerange = () => {
    const rangeStart = (paginaAtual - 1) * escolasPorPagina + 1;
    let rangeEnd = paginaAtual * escolasPorPagina;

    if (rangeEnd > totalEscolas) rangeEnd = totalEscolas;

    return [rangeStart, rangeEnd];
  };
  return (

    <div className="br-table" data-search="data-search" data-selection="data-selection" data-collapse="data-collapse" data-random="data-random">
      {contextHolder}
      <div className="table-header">
        <div className="top-bar">
          <div className="table-title">Escolas Cadastradas</div>
        </div>
        <div className="search-bar">
          <div className="br-input">
            <label htmlFor="table-searchbox-27509">Buscar</label>
            <input id="table-searchbox-27509" type="text" placeholder="Buscar na tabela" />
            <button className="br-button circle" type="button" aria-label="Buscar"><i className="fas fa-search" aria-hidden="true"  ></i>
            </button>
          </div>
          <button className="br-button circle" type="button" data-dismiss="search" aria-label="Fechar busca"><i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div className="selected-bar">
          <div className="info"><span className="count">0</span><span className="text">item selecionado</span></div>
          <div className="actions-trigger text-nowrap">
            <button className="br-button circle inverted" type="button" data-toggle="dropdown" data-target="target02-27509" aria-label="Ver mais opções"><i className="fas fa-ellipsis-v" aria-hidden="true"></i>
            </button>
            <div className="br-list" id="target02-27509" hidden>
              <button className="br-item" type="button" data-toggle="">Ação 1
              </button><span className="br-divider"></span>
              <button className="br-item" type="button">Ação 2
              </button>
            </div>
          </div>
        </div>
      </div>
      <table>
        <caption>Escolas Cadastradas</caption>
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Etapas de Ensino</th>
            <th scope="col">Total de Alunos</th>
            <th scope="col">Situação</th>
            <th scope="col">Município</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {escolasFiltradas !== false && escolasFiltradas.map((escola, index) => {
            return (
              <tr key={escola.idEscola} onClick={() => OpenModal(escola, index)} data-testid="linha-escola">
                <td data-th="Título coluna 1">{escola.nomeEscola}</td>
                <td data-th="Título coluna 2">{escola.descricaoEtapasDeEnsino}</td>
                <td data-th="Título coluna 3">{escola.numeroTotalDeAlunos}</td>
                <td data-th="Título coluna 4">{escola.descricaoSituacao}</td>
                <td data-th="Título coluna 5">{escola.nomeMunicipio}</td>
                <td data-th="Título coluna 6">{escola.siglaUf}</td>
              </tr>
            )
          })
          }
        </tbody>
      </table>

      <div className="modal-informacoes">
        <ExibirInformacoesEscola open={modalStates[indexescolaSelecionada]} escola={escolaSelecionada} close={() => CloseModal(indexescolaSelecionada)} />
      </div>

      <div className="table-footer">
        <nav className="br-pagination" aria-label="Paginação de resultados" data-total={escolasFiltradas ? escolasFiltradas.length : 0} data-current="38" data-per-page="20">
          <div className="pagination-per-page">
            <div className="br-select">
              <div className="br-input">
                <label htmlFor="per-page-selection-random-91921">Exibir</label>
                <input id="per-page-selection-random-91921" type="text" placeholder={escolasPorPagina.toString()} />
                <button className="br-button" type="button" aria-label="Exibir lista" tabIndex={-1} data-trigger="data-trigger">
                  <i className="fas fa-angle-down" aria-hidden="true" onClick={() => handleButtonClick(1)} data-testid= "dropdown-exibir"></i>
                </button>
                <div className="br-input">
                  {showOptionsPages && (
                    <div className="select-options dropdown-pagina">
                      {optionsSchoolsPerPage.map((options, index) => (
                        <div
                          key={index}
                          className="options"
                          onClick={() => handleOptionClick(Number(options))}
                          data-testid= {`options-${options}`}
                        >
                          {options}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div><span className="br-divider d-none d-sm-block mx-3"></span>
          <div className="pagination-inhtmlFormation d-none d-sm-flex">
            <span className="current">{getpagerange()[0]}
            </span>&ndash;
            <span className="per-page">{getpagerange()[1]}
            </span>&nbsp;de&nbsp;
            <span className="total">{totalEscolas}</span>&nbsp;itens</div>
          <div className="pagination-go-to-page d-none d-sm-flex ml-auto">
            <div className="br-select">
              <div className="br-input">
                <label htmlFor="go-to-selection-random-15337">Página</label>
                <input id="go-to-selection-random-15337" type="text" placeholder={paginaAtual.toString()} />
              </div>
            </div>
          </div><span className="br-divider d-none d-sm-block mx-3"></span>
          <div className="pagination-arrows ml-auto ml-sm-0">
            <button className="br-button circle" type="button" aria-label="Voltar página" onClick={() => mudarPagina(-1)} >
              <i className="fas fa-angle-left" aria-hidden="true" data-testid= "voltar-pagina"></i>
            </button>
            <button className="br-button circle" type="button" aria-label="Avançar página" onClick={() => mudarPagina(1)}>
              <i className="fas fa-angle-right" aria-hidden="true" data-testid= "avancar-pagina"></i>
            </button>
          </div>
        </nav>
      </div>
    </div>

  );
}