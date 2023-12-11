import { useEffect, useState } from "react";
import SelectCardGroup, {
  SelectCardData,
} from "../../../../components/SelectCardGroup";
import Table, { CustomTableRow } from "../../../../components/Table";
import UfCardGroup from "../../../../components/UfCard";
import { meses } from "../fixtures";
import "./styles.css";
import {
  EscolaPlanejamentoModel,
  EscolasPlanejamentoTabela,
  InfoMesPlanejamentoMacro,
  PlanejamentoMacro,
} from "../../../../models/gerenciarAcoes";
import { ButtonComponent } from "../../../../components/Button";
import ModalAdicionarEscola from "../../../../components/GerenciarAcoesModal/AdicionarEscola";
import ModalAlterarEscola from "../../../../components/GerenciarAcoesModal/AlterarEscola";
import { numeroCustoLogistico } from "../../../../utils/utils";
import { fetchListarEscolasFiltradas } from "../../../../service/escolaApi";
import {
  AtualizarPlanejamento,
  EscolaData,
  PlanejamentoMacroMesUpdate,
} from "../../../../models/service";
import ModalRanqueEscola from "../../../../components/EscolaRanqueModal";
import DeletarEscolaDialog from "../../../../components/DeletarEscolaDialog";
import { updatePlanejamento } from "../../../../service/gerenciarAcoes";
import { notification } from "antd";

interface PlanejamentoInfoProps {
  planejamento: PlanejamentoMacro;
}

