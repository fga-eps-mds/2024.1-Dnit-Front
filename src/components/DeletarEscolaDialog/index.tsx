import { useState } from "react";
import Modal from "../Modal";
import { deleteEscolaPlanejamento } from "../../service/gerenciarAcoes";
import { notification } from "antd";
import "./styles.css"
export interface DeletarEscolaDialogArgs {
  id: string;
  nome: string;
}

interface DeletarEscolaDialogProps {
  readonly id: string;
  readonly nome: string;
  readonly closeDialog: (deleted : boolean) => void
}

export default function DeletarEscolaDialog( { id, nome, closeDialog} : DeletarEscolaDialogProps) {
  const deletarEscola = () => {
    deleteEscolaPlanejamento(id).then(() => {
      notification.success({ message: "Escola deletada com sucesso!"});
      closeDialog(true);
    })
    .catch((error) => {
      notification.error({
        message: "Falha na exclusão da escola" + (error?.response?.data ?? "")
      })
    }) 
  }

  return (
    <Modal className="delete-escola-planejamento" closeModal={() => closeDialog(false)}>
      <p>
        <strong>Tem certeza que deseja excluir esta escola?</strong>
      </p>
      <p>
        A escola <strong>{nome}</strong> será excluída do planejamento.
      </p>
      <div className="d-flex w-100 justify-content-center">
        <button className="br-button secondary" type="button" onClick={() => closeDialog(false)} data-testid="botaoCancelar">
          Cancelar
       </button>
        <button className="br-button primary" type="button"onClick={deletarEscola} data-testid="botaoConfirmar">
          Confirmar
        </button>
      </div>
    </Modal>
  )

}
