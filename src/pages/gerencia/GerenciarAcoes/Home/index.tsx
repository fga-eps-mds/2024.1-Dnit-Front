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
import DeletarPlanejamentoDialog, {
  DeletarPlanejamentoDialogArgs,
} from "../../../../components/DeletarPlanejamentoDialog";

interface FilterOptions {
  id: string;
  rotulo: string;
  intervalos: string | null;
}

interface PlanejamentoDialogArgs {
  nome: string | null;
  readOnly: boolean;
}

interface PlanejamentoRanque {
  nome: string;
  periodo: string;
  quantidadeAcoes: number | null;
  responsavel: string;
}

const dados: PlanejamentoRanque[] = [
  {
    nome: "PLANEJAMENTO CENTRO OESTE",
    periodo: "10 JAN - 30 OUT",
    quantidadeAcoes: 1000,
    responsavel: "Wellington Guimarães",
  },
  {
    nome: "PLANEJAMENTO NORTE",
    periodo: "10 ABR - 20 JUL",
    quantidadeAcoes: 2400,
    responsavel: "Ronaldo Marques",
  },
  {
    nome: "PLANEJAMENTO SUL",
    periodo: "15 MAR - 7 NOV",
    quantidadeAcoes: 489,
    responsavel: "Julio Pellizon",
  },
  {
    nome: "PLANEJAMENTO NORDESTE",
    periodo: "10 FEV - 27 JUN",
    quantidadeAcoes: 2900,
    responsavel: "Nayara Azevedo",
  },
  {
    nome: "PLANEJAMENTO SUDESTE",
    periodo: "10 AGO - 12 DEZ",
    quantidadeAcoes: 500,
    responsavel: "Julieta Vieira",
  },
];

export default function GerenciarAcoes() {
  const { temPermissao } = useContext(AuthContext);
  const possuiPermissao = { excluir: temPermissao(Permissao.UsuarioEditar) };
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const paginas = [{ nome: "Gerenciar Ações", link: "/gerenciarAcoes" }];
  const colunas = ["Nome", "Período", "Quantidade de Ações", "Responsável"];
  
  const [notificationApi, notificationContextHandler] = 
      notification.useNotification();
  
  const [showPlanejamento, setShowPlanejamento] =
    useState<PlanejamentoDialogArgs | null>(null);
  
  const [showDeletePlanejamento, setShowDeletePlanejamento] =
    useState<DeletarPlanejamentoDialogArgs | null>(null);
  
  const [listaPeriodo, setListaPeriodo] = useState<FilterOptions[]>([]);
  
  const [nome, setNome] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [planejamentoBanco, setPlanejamentoBanco] = useState<PlanejamentoRanque[]>(dados);
  const [planejamentos, setPlanejamentos] = useState<PlanejamentoRanque[]>(planejamentoBanco);

  //TODO ADICIONAR O FETCH COM BANCO
  // useEffect(() => {
  //   fetchEscolasAcao()
  //       .then(e => setPlanejamentoBanco(e))
  //       .finally(() => setLoading(false));
  // }, []);
  
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
      {showDeletePlanejamento && (
        <DeletarPlanejamentoDialog
          nome={showDeletePlanejamento.nome}
          closeDialog={(deletou) => {
            setShowDeletePlanejamento(null);
          }}
        />
      )}
      <Header />
      <TrilhaDeNavegacao elementosLi={paginas} />
      <div className="d-flex flex-column m-5">
        <div className="d-flex justify-content-left align-items-center mr-5">
          <div className={"inputNome"} style={{ margin: "20px" }}>
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
          <div className={"inputResponsavel"}>
            <InputFilter onChange={setResponsavel} label="Responsável" />
          </div>
          

          {possuiPermissao && (
            <div style={{ right: "5%" }}>
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
                        "1": `${e.periodo}`,
                        "2": `${e.quantidadeAcoes}`,
                        "3": e.responsavel,
                      }}
                      hideEditIcon={true}
                      onDeleteRow={() => {
                        setShowDeletePlanejamento({ nome: e.nome, qtdAcoes: e.quantidadeAcoes });
                      }}
                  />
              ))}
            </Table>
        }
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
