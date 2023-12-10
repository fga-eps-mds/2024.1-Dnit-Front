import React, {useContext, useEffect, useState} from "react";
import { notification } from "antd";
import { AuthContext, temPermissao } from "../../../../provider/Autenticacao";
import { useNavigate, useParams } from "react-router-dom";
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
import {fetchPlanejamentos} from "../../../../service/gerenciarAcoes";
import {PlanejamentoMacro} from "../../../../models/gerenciarAcoes";
import {meses} from "../fixtures";

interface FilterOptions {
  id: string;
  rotulo: string;
  intervalos: string | null;
}

interface PlanejamentoDialogArgs {
  nome: string | null;
  readOnly: boolean;
}

const planejamento1: PlanejamentoMacro = {
  id: "1",
  nome: "Planejamento 1",
  responsavel: "Fulano",
  mesInicio: 1,
  mesFim: 6,
  anoInicio: "2023",
  anoFim: "2023",
  quantidadeAcoes: 3,
  planejamentoMacroMensal: [
    {
      mes: 1,
      ano: "2023",
      upsTotal: 10,
      quantidadeEscolasTotal: 5,
      quantidadeAlunosTotal: 500,
      escolas: [
        {
          id: "1",
          ups: 1,
          nome: "Escola 1",
          uf: "SP",
          quantidadeAlunos: 100,
          distanciaPolo: 20,
        },
        // Adicione mais escolas conforme necessário
      ],
      detalhesPorUF: [
        {
          uf: "SP",
          quantidadeEscolasTotal: 3,
        },
        // Adicione mais detalhes por UF conforme necessário
      ],
    },
    // Adicione mais informações mensais conforme necessário
  ],
};

const planejamento2: PlanejamentoMacro = {
  id: "2",
  nome: "Planejamento 2",
  responsavel: "Ciclano",
  mesInicio: 7,
  mesFim: 12,
  anoInicio: "2023",
  anoFim: "2023",
  quantidadeAcoes: 2,
  planejamentoMacroMensal: [
    {
      mes: 7,
      ano: "2023",
      upsTotal: 12,
      quantidadeEscolasTotal: 6,
      quantidadeAlunosTotal: 600,
      escolas: [
        {
          id: "2",
          ups: 2,
          nome: "Escola 2",
          uf: "RJ",
          quantidadeAlunos: 120,
          distanciaPolo: 25,
        },
        // Adicione mais escolas conforme necessário
      ],
      detalhesPorUF: [
        {
          uf: "RJ",
          quantidadeEscolasTotal: 4,
        },
        // Adicione mais detalhes por UF conforme necessário
      ],
    },
    // Adicione mais informações mensais conforme necessário
  ],
};

export const listaPlanejamentos: PlanejamentoMacro[] = [planejamento1, planejamento2];

export default function GerenciarAcoes() {
  const { temPermissao } = useContext(AuthContext);
  const possuiPermissao = { excluir: temPermissao(Permissao.UsuarioEditar) };
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const paginas = [{ nome: "Gerenciar Ações", link: "/gerenciarAcoes" }];
  const colunas = ["Nome", "Período", "Quantidade de Ações", "Responsável"];

  const [notificationApi, notificationContextHandler] =
      notification.useNotification();

  const [showPlanejamento, setShowPlanejamento] =
      useState<PlanejamentoDialogArgs | null>(null);

  const [deletePlanejamento, setDeletePlanejamento] =
      useState<PlanejamentoMacro | null>(null);

  const [listaPeriodo, setListaPeriodo] = useState<FilterOptions[]>([]);

  const [nome, setNome] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [planejamentoBanco, setPlanejamentoBanco] = useState<PlanejamentoMacro[]>(listaPlanejamentos);
  const [planejamentos, setPlanejamentos] = useState<PlanejamentoMacro[]>(planejamentoBanco);

  useEffect(() => {
    fetchPlanejamentos()
        .then(e => setPlanejamentoBanco(e))
        .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setPlanejamentos(
        planejamentoBanco.filter(index =>
            index.nome.toLowerCase().includes(nome.toLowerCase()) &&
            index.responsavel.toLowerCase().includes(responsavel.toLowerCase())
        )
    );
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

          {(loading || !planejamentos?.length) && <Table columsTitle={colunas} initialItemsPerPage={10} totalItems={0} title=""><></><></></Table>}
          {planejamentos.length != null &&
              <Table
                  columsTitle={colunas}
                  title=""
                  initialItemsPerPage={10}
                  totalItems={planejamentos?.length}
              >
                {planejamentos?.map((e, index) => (
                    <CustomTableRow
                        key={e.nome}
                        id={index}
                        data={{
                          "0": e.nome,
                          "1": `${meses[e.mesInicio-1]} de ${e.anoInicio} - ${meses[e.mesFim-1]} de ${e.anoFim}`,
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
          }
          {loading &&
              <div className="d-flex justify-content-center w-100 m-5">
                <ReactLoading type="spinningBubbles" color="#000000" />
              </div>
          }
        </div>
        <Footer />
      </div>
  );
}
