import { useState } from "react";
import Modal from "../Modal";
import {deleteEscolaPlanejamento, updatePlanejamento} from "../../service/gerenciarAcoes";
import { notification } from "antd";
import "./styles.css"
import {
    EscolaPlanejamentoModel,
    EscolasPlanejamentoTabela,
    InfoMesPlanejamentoMacro,
    PlanejamentoMacro
} from "../../models/gerenciarAcoes";
export interface DeletarEscolaDialogArgs {
  id: string;
  nome: string;
}

interface DeletarEscolaDialogProps {
    readonly planejamento: PlanejamentoMacro
    readonly escola: EscolasPlanejamentoTabela | undefined;
    readonly infoMes: InfoMesPlanejamentoMacro | undefined;
    readonly closeDialog: (deleted : boolean) => void
}

export default function DeletarEscolaDialog( { planejamento, infoMes, escola, closeDialog} : DeletarEscolaDialogProps) {

  return (
    <Modal className="delete-escola-planejamento" closeModal={() => closeDialog(false)}>
      <p>
        <strong>Tem certeza que deseja excluir esta escola?</strong>
      </p>
      <p>
        A escola <strong>{escola?.nome}</strong> será excluída do planejamento.
      </p>
      <div className="d-flex w-100 justify-content-end mb-2">
        <button className="br-button secondary" type="button" onClick={() => closeDialog(false)} data-testid="botaoCancelar">
          Cancelar
       </button>
          <button
              className="br-button primary"
              type="button"
              data-testid="botaoConfirmar"
              onClick={() => {
                  const newInfoPlanejamentoMacro = planejamento?.planejamentoMacroMensal.map(p => {
                      if (p === infoMes) {
                          const escolasFiltradas = p?.escolas.filter(e => (
                              escola?.nome !== e.nome &&
                              escola?.quantidadeAlunos !== e.quantidadeAlunos &&
                              escola?.uf !== e.uf
                          ));
                          return { ...p, escolas: escolasFiltradas };
                      }
                      return p;
                  });

                  var newPlanejamento = planejamento;
                  newPlanejamento.planejamentoMacroMensal = newInfoPlanejamentoMacro;

                  if (newPlanejamento) {
                      updatePlanejamento(planejamento.id, newPlanejamento)
                          .then(() => {
                              notification.success({ message: "Escolas Deletada do Planejamento com Sucesso!" });
                          })
                          .catch((error) => {
                              notification.error({
                                  message: "Falha ao Deletar Escolas do Planejamento."
                              });
                          });
                  }
              }}
          >
              Confirmar
          </button>
      </div>
    </Modal>
  )

}
