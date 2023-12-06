import { useState } from "react";
import SelectCardGroup from "../../../../components/SelectCardGroup";
import Table, { CustomTableRow } from "../../../../components/Table";
import UfCardGroup from "../../../../components/UfCard";
import { escolasTabela, monthsData, ufData } from "./fixtures";
import "./styles.css";
import { EscolasPlanejamentoTabela } from "../../../../models/gerenciarAcoes";
import { ButtonComponent } from "../../../../components/Button";
import ModalAdicionarEscola from "../../../../components/GerenciarAcoesModal/AdicionarEscola";
import DeletarEscolaDialog, {DeletarEscolaDialogArgs} from "../../../../components/DeletarEscolaDialog";
export default function PlanejamentoInfo() {
  const colunas = [
    "UPS",
    "Escola",
    "UF",
    "Quantidade de Alunos",
    "Custo logístico",
  ];

  const [showDeletarEscolaPlanejamento, setShowDeletarEscolaPlanejamento] = useState<DeletarEscolaDialogArgs|null>(null);

  const [escolasPlanejamento, setEscolasPlanejamento] =
    useState<EscolasPlanejamentoTabela[]>(escolasTabela);
  
  const [modalAdicionarAcao, setModalAdicionarAcao] = useState<boolean>(false);

  return (
    <div>
      {showDeletarEscolaPlanejamento && (
        <DeletarEscolaDialog
          id=""
          nome={showDeletarEscolaPlanejamento.nome}
          closeDialog={(deletou) => {
            setShowDeletarEscolaPlanejamento(null);
          }}/>
      )}
      {modalAdicionarAcao && <ModalAdicionarEscola
          onClose={() => { setModalAdicionarAcao(false) }}
      />}
      <div className="planning-info">
        <div className="months-cards">
          <SelectCardGroup cardsData={monthsData} />
        </div>
        <div className="custom-divider" />
        <div className="uf-container">
          <span className="planning-text">
            Planejamento Macro Novembro / 2024
          </span>
          <UfCardGroup cardsData={ufData} />
        </div>
      </div>
      <div className="table-title">
        <span className="title-text">Escolas no mês de Novembro</span>
        <ButtonComponent buttonStyle="primary" label="Adicionar Escola" onClick={() => setModalAdicionarAcao(true)}/>
      </div>
      {escolasPlanejamento.length != null && (
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
              onDeleteRow={() => {
                setShowDeletarEscolaPlanejamento({ nome: e.nome, id: "" })
              }}
            />
          ))}
        </Table>
      )}
    </div>
  );
}
