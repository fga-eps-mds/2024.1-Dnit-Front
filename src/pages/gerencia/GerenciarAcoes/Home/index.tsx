import React, { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import { AuthContext } from "../../../../provider/Autenticacao";
import { useNavigate } from "react-router-dom";
import { Permissao } from "../../../../models/auth";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import TrilhaDeNavegacao from "../../../../components/Navegacao/index";
import InputFilter from "../../../../components/InputFilter/index";
import Select from "../../../../components/Select";
import Table, { CustomTableRow } from "../../../../components/Table";
import ReactLoading from "react-loading";
import { ButtonComponent } from "../../../../components/Button";
import DeletarPlanejamentoDialog from "../../../../components/DeletarPlanejamentoDialog";
import { fetchPlanejamentos } from "../../../../service/gerenciarAcoes";
import { PlanejamentoMacro } from "../../../../models/gerenciarAcoes";
import { meses } from "../fixtures";

interface FilterOptions {
  id: string;
  rotulo: string;
  intervalos: string | null;
}

export default function GerenciarAcoes() {
  const { temPermissao } = useContext(AuthContext);
  const possuiPermissao = { excluir: temPermissao(Permissao.UsuarioEditar) };
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const paginas = [{ nome: "Gerenciar Ações", link: "/gerenciarAcoes" }];
  const colunas = ["Nome", "Período", "Quantidade de Ações", "Responsável"];

  const [notificationApi, notificationContextHandler] =
    notification.useNotification();

  const [deletePlanejamento, setDeletePlanejamento] =
    useState<PlanejamentoMacro | null>(null);

  const [listaPeriodo, setListaPeriodo] = useState<FilterOptions[]>([]);

  const [nome, setNome] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [planejamentoBanco, setPlanejamentoBanco] = useState<
    PlanejamentoMacro[]
  >([]);
  const [planejamentos, setPlanejamentos] = useState<PlanejamentoMacro[]>([]);

  useEffect(() => {
    fetchPlanejamentos({
      params: {
        Pagina: 1,
        TamanhoPagina: 10000,
        Nome: "",
        Periodo: "",
        Responsavel: "",
        QuantidadeAcoes: undefined,
      },
    })
      .then((planejamento) => {
        setPlanejamentoBanco(planejamento.items);
        setPlanejamentos(planejamento.items);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    var planejamentosFiltrados = planejamentos.filter(
      (index) =>
        index.nome.toLowerCase().includes(nome.toLowerCase()) &&
        index.responsavel.toLowerCase().includes(responsavel.toLowerCase())
    );
    setPlanejamentoBanco(planejamentosFiltrados);
  }, [nome, responsavel]);

  return (
    <div className="App">
      {notificationContextHandler}
      {deletePlanejamento && (
        <DeletarPlanejamentoDialog
          planejamento={deletePlanejamento}
          closeDialog={(deletou) => {
            setDeletePlanejamento(null);
          }}
        />
      )}
      <Header />
      <TrilhaDeNavegacao elementosLi={paginas} />
      <div className="d-flex flex-column m-5">
        <div className="d-flex justify-content-left align-items-center mr-5">
          <div style={{ margin: "20px" }}>
            <InputFilter onChange={setNome} label="Nome" />
          </div>
          <Select
            items={listaPeriodo}
            value={periodo}
            label={"Período:"}
            onChange={setPeriodo}
            dropdownStyle={{ marginLeft: "20px", width: "260px" }}
            filtrarTodos={true}
          />
          <div data-testid="inputResponsavel">
            <InputFilter onChange={setResponsavel} label="Responsável" />
          </div>

          {possuiPermissao && (
            <div data-testid="botaoPossuiPermissao" style={{ right: "5%" }}>
              <ButtonComponent
                label="Criar Novo Planejamento"
                buttonStyle="primary"
                onClick={() => navigate("/gerenciarAcoes/gerarPlanejamento")}
              />
            </div>
          )}
        </div>

        {(loading || !planejamentoBanco?.length) && (
          <Table
            columsTitle={colunas}
            initialItemsPerPage={10}
            totalItems={0}
            title=""
          >
            <></>
            <></>
          </Table>
        )}

        {(loading || planejamentoBanco.length != null) && (
          <Table
            columsTitle={colunas}
            title=""
            initialItemsPerPage={10}
            totalItems={planejamentoBanco?.length}
          >
            {planejamentoBanco?.map((e, index) => (
              <CustomTableRow
                key={e.nome}
                id={index}
                data={{
                  "0": e.nome,
                  "1": `${meses[e.mesInicio - 1]} de ${e.anoInicio} - ${
                    meses[e.mesFim - 1]
                  } de ${e.anoFim}`,
                  "2": `${e.quantidadeAcoes}`,
                  "3": e.responsavel,
                }}
                hideEditIcon={true}
                onDeleteRow={() => {
                  setDeletePlanejamento(e);
                }}
              />
            ))}
          </Table>
        )}

        {loading && (
          <div className="d-flex justify-content-center w-100 m-5">
            <ReactLoading type="spinningBubbles" color="#000000" />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