export default function PlanejamentoInfo({
  planejamento,
}: PlanejamentoInfoProps) {
  const colunas = [
    "UPS",
    "Escola",
    "UF",
    "Quantidade de Alunos",
    "Custo logístico",
  ];

  const [showAlterarMesEscola, setShowAlterarMesEscola] =
    useState<boolean>(false);
  const [escolasPlanejamento, setEscolasPlanejamento] =
    useState<EscolasPlanejamentoTabela[]>();
  const [modalAdicionarAcao, setModalAdicionarAcao] = useState<boolean>(false);
  const [monthPlanningSelected, setMonthPlanningSelected] = useState<
    InfoMesPlanejamentoMacro | undefined
  >();
  const [showDeletarDialog, setShowDeletarDialog] = useState(false);
  const [selectCardData, setSelectCardData] = useState<SelectCardData[]>([]);
  const [escolaAtual, setEscolaAtual] = useState<EscolaData | null>();
  const [escolasBanco, setEscolasBanco] = useState<EscolaData[]>();
  const [cardIndexSelected, setCardIndexSelected] = useState(0);

  const [escolaSelected, setEscolaSelected] =
    useState<EscolasPlanejamentoTabela | null>();

  useEffect(() => {
    console.log("Calling 2");

    fetchListarEscolasFiltradas({
      params: {
        Pagina: 1,
        TamanhoPagina: 10000,
        Nome: "",
        IdSituacao: "",
        IdMunicipio: "",
        IdUf: "",
      },
    }).then((escolas) => {
      setEscolasBanco(escolas.escolas);
    });
  }, []);

  useEffect(() => {
    let escolasArray: EscolasPlanejamentoTabela[] = [];

    planejamento.planejamentoMacroMensal[cardIndexSelected].escolas.forEach(
      (element) => {
        escolasArray.push({
          nome: element.nome,
          quantidadeAlunos: element.quantidadeAlunos,
          custoLogistico: numeroCustoLogistico(element.distanciaPolo),
          uf: element.uf,
          ups: element.ups,
        });
      }
    );

    setEscolasPlanejamento(escolasArray);
    setMonthPlanningSelected(
      planejamento.planejamentoMacroMensal[cardIndexSelected]
    );
    updateSelectCardData();
  }, [cardIndexSelected, planejamento.planejamentoMacroMensal]);

  function updateSelectCardData() {
    let newData: SelectCardData[] = [];
    planejamento.planejamentoMacroMensal.sort((a, b) => a.mes - b.mes);
    planejamento.planejamentoMacroMensal.forEach((element, index) => {
      newData.push({
        id: index,
        title: `${meses[element.mes - 1]
          .slice(0, 3)
          .toUpperCase()}/${element.ano.slice(2, 4)}`,
        info: [
          `Escolas ${element.quantidadeEscolasTotal}`,
          `Alunos ${element.quantidadeAlunosTotal}`,
          `UPS: ${element.upsTotal}`,
        ],
      });
    });

    setSelectCardData(newData);
  }

  function updateMonthData(cardIndex: number) {
    let escolasArray: EscolasPlanejamentoTabela[] = [];
    planejamento.planejamentoMacroMensal[cardIndex].escolas.forEach(
      (element) => {
        escolasArray.push({
          nome: element.nome,
          quantidadeAlunos: element.quantidadeAlunos,
          custoLogistico: numeroCustoLogistico(element.distanciaPolo),
          uf: element.uf,
          ups: element.ups,
        });
      }
    );

    setCardIndexSelected(cardIndex);
    setEscolasPlanejamento(escolasArray);
    setMonthPlanningSelected(planejamento.planejamentoMacroMensal[cardIndex]);
    updateSelectCardData();
  }

  async function sendDeleteEscola() {
    const newInfoPlanejamentoMacro = planejamento?.planejamentoMacroMensal.map(
      (p) => {
        if (p === monthPlanningSelected) {
          const escolasFiltradas = p?.escolas.filter(
            (e) =>
              escolaSelected?.nome !== e.nome &&
              escolaSelected?.quantidadeAlunos !== e.quantidadeAlunos &&
              escolaSelected?.uf !== e.uf
          );
          return { ...p, escolas: escolasFiltradas };
        }
        return p;
      }
    );

    var newPlanejamento = planejamento;
    newPlanejamento.planejamentoMacroMensal = newInfoPlanejamentoMacro;

    let planejamentoMesesInfo: PlanejamentoMacroMesUpdate[] =
      newPlanejamento!.planejamentoMacroMensal.map((element) => ({
        mes: element.mes,
        ano: element.ano,
        escolas: element.escolas.map((escola) => escola.id),
      }));

    let bodyRequest: AtualizarPlanejamento = {
      nome: newPlanejamento!.nome,
      planejamentoMacroMensal: planejamentoMesesInfo,
    };

    if (newPlanejamento) {
      await updatePlanejamento(planejamento.id, bodyRequest)
        .then((response) => {
          notification.success({
            message: "Escolas Deletada do Planejamento com Sucesso!",
          });
          planejamento = response;
        })
        .catch((error) => {
          notification.error({
            message: "Falha ao Deletar Escolas do Planejamento.",
          });
        });
    }

    if (planejamento.planejamentoMacroMensal.length - 1 > cardIndexSelected) {
      setCardIndexSelected(0);
    }

    updateMonthData(cardIndexSelected);
    setShowDeletarDialog(false);
  }

  async function mudaEscolasEntreMeses(
    escolaSelecionadaInfo: EscolaPlanejamentoModel,
    escolaSelected: EscolasPlanejamentoTabela
  ) {
    let updatedPlanejamento = planejamento;
    let escolaTroca1: EscolaPlanejamentoModel | undefined = undefined;
    let firstMonth = 0;

    if (escolaSelecionadaInfo !== undefined) {
      // Realiza as trocas
      updatedPlanejamento.planejamentoMacroMensal.forEach((mesInfo) => {
        if (escolaTroca1 === undefined) {
          escolaTroca1 = mesInfo.escolas.find(
            (escola) =>
              escola.nome === escolaSelected.nome &&
              escola.quantidadeAlunos === escolaSelected.quantidadeAlunos &&
              escola.uf === escolaSelected.uf
          );
          if (escolaTroca1 !== undefined) {
            firstMonth = mesInfo.mes;
            mesInfo.escolas = mesInfo.escolas.filter(
              (element) => element.id !== escolaTroca1!.id
            );
            mesInfo.escolas.push(escolaSelecionadaInfo);
          }
        }
      });

      updatedPlanejamento.planejamentoMacroMensal.forEach((mesInfo) => {
        var escolaTroca2: EscolaPlanejamentoModel | undefined =
          mesInfo.escolas.find(
            (escola) => escola.id === escolaSelecionadaInfo.id
          );
        if (escolaTroca2 !== undefined && mesInfo.mes !== firstMonth) {
          mesInfo.escolas = mesInfo.escolas.filter(
            (element) => element.id !== escolaSelecionadaInfo!.id
          );
          mesInfo.escolas.push(escolaTroca1!);
        }
      });
    }

    let planejamentoMesesInfo: PlanejamentoMacroMesUpdate[] =
      updatedPlanejamento!.planejamentoMacroMensal.map((element) => ({
        mes: element.mes,
        ano: element.ano,
        escolas: element.escolas.map((escola) => escola.id),
      }));

    let bodyRequest: AtualizarPlanejamento = {
      nome: updatedPlanejamento!.nome,
      planejamentoMacroMensal: planejamentoMesesInfo,
    };

    if (updatedPlanejamento) {
      await updatePlanejamento(planejamento.id, bodyRequest)
        .then((response) => {
          notification.success({
            message: "Escolas Trocadas com Sucesso!",
          });
          planejamento = response;
        })
        .catch((error) => {
          notification.error({
            message: "Falha em Trocar Escolas no Planejamento.",
          });
        });
    }

    setShowAlterarMesEscola(false);
  }

  return (
    <div className="planning-info-container">
      {escolaAtual != null && (
        <ModalRanqueEscola
          onClose={() => {
            setEscolaAtual(null);
          }}
          onCreateAcao={() => {}}
          escolaId={escolaAtual.idEscola.toString()}
        />
      )}
      {showDeletarDialog && (
        <DeletarEscolaDialog
          infoMes={monthPlanningSelected}
          escola={escolaSelected!}
          closeDialog={(deletou) => {
            setShowDeletarDialog(false);
          }}
          onConfirm={sendDeleteEscola}
        />
      )}
      {showAlterarMesEscola && (
        <ModalAlterarEscola
          escolaSelected={escolaSelected!}
          planejamento={planejamento}
          onClose={() => {
            setShowAlterarMesEscola(false);
          }}
          onConfirm={(escolaInfo, escolaSelecionada) => {
            mudaEscolasEntreMeses(escolaInfo, escolaSelecionada);
            updateMonthData(cardIndexSelected);
          }}
        />
      )}
      {modalAdicionarAcao && (
        <ModalAdicionarEscola
          planejamento={planejamento}
          infoMes={monthPlanningSelected}
          onClose={() => {
            setModalAdicionarAcao(false);
          }}
        />
      )}
      {monthPlanningSelected !== undefined && (
        <div>
          <div className="planning-info">
            <div className="months-cards">
              <SelectCardGroup
                cardsData={selectCardData}
                onClick={updateMonthData}
              />
            </div>
            <div className="custom-divider" />
            <div className="uf-container">
              <span className="planning-text">
                Planejamento Macro {meses[monthPlanningSelected!.mes - 1]} /{" "}
                {monthPlanningSelected.ano}
              </span>
              <UfCardGroup cardsData={monthPlanningSelected.detalhesPorUF} />
            </div>
          </div>
          <div className="table-title">
            <span className="title-text">
              Escolas no mês de {meses[monthPlanningSelected!.mes - 1]}
            </span>
            <ButtonComponent
              buttonStyle="primary"
              label="Adicionar Escola"
              onClick={() => setModalAdicionarAcao(true)}
            />
          </div>
          {escolasPlanejamento !== undefined &&
            escolasPlanejamento.length != null && (
              <Table
                columsTitle={colunas}
                title=""
                initialItemsPerPage={10}
                totalItems={escolasPlanejamento?.length}
              >
                {escolasPlanejamento?.map((e, index) => (
                  <CustomTableRow
                    key={index}
                    id={index}
                    data={{
                      "0": e.ups.toString(),
                      "1": `${e.nome}`,
                      "2": `${e.uf}`,
                      "3": `${e.quantidadeAlunos}`,
                      "Custo logístico": `${e.custoLogistico}`,
                    }}
                    hideEditIcon={true}
                    hideChangeIcon={false}
                    onChangeRow={() => {
                      setEscolaSelected(e);
                      setShowAlterarMesEscola(true);
                    }}
                    onDeleteRow={() => {
                      setEscolaSelected(e);
                      setShowDeletarDialog(true);
                    }}
                    onDetailRow={(_) => {
                      const escolaEncontrada = escolasBanco?.find((escola) => {
                        return (
                          escola.nomeEscola === e.nome &&
                          escola.siglaUf === e.uf &&
                          escola.numeroTotalDeAlunos === e.quantidadeAlunos
                        );
                      });
                      if (escolaEncontrada && escolaEncontrada.idEscola)
                        setEscolaAtual(escolaEncontrada);
                    }}
                  />
                ))}
              </Table>
            )}
        </div>
      )}
    </div>
  );
}
