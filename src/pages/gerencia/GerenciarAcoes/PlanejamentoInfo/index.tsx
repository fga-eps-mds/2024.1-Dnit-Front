import { useEffect, useState } from "react";
import SelectCardGroup, {
  SelectCardData,
} from "../../../../components/SelectCardGroup";
import Table, { CustomTableRow } from "../../../../components/Table";
import UfCardGroup from "../../../../components/UfCard";
import { meses } from "../fixtures";
import "./styles.css";
import {
  EscolasPlanejamentoTabela,
  InfoMesPlanejamentoMacro,
  PlanejamentoMacro,
} from "../../../../models/gerenciarAcoes";
import { ButtonComponent } from "../../../../components/Button";
import ModalAdicionarEscola from "../../../../components/GerenciarAcoesModal/AdicionarEscola";
import DeletarEscolaDialog, {
  DeletarEscolaDialogArgs,
} from "../../../../components/DeletarEscolaDialog";
import ModalAlterarEscola from "../../../../components/GerenciarAcoesModal/AlterarEscola";
import { numeroCustoLogistico } from "../../../../utils/utils";

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
  const [showDeletarEscolaPlanejamento, setShowDeletarEscolaPlanejamento] =
    useState<DeletarEscolaDialogArgs | null>(null);
  const [escolasPlanejamento, setEscolasPlanejamento] =
    useState<EscolasPlanejamentoTabela[]>();
  const [modalAdicionarAcao, setModalAdicionarAcao] = useState<boolean>(false);
  const [monthPlanningSelected, setMonthPlanningSelected] = useState<
    InfoMesPlanejamentoMacro | undefined
  >();
  const selectCardData: SelectCardData[] = [];

  useEffect(() => {
    let escolasArray: EscolasPlanejamentoTabela[] = [];
    console.log("Calling");

    planejamento.planejamentoMacroMensal[0].escolas.forEach((element) => {
      escolasArray.push({
        nome: element.nome,
        quantidadeAlunos: element.quantidadeAlunos,
        custoLogistico: numeroCustoLogistico(element.distanciaPolo),
        uf: element.uf,
        ups: element.ups,
      });
    });

    setEscolasPlanejamento(escolasArray);
    setMonthPlanningSelected(planejamento.planejamentoMacroMensal[0]);
  }, [planejamento]);

  planejamento.planejamentoMacroMensal.forEach((element, index) => {
    selectCardData.push({
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

  function updateMonthData(cardIndex: number) {
    let escolasArray: EscolasPlanejamentoTabela[] = [];
    console.log("Calling");

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

    setEscolasPlanejamento(escolasArray);
    setMonthPlanningSelected(planejamento.planejamentoMacroMensal[cardIndex]);
  }

  return (
    <div>
      {showDeletarEscolaPlanejamento && (
        <DeletarEscolaDialog
          id=""
          nome={showDeletarEscolaPlanejamento.nome}
          closeDialog={(deletou) => {
            setShowDeletarEscolaPlanejamento(null);
          }}
        />
      )}
      {showAlterarMesEscola && (
        <ModalAlterarEscola
          onClose={() => {
            setShowAlterarMesEscola(false);
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
                    key={e.nome}
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
                      setShowAlterarMesEscola(true);
                    }}
                    onDeleteRow={() => {
                      setShowDeletarEscolaPlanejamento({
                        nome: e.nome,
                        id: "",
                      });
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
